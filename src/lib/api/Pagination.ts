import { PaginationType } from "@/lib/api/PaginationType";

export interface IRegularRequestPagination {
    PerPage: number
    Page: number
    ToServerDefinition() : object
}
export interface IScrollingRequestPagination {
    PerPage: number;
    LastId: string
    After: boolean
    ToServerDefinition() : object
}

export abstract class AbstractRegularRequestPagination implements IRegularRequestPagination{
    Page: number;
    PerPage: number;
    abstract ToServerDefinition() : object
    protected constructor() {
        this.Page = 1
        this.PerPage = 25
    }
}

export abstract class AbstractScrollingRequestPagination implements IScrollingRequestPagination {
    PerPage: number;
    After: boolean;
    LastId: string;
    abstract ToServerDefinition(): object
    protected constructor() {
        this.PerPage = 10
        this.After = true
        this.LastId = ''
    }


}


