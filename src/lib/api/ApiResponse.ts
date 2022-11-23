import {errorFromHttpStatusCode, ApiResultCode, errorFromAxiosErrorCode} from "@/lib/api/ApiResultCode";
import type {Paged} from "@/lib/api/Paged";
import type {ResponseHandler} from "@/lib/api/ResponseHandler";
import type {Scrolling} from "@/lib/api/Scrolling";
import type {AxiosError} from "axios";
import type {PaginationType} from "@/lib/api/PaginationType";

export class ApiResponse {
    Status: ApiResultCode = ApiResultCode.Unknown
    Data: any | null
    Pagination: null | Paged | Scrolling = null
    Error: any | null   // Error object received from HTTP response
    get IsSuccess(): boolean {
        return this.Status === ApiResultCode.Success;
    }
    Transform(Data: any, handler: undefined | ResponseHandler, paginationType: PaginationType) {
        if (handler) {
            let result = handler(Data, paginationType)
            this.Data = result.Data
            this.Pagination = result.Pagination
        } else {
            this.Data = Data
        }
        this.Status = ApiResultCode.Success
        this.Error = null
    }
    GenerateError(StatusCode: number | undefined , Error: any) {
        this.Status = errorFromHttpStatusCode(StatusCode)
        this.Error = Error
    }

    GenerateAxiosError(Code: string , Error: any) {
        this.Status = errorFromAxiosErrorCode(Code)
        this.Error = Error
    }
}
