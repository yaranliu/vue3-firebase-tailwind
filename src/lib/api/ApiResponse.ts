import { getStatusCode, HttpStatus } from "@/lib/api/HttpStatus";

export class ApiResponse {
    Status: HttpStatus = HttpStatus.Unknown
    Data: any | null
    Error: any | null
    get IsSuccess(): boolean {
        return this.Status === HttpStatus.Success;
    }
    SetData(Data: any) {
        this.Status = HttpStatus.Success
        this.Data = Data
    }
    SetError(StatusCode: number | undefined , Error: any) {
        this.Status = getStatusCode(StatusCode)
        this.Error = Error
    }
}
