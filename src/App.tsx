import { Navigate, Route, Routes } from "react-router-dom"
import './assets/styles/app.scss';
import { AdminRoutes } from "./routes/admin.routes";
import { UserRoutes } from "./routes/user.routes";
import { LoadingView, LoginView } from "./views";

function App() {

  

  return (
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<LoginView />} />

        <Route path="/admin/*" element={<AdminRoutes />} />
        <Route path="/user/*" element={<UserRoutes />} />

        <Route path="/loading" element={<LoadingView />} />
      </Routes>
  )
}

export default App
