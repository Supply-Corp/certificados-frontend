/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, createContext, ReactNode, useContext, useReducer, useState, useEffect } from "react";
import SessionReducer from "./sessionReducer";
import { types } from "./typesReducer";
import { useLocation, useNavigate } from "react-router-dom";
import { ApiService } from "../services/api.service";
import { CustomError } from "../services/errors.service";
import { App } from "antd";
import { useMutation } from "@tanstack/react-query";
import { LoginService } from "../services";

interface ISessionContext {
    children: ReactNode
}

export interface IAuth {
    user: IUser,
    token: string
}

export interface IUser {
    id: number,
    name: string,
    lastName: string,
    documentNumber: string,
    email: string,
    role: string,
    createdAt: Date,
    updatedAt: Date
}

const sessionContext = createContext<any>(null);

const SessionProvider: FC<ISessionContext> = ({ children }) => {

    const [logged] = useState<IAuth>();
    const navigate = useNavigate();
    const { message } = App.useApp();
    const { pathname } = useLocation()
    const token = window.localStorage.getItem('session');
    
    const initialize = () => {
        if(token) return readSession.mutate();
        return setUrlRedirect('/login')
    }

    const readSession = useMutation({
        mutationFn: () => LoginService.user(),
        onSuccess: (user) => (user && token) && initSession({ user, token }, pathname),
        onError: (error) => CustomError.Error(error, message)
    });

    const [urlRedirect, setUrlRedirect] = useState('');

    const initSession = (data: IAuth, path: string) => {

        dispatch({ user: data, logged: true, type: types.login });
        window.localStorage.setItem('session', data.token);

        (data.user.role === 'USER') 
            ? setUrlRedirect( path ? path: 'user' )
            : setUrlRedirect( path ? path:'admin')
    }

    useEffect(()=> {
        if(urlRedirect)  {
            navigate(urlRedirect)
            setUrlRedirect('');
        }
    },[urlRedirect])
    
    const [user, dispatch] = useReducer(SessionReducer, logged, initialize);

    const menuOptionClick = (e:{ key: string }) => {
        if( e.key === 'logout' ) return logoutSession();
        navigate( e.key );
    }

    const logoutSession = async () => {
        try {
            await ApiService.get('/auth/logout');
            window.localStorage.removeItem('session');

            setUrlRedirect('/login');
        } catch (error) {
            window.localStorage.removeItem('session');
            setUrlRedirect('/login');
            
            return CustomError.Error(error, message);
        }
    }

    return (
        <sessionContext.Provider
            value={{
                initSession,
                ...user,
                menuOptionClick,
                readSession
            }}
        >
            { children }
        </sessionContext.Provider>
    )
}

export const useSession = () => useContext(sessionContext);
export default SessionProvider;
