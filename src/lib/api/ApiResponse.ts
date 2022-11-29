import {
    ApiErrorSource,
    ApiResultCode,
    errorFromAxiosErrorCode,
    errorFromHttpStatusCode
} from "@/lib/api/ApiResultCode";
import type {Paged} from "@/lib/api/Paged";
import type {ResponseHandler} from "@/lib/api/ResponseHandler";
import type {Scrolling} from "@/lib/api/Scrolling";
import type {PaginationType} from "@/lib/api/PaginationType";

export class ApiResponse {
    Status: ApiResultCode = ApiResultCode.None
    Data: any | null = null
    Pagination: null | Paged | Scrolling = null
    ErrorSource: ApiErrorSource | null = null
    Error: any | null   // Error object received from HTTP response
    Transform(Data: any, handler: undefined | ResponseHandler, paginationType: PaginationType) {
        if (handler) {
            let result = handler(Data, paginationType)
            this.Data = result.Data
            this.Pagination = result.Pagination
        } else {
            this.Data = Data
        }
        this.Status = ApiResultCode.Success
        this.ErrorSource = null
        this.Error = null
    }
    GenerateError(StatusCode: number | undefined , Error: any) {
        this.Status = errorFromHttpStatusCode(StatusCode)
        this.ErrorSource = ApiErrorSource.Response
        this.Error = Error
    }

    GenerateAxiosError(Code: string , Error: any) {
        this.Status = errorFromAxiosErrorCode(Code)
        this.ErrorSource = ApiErrorSource.Axios
        this.Error = Error
    }
}
