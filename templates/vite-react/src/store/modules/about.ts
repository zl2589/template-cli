import { createSlice } from '@reduxjs/toolkit';

export interface AboutState {
  counter: number;
  title: string
}
const initialState: AboutState = {
  counter: 0,
  title: "redux toolkit pre"
};

// 创建一个 Slice
export const about = createSlice({
  name: 'about',

  initialState,

  // 定义 reducers 并生成关联的操作
  reducers: {
    setCounter(state, { payload }){
      console.log(payload);
      state.counter = payload.counter;
    }
  },
});

// 导出 reducers 方法
export const { setCounter } = about.actions;

// 默认导出
export default about.reducer;