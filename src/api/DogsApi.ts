import {ApiSuccessResult} from "@/lib/api/ApiSuccessResult";
import {Flowing} from "@/lib/api/Flowing";
import {ApiMethod} from "@/lib/api/ApiMethod";
import {Paged} from "@/lib/api/Paged";
import type {IRequestPagination} from "@/lib/api/IRequestPagination";
import {Api} from "@/lib/api/Api";

const responseHandler = (payload: any)  => {
    return new ApiSuccessResult(payload.message)
}

const paginatedResponseHandler = (payload: any)  => {
    return new ApiSuccessResult(payload.message,
        new Paged(
            payload.pagination.page,
            payload.pagination.perPage,
            payload.pagination.totalPages,
            payload.pagination.totalRecords)
    )
}

const flowingResponseHandler = (payload: any)  => {
    return new ApiSuccessResult(payload.message,
        new Flowing(
            payload.pagination.lastId,
            payload.pagination.more)
    )
}

const requestPaginationHandler = (pagination: IRequestPagination) => {
    return { page: pagination.Page, perPage: pagination.PerPage}
}

const baseUrl = 'https://dog.ceo/api'

const DogsApi = new Api(baseUrl, true, responseHandler, requestPaginationHandler)

DogsApi
    .AddResource('getAllBreeds', ApiMethod.GET, '/breeds/list/all')
    .AddResource('getAllBreeds2', ApiMethod.GET, '/breeds/list/all')
    .AddResource('getAllBreeds3', ApiMethod.GET, '/breeds/list/all')
    .AddResource('getAllBreeds4', ApiMethod.GET, '/breeds/list/all')

export { DogsApi }
