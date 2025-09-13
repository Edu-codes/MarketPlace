import api from "./api";

const url = "https://localhost:44369/api/Imagen"
export const getAllFotos = async () => {

    try {
        const response = await api.get(`${url}/Lista`)
        console.log("foros", response)
        return response.data

    } catch (error) {
        console.error("error", error)
        throw (error)
    }
}

export const fotoPorId = async (id) => {
    try {
        const response = await api.get(`${url}/FotoPorId?Id=${id}`)
        return response.data
    } catch (error) {
        console.log("error al traer la foto por id", error)
        throw error
    }
}

export const crearFoto = async (data) => {
    try {
        const nuevaFoto = await api.post(`${url}/nuevaFoto`, data)
        console.log('fto:', nuevaFoto.data)

    } catch (error) {
        console.error("error foto:", error.message)
        throw error
    }
}

export const eliminarFoto = async (id) => {
    try {
        const response = await api.delete(`${url}/DeleteImagen/${id}`)
        return response.data
    } catch (error) {
        console.error("error al eliminar foto:", error.message)
        throw error
    }
}

export const asignarImagen = async (id) => {
    try {
        const response = await api.put(`${url}/AsignarImagen/${id}`)
        return response.data
    } catch (error) {
        console.error("error al asignar foto:", error.message)
        throw error
    }
}