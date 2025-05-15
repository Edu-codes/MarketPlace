// src/components/InactivityLogout.jsx
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const InactivityLogout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Función para cerrar sesión después de inactividad
    const timer = setTimeout(() => {
      sessionStorage.removeItem('user');  // Elimina datos de sesión
      sessionStorage.removeItem('token'); // Elimina token
      navigate('/');  // Redirige a la página de Login
    }, 1000 * 60 * 30); // 30 minutos de inactividad

    // Función que reinicia el timer cada vez que hay interacción del usuario
    const resetTimer = () => {
      clearTimeout(timer);
      setTimeout(() => {
        sessionStorage.removeItem('user');
        sessionStorage.removeItem('token');
        navigate('/');
      }, 1000 * 60 * 30); // 30 minutos de inactividad
    };

    // Escucha los eventos de interacción
    window.addEventListener('mousemove', resetTimer);
    window.addEventListener('keydown', resetTimer);

    // Cleanup: eliminar listeners cuando el componente se desmonte
    return () => {
      window.removeEventListener('mousemove', resetTimer);
      window.removeEventListener('keydown', resetTimer);
    };
  }, [navigate]);

  return null;  // No necesitamos renderizar nada
};

export default InactivityLogout;
