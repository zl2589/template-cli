
export type Resp<T = any> = Promise<ResponseData<T> | null | undefined>;
export type PageResp<T = any> = Promise<PageResult<T>>;

export interface ResponseData<T = any> {
    code?: number;
    success?: boolean;
    message?: string;
    data?: T;
}

export interface PageResult<T = any> {
    list: T[];
    total: number;
    current: number;
    pageSize: number;
}