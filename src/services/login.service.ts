import { AxiosError } from "axios"
import { IAuth } from "../context/useContext"
import { ApiService } from "./api.service"

interface ILogin {
    email: string,
    password: string
}

export class LoginService {

    static async login (info: ILogin):Promise<IAuth | AxiosError> {
        try {
            const data = await ApiService.post('/auth/login', info);
            return data as IAuth;
        } catch (error) {
            throw error as AxiosError;
        }
    }

}