import { Col, Row, Spin } from "antd"

export const LoadingContainer = () => {

    const Style = {
        width: '100%',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    }

    return (
        <div style={Style}>
            <Row gutter={[0,20]} style={{ textAlign: 'center' }}>
                <Col span={24}>
                    <Spin />
                </Col>
                <Col span={24}>
                    <h4>Cargando información...</h4>
                </Col>
            </Row>
        </div>
    )
}