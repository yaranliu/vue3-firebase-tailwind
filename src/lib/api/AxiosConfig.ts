import clone from "lodash/clone"
import replace from "lodash/replace"
import type {ApiMethod} from "@/lib/api/ApiMethod";
import type {IBasicAuth} from "@/lib/api/IBasicAuth";
import type {ApiResource} from "@/lib/api/ApiResource";
import type {ResponseHandler} from "@/lib/api/ResponseHandler";
import axios, {AxiosError } from "axios";
import type { AxiosResponse  } from "axios";
import {ApiResponse} from "@/lib/api/ApiResponse";
import {ApiResultCode} from "@/lib/api/ApiResultCode";
import type {IRequestPagination} from "@/lib/api/Pagination";
import type {AbstractRegularRequestPagination, AbstractScrollingRequestPagination} from "@/lib/api/Pagination";

export class AxiosConfig {
    baseURL: string
    url: string | undefined
    method: ApiMethod | undefined
    headers: any = undefined
    params: any = undefined
    timeout: number = 0
    auth: IBasicAuth | undefined
    signal: AbortSignal | undefined
    data: any

    constructor(signal: AbortSignal, baseUrl: string, url?: string, method?: ApiMethod) {
        this.baseURL = baseUrl
        if (url) this.url = url
        if (method) this.method = method
        this.signal = signal
    }

    SetRouteParams(routeParams?: Map<string, string> | null) {
        if (this.url && routeParams) {
            let u = clone(this.url).toLowerCase()
            for (const [key, value] of routeParams.entries()) {
                u = replace(u, '{'  + key.toLowerCase() + '}', value)
            }
            this.url = u
        }
        return this
    }

    SetQueryParams(queryParams?: object) {
        if (queryParams) {
            this.params = {...this.params, ... queryParams}
        }
        return this
    }

    SetPagination(pagination: object) {
        if (pagination) {
            this.params = {...this.params, ...pagination}
        }
        return this
    }

    // TODO Test SetData
    SetData (data: any) {
        this.data = data
        return this
    }

    private ProcessError(e: AxiosError): ApiResponse {
        let error = new ApiResponse()
        if (e.response) {
            error.GenerateError(e.response.status, e.response?.data)
        } else if (e.code) {
            error.GenerateAxiosError(e.code, e.message)
        } else {
            error.Status = ApiResultCode.Unknown
        }
        if (axios.isCancel(e)) { error.Status = ApiResultCode.Cancelled }
        return error
    }

    Execute(resource: ApiResource | undefined, responseHandler: ResponseHandler) {
        if (resource) {
            return new Promise<ApiResponse> ((resolve, reject) => {
                axios(this)
                    .then((r : AxiosResponse) => {
                        let response = new ApiResponse()
                        response.Transform(r.data ? r.data : null, responseHandler, resource.PaginationType)
                        resolve(response)
                    }).catch((e: AxiosError) => {
                    reject(this.ProcessError(e))
                })
            })
        }
    }

    async ExecuteAsync(resource: ApiResource | undefined, responseHandler: ResponseHandler) {
        if (resource) {
            try {
                let r = await axios(this)
                let response = new ApiResponse()
                response.Transform(r.data ? r.data : null, responseHandler, resource.PaginationType)
                return response
            } catch (e: any) {
                let error = this.ProcessError(e as AxiosError)
                return error
            }
        }
    }
}

