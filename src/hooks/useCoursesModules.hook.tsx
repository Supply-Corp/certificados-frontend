/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { CoursesModules, CoursesModulesService, CustomError } from "../services";
import { App, Button, Form, Popconfirm, Row } from "antd";
import { BsPencil, BsTrash } from "react-icons/bs";
import { useDebounce } from 'usehooks-ts'
import { AxiosError } from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export const useCoursesModules = () => {

    const service = new CoursesModulesService();
    const navigate = useNavigate();
    const { message } = App.useApp();
    const [page, setPage] = useState(1);
    const [limit] = useState(10);
    const { id } = useParams();

    const columns = [
        {
            title: 'Nombre',
            key: 'name',
            dataIndex: 'name'
        },
        {
            title: 'Opciones',
            key: 'options',
            width: 150,
            render: (record: CoursesModules) => <Row style={{ gap: 8 }}>
                <Button 
                    shape="circle" 
                    type="primary" 
                    icon={<BsPencil />}
                    onClick={()=>editRegister({id: record.id, name: record.name})}
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
        queryKey: [`courses-modules-${id}`, { page, limit, search }],
        queryFn: ()=> service.list(+id!),
        refetchOnWindowFocus: false,
        staleTime: 1000 * 60 * 10,
    });

    useEffect(()=> {
        setSearch(value);
    },[debouncedValue]);

    const onDelete = useMutation({
      mutationFn: (id: number) => service.delete(id),
      onSuccess: () => {
        message.success(`Módulo eliminado correctamente.`);
        list.refetch();
      },
      onError: (error: AxiosError) => {
        CustomError.Error(error, message)
      }
    });

    const [form] = Form.useForm();
    const [modalCreate, setModalCreate] = useState(false);
    const [edit, setEdit] = useState(false);

    useEffect(() => {
        if( id ) form.setFieldValue('userId', +id)
    },[id])

    const onCreate = useMutation({
        mutationFn: (data: { id: number, name: string, courseId: number }) => service.create(data)  ,
        onSuccess: () => {
            message.success(`Módulo creado correctamente.`);
            list.refetch();
            form.resetFields();
            setModalCreate(false);
        },
        onError: (error: AxiosError) => {
            CustomError.ErrorForm(error, message, form)
        }
    });

    const onUpdate = useMutation({
        mutationFn: (data: { id: number, name: string }) => service.update(data),
        onSuccess: () => {
            message.success(`Módulo actualizado correctamente.`);
            list.refetch();
            form.resetFields();
            setModalCreate(false);
        },
        onError: (error: AxiosError) => {
            CustomError.Error(error, message)
        }, 
    });

    const editRegister = (data: { id: number, name: string }) => {
        form.setFieldValue('id', data.id);
        form.setFieldValue('name', data.name);

        setModalCreate(true);
        setEdit(true);
    }

    useEffect(()=>{
        if( !modalCreate ) {
            setEdit(false);
            form.resetFields();
        } else if(id) {
            form.setFieldValue('courseId', +id)
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
        navigate
    }
}