import * as _ from "lodash"
import { useAuthStore } from "@/stores/auth";
import axios from "axios";
import type { ApiMethod } from "./ApiMethod";

const auth = useAuthStore();

class AxiosConfig {
    baseURL: string
    url: string
    method: ApiMethod
    headers: any = undefined
    params: any = undefined
    constructor(baseUrl: string, url: string, method: ApiMethod) {
        this.baseURL = baseUrl
        this.url = url
        this.method = method
    }
}

let fMap = new Map<string, string> ()

export class ApiResource {
    Method: ApiMethod
    BaseUrl: string
    Url: string
    IsPublic: boolean
    constructor(method: ApiMethod, baseUrl: string, url: string, isPublic: boolean) {
        this.Method = method
        this.BaseUrl = baseUrl
        this.Url = url
        this.IsPublic = isPublic
    }
    ToAxiosConfig (routeParams: Map<string, string>, queryParams: object) : AxiosConfig {
        let u = _.clone(this.Url).toLowerCase()
        if (routeParams) {
            for (const [key, value] of routeParams.entries()) {
                u = _.replace(u, '{'  + key.toLowerCase() + '}', value)
            }

        }
        let config = new AxiosConfig(this.BaseUrl, u, this.Method)
        if (queryParams) config.params = queryParams
        if (!this.IsPublic) config.headers = { 'Authorization' : auth.header }
        return config
    }
    Execute (routeParams: Map<string, string>, params: object) {
        return new Promise((resolve, reject) => {
            axios(this.ToAxiosConfig(routeParams, params)).then(r => {
                resolve(r)
            }).catch(e => {
                reject(e)
            })
        })
    }
}

