import { App, Form } from "antd"
import { LoginService } from "../services";
import { AxiosError } from "axios";
import { CustomError } from "../services/errors.service";
import { useSession } from "../context/useContext";

interface Login {
    email: string,
    password: string
}

export function useLogin() {

    const [form] = Form.useForm();
    const { message } = App.useApp();
    const { initSession } = useSession()


    const rulesEmail = [
        {
            required: true,
            message: "El correo electrónico es requerido",
            },
        {
            pattern: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
            message: "Email inválido",
        },
    ];

    const rulesPassword = [
        {
          required: true,
          message: "La contraseña requerido",
        },
        {
          min: 8,
          message: "Mínimo 8 caracteres",
        },
    ];

    const submit = async (data: Login) => {
        const { email, password } = data;
        
        LoginService.login({ email, password })
        .then((login) => initSession(login))
        .catch((error: AxiosError) => CustomError.Error(error, message))
    }

    return {
        form,
        submit,

        rulesEmail,
        rulesPassword
    }
    
}