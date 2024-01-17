import { App, Form } from "antd"
import { LoginService } from "../services";
import { CustomError } from "../services/errors.service";
import { useSession } from "../context/useContext";
import { useMutation } from "@tanstack/react-query";

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

    const submit = useMutation({
        mutationFn: (data: { email: string, password: string }) => LoginService.login(data),
        onSuccess: (user) => initSession(user),
        onError: (error) => CustomError.Error(error, message)
    });

    return {
        form,
        submit,

        rulesEmail,
        rulesPassword
    }
    
}