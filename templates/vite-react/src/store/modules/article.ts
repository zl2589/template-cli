import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import _ from 'lodash';

// 异步 actions
export const getList = createAsyncThunk('article/getList',
    async ({ currentPage = 1, pageSize = 5 }: { currentPage?: number, pageSize?: number, type?: string }) => {
        // 模拟异步请求
        const promise = new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve({ data: { list: [1, 2, 3, 4, 5], total: 5 } });
            }, 500);
        });

        try {
            var [res] = await Promise.all([promise]);
        } catch (error) {
            console.error(error);
        }

        const payload = _.get(res, 'data', { list: [], total: 0 });
        console.log(payload);
        return payload;
    },
);

export const article = createSlice({
    // 命名空间
    name: "article",
    // state
    initialState: {
        list: [],
        total: 0,
    },
    // 同步 actions
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getList.fulfilled, (state, { payload }) => {
            state.list = payload.list;
            state.total = payload.total;
        })
    }
});

// 导出 reducers 方法
export const { } = article.actions;

// 默认导出
export default article.reducer;