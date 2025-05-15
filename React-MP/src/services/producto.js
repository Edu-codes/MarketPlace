import api from "./api";

let url = "https://localhost:44369/api/Producto";

export const getAllProductos = async () => {
    try {
        const solicitudApi = "/Lista"
        const response = await api.get(`${url}${solicitudApi}`)
        console.log(response.status)
        return response.data
    } catch (error) {
        console.log("Error al traer datos", error);
        throw error;
    }
}
export const ProductoPorId = async () => {
    try {
        const solicitudApi = "Lista"
        const response = await api.get(`${url}${solicitudApi}`)

        return response.data
    } catch (error) {
        console.log("Error al traer datos", error);
        throw error;
    }
}

export const actualizarProducto = async (id, data) => {
    const user = JSON.parse(sessionStorage.getItem("user"));
    const token = user?.token;
    console.log(token)
    try {
        const response = await api.put(`Producto/ActualizarProducto/${id}`, data,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }


        );
        return response.data;
    } catch (error) {
        if (error.response && error.response.status === 403) {
            alert('No tienes permiso para actualizar este producto.');
        } else if (error.response && error.response.status === 401) {
            alert('No estás autenticado. Por favor inicia sesión.');
        } else {
            console.error('Error al actualizar el producto:', error);
        }
        throw error;
    }
};

export const eliminarProducto = async (id) => {
    try {
        const token = sessionStorage.getItem('token')
        const response = api.delete(`${url}/EliminarProducto?id=${id}`)

        return response.data
    } catch (error) {
        console.log("error al eliminar el priducto")
        throw error
    }
}