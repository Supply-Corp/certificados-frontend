import { Menu } from "antd";
import { useSession } from "../context/useContext";
import { BsClipboard, BsPeople } from "react-icons/bs";
import { TbSchool } from "react-icons/tb";
import { BiLogOut } from "react-icons/bi";

export const MenuAdmin = () => {

    const items = [
        {
            key: '/admin/courses',
            label: 'Cursos',
            icon: <TbSchool />
        },
        {
            key: '/admin/templates',
            label: 'Plantillas',
            icon: <BsClipboard />
        },
        {
            key: '/admin/users',
            label: 'Alumnos',
            icon: <BsPeople />
        },
        {
            key: 'logout',
            label: 'Cerrar sesión',
            icon: <BiLogOut />
        }
    ];

    const { menuOptionClick } = useSession();

    return (
        <Menu
            theme="dark"
            onSelect={menuOptionClick}
            items={items}
        />
    )
}