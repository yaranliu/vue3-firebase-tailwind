import {PaginationType} from "@/lib/api/PaginationType";

export class Paged {
    PaginationType: PaginationType = PaginationType.Paged
    Page: number
    PerPage: number
    TotalPages: number
    TotalRecords: number
    constructor(Page: number, PerPage: number, TotalPages: number, TotalRecords: number) {
        this.Page = Page
        this.PerPage = PerPage
        this.TotalPages = TotalPages
        this.TotalRecords = TotalRecords
    }
}
