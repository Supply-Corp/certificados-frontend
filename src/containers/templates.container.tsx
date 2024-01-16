import { Col, Row, Table } from "antd"

export const TemplatesContainer = () => {
    
    return (
        <Row gutter={[0,20]}>
            <Col span={24}>
                <h1>Plantillas</h1>
            </Col>
            <Col span={24}>
                <Table />
            </Col>
        </Row>
    )
}