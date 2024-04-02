import { PageResp, Pagination } from "@/interfaces/page";
import { TablePaginationConfig, message } from "antd";
import { useEffect, useState } from "react";

type APIFunc<T, P> = (params: { query?: P; pageNum: number; pageSize: number }) => Promise<PageResp<T>>;

type RequestVO<T, P> = {
    setParams: (params: P & Pagination, refreshing?: boolean) => void;
    paginationConfig: TablePaginationConfig | false,
    resetParams: (params?: P) => void;
} & InitialState<T, P>;


interface InitialState<T, P> {
    params?: P;
    refreshing: boolean;
    errMsg: string;
    loading: boolean;
    list: T[];
    pagination: Pagination;
}

/**
 *
 * @param api 请求的接口promise
 * @param _params 参数
 * @param options {manual: 是否手动触发}
 * @returns
 */

function usePagination<T, P>(
    api: APIFunc<T, P>,
    _params?: P,
    options: { manual: boolean, defaultPageSize: number } = { manual: false, defaultPageSize: 10 }
): RequestVO<T, P> {
    const [state, setState] = useState<InitialState<T, P>>({
        params: _params,
        refreshing: true,
        errMsg: "",
        loading: true,
        list: [],
        pagination: {
            pageNum: 1,
            pageSize: options?.defaultPageSize ?? 10,
        },
    });

    useEffect(() => {
        if (options.manual) return;
        if (!state.loading || !state.refreshing) return;
        request();
    }, [options.manual, state.loading, state.refreshing]);

    function request() {
        const { pageNum, pageSize } = state.pagination;
        const _params_ = {
            pageNum,
            pageSize,
            query: state.params,
        };
        api(_params_)
            .then((res: PageResp<T>) => {
                let list: T[] = res.list;

                setState({
                    ...state,
                    list,
                    errMsg: "",
                    refreshing: false,
                    loading: false,
                    pagination: {
                        pageNum: res.pageNum,
                        pageSize: res.pageSize,
                        total: res.total,
                        totalPage: res.totalPage,
                    },
                });
            })
            .catch((err) => {
                message.error(`查询失败:${err.message}`);
                setState({
                    ...state,
                    list: [],
                    errMsg: err.message || "请求失败",
                    refreshing: false,
                    loading: false,
                    pagination: {
                        pageNum: 1,
                        pageSize: 10,
                    },
                });
            });
    }

    function setParams(params: P, refreshing: boolean = false) {
        setState({
            ...state,
            params:
                params instanceof Object ? { ...state.params, ...params } : params,
            refreshing,
            loading: refreshing,
        });
    }

    const paginationConfig: TablePaginationConfig | false = {
        ...state.pagination,
        showSizeChanger: true,
        showQuickJumper: true,
        onChange: (pageNum: number, pageSize: number) => {
            setState({
                ...state,
                pagination: {
                    pageNum,
                    pageSize,
                },
                refreshing: true,
                loading: true,
            });
        },
        onShowSizeChange: (pageNum: number, size: number) => {
            setState({
                ...state,
                pagination: {
                    pageNum,
                    pageSize: size,
                },
                refreshing: true,
                loading: true,
            });
        }
    };

    function resetParams(params?: P) {
        setState({
            params: params ?? _params,
            loading: true,
            refreshing: true,
            errMsg: "",
            list: [],
            pagination: {
                pageNum: 1,
                pageSize: 10,
            },
        });
    }

    return {
        ...state,
        setParams,
        paginationConfig,
        resetParams,
    };
}

export default usePagination;