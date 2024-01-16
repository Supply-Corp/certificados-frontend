import { Col, Row, Table } from "antd"

export const StudentsContainer = () => {
    
    return (
        <Row gutter={[0,20]}>
            <Col span={24}>
                <h1>Alumnos</h1>
            </Col>
            <Col span={24}>
                <Table />
            </Col>
        </Row>
    )
}