/* eslint-disable @typescript-eslint/no-explicit-any */
import { AxiosError } from "axios";
import { ApiService } from "./api.service";
import { Course, Template } from ".";
import { IUser } from "../context/useContext";

export interface Certified {
    id: number,
    identifier: string,
    userId: number,
    templateId: number,
    courseId: number,
    hours: number,
    points: number,

    user?: IUser,
    template?: Template,
    course?: Course,

    createdAt?: Date,
    updatedAt?: Date
}

export class SearchService {

    list = async ( search: { search: string } ): Promise<Certified> => {
        try {
            const data = await ApiService.post(`/certified/search`, search);
            return data;
        } catch (error) {
            throw error as AxiosError;
        }
    };

}
