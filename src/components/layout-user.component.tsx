import { FC, ReactNode } from "react";
import { Col, Image, Layout, Row } from "antd";
import { MenuUser } from ".";
const { Header, Content } = Layout;
import logo from "../assets/images/logo/white.png";

export const LayoutUser: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <Layout style={{ minHeight: "100vh" }}>
        <Layout>
            <Header>
                <Row>
                    <Col span={8}>
                        <Image src={logo} preview={false} height={45} />
                    </Col>
                    <Col span={16}>
                        <Row justify={"end"}>
                            <Col style={{ width: 120 }}>
                                <MenuUser />
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Header>

            <Content style={{ padding: 20 }}>{children}</Content>
        </Layout>
    </Layout>
  );
};
