import { useMutation, useQuery } from "@tanstack/react-query";
import { UserService } from "../services/user.service";
import { StudentCourse } from "../services";
import dayjs from 'dayjs';
import { Button } from "antd";
import { ApiService } from '../services/api.service';


export const useUser = () => {

    const service = new UserService();

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
                <Button type="text" onClick={() => downloadOne.mutate(record.identifier)}>Descargar</Button>
            )
        },
        {
            key: 'download',
            title: 'Constancia',
            width: 110,
            render: (record: StudentCourse) => (
                <Button type="text" onClick={() => downloadOne.mutate(record.identifier)}>Descargar</Button>
            )
        },
    ];

    const downloadOne = useMutation({
        mutationFn: (identifier: string) => service.downloadCertified(identifier),
        onSuccess: (file) => {
            ApiService.download(`../certified/${ file }`, file)
        }
    })

    const courses = useQuery({
        queryKey: ['my-courses'],
        queryFn: () => service.list(),
    });


    return {
        columns,
        courses
    }
}