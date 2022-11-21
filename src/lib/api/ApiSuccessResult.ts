import type { Paged } from "@/lib/api/Paged";
import type {Flowing} from "@/lib/api/Flowing";

export class ApiSuccessResult {
    Data: any
    Pagination: null | Paged | Flowing
    constructor(Data: any, Pagination: null | Paged | Flowing = null) {
        this.Data = Data
        this.Pagination = Pagination
    }
}
