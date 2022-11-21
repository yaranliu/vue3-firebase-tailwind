import {errorFromHttpStatusCode, ApiResultCode} from "@/lib/api/ApiResultCode";
import type {Paged} from "@/lib/api/Paged";
import type {ResponseHandler} from "@/lib/api/ResponseHadler";
import type {Flowing} from "@/lib/api/Flowing";

export class ApiResponse {
    Status: ApiResultCode = ApiResultCode.Unknown
    Data: any | null
    Pagination: null | Paged | Flowing = null
    Error: any | null   // Error object received from HTTP response
    get IsSuccess(): boolean {
        return this.Status === ApiResultCode.Success;
    }
    SetData(Data: any, handler: undefined | ResponseHandler) {
        if (handler) {
            let result = handler(Data)
            this.Data = result.Data
            this.Pagination = result.Pagination
        } else {
            this.Data = Data
        }
        this.Status = ApiResultCode.Success
        this.Error = null
    }
    SetError(StatusCode: number | undefined , Error: any) {
        this.Status = errorFromHttpStatusCode(StatusCode)
        this.Error = Error
    }
}
