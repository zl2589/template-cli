/*
使用mockjs提供mock数据接口
 */
import Mock from "mockjs";
import data from "./data.json";

// 返回info的接口
Mock.mock("/info", { code: 0, data: data.info });
