import { useSearchParams, useParams, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { getList } from "@/store/modules/article";
import _ from 'lodash';
import { useEffect } from "react";
import type { AnyAction } from "@reduxjs/toolkit";

export default function Index() {
    // params
    const pId = useParams()?.id;

    // search
    const [search] = useSearchParams();
    const sId = search?.get('id');

    // state
    const location = useLocation();
    const state = location?.state;

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getList({ currentPage: 2, pageSize: 10}) as unknown as AnyAction);
    }, [])

    const { list, total } = useSelector((store: any) => store.article);

    return <>
        <section>
            <h3>测试路由传参</h3>
            <div>params: {pId}</div>
            <div>search: {sId}</div>
            <div>locationState: {_.get(state, 'id')}</div>
        </section>
        <section>
            <h3>测试异步 actions</h3>
            <div>total: {total}</div>
            <ul style={{ padding: 0 }}>list:
                {_.map(list, (item: number, key: number) => <li key={key}>{item}</li>)}
            </ul>
        </section>
    </>
}