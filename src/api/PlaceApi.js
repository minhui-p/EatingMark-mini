import axios from "axios"

const baseURL = "http://localhost:3000/"

export const fetchPlaces = async () => {
    try {
        const response = await axios.get(`${baseURL}places`)
        return response.data.places
    } catch (error) {
        console.error("API 호출 실패!!:", error)
        return []
    }
}

