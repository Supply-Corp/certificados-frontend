import { Menu } from "antd"
import { useSession } from "../context/useContext";


export const MenuUser = () => {

    const items = [{
        key: 'logout',
        label: 'Cerrar sesión'
    }];

    const { menuOptionClick } = useSession();


    return (
        <Menu
            mode="horizontal"
            theme="dark"
            onClick={menuOptionClick}
            items={items}
        />
    )
}