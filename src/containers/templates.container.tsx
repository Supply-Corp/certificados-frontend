import { Button, Col, Form, Input, Row, Table, Upload } from "antd"
import { useTemplate } from "../hooks"
import { ModalRegister } from "../components"
import { requireRule } from "../utils/rules.utils"

export const TemplatesContainer = () => {
    
    const { 
        list, 
        columns, 
        setPage, 
        setValue, 
        onCreate,
        onUpdate,
        modalCreate,
        setModalCreate,
        form,
        edit,
        propsFile,
        fileList
    } = useTemplate()

    return (
        <Row gutter={[0,20]}>
            <Col span={24}>
                <Row align={'middle'}>
                    <Col span={18}>
                        <h1>Plantillas</h1>
                    </Col>
                    <Col span={6}>
                        <Row justify={'end'} gutter={[0, 10]}>
                            <Col>
                                <Button type="primary" onClick={()=>setModalCreate(true)}>Agregar nuevo</Button>
                            </Col>
                            <Col span={24}>
                                <Input.Search 
                                    placeholder="Buscar por nombre"
                                    onChange={(e) => setValue(e.target.value)}
                                />
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Col>
            <Col span={24}>
                <Table 
                    columns={ columns }
                    dataSource={ list.data?.templates }
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
                        <Form layout="vertical" form={form} encType="multipart/form-data" onFinish={ !edit ? onCreate.mutate : onUpdate.mutate}>
                            <Form.Item name="id" hidden>
                                <Input />
                            </Form.Item>
                            <Form.Item name="name" label="Nombre" rules={[requireRule]}>
                                <Input size="large" placeholder="Nombre del curso" />
                            </Form.Item>
                            <Form.Item name="file" label="Plantilla" rules={!edit ? [requireRule] : []}>

                                <Upload 
                                    multiple={false} 
                                    maxCount={1} 
                                    {...propsFile}
                                    fileList={fileList}
                                    style={{ width: '100%'}}
                                >
                                    <Button style={{ width: '100%'}} > 
                                        Seleccionar plantilla
                                    </Button>
                                </Upload>
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