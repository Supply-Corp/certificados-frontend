import { useMutation, useQuery } from "@tanstack/react-query";
import { UserService } from "../services/user.service";
import { StudentCourse } from "../services";
import dayjs from 'dayjs';
import { Button } from "antd";
import { ApiService } from '../services/api.service';
import { useState } from "react";


export const useUser = () => {

    const service = new UserService();
    const [generate, setGenerate] = useState(0);
    const [generateConstancy, setGenerateConstancy] = useState(0);

    const columns = [
        {
            key: 'name',
            title: 'Nombre',
            render: (record: StudentCourse) => record.course.name
        },
        {
            key: 'initialDate',
            title: 'Fecha Inicio',
            render: (record: StudentCourse) => dayjs(record.course.initialDate).format('DD/MM/YYYY')
        },
        {
            key: 'endDate',
            title: 'Fecha fin',
            render: (record: StudentCourse) => dayjs(record.course.endDate).format('DD/MM/YYYY')
        },
        {
            key: 'certified',
            title: 'Certificado',
            width: 110,
            render: (record: StudentCourse) => (
                <Button 
                    type="text" 
                    key={record.id} 
                    loading={record.id === generate} 
                    onClick={() => {
                        downloadOne.mutate(record.identifier);
                        setGenerate(record.id)
                    }}
                >
                    Descargar
                </Button>
            )
        },
        {
            key: 'download',
            title: 'Constancia',
            width: 110,
            render: (record: StudentCourse) => (
                <Button 
                    type="text" 
                    key={record.id} 
                    loading={record.id === generateConstancy} 
                    onClick={() => {
                        downloadTwo.mutate(record.identifier);
                        setGenerateConstancy(record.id)
                    }}
                >
                    Descargar
                </Button>
            )
        },
    ];

    const downloadOne = useMutation({
        mutationFn: (identifier: string) => service.downloadCertified(identifier),
        onSuccess: (file) => {
            ApiService.download(`../certified/${ file }`, file);
            setGenerate(0)
        },
        onError: () => {
            setGenerate(0)
        }
    })

    const downloadTwo = useMutation({
        mutationFn: (identifier: string) => service.downloadConstancy(identifier),
        onSuccess: (file) => {
            ApiService.download(`../constancy/${ file }`, file);
            setGenerateConstancy(0)
        },
        onError: () => {
            setGenerateConstancy(0)
        }
    })

    const courses = useQuery({
        queryKey: ['my-courses'],
        queryFn: () => service.list(),
    });


    return {
        columns,
        courses,
    }
}