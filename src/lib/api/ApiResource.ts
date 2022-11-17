import * as _l from "lodash/lang"
import * as _s from "lodash/string"

import { useAuthStore } from "@/stores/auth";
import axios from "axios";
import { ApiMethod } from "./ApiMethod";

const auth = useAuthStore();

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
    ToAxiosConfig (fragments: object, params: object) : object {
        let u = _l.clone(this.Url).toLowerCase()
        if (fragments) {
            for (const [key, value] of Object.entries(fragments)) {
                u = _s.replace(u, '{'  + key.toLowerCase() + '}', value)
            }
        }
        let config = {
            baseURL: this.BaseUrl,
            url: u,
            method: this.Method,
        }
        if (params) config['params'] = params
        if (!this.IsPublic) config['headers'] = { 'Authorization' : auth.header }
        return config
    }
    Execute (fragments: object, params: object) {
        return new Promise((resolve, reject) => {
            axios(this.ToAxiosConfig(fragments, params)).then(r => {
                resolve(r)
            }).catch(e => {
                reject(e)
            })
        })
    }
}

