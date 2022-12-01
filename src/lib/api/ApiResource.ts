import type {ApiMethod} from "./ApiMethod";
import type {ApiAuth} from "@/lib/api/ApiAuth";
import type {PaginationType} from "@/lib/api/PaginationType";

export class ApiResource {
    Method: ApiMethod
    BaseUrl: string
    Url: string
    Auth: ApiAuth
    PaginationType: PaginationType
    Identifier?: string
    controller: AbortController = new AbortController()
    constructor(method: ApiMethod, baseUrl: string, url: string, auth: ApiAuth, pagination: PaginationType, identifier?: string) {
        this.Method = method
        this.BaseUrl = baseUrl
        this.Url = url
        this.Auth = auth
        this.PaginationType = pagination
        this.Identifier = identifier
    }
    SetIdentifier(identifier: string) {
        this.Identifier = identifier
    }
}

