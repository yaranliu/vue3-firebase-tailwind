import { AxiosError } from "axios";

enum ApiResultCode {
    Unknown = 'Unknown',
    Cancelled = 'Cancelled',
    Success = 'Success',
    BadRequest = 'BadRequest',
    NotAuthenticated = 'NotAuthenticated',
    Forbidden = 'Forbidden',
    NotFound = 'NotFound',
    MethodNotAllowed = 'MethodNotAllowed',
    ProxyAuthRequired = 'ProxyAuthRequired',
    Timeout = 'Timeout',
    Conflict = 'Conflict',
    Gone = 'Gone',
    LengthRequired = 'LengthRequired',
    PayloadTooLarge = 'PayloadTooLarge',
    URITooLong = 'URITooLong',
    UnsupportedMediaType = 'UnsupportedMediaType',
    ValidationError = 'ValidationError',
    TooManyRequests = 'TooManyRequests',
    InternalServerError = 'InternalServerError',
    NotImplemented = 'NotImplemented',
    BadGateway = 'BadGateway',
    ServiceUnavailable = 'ServiceUnavailable',
    GatewayTimeOut = 'GatewayTimeOut',
    HTTPVersionNotSupported = 'HTTPVersionNotSupported',
    VariantAlsoNegotiates = 'VariantAlsoNegotiates',
    InsufficientStorage = 'InsufficientStorage',
    LoopDetected = 'LoopDetected',
    NotExtended = 'NotExtended',
    NetworkAuthRequired = 'NetworkAuthRequired',

}

const errorFromHttpStatusCode = (code: number | undefined) : ApiResultCode => {
    let status = ApiResultCode.Unknown
    switch (code) {
        case 400: status = ApiResultCode.BadRequest; break;
        case 401: status = ApiResultCode.NotAuthenticated; break;
        case 403: status = ApiResultCode.Forbidden; break;
        case 404: status = ApiResultCode.NotFound; break;
        case 405: status = ApiResultCode.MethodNotAllowed; break;
        case 407: status = ApiResultCode.ProxyAuthRequired; break;
        case 408: status = ApiResultCode.Timeout; break;
        case 409: status = ApiResultCode.Conflict; break;
        case 410: status = ApiResultCode.Gone; break;
        case 411: status = ApiResultCode.LengthRequired; break;
        case 413: status = ApiResultCode.PayloadTooLarge; break;
        case 414: status = ApiResultCode.URITooLong; break;
        case 415: status = ApiResultCode.UnsupportedMediaType; break;
        case 422: status = ApiResultCode.ValidationError; break;
        case 429: status = ApiResultCode.TooManyRequests; break;
        case 500: status = ApiResultCode.InternalServerError; break;
        case 501: status = ApiResultCode.NotImplemented; break;
        case 502: status = ApiResultCode.BadGateway; break;
        case 503: status = ApiResultCode.ServiceUnavailable; break;
        case 504: status = ApiResultCode.GatewayTimeOut; break;
        case 505: status = ApiResultCode.HTTPVersionNotSupported; break;
        case 506: status = ApiResultCode.VariantAlsoNegotiates; break;
        case 507: status = ApiResultCode.InsufficientStorage; break;
        case 508: status = ApiResultCode.LoopDetected; break;
        case 510: status = ApiResultCode.NotExtended; break;
        case 511: status = ApiResultCode.NetworkAuthRequired; break;
    }
    return status
}

const errorFromAxiosErrorCode = (code: string) : ApiResultCode => {
    let status = ApiResultCode.Unknown
    switch (code) {
        case AxiosError.ECONNABORTED: status = ApiResultCode.Timeout; break;
    }
    return status
}

export { ApiResultCode, errorFromHttpStatusCode, errorFromAxiosErrorCode }
