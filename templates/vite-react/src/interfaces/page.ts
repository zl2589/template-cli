export interface Pagination {
    pageNum: number;
    pageSize: number;
    [key: string]: any;
}

export interface PageRFilter<P> {
    pageNum: number;
    pageSize: number;
    query?: P;
}

export interface PageResp<T> {
    list: T[];
    pageNum: number;
    pageSize: number;
    total: number;
    totalPage: number;
}