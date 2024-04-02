import { useEffect, useState } from 'react';

type APIFunc<T, P> = (params?: P) => Promise<T>;

type RequestVO<T, P> = {
    setParams: (params: P, refreshing?: boolean) => void;
} & InitialState<T, P>;

interface InitialState<T, P> {
    params?: P;
    refreshing: boolean;
    errMsg: string;
    loading: boolean;
    data?: T;
}

/**
 *
 * @param api 请求的接口promise
 * @param defaultData 默认返回的数据
 * @param _params 参数
 * @param options {manual: 是否手动触发}
 * @returns
 */

function useInitial<T, P>(
    api: APIFunc<T, P>,
    defaultData?: T,
    _params?: P,
    options: { manual: boolean } = { manual: false },
): RequestVO<T, P> {
    const [state, setState] = useState<InitialState<T, P>>({
        params: _params,
        refreshing: true,
        errMsg: '',
        loading: true,
        data: defaultData,
    });

    useEffect(() => {
        if (options.manual) return;
        if (!state.loading || !state.refreshing) return;
        request();
    }, [options.manual, state.loading, state.refreshing]);

    function request() {
        api(state.params)
            .then((res: T) => {
                let data = res;
                // @ts-ignore
                if (Object.prototype.toString.call(data) === '[object Array]' && data.length === 0) {
                    // @ts-ignore
                    data = defaultData || [];
                }
                setState({
                    ...state,
                    data,
                    refreshing: false,
                    loading: false,
                });
            })
            .catch((err) => {
                setState({
                    ...state,
                    data: defaultData,
                    errMsg: err.message || '请求失败',
                    refreshing: false,
                    loading: false,
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

    return {
        ...state,
        setParams,
    };
}

export default useInitial;
