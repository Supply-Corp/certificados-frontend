import { FC, ReactNode } from "react"
import { Navigate, Route, Routes } from "react-router-dom"
import { useSession } from "../context/useContext"
import { LayoutAdmin } from "../components"
import { AdminView, CoursesModulesView, CoursesView, StudentsCoursesView, StudentsView, TemplateView } from "../views"
import { LoadingContainer } from "../containers"

export const AdminRoutes = () => {
    return (
        <PrivateRoute>
            <LayoutAdmin>
                <Routes>
                    <Route path="/" element={<AdminView />} />
                    <Route path="/courses" element={<CoursesView />} />
                    <Route path="/courses/modules/:id" element={<CoursesModulesView />} />
                    <Route path="/templates" element={<TemplateView />} />
                    <Route path="/users" element={<StudentsView />} />
                    <Route path="/users/courses/:id" element={<StudentsCoursesView />} />
                </Routes>
            </LayoutAdmin>
        </PrivateRoute>
    )
}

const PrivateRoute: FC<{ children: ReactNode}> = ({ children }) => {    
    const { user, logged } = useSession();
    const role = user?.user?.role;

    if( !logged ) {
        return <LoadingContainer />
    } else if( role === 'ADMIN' ) {
        return children;
    } else if( role === 'USER' ) {
        return <Navigate to="/user" />;
    }
}