import React from 'react';
import { useRoutes, useNavigate, Navigate } from 'react-router-dom';
import routes, { routeType } from './routes';
import { Spin } from 'antd';
import _ from 'lodash';

export default function Routes() {
    const element = useRoutes(renderRoutes(routes));
    return element;
}

function renderRoutes(routes: Array<routeType>) {
    return _.map(routes, (item: routeType) => {

        interface resType extends routeType{
            element?: any
        }

        let res: resType = { ...item };
        if (!item?.path) return;

        // component
        if (item?.component) {
            const Component = React.lazy(item.component);
            res.element = (<React.Suspense fallback={<Spin size="large" />}>
                <BeforeEach route={item}>
                    <Component />
                </BeforeEach>
            </React.Suspense>);
        }

        // children
        if (item?.children) {
            res.children = renderRoutes(item.children);
        }

        // 重定向
        if (item?.redirect) {
            res.element = (
                <Navigate to={item.redirect} replace />
            )
        }

        return res;
    })
}

function BeforeEach(props: { route: routeType, children: any }) {
    if (props?.route?.meta?.title) {
        document.title = props.route.meta.title;
    }

    if(props?.route?.meta?.needLogin){
        // 看是否登录
        // const navigate = useNavigate();
        // navigate('/login');
    }

    return <div>
        {props.children}
    </div>
}