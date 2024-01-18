/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { CoursesService, CustomError, StudentCourse, StudentsCoursesService, TemplatesService, UserCourse } from "../services";
import { App, Button, Form, Image, Popconfirm, Row } from "antd";
import { BsPencil, BsTrash } from "react-icons/bs";
import { useDebounce } from 'usehooks-ts'
import { AxiosError } from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export const useStudentsCourses = () => {

    const service = new StudentsCoursesService();
    const navigate = useNavigate();
    const { message } = App.useApp();
    const [page, setPage] = useState(1);
    const [limit] = useState(10);
    const { id } = useParams();
    const url = import.meta.env.VITE_URL_FRONTEND;

    const columns = [
        {
            title: 'Identificador',
            key: 'name',
            dataIndex: 'identifier'
        },
        {
            title: 'Curso',
            key: 'course',
            render: (record: StudentCourse) => record.course.name
        },
        {
            title: 'Plantilla',
            key: 'template',
            render: (record: StudentCourse) => <Image width={100} src={`${ url }/${ record.template.file }`} />
        },
        {
            title: 'Horas de curso',
            key: 'hours',
            dataIndex: 'hours'
        },
        {
            title: 'Opciones',
            key: 'options',
            render: (record: StudentCourse) => <Row style={{ gap: 8 }}>
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
        queryKey: [`user-courses-${id}`, { page, limit, search }],
        queryFn: ()=> service.list(page, limit, search, +id!),
        refetchOnWindowFocus: false,
        staleTime: 1000 * 60 * 10,
    });

    const courses = useQuery({
        queryKey: [`list-courses`],
        queryFn: ()=> CoursesService.all(),
        refetchOnWindowFocus: false,
    });

    const templates = useQuery({
        queryKey: [`list-templates`],
        queryFn: ()=> TemplatesService.all(),
        refetchOnWindowFocus: false,
    });

    useEffect(()=> {
        setSearch(value);
    },[debouncedValue]);

    const onDelete = useMutation({
      mutationFn: (id: number) => service.delete(id),
      onSuccess: () => {
        message.success(`Curso eliminado correctamente.`);
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
        mutationFn: (data: UserCourse) => service.create(data)  ,
        onSuccess: () => {
            message.success(`Curso agregado creado correctamente.`);
            list.refetch();
            form.resetFields();
            setModalCreate(false);
        },
        onError: (error: AxiosError) => {
            CustomError.ErrorForm(error, message, form)
        }
    });

    const onUpdate = useMutation({
        mutationFn: (data: StudentCourse) => service.update(data),
        onSuccess: () => {
            message.success(`Curso actualizado correctamente.`);
            list.refetch();
            form.resetFields();
            setModalCreate(false);
        },
        onError: (error: AxiosError) => {
            CustomError.Error(error, message)
        }, 
    });

    const editRegister = (data: StudentCourse) => {
        form.setFieldValue('id', data.id);
        form.setFieldValue('userId', data.userId);
        form.setFieldValue('courseId', data.courseId);
        form.setFieldValue('templateId', data.templateId);
        form.setFieldValue('hours', data.hours);

        setModalCreate(true);
        setEdit(true);
    }

    useEffect(()=>{
        if( !modalCreate ) {
            setEdit(false);
            form.resetFields();
        } else if(id) {
            form.setFieldValue('userId', +id)
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

        courses,
        templates,

        navigate
    }
}