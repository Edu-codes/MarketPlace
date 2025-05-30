import './App.css'

import Login from './pages/Login'
import RegistroForm from './pages/Registro'
import Unauthorized from './pages/Unauthorized'
import ProtectedRoute from './components/ProtectedRoute'
import { Navigate } from 'react-router'

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
import { Box } from '@mui/material'




function App() {

  return (
    <>
      <InactivityLogout />

      <Box>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="Registro" element={<RegistroForm />} />

          {/* Rutas protegidas por rol */}
          <Route path="/Admin" element={
            <ProtectedRoute allowedRoles={['Admin']}>
              <AdminLayout />
            </ProtectedRoute>
          }>
            <Route path="Inicio" element={<Inicio />} />
            <Route path="Productos" element={<ProductosAdmin />} />
            <Route path="Categorias" element={<Categorias />} />
            <Route path="SubCategorias" element={<SubCategorias />} />
          </Route>

          <Route path="/Client" element={
            <ProtectedRoute allowedRoles={['Cliente']}>
              <ClientLayout />
            </ProtectedRoute>
          }>
            <Route path="Inicio" element={<InicioCliente />} />
            <Route path="Productos" element={<ProductosCliente />} />
            <Route path="Categorias" element={<CategoriasCliente />} />
          </Route>

          {/* Ruta de acceso denegado */}
          <Route path="/unauthorized" element={<Unauthorized />} />

          {/* Fallback para rutas no válidas */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Box>

    </>
  )
}

export default App
