import * as _ from "lodash"
import {useAuthStore} from "@/stores/auth";
import type { AxiosError, AxiosResponse, AxiosResponseTransformer } from "axios"
import axios from "axios";
import type {ApiMethod} from "./ApiMethod";
import {ApiResponse} from "@/lib/api/ApiResponse";
import {ApiResultCode} from "@/lib/api/ApiResultCode";
import type { ResponseHandler } from "@/lib/api/ResponseHadler";
import type {IRequestPagination} from "@/lib/api/IRequestPagination";
import type {RequestPaginationHandler} from "@/lib/api/RequestPaginationHandler";
import {merge} from "lodash";

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
    responseDataHandler: undefined | ResponseHandler
    paginationHandler: undefined | RequestPaginationHandler
    constructor(method: ApiMethod, baseUrl: string, url: string, isPublic: boolean, responseDataHandler: null | ResponseHandler, paginationHandler: null | RequestPaginationHandler) {
        this.Method = method
        this.BaseUrl = baseUrl
        this.Url = url
        this.IsPublic = isPublic
        if (responseDataHandler) this.responseDataHandler = responseDataHandler
        if (paginationHandler) this.paginationHandler = paginationHandler
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

    Execute (routeParams?: Map<string, string> | null, queryParams?: object, timeout?: number, pagination?: IRequestPagination) {
        let merged = {}
        if (pagination && this.paginationHandler) {
            let compiledPagination = this.paginationHandler(pagination)
            merged = {...queryParams, ...compiledPagination}
        }
        else merged = {...queryParams}
        return new Promise<ApiResponse> ((resolve, reject) => {
            let config = this.ToAxiosConfig(routeParams ? routeParams : null, merged ? merged : null, timeout)
            axios(config)
                .then((r : AxiosResponse) => {
                    let response = new ApiResponse()
                    response.SetData( r.data ? r.data : null, this.responseDataHandler)
                    resolve(response)
                }).catch((e: AxiosError) => {
                    let response = new ApiResponse()
                    response.SetError(e.response?.status, e.response?.data)
                    if (axios.isCancel(e)) { response.Status = ApiResultCode.Cancelled }
                    reject(response)
                })
        })
    }
    Abort () {
        this.controller.abort()
    }
}

