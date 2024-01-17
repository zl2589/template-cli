export interface routeType {
    path: string
    component?: any
    children?: Array<routeType>
    meta?: {
        title?: string
        needLogin?: boolean
    }
    redirect?: string
}

const routes: Array<routeType> = [
    {
        path: '/',
        component: () => import('@/layouts/Base'),
        children: [
    {
        path: '/',
        redirect: '/home',
    },
    {
        path: '/home',
        component: () => import('@/pages/Home'),
        meta: {
            title: "首页",
        }
    },
    {
        path: '/about',
        component: () => import('@/pages/About'),
        meta: {
            title: "关于",
        }
    },
    {
        path: '/article',
        component: () => import('@/pages/Article'),
        meta: {
            title: "文章1",
        }
    },
    {
        path: '/article/:id',
        component: () => import('@/pages/Article'),
        meta: {
            title: "文章2",
        }
    },
        ]
    },
    {
        path: '*',
        component: () => import('@/pages/Error/404'),
        meta: {
            title: '404'
        }
    }
]

export default routes;