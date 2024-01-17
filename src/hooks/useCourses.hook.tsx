import { useEffect, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Course, CoursesService, CustomError } from "../services";
import dayjs from "dayjs";
import { App, Button, Form, Popconfirm, Row } from "antd";
import { BsPencil, BsTrash } from "react-icons/bs";
import { useDebounce } from 'usehooks-ts'
import { AxiosError } from "axios";

export const useCourses = () => {

    const courseService = new CoursesService();
    const { message } = App.useApp();
    const [page, setPage] = useState(1);
    const [limit] = useState(10);

    const columns = [
        {
            title: 'Nombre',
            key: 'name',
            dataIndex: 'name'
        },
        {
            title: 'Fecha de inicio',
            key: 'initialDate',
            render: (record: Course) => dayjs(record.initialDate).format('DD/MM/YYYY')
        },
        {
            title: 'Fecha final',
            key: 'endDate',
            render: (record: Course) => dayjs(record.endDate).format('DD/MM/YYYY')
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
                        initialDate: record.initialDate, 
                        endDate: record.endDate 
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

    const courses = useQuery({
        queryKey: ['courses', { page, limit, search }],
        queryFn: ()=> courseService.list(page, limit, search),
        refetchOnWindowFocus: false,
        staleTime: 1000 * 60 * 10,
    });

    useEffect(()=> {
        setSearch(value);
    },[debouncedValue]);

    const onDelete = useMutation({
      mutationFn: (id: number) => courseService.delete(id),
      onSuccess: (course) => {
        message.success(`${ course?.name} eliminado.`);
        courses.refetch();
      },
      onError: (error: AxiosError) => {
        CustomError.Error(error, message)
      }
    });

    const [form] = Form.useForm();
    const [modalCreate, setModalCreate] = useState(false);
    const [edit, setEdit] = useState(false);

    const onCreate = useMutation({
        mutationFn: (data: { name: string, initialDate: Date, endDate: Date }) => 
            courseService.create(data.name, data.initialDate, data.endDate)
        ,
        onSuccess: (course) => {
          message.success(`${ course?.name} creado correctamente.`);
          courses.refetch();
          form.resetFields();
          setModalCreate(false);
        },
        onError: (error: AxiosError) => {
          CustomError.Error(error, message)
        }
    });

    const onUpdate = useMutation({
        mutationFn: (data: { id: number, name: string, initialDate: Date, endDate: Date }) => 
            courseService.update(data.id, data.name, data.initialDate, data.endDate)
        ,
        onSuccess: (course) => {
          message.success(`${ course?.name} actualizado correctamente.`);
          courses.refetch();
          form.resetFields();
          setModalCreate(false);
        },
        onError: (error: AxiosError) => {
          CustomError.Error(error, message)
        }
    });

    const editRegister = (data: { id:number, name: string, initialDate: Date, endDate: Date }) => {
        form.setFieldValue('id', data.id);
        form.setFieldValue('name', data.name);
        form.setFieldValue('initialDate', dayjs(data.initialDate).format('YYYY-MM-DD'));
        form.setFieldValue('endDate', dayjs(data.endDate).format('YYYY-MM-DD'));
        setModalCreate(true);
        setEdit(true);
    }

    useEffect(()=>{
        if( !modalCreate ) {
            setEdit(false);
            form.resetFields();
        }
    },[modalCreate])
    

    return {
        columns,
        courses,
        setPage,
        setValue,
        onCreate,
        modalCreate,
        setModalCreate,
        form,
        edit,
        onUpdate,
        // onDelete
    }
}