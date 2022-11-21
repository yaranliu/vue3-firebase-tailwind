import {ApiResource} from "@/lib/api/ApiResource";
import type {ResponseHandler} from "@/lib/api/ResponseHadler";
import type {RequestPaginationHandler} from "@/lib/api/RequestPaginationHandler";
import type {ApiMethod} from "@/lib/api/ApiMethod";

export class Api {
    BaseUrl: string
    Resources: Map<string, ApiResource>
    IsPublic: boolean
    ResponseHandler: ResponseHandler
    RequestPaginationHandler: RequestPaginationHandler
    constructor(BaseUrl: string, IsPublic: boolean, ResponseHandler:ResponseHandler, RequestPaginationHandler: RequestPaginationHandler) {
        this.BaseUrl = BaseUrl
        this.IsPublic = IsPublic
        this.Resources = new Map<string, ApiResource>()
        this.ResponseHandler = ResponseHandler
        this.RequestPaginationHandler = RequestPaginationHandler
    }

    AddResource (Key: string, Method: ApiMethod, Url: string) {
        this.Resources.set(Key, new ApiResource(Method, this.BaseUrl, Url, this.IsPublic, this.ResponseHandler, this.RequestPaginationHandler ))
        return this
    }

}
