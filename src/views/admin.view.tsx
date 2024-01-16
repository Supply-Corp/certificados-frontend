import { useNavigate } from "react-router-dom"

export const AdminView = () => {

    const navigate = useNavigate();
    
    return (<>
        hi adimn
        <button onClick={()=> navigate('/user')}>user</button>
    </>)
}