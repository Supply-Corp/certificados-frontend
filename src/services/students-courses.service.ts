/* eslint-disable @typescript-eslint/no-explicit-any */
import { AxiosError } from "axios";
import { ApiService } from "./api.service";
import { Course, Template } from ".";
import { IUser } from "../context/useContext";

export interface StudentCourse {
  id: number;
  identifier: string;
  userId: number;
  templateId: number;
  courseId:number;
  hours: number;
  template: Template,
  course: Course
  createdAt: Date;
  updatedAt: Date;
}

export interface UserCourse {
    id?: number;
    userId: number,
    templateId: number,
    courseId: number,
    hours: number
}

interface ResultCourses {
    courses: StudentCourse[],
    user: IUser
    total: number
}

export class StudentsCoursesService {

    list = async (page: number, limit: number, search: string, id: number): Promise<ResultCourses> => {
        try {
            const data = await ApiService.get(`/user-courses/${ id }?page=${ page }&limit=${ limit }&search=${ search }`);
            console.log( data )
            return data;
        } catch (error) {
            throw `${ error }`
        }
    };

    create = async (info: UserCourse):Promise<StudentCourse> => {
        try {
            const data = await ApiService.post(`/user-courses`, info);
            return data as StudentCourse;
        } catch (error) {
            throw error as AxiosError;
        }
    };

    update = async (info: UserCourse):Promise<StudentCourse> => {
        try {
            const data = await ApiService.put(`/user-courses/${ info.id }`, info);
            return data as StudentCourse;
        } catch (error) {
            throw error as AxiosError;
        }
    };

    delete = async (id: number):Promise<StudentCourse> => {
        try {
            const data = await ApiService.delete(`/user-courses/${ id }`);
            return data as StudentCourse;
        } catch (error) {
            throw error as AxiosError;
        }
    };
}
