import { Outlet, useNavigate } from "react-router-dom";
import { Layout, Menu } from 'antd';
import styles from './index.module.less';

function GlobalHeader() {
    const navigate = useNavigate();

    return <Layout.Header className={styles.header}>
        <div className={styles.logo} />
        <Menu
            mode="horizontal"
            theme="dark"
            items={
                [
                    {
                        key: "home",
                        label: "首页",
                        onClick: () => navigate('/home')
                    },
                    {
                        key: "about",
                        label: "关于",
                        onClick: () => navigate('/about')
                    },
                ]
            } />
    </Layout.Header>
}

function GlobalContent() {
    return <Layout.Content className={styles.main}>
        <div className={styles.mainContainer} >
            {/* outlet */}
            <Outlet />
        </div>
    </Layout.Content>;
}

function GlobalFooter() {
    return <Layout.Footer className={styles.footer}>vite 创建 react18</Layout.Footer>

}

export default function Index() {

    return <Layout className={styles.baseLayout}>
        <GlobalHeader />
        <GlobalContent />
        <GlobalFooter />
    </Layout>
}