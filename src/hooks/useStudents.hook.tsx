/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { CustomError, Student, StudentsService } from "../services";
import { App, Button, Form, Popconfirm, Row } from "antd";
import { BsPencil, BsTrash } from "react-icons/bs";
import { useDebounce } from 'usehooks-ts'
import { AxiosError } from "axios";

export const useStudent = () => {

    const service = new StudentsService();
    const { message } = App.useApp();
    const [page, setPage] = useState(1);
    const [limit] = useState(10);
    // const url = import.meta.env.VITE_URL_FRONTEND;

    const columns = [
        {
            title: 'Nombre',
            key: 'name',
            dataIndex: 'name'
        },
        {
            title: 'Apellido',
            key: 'lastName',
            dataIndex: 'lastName'
        },
        {
            title: 'Nro de documento',
            key: 'documentNumber',
            dataIndex: 'documentNumber'
        },
        {
            title: 'Email',
            key: 'email',
            dataIndex: 'email'
        },
        {
            title: 'Opciones',
            key: 'options',
            render: (record: Student) => <Row style={{ gap: 8 }}>
                <Button 
                    shape="circle" 
                    type="primary" 
                    icon={<BsPencil />}
                    onClick={()=>editRegister(record)}
                />

                <Popconfirm
                    title="Seguro desea eliminar?"
                    cancelText="No"
                    okText="Si"
                    onConfirm={()=> onDelete.mutate(record.id)}
                >
                    <Button shape="circle" type="primary" icon={<BsTrash />} danger />
                </Popconfirm>
            </Row>
        }
    ];

    const [value, setValue] = useState<string>('')
    const debouncedValue = useDebounce<string>(value, 500)
    const [search, setSearch] = useState('');

    const list = useQuery({
        queryKey: ['students', { page, limit, search }],
        queryFn: ()=> service.list(page, limit, search),
        refetchOnWindowFocus: false,
        staleTime: 1000 * 60 * 10,
    });

    useEffect(()=> {
        setSearch(value);
    },[debouncedValue]);

    const onDelete = useMutation({
      mutationFn: (id: number) => service.delete(id),
      onSuccess: (data) => {
        message.success(`${ data?.name} eliminado.`);
        list.refetch();
      },
      onError: (error: AxiosError) => {
        CustomError.Error(error, message)
      }
    });

    const [form] = Form.useForm();
    const [modalCreate, setModalCreate] = useState(false);
    const [edit, setEdit] = useState(false);

    const onCreate = useMutation({
        mutationFn: (data: Student) => service.create(data)  ,
        onSuccess: (data) => {
            message.success(`${ data?.name} creado correctamente.`);
            list.refetch();
            form.resetFields();
            setModalCreate(false);
        },
        onError: (error: AxiosError) => {
            CustomError.ErrorForm(error, message, form)
        }
    });

    const onUpdate = useMutation({
        mutationFn: (data: Student) => service.update(data),
        onSuccess: (data) => {
            message.success(`${ data?.name} actualizado correctamente.`);
            list.refetch();
            form.resetFields();
            setModalCreate(false);
        },
        onError: (error: AxiosError) => {
            CustomError.Error(error, message)
        }, 
    });

    const editRegister = (data: Student) => {
        form.setFieldValue('id', data.id);
        form.setFieldValue('name', data.name);
        form.setFieldValue('lastName', data.lastName);
        form.setFieldValue('documentNumber', data.documentNumber);
        form.setFieldValue('email', data.email);
        setModalCreate(true);
        setEdit(true);
    }

    useEffect(()=>{
        if( !modalCreate ) {
            setEdit(false);
            form.resetFields();
        }
    },[modalCreate]);
    

    return {
        columns,
        list,
        setPage,
        setValue,
        onCreate,
        modalCreate,
        setModalCreate,
        form,
        edit,
        onUpdate,
    }
}