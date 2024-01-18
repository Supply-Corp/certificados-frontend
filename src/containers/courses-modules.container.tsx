import { Button, Col, Form, Input, Row, Table } from "antd"
import { useCoursesModules } from "../hooks"
import { ModalRegister } from "../components"
import { requireRule } from "../utils/rules.utils"
import { BsArrowLeft } from "react-icons/bs"

export const CoursesModulesContainer = () => {
    
    const { 
        list, 
        columns, 
        onCreate,
        onUpdate,
        modalCreate,
        setModalCreate,
        form,
        edit,
        navigate
    } = useCoursesModules()

    return (
        <Row gutter={[0,20]}>
            <Col span={24}>
                <Row align={'middle'}>
                    <Col span={18}>
                        <Row align={'middle'} style={{ gap: 20 }}>
                            <Button 
                                shape="circle" 
                                icon={<BsArrowLeft />} 
                                onClick={()=> navigate('../courses/')}
                            />
                            <h1>Módulos de { list.data?.course.name }</h1>
                        </Row>
                    </Col>
                    <Col span={6}>
                        <Row justify={'end'} gutter={[0, 10]}>
                            <Col>
                                <Button type="primary" onClick={()=>setModalCreate(true)}>Agregar nuevo</Button>
                            </Col>
                            {/* <Col span={24}>
                                <Input.Search 
                                    placeholder="Buscar por nombre"
                                    onChange={(e) => setValue(e.target.value)}
                                />
                            </Col> */}
                        </Row>
                    </Col>
                </Row>
            </Col>
            <Col span={24}>
                <Table 
                    columns={ columns }
                    dataSource={ list.data?.modules }
                    rowKey={(row)=> row.id }
                />
            </Col>

            <ModalRegister open={modalCreate} onCancel={()=>setModalCreate(false)} width={450} title="Formulario">
                <Row justify={'center'}>
                    <Col span={22} style={{ marginTop: 14 }}>
                        <Form layout="vertical" form={form} encType="multipart/form-data" onFinish={ !edit ? onCreate.mutate : onUpdate.mutate }>
                            <Form.Item name="id" hidden>
                                <Input />
                            </Form.Item>
                            <Form.Item name="courseId" hidden>
                                <Input readOnly />
                            </Form.Item>
                            <Form.Item name="name" label="Nombre del módulo" rules={[requireRule]}>
                                <Input size="large" placeholder="Módulo " />
                            </Form.Item>
                            <Form.Item>
                                <Button 
                                    type="primary" 
                                    size="large"
                                    htmlType="submit"
                                    loading={onCreate.isPending} 
                                    block
                                >
                                    Registrar
                                </Button>
                            </Form.Item>
                        </Form>
                    </Col>
                </Row>
            </ModalRegister>
        </Row>
    )
}