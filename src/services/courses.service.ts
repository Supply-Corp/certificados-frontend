import { AxiosError } from "axios";
import { ApiService } from "./api.service";

export interface Course {
  id: number;
  name: string;
  initialDate: Date;
  endDate: Date;
  state: "ACTIVE" | "DELETED";
  createdAt: Date;
  updatedAt: Date;
}

export class CoursesService {

    list = async (page: number, limit: number, search: string): Promise<{ total: number; courses: Course[] }> => {
        try {
            const { total, courses } = await ApiService.get(`/courses?page=${page}&limit=${limit}&search=${search}`);
            return {
                total,
                courses,
            };
            } catch (error) {
            return {
                total: 0,
                courses: [],
            };
        }
    };

    create = async (name: string, initialDate: Date, endDate: Date):Promise<Course | AxiosError> => {
        try {
            const data = await ApiService.post(`/courses`, { name, initialDate, endDate });
            return data as Course;
        } catch (error) {
            throw error as AxiosError;
        }
    };

    update = async (id: number, name: string, initialDate: Date, endDate: Date):Promise<Course | AxiosError> => {
        try {
            const data = await ApiService.put(`/courses/${id}`, { name, initialDate, endDate });
            return data as Course;
        } catch (error) {
            throw error as AxiosError;
        }
    };

    delete = async (id: number):Promise<Course | AxiosError> => {
        try {
            const data = await ApiService.delete(`/courses/${ id }`);
            return data as Course;
        } catch (error) {
            throw error as AxiosError;
        }
    };
}
