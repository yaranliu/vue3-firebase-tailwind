import type {ApiSuccessResult} from "@/lib/api/ApiSuccessResult";

type ResponseHandler = (data: any) => ApiSuccessResult;

export type { ResponseHandler }
