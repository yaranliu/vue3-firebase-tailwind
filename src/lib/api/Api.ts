import {ApiResource} from "@/lib/api/ApiResource";
import type {ApiMethod} from "@/lib/api/ApiMethod";
import {ApiAuth} from "@/lib/api/ApiAuth";
import type {IBasicAuth} from "@/lib/api/IBasicAuth";
import {AxiosConfig} from "@/lib/api/AxiosConfig";
import type {PaginationType} from "@/lib/api/PaginationType";
import type {ApiSuccessResult} from "@/lib/api/ApiSuccessResult";

abstract class Api {
    BaseUrl: string
    Resources: Map<string, ApiResource>
    Auth: ApiAuth = ApiAuth.None
    BasicAuth: IBasicAuth | undefined
    abstract Jwt() :string
    abstract TransformResponse(payload: any, paginationType: PaginationType): ApiSuccessResult
    Controller: AbortController = new AbortController()
    constructor(BaseUrl: string, Auth: ApiAuth) {
        this.BaseUrl = BaseUrl
        this.Resources = new Map<string, ApiResource>()
        this.Auth = Auth
    }

    AddResource (Key: string, Method: ApiMethod, Url: string, Pagination: PaginationType, Identifier?: string) {
        this.Resources.set(Key, new ApiResource(Method, this.BaseUrl, Url, this.Auth, Pagination, Identifier ))
        return this
    }

    GetConfig(resourceName: string, timeout?: number, controller?: AbortController) {
        let resource = this.Resources.get(resourceName)
        if (resource) {
            let abortSignal = controller ? controller.signal : this.Controller.signal
            let config = new AxiosConfig(abortSignal, this.BaseUrl)
            config.url = resource.Url
            config.method = resource.Method
            if (timeout) config.timeout = timeout
            if (this.Auth === ApiAuth.Jwt) config.headers = { 'Authorization' : this.Jwt() }
            else if (this.Auth === ApiAuth.Basic) config.auth = this.BasicAuth

            return config
        }
    }

    GetResource(resourceName: string) {
        return this.Resources.get(resourceName)
    }
}

export { Api }
