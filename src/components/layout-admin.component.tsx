import { FC, ReactNode } from "react";
import { Image, Layout } from "antd";
import { MenuAdmin } from ".";
const { Sider, Content } = Layout;
import logo from '../assets/images/logo/white.png'

export const LayoutAdmin: FC<{ children: ReactNode }> = ({ children }) => {

    return (
        <Layout style={{ minHeight: '100vh' }}>

            <Sider style={{ position: 'fixed',  height: '100vh',}}>
                <Image src={logo} preview={false} style={{ margin: '30px 0'}} />
                <MenuAdmin />
            </Sider>

            <Layout style={{ marginLeft: 200 }}>
                <Content style={{ padding: 20 }}>
                    { children }
                </Content>
            </Layout>
        </Layout>
    )
}