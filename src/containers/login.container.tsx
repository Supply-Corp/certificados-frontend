import { Button, Col, Form, Input, Row } from "antd";
import { BsEnvelope, BsLock } from "react-icons/bs";
import "../assets/styles/login.scss";
import icon from "../assets/images/login.png";
import { useLogin } from "../hooks";

export const LoginContainer = () => {

    const {
        form,
        submit,

        rulesEmail,
        rulesPassword
    } = useLogin();

    return (
        <div className="login-body">
        <div className="login-box">
            <div className="left-information">
                <img src={icon} width={130} height={130} alt="icon-login" />
            </div>
            <div className="right-information">
                <Col span={24}>
                    <Row gutter={[0, 40]}>
                    <Col span={24}>
                        <Row justify={"center"}>
                            <h2>Inicia sesión</h2>
                        </Row>
                    </Col>

                    <Col span={24}>
                        <Form form={form} onFinish={ submit.mutate }>
                            <Form.Item name="email" rules={rulesEmail}>
                                <Input
                                    prefix={<BsEnvelope />}
                                    placeholder="Correo electrónico"
                                    size="large"
                                />
                            </Form.Item>
                            <Form.Item name="password" rules={rulesPassword}>
                                <Input
                                    prefix={<BsLock />}
                                    placeholder="Contraseña"
                                    size="large"
                                    type="password"
                                />
                            </Form.Item>
                            <Form.Item>
                                <Button 
                                    type="primary" 
                                    shape="round" 
                                    size="large" 
                                    htmlType="submit"
                                    loading={submit.isPending}
                                    block
                                >
                                    Entrar
                                </Button>
                            </Form.Item>
                        </Form>
                    </Col>
                    </Row>
                </Col>
            </div>
        </div>
        </div>
    );
};
