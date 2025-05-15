import axios from "axios";
import api from "./api";

const url = "https://localhost:44369/api/SubCategoria"

export const getAllSubCategorias = async() => {
    try{
        const solicitudApi = "/Lista"
        const response = await api.get(`${url}${solicitudApi}`)

        return response.data
    } catch (error) {
        console.log("Error al traer datos", error);
        throw error;
    }
} 

export const actualizarSubCategoria = async (id, data) => {

    try {
       
    const response = await api.put(`${url}/ActualizarSubCat/${id}`, data)


        return response.data 
    } catch (error) {
        console.log("error al actualizar subCategoria", error)
        throw error;
    }

        
}