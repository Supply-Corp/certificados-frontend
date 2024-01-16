

export const useUser = () => {

    const columns = [
        {
            key: 'name',
            title: 'Nombre',
            dataIndex: ''
        },
        {
            key: 'initialDate',
            title: 'Fecha Inicio',
            dataIndex: ''
        },
        {
            key: 'endDate',
            title: 'Fecha fin',
            dataIndex: ''
        },
        {
            key: 'download',
            title: 'Descargar',
        },
    ];

    return {
        columns
    }
}