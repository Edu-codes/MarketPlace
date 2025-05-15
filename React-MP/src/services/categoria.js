import axios from "axios";
import api from "./api";

const url = "https://localhost:44369/api/Categoria"

export const getAllCategorias = async() => {
    try{
        const solicitudApi = "/Lista"
        const response = await api.get(`${url}${solicitudApi}`)

        return response.data
    } catch (error) {
        console.log("Error al traer datos", error);
        throw error;
    }
} 

export const actualizarCategorias = async(id, data) => {
    try {

        const response = api.put(`${url}/ActualizarCategoria/${id}`, data)
        return(response.data)
        
    } catch (error) {

        console.log("Error al actualizar categoria")
        throw error;
    }
}

export const eliminarCategoria = async(id) =>{
    try {
        const response = await api.delete(`${url}/EliminarCat?id=${id}`)
        return response.data
    } catch (error) {
    console.log("error inesperado")
     throw error;
    }
}