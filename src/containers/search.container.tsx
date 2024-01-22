import { Col, Row, Form, Input, Button } from 'antd';
import image from '../assets/images/logo/LogoElevate.png';
import '../assets/styles/search.scss';
import { useSearch } from '../hooks';
import dayjs from 'dayjs';


export const SearchContainer = () => {

    const { searchMutation, info, form } = useSearch();

    return (
        <Row className="body-search">
            <Col span={24}>
                <Row justify={'center'}>
                    <img src={image} alt="logo" width={350} />
                </Row>
                <Row justify={'center'} style={{ marginTop: 40 }}>
                    <Col span={8}>
                        <Form onFinish={searchMutation.mutate} form={form}>
                            <Form.Item name="search">
                                <Input.Search 
                                    size='large' 
                                    placeholder='Número de certificado' 
                                    loading={searchMutation.isPending}
                                />
                            </Form.Item>
                        </Form>
                    </Col>
                </Row>
                <Row justify={'center'}>
                    <Col span={8}>
                        { info && <>
                            <ul>
                                <li>Alumno: <span className='cap'>{ info.user?.name } { info.user?.lastName }</span> </li>
                                <li>Curso: { info.course?.name }</li>
                                <li>Fecha de inicio: { dayjs(info.course?.initialDate).format('DD/MM/YYYY') }</li>
                                <li>Fecha de finalización: { dayjs(info.course?.endDate).format('DD/MM/YYYY') }</li>
                                <li>Nota: { info.points }</li>
                            </ul>

                            <Button 
                                type='primary' 
                                href={`${ import.meta.env.VITE_URL_DOWNLOAD }certified/${ info.identifier}.pdf`}
                                target='_blank'
                                style={{ marginTop: 20 }}
                            >
                                Descargar certificado
                            </Button>
                        </>}
                    </Col>
                </Row>
            </Col>
        </Row>
    );
}