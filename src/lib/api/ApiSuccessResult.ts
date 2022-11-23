import type { Paged } from "@/lib/api/Paged";
import type {Scrolling} from "@/lib/api/Scrolling";

export class ApiSuccessResult {
    Data: any
    Pagination: null | Paged | Scrolling
    constructor(Data: any, Pagination: null | Paged | Scrolling = null) {
        this.Data = Data
        this.Pagination = Pagination
    }
}
