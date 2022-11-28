import { PaginationType } from "@/lib/api/PaginationType";

export interface IRequestPagination {
    ToServerDefinition() : object
}

export abstract class AbstractRegularRequestPagination implements IRequestPagination{
    Page: number;
    PerPage: number;
    abstract ToServerDefinition() : object
    protected constructor() {
        this.Page = 1
        this.PerPage = 25
    }
}

export abstract class AbstractScrollingRequestPagination implements IRequestPagination {
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


