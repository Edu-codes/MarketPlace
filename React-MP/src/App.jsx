import './App.css'

import Login from './pages/Login'
import RegistroForm from './pages/Registro'
import Inautorizado from './pages/inautorizado'

import InactivityLogout from './components/Utilidades/InactivityLogout'

//Rutas Admin
import Inicio from './pages/Admin/Inicio'
import Categorias from './pages/Admin/Categorias'
import SubCategorias from './pages/Admin/SubCategorias'
import AdminLayout from './layouts/Admin/AdminLayout'
import ProductosAdmin from './pages/Admin/Productos'

//Rutas Cliente
import ClientLayout from './layouts/Client/ClientLayout'
import ProductosCliente from './pages/Client/Productos'
import CategoriasCliente from './pages/Client/Categorias'
import InicioCliente from './pages/Client/Inicio'

import { Routes, Route } from 'react-router'
import { MyContext } from './context/Context'
import { useContext } from 'react';
import { Box } from '@mui/material'




function App() {

  const { user } = useContext(MyContext);


  return (
    <>
      <InactivityLogout />

      <Box>
        <Routes>
          <Route path="Registro" element={< RegistroForm />} />
          <Route path="/" element={<Login />} />

          {/* Si hay usuario, rutas protegidas por rol */}
          {user && user.rolId === 'Admin' && (
            <Route path="/Admin" element={<AdminLayout />}>
              <Route path="Inicio" element={<Inicio />} />
              <Route path="Productos" element={<ProductosAdmin />} />
              <Route path="Categorias" element={<Categorias />} />
              <Route path="SubCategorias" element={<SubCategorias />} />
            </Route>
          )}
          {user && user.rolId === 'Customer' && (
            <Route path="/Client/Inicio" element={<ClientLayout />}>
              <Route index element={<InicioCliente />} />
              <Route path="Productos" element={<ProductosCliente />} />
              <Route path="Categorias" element={<CategoriasCliente />} />
              
            </Route>
            
          )}

          {/* Evita el acceso a rutas no válidas 
          <Route path="*" element={<Navigate to="/" replace />} />*/}
        </Routes>
      </Box>

    </>
  )
}

export default App
