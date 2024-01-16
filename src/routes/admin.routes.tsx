import { Navigate, Route, Routes } from "react-router-dom"
import { useSession } from "../context/useContext"
import { FC, ReactNode } from "react"
import { LayoutAdmin } from "../components"
import { AdminView, CoursesView, StudentsView, TemplateView } from "../views"

export const AdminRoutes = () => {
    return (
        <PrivateRoute>
            <LayoutAdmin>
                <Routes>
                    <Route path="/" element={<AdminView />} />
                    <Route path="/courses" element={<CoursesView />} />
                    <Route path="/templates" element={<TemplateView />} />
                    <Route path="/users" element={<StudentsView />} />
                </Routes>
            </LayoutAdmin>
        </PrivateRoute>
    )
}

export const PrivateRoute: FC<{ children: ReactNode}> = ({ children }) => {
    const { user } = useSession();
    
    const role = user?.user?.role;
    if( role === 'ADMIN') {
        return children
    } else if( role === 'USER') {
        return <Navigate to="/user" />
    } else {
        return <Navigate to="/login" />
    }
}