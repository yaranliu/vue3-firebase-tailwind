import type {ApiMethod} from "./ApiMethod";
import type {ApiAuth} from "@/lib/api/ApiAuth";
import type {PaginationType} from "@/lib/api/PaginationType";

export class ApiResource {
    Method: ApiMethod
    BaseUrl: string
    Url: string
    Auth: ApiAuth
    PaginationType: PaginationType
    controller: AbortController = new AbortController()
    constructor(method: ApiMethod, baseUrl: string, url: string, auth: ApiAuth, pagination: PaginationType) {
        this.Method = method
        this.BaseUrl = baseUrl
        this.Url = url
        this.Auth = auth
        this.PaginationType = pagination
    }
}

