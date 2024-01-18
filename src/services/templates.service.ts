/* eslint-disable @typescript-eslint/no-explicit-any */
import { AxiosError } from "axios";
import { ApiService } from "./api.service";

export interface Template {
  id: number;
  name: string;
  file: string;
  state: "ACTIVE" | "DELETED";
  createdAt: Date;
  updatedAt: Date;
}

export class TemplatesService {

    static all = async (): Promise<{ templates: Template[] }> => {
        try {
            const { templates } = await ApiService.get(`/templates/all`);
                return { templates };
            } catch (error) {
                throw `${ error }`;
        }
    };

    list = async (page: number, limit: number, search: string): Promise<{ total: number; templates: Template[] }> => {
        try {
            const { total, templates } = await ApiService.get(`/templates?page=${page}&limit=${limit}&search=${search}`);
            return {
                total,
                templates,
            };
            } catch (error) {
            return {
                total: 0,
                templates: [],
            };
        }
    };

    create = async (name: string, file: any):Promise<Template | AxiosError> => {
        try {
            const formData = new FormData();
            formData.append('name', name);
            formData.append('file', file.file);

            const data = await ApiService.post(`/templates`, formData);
            return data as Template;
        } catch (error) {
            throw error as AxiosError;
        }
    };

    update = async (id: number, name: string, file?: any):Promise<Template | AxiosError> => {
        try {

            const formData = new FormData();
            formData.append('name', name);
            (file) && formData.append('file', file.file);

            const data = await ApiService.put(`/templates/${id}`, formData);
            return data as Template;
        } catch (error) {
            throw error as AxiosError;
        }
    };

    delete = async (id: number):Promise<Template | AxiosError> => {
        try {
            const data = await ApiService.delete(`/templates/${ id }`);
            return data as Template;
        } catch (error) {
            throw error as AxiosError;
        }
    };
}
