import {ApiSuccessResult} from "@/lib/api/ApiSuccessResult";
import {ApiMethod} from "@/lib/api/ApiMethod";
import {Paged} from "@/lib/api/Paged";
import {Api} from "@/lib/api/Api";

import {useAuthStore} from "@/stores/auth";
import {ApiAuth} from "@/lib/api/ApiAuth";
import {PaginationType} from "@/lib/api/PaginationType";
import {Scrolling} from "@/lib/api/Scrolling";
import {AbstractRegularRequestPagination, AbstractScrollingRequestPagination} from "@/lib/api/Pagination";

const auth = useAuthStore()

const baseUrl = 'https://localhost:7137'

class SampleApiClass extends Api {

    Jwt(): string { return auth.header; }

    TransformResponse(payload: any, paginationType: PaginationType): ApiSuccessResult {
        let p = payload.pagination
        if (paginationType === PaginationType.Regular) {
            let pagination = new Paged(p.currentPage, p.recordsPerPage, p.pagesCount, p.totalRecords)
            return new ApiSuccessResult(payload.payload, pagination)
        }
        else if (paginationType === PaginationType.Scrolling) {
            let pagination = new Scrolling(p.lastItemId, p.after, p.more)
            return new ApiSuccessResult(payload.payload, pagination)
        }
        return new ApiSuccessResult(payload.payload)
    }
}

const SampleApi = new SampleApiClass(baseUrl, ApiAuth.None)

SampleApi.BasicAuth = { username: 'username', password: 'password' }

SampleApi
    .AddResource('paged', ApiMethod.GET, '/paged', PaginationType.Regular)
    .AddResource('infinite', ApiMethod.GET, '/infinite', PaginationType.Scrolling)
    .AddResource('test', ApiMethod.GET, '/test/{id}/{item}', PaginationType.Scrolling)

class RegularRequestPagination extends AbstractRegularRequestPagination {
    constructor(Page: number, PerPage: number) {
        super()
        this.Page = Page
        this.PerPage = PerPage
    }
    SetPage(page: number) {
        this.Page = page
    }
    ToServerDefinition(): object {
        return {
            page: this.Page,
            perPage: this.PerPage
        }
    }

}
class ScrollingRequestPagination extends AbstractScrollingRequestPagination {
    constructor(PerPage: number, LastId: string, After: boolean) {
        super();
        this.PerPage = PerPage
        this.LastId = LastId
        this.After = After
    }

    ToServerDefinition(): object {
        return {
            perPage: this.PerPage,
            lastId: this.LastId,
            after: this.After
        }
    }
}

export { SampleApi, RegularRequestPagination, ScrollingRequestPagination }
