enum HttpStatus {
    Unknown,
    Success,
    BadRequest,
    NotAuthenticated,
    NotAuthorized,
    NotFound,
    ValidationError,
    ServerError
}

const getStatusCode = (code: number | undefined) : HttpStatus => {
    let status = HttpStatus.Unknown
    switch (code) {
        case 400: status = HttpStatus.BadRequest; break;
        case 401: status = HttpStatus.NotAuthenticated; break;
        case 403: status = HttpStatus.NotAuthorized; break;
        case 404: status = HttpStatus.NotFound; break;
        case 422: status = HttpStatus.ValidationError; break;
        case 500: status = HttpStatus.ServerError; break;
    }
    return status
}

export { HttpStatus, getStatusCode }
