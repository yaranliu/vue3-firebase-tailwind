export interface IRequestPagination {
    PerPage: number
    Page: number | undefined,
    LastId: string | undefined,
    After: string | undefined
}
