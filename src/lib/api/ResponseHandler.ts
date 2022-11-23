import type {ApiSuccessResult} from "@/lib/api/ApiSuccessResult";
import type {PaginationType} from "@/lib/api/PaginationType";

type ResponseHandler = (data: any, paginationType: PaginationType) => ApiSuccessResult;

export type { ResponseHandler }
