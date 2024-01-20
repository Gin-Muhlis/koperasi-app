import { RegisterState } from "@/types/interface";
import axios from "axios";

export async function registerAPI(data: RegisterState) {
    const formData = new FormData()

    formData.append("name", data.name)
    formData.append("password", data.password)
    formData.append("email", data.email)
    formData.append("address", data.address)
    formData.append("phone_number", data.phone)
    formData.append("position", data.role)
    formData.append("gender", data.gender)
    formData.append("religion", data.religion)
    formData.append("image", data.imageProfile)

    const response = await axios.post(`http://127.0.0.1:8000/api/register`, formData, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'multipart/form-data',
        }
    })

    return response;

}