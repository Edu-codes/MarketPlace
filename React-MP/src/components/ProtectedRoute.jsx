import { Navigate, Outlet } from 'react-router-dom';
import { useContext } from 'react';
import { MyContext } from '../context/Context';

const ProtectedRoute = ({ allowedRoles, children }) => {
  const { user } = useContext(MyContext);

   // Esperar a que se cargue el usuario desde sessionStorage
  if (user === null) return null; // o un loading spinner


  if (!user) {
    return <Navigate to="/" replace />; // No hay sesión, redirige al login
  }

  const hasAccess = user.roles?.some(role => allowedRoles.includes(role));


  if (!hasAccess) {
    return <Navigate to="/unauthorized" replace />; // Tiene sesión, pero no el rol
  }

  return children ? children : <Outlet />;
};

export default ProtectedRoute;
