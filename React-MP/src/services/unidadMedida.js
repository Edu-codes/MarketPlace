import api from "./api";
import axios from "axios";

const url = "https://localhost:44369/api/UnidadesMedidum"

export const getAllUnidadMedida = async() => {

    try {
        const response = await api.get(`${url}/Lista`) 
        return response.data
    } catch (error) {
        console.log("error al traer lista de unidades de medida", error)
        throw error;
    }

}