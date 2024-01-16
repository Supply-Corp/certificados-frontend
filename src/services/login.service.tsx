import { ApiService } from "./api.service"

interface ILogin {
    email: string,
    password: string
}

export class LoginService {

    static async login (info: ILogin) {

        return await ApiService.post('/auth/login', info)
    }

}