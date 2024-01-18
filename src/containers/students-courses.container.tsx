import { Button, Col, Form, Input, Row, Select, Table } from "antd"
import { useStudentsCourses } from "../hooks"
import { ModalRegister } from "../components"
import { requireRule } from "../utils/rules.utils"
import { BsArrowLeft } from "react-icons/bs"

export const StudentsCoursesContainer = () => {
    
    const { 
        list, 
        columns, 
        setPage, 
        onCreate,
        onUpdate,
        modalCreate,
        setModalCreate,
        form,
        edit,
        courses,
        templates,
        navigate
    } = useStudentsCourses()

    return (
        <Row gutter={[0,20]}>
            <Col span={24}>
                <Row align={'middle'}>
                    <Col span={18}>
                        <Row align={'middle'} style={{ gap: 20 }}>
                            <Button 
                                shape="circle" 
                                icon={<BsArrowLeft />} 
                                onClick={()=> navigate('../users/')}
                            />
                            <h1>Cursos de { list.data?.user.name}</h1>
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
                    dataSource={ list.data?.courses }
                    rowKey={(row)=> row.id }
                    pagination={{ 
                        total: list.data?.total,
                        onChange: (page) => setPage(page)
                    }}
                />
            </Col>

            <ModalRegister open={modalCreate} onCancel={()=>setModalCreate(false)} width={450} title="Formulario">
                <Row justify={'center'}>
                    <Col span={22} style={{ marginTop: 14 }}>
                        <Form layout="vertical" form={form} encType="multipart/form-data" onFinish={ !edit ? onCreate.mutate : onUpdate.mutate }>
                            <Form.Item name="id" hidden>
                                <Input />
                            </Form.Item>
                            <Form.Item name="userId" hidden>
                                <Input readOnly />
                            </Form.Item>
                            <Form.Item name="courseId" label="Curso" rules={[requireRule]}>
                                <Select>
                                    {courses.data?.courses.map(item => 
                                        <Select.Option value={ item.id }>{ item.name }</Select.Option>
                                    )}
                                </Select>
                            </Form.Item>
                            <Form.Item name="templateId" label="Plantilla" rules={[requireRule]}>
                                <Select>
                                    {templates.data?.templates.map(item => 
                                        <Select.Option value={ item.id }>{ item.name }</Select.Option>
                                    )}
                                </Select>
                            </Form.Item>
                            <Form.Item name="hours" label="Horas cursadas" rules={[requireRule]}>
                                <Input type="number" size="large" placeholder="30" />
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