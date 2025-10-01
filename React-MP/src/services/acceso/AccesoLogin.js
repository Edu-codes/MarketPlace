import axios from "axios";


const baseUrl = "https://localhost:44369/api/Acceso/Login";

export const loginUser = async (doc, password) => {
  try {
    const token = sessionStorage.getItem("token")
    const response = await axios.post(baseUrl, { doc, password },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log("datos:", response.data)
    return response.data; // <--- aquí se espera que venga { token, user }
  }
  catch (error) {
    if (error.response && error.response.status === 403) {
      alert('No tienes permiso para actualizar este producto.');
    } else if (error.response && error.response.status === 401) {
      alert('No estás autenticado. Por favor inicia sesión.');
    } else {
      console.error('Error al actualizar el producto:', error);
    }
    throw error.response?.data || { message: "Error al consumir el servicio" };
  }
};

