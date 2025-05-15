// context/MyContext.jsx
import { createContext, useState, useEffect } from "react";

export const MyContext = createContext();

export const MyProvider = ({ children }) => {
  const [user, setUserState] = useState(null);

  // Cargar desde sessionStorage
  useEffect(() => {
    const storedUser = sessionStorage.getItem("user");
    if (storedUser) {
      setUserState(JSON.parse(storedUser));
    }
  }, []);

  // Actualizar usuario y sincronizar con sessionStorage
  const setUser = (newUser) => {
    setUserState(newUser);
    if (newUser) {
      sessionStorage.setItem("user", JSON.stringify(newUser));
    } else {
      sessionStorage.removeItem("user");
    }
  };

  // Cerrar sesión
  const logout = () => {
    sessionStorage.clear(); // o solo removeItem("user")
    setUserState(null);
  };

  return (
    <MyContext.Provider value={{ user, setUser, logout }}>
      {children}
    </MyContext.Provider>
  );
};
