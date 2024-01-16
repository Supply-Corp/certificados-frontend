import { MessageInstance } from "antd/es/message/interface";

/* eslint-disable @typescript-eslint/no-explicit-any */
export class CustomError {
    
    static Error(error:any, message: MessageInstance) {
        if( Array.isArray(error.response?.data?.error)) {
            error.response.data.error.map((item:{ path: string, msg:string}) => message.error(item.msg))
        }else if(typeof error.response?.data === 'object') {
            return message.error(error.response?.data.error)
        }
    }

}