import { Col, Image, Row } from "antd"
import img from '../assets/images/logo/LogoElevate.png';

export const AdminView = () => {
    
    const style = {
        width: '100%',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    }

    return (<div style={style}>
        <Row gutter={[0, 20]}>
            <Col span={24} style={{ textAlign: 'center'}}>
                <Image preview={false} src={img} width={300} />
            </Col>
            <Col span={24} style={{ textAlign: 'center'}}>
                <h2>Bienvenido al sistema de gestión de certificados</h2>
            </Col>
        </Row>
    </div>)
}