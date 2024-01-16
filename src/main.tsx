import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.tsx'
import { App as Ant, ConfigProvider } from 'antd'
import SessionProvider from './context/useContext.tsx'
import { BiSad } from 'react-icons/bi'


const customizeRenderEmpty = () => (
  <div style={{ textAlign: "center", padding: 30 }}>
    <BiSad style={{ fontSize: 40 }} />
    <p>No hay registros disponibles.</p>
  </div>
);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <SessionProvider>
        <ConfigProvider renderEmpty={customizeRenderEmpty}>
          <Ant>
            <App />  
          </Ant>
        </ConfigProvider>
      </SessionProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
