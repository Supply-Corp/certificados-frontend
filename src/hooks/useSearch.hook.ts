import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"
import { Certified, CustomError, SearchService } from "../services";
import { App, Form } from "antd";

export const useSearch = () => {

    const service = new SearchService();
    const [searchParams, setSearchParams] = useSearchParams();
    const { message } = App.useApp();
    const [info, setInfo] = useState<Certified|null>(null);

    const cert = searchParams.get('cert');
    const [form] = Form.useForm();

    useEffect(() => {
        if( cert && !info ) {
            searchMutation.mutate({ search: cert });
            form.setFieldValue(`search`, cert)
        }
    }, [cert]);

    const searchMutation = useMutation({
        mutationFn: (search: { search: string }) => service.list(search),
        onSuccess: (data) => setInfo(data),
        onError: (error) => { return CustomError.Error(error, message) }
    });

    return {
        searchMutation,
        setSearchParams,
        info,
        form
    }

}