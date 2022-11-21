import type {FlowingDataDirection} from "@/lib/api/FlowingDataDirection";
import {PaginationType} from "@/lib/api/PaginationType";

export class Flowing {
    PaginationType: PaginationType = PaginationType.Flowing
    Last: string
    More: boolean
    constructor(Last: string, More: boolean ) {
        this.Last = Last
        this.More = More
    }
}
