// src/components/InactivityLogout.jsx
import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const InactivityLogout = () => {
  const navigate = useNavigate();
  const timerRef = useRef(null); // Guarda el ID del timeout

  const logout = () => {
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('token');
    navigate('/');
  };

  const resetTimer = () => {
    if (timerRef.current) clearTimeout(timerRef.current); // Limpia el anterior
    timerRef.current = setTimeout(logout, 1000 * 60 * 30); // Reinicia timeout (30 min)
  };

  useEffect(() => {
    resetTimer(); // Inicia el primer timer

    const events = ['mousemove', 'keydown', 'click', 'scroll'];
    events.forEach((event) => window.addEventListener(event, resetTimer));

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current); // Limpieza al desmontar
      events.forEach((event) => window.removeEventListener(event, resetTimer));
    };
  }, [navigate]);

  return null;
};

export default InactivityLogout;
