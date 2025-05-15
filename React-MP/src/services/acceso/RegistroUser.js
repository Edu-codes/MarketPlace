import axios from "axios";
import api from "../api";
const url = "https://localhost:44369/api/Acceso/Registrarse"


export const registroUser = async (data) => {

    try {
        const response = await api.post(`${url}`, data)
        return response.data

    } catch (error) {
        console.error("error:", error)
        throw error || { message: 'Error al registrarse' };
    }
}