import * as _ from "lodash"
import {useAuthStore} from "@/stores/auth";
import type {AxiosResponse, AxiosError} from "axios"
import axios from "axios";
import type {ApiMethod} from "./ApiMethod";
import {ApiResponse} from "@/lib/api/ApiResponse";

const auth = useAuthStore();

const defaultTimeout = 5000

class AxiosConfig {
    baseURL: string
    url: string
    method: ApiMethod
    headers: any = undefined
    params: any = undefined
    timeout: number
    constructor(signal: AbortSignal, baseUrl: string, url: string, method: ApiMethod, timeout?: number) {
        this.baseURL = baseUrl
        this.url = url
        this.method = method
        this.timeout = timeout ? timeout : defaultTimeout
    }
}

export class ApiResource {
    Method: ApiMethod
    BaseUrl: string
    Url: string
    IsPublic: boolean
    controller: AbortController = new AbortController()
    constructor(method: ApiMethod, baseUrl: string, url: string, isPublic: boolean) {
        this.Method = method
        this.BaseUrl = baseUrl
        this.Url = url
        this.IsPublic = isPublic
    }
    ToAxiosConfig (routeParams?: Map<string, string> | null, queryParams?: object | null, timeout?: number) : AxiosConfig {
        let u = _.clone(this.Url).toLowerCase()
        if (routeParams) {
            for (const [key, value] of routeParams.entries()) {
                u = _.replace(u, '{'  + key.toLowerCase() + '}', value)
            }

        }
        let config = new AxiosConfig(this.controller.signal, this.BaseUrl, u, this.Method, timeout)
        if (queryParams) config.params = queryParams
        if (!this.IsPublic) config.headers = { 'Authorization' : auth.header }
        return config
    }

    Execute (routeParams?: Map<string, string> | null, params?: object, timeout?: number) {
        return new Promise<ApiResponse> ((resolve, reject) => {
            let config = this.ToAxiosConfig(routeParams ? routeParams : null, params ? params : null, timeout)
            console.log(config)
            axios(config)
                .then((r : AxiosResponse) => {
                    let response = new ApiResponse()
                    response.SetData(r.data ? r.data : null)
                    resolve(response)
                }).catch((e: AxiosError) => {
                    let response = new ApiResponse()
                    response.SetError(e.response?.status, e.response?.data)
                    reject(response)
                })
        })
    }
    Abort () {
        this.controller.abort()
    }
}

