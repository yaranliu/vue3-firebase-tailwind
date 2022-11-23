import type { IRequestPagination } from "@/lib/api/IRequestPagination";

class RequestPagination implements IRequestPagination {
    Page: number |undefined = 1
    PerPage: number = 10
    After: string | undefined;
    LastId: string | undefined;
}

export {RequestPagination};
