import { AxiosError } from "axios";
import { StudentCourse } from ".";
import { ApiService } from "./api.service";


export class UserService {

    list = async (): Promise<StudentCourse[]> => {
        try {
            const { courses } = await ApiService.get(`/student`);
            return courses;
        } catch (error) {
            throw error as AxiosError;
        }
    }

    downloadCertified = async ( identifier: string ): Promise<string> => {
        try {
            const fileName = await ApiService.get(`/student/certified/${ identifier }`);
            return fileName;
        } catch (error) {
            throw error as AxiosError;
        }
    }
}