import { Col, Row, Table } from "antd"
import { useUser } from "../hooks/useUser.hook"


export const UserContainer = () => {

    const { columns } = useUser();

    return (
        <Row gutter={[0, 20]}>
            <Col span={24}>
                <h1>Cursos</h1>
            </Col>
            <Col span={24}>
                <Table 
                    columns={columns}
                />
            </Col>
        </Row>
    )

}