import { FC, ReactNode } from "react"
import { Navigate, Route, Routes } from "react-router-dom"
import { UserView } from "../views/user.view"
import { useSession } from "../context/useContext"
import { LayoutUser } from "../components"
import { LoadingContainer } from "../containers"

export const UserRoutes = () => {
    return (
        <PrivateRoute>
            <LayoutUser>
                <Routes>
                    <Route path="/" element={<UserView />} />
                </Routes>
            </LayoutUser>
        </PrivateRoute>
    )
}

export const PrivateRoute: FC<{ children: ReactNode }> = ({ children }) => {
    const { user, logged } = useSession();
    const role = user?.user?.role;

    if( !logged ) {
        return <LoadingContainer />
    } else if( role === 'USER' ) {
        return children;
    } else if( role === 'ADMIN' ) {
        return <Navigate to="/admin" />
    }
}