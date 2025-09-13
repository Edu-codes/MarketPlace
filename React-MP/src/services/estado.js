import api from "./api";

const url = "https://localhost:44369/api/Estado"

export const getAllEstado = async() => {
    try {
        const response = await api.get(`${url}/Lista`)
        return response.data
        
    } catch (error) {
        console.error("error: ", error)
        throw (error);
        
    }


}