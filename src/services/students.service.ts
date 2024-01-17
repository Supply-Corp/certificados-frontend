/* eslint-disable @typescript-eslint/no-explicit-any */
import { AxiosError } from "axios";
import { ApiService } from "./api.service";

export interface Student {
  id: number;
  name: string;
  lastName: string;
  documentNumber: string;
  email:string;
  password: string;
  passwordConfirmation?: string;
  role: "USER";
  createdAt: Date;
  updatedAt: Date;
}

export class StudentsService {

    list = async (page: number, limit: number, search: string): Promise<{ total: number; users: Student[] }> => {
        try {
            const { total, users } = await ApiService.get(`/user-courses?page=${page}&limit=${limit}&search=${search}`);
            return {
                total,
                users,
            };
            } catch (error) {
            return {
                total: 0,
                users: [],
            };
        }
    };

    create = async (info: Student):Promise<Student | AxiosError> => {
        try {
            const data = await ApiService.post(`/user-courses/user`, info);
            return data as Student;
        } catch (error) {
            throw error as AxiosError;
        }
    };

    update = async (info: Student):Promise<Student | AxiosError> => {
        try {
            const data = await ApiService.put(`/user-courses/user/${ info.id }`, info);
            return data as Student;
        } catch (error) {
            throw error as AxiosError;
        }
    };

    delete = async (id: number):Promise<Student | AxiosError> => {
        try {
            const data = await ApiService.delete(`/user-courses/user/${ id }`);
            return data as Student;
        } catch (error) {
            throw error as AxiosError;
        }
    };
}
