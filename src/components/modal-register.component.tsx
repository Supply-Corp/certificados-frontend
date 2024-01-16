import { FC, ReactNode } from "react"
import { Modal } from "antd"

interface Props {
    open: boolean,
    width?: number,
    title?: string,
    onCancel: () => void,
    children: ReactNode
}

export const ModalRegister:FC<Props> = ({ open, width, title,  onCancel, children }) => {


    return (
        <Modal
            open={open}
            width={width}
            title={title}
            footer={false}
            onCancel={onCancel}
        >
            { children }
        </Modal>
    )

}