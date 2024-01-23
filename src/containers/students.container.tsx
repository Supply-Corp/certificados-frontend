import { Button, Col, Form, Input, Row, Table, Upload } from "antd"
import { useStudent } from "../hooks"
import { ModalRegister } from "../components"
import { requireRule } from "../utils/rules.utils"

export const StudentsContainer = () => {
    
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

        setFileList,
        mutationImport,

        modalImportation,
        setModalImportation,
        formImportation
    } = useStudent()

    return (
        <Row gutter={[0,20]}>
            <Col span={24}>
                <Row align={'middle'} justify={'space-between'}>
                    <Col span={16}>
                        <h1>Alumnos</h1>
                    </Col>
                    <Col span={8}>
                        <Row justify={'end'} gutter={[0, 10]}>
                            <Col span={24}>
                                <Row justify={'end'} style={{ gap: 10 }}>
                                    <Button onClick={()=>setModalImportation(true)}>Importar registros</Button>
                                    <Button type="primary" onClick={()=>setModalCreate(true)}>Agregar nuevo</Button>
                                </Row>
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
                    dataSource={ list.data?.users }
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
                            <Form.Item name="name" label="Nombre" rules={[requireRule]}>
                                <Input size="large" placeholder="Pedro" />
                            </Form.Item>
                            <Form.Item name="lastName" label="Apellido" rules={[requireRule]}>
                                <Input size="large" placeholder="Perez" />
                            </Form.Item>
                            <Form.Item name="documentNumber" label="Número de documento" rules={[requireRule]}>
                                <Input size="large" placeholder="0000000" />
                            </Form.Item>
                            <Form.Item name="email" label="Correo electrónico" rules={[requireRule]}>
                                <Input size="large" placeholder="ejemplo@ejemplo.com" />
                            </Form.Item>
                            <Form.Item name="password" label="Contraseña" rules={!edit ? [requireRule]: []}>
                                <Input.Password size="large" />
                            </Form.Item>
                            <Form.Item name="passwordConfirmation" label="Repetir Contraseña" rules={!edit ? [requireRule]: []}>
                                <Input.Password size="large" />
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

            <ModalRegister 
                open={modalImportation} 
                onCancel={()=> setModalImportation(false)} 
                width={400} 
                title="Importar alumnos"
            >
                <Row justify={'center'}>
                    <Col span={22} style={{ marginTop: 14 }}>
                        <Form onFinish={mutationImport.mutate} form={formImportation}>
                            <Form.Item name="file" rules={[{ required: true, message: 'El archivo de importación es requerido'}]}>
                                <Upload
                                    multiple={false}
                                    beforeUpload={(file: File) => {
                                        setFileList(file);
                                        return false;
                                    }}
                                    maxCount={1}
                                    accept="file/*,.xlsx"
                                >
                                    <Button style={{ width: '100%' }}>Seleccionar archivo</Button>
                                </Upload>
                            </Form.Item>

                            <Row justify={'center'} style={{ marginTop: 40 }}>
                                <Col span={18}>
                                    <Form.Item>
                                        <Button type="primary" htmlType="submit" loading={mutationImport.isPending} block>Guardar</Button>
                                    </Form.Item>
                                </Col>
                                <small>*Cualquier registro con email mal escrito, duplicado o ya existente será ignorado durante el proceso de importación.</small>

                            </Row>
                        </Form>
                    </Col>
                </Row>
            </ModalRegister>
        </Row>
    )
}