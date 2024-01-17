import { AxiosError } from "axios"
import { IAuth, IUser } from "../context/useContext"
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


    static async user ():Promise<IUser> {
        try {
            const data = await ApiService.get('/auth/user');
            return data as IUser;
        } catch (error) {
            throw error as AxiosError;
        }
    }
}