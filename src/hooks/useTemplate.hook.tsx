/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Course, CustomError, Template, TemplatesService } from "../services";
import { App, Button, Form, Image, Popconfirm, Row } from "antd";
import { BsPencil, BsTrash } from "react-icons/bs";
import { useDebounce } from 'usehooks-ts'
import { AxiosError } from "axios";

export const useTemplate = () => {

    const templateService = new TemplatesService();
    const { message } = App.useApp();
    const [page, setPage] = useState(1);
    const [limit] = useState(10);
    const url = import.meta.env.VITE_URL_FRONTEND;

    const columns = [
        {
            title: 'Nombre',
            key: 'name',
            dataIndex: 'name'
        },
        {
            title: 'Plantilla',
            key: 'template',
            render: (record: Template) => <Image  width={100} src={`${ url }/${ record.file }`} />
        },
        {
            title: 'Opciones',
            key: 'options',
            render: (record: Course) => <Row style={{ gap: 8 }}>
                <Button 
                    shape="circle" 
                    type="primary" 
                    icon={<BsPencil />}
                    onClick={()=>editRegister({ 
                        id: record.id, 
                        name: record.name, 
                    })}
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
        queryKey: ['templates', { page, limit, search }],
        queryFn: ()=> templateService.list(page, limit, search),
        refetchOnWindowFocus: false,
        staleTime: 1000 * 60 * 10,
    });

    useEffect(()=> {
        setSearch(value);
    },[debouncedValue]);

    const onDelete = useMutation({
      mutationFn: (id: number) => templateService.delete(id),
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
    const [fileList, setFileList] = useState<any>([]);

    const propsFile = {
        beforeUpload: (file: File) => {
            setFileList([file])
            return false;
        }
    };

    const onCreate = useMutation({
        mutationFn: (data: { name: string, file: File }) => 
            templateService.create(data.name, data.file)  
        ,
        onSuccess: (data) => {
            message.success(`${ data?.name} creado correctamente.`);
            list.refetch();
            form.resetFields();
            setModalCreate(false);
            setFileList([])
        },
        onError: (error: AxiosError) => {
          CustomError.Error(error, message)
        }
    });

    const onUpdate = useMutation({
        mutationFn: (data: { id: number, name: string, file: File}) => 
            templateService.update(data.id, data.name, data.file)
        ,
        onSuccess: (data) => {
            message.success(`${ data?.name} actualizado correctamente.`);
            list.refetch();
            form.resetFields();
            setModalCreate(false);
            setFileList([])
        },
        onError: (error: AxiosError) => {
            CustomError.Error(error, message)
        }
    });

    const editRegister = (data: { id:number, name: string }) => {
        form.setFieldValue('id', data.id);
        form.setFieldValue('name', data.name);
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
        propsFile,
        fileList
    }
}