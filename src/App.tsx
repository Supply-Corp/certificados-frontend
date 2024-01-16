import { Navigate, Route, Routes } from "react-router-dom"
import { LoginView } from "./views/login.view"
import './assets/styles/app.scss';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AdminRoutes } from "./routes/admin.routes";
import { UserRoutes } from "./routes/user.routes";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

function App() {

  const client = new QueryClient();

  return (
    <QueryClientProvider client={client}>
                  <ReactQueryDevtools />

      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<LoginView />} />

        <Route path="/admin/*" element={<AdminRoutes />} />
        <Route path="/user/*" element={<UserRoutes />} />
      </Routes>
    </QueryClientProvider>
  )
}

export default App
