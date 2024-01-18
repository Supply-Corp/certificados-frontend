/* eslint-disable @typescript-eslint/no-explicit-any */
import { AxiosError } from "axios";
import { ApiService } from "./api.service";
import { Course } from ".";

export interface CoursesModules {
  id: number;
  name: string;
  courseId: number;
  course: Course

  createdAt: Date;
  updatedAt: Date;
}

interface ModulesRequest {
    modules: CoursesModules[],
    course: Course
}

export class CoursesModulesService {

    list = async ( id: number): Promise<ModulesRequest> => {
        try {
            const data = await ApiService.get(`/courses-modules/${ id }`);
            return data;
        } catch (error) {
            throw `${ error }`
        }
    };

    create = async (info: { name: string, courseId: number }):Promise<CoursesModules> => {
        try {
            const data = await ApiService.post(`/courses-modules`, info);
            return data as CoursesModules;
        } catch (error) {
            throw error as AxiosError;
        }
    };

    update = async (info: { id: number, name: string }):Promise<CoursesModules> => {
        try {
            const data = await ApiService.put(`/courses-modules/${ info.id }`, info);
            return data as CoursesModules;
        } catch (error) {
            throw error as AxiosError;
        }
    };

    delete = async (id: number):Promise<CoursesModules> => {
        try {
            const data = await ApiService.delete(`/courses-modules/${ id }`);
            return data as CoursesModules;
        } catch (error) {
            throw error as AxiosError;
        }
    };
}
