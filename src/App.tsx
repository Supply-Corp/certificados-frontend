import { Navigate, Route, Routes } from "react-router-dom"
import { AdminRoutes, UserRoutes } from "./routes";
import { LoginView, SearchView } from "./views";
import './assets/styles/app.scss';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<LoginView />} />

      <Route path="/admin/*" element={<AdminRoutes />} />
      <Route path="/user/*" element={<UserRoutes />} />

      <Route path="/search-certificates" element={<SearchView />} />
    </Routes>
  )
}

export default App;
