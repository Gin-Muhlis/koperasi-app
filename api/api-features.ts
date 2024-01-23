import { MemberState, RegisterState } from "@/types/interface";
import axios from "axios";

const API_URL = "http://127.0.0.1:8000/api";

// API register
export async function registerAPI(data: RegisterState) {
  const formData = new FormData();

  formData.append("name", data.name);
  formData.append("password", data.password);
  formData.append("email", data.email);
  formData.append("address", data.address);
  formData.append("phone_number", data.phone);
  formData.append("position", data.role);
  formData.append("gender", data.gender);
  formData.append("religion", data.religion);

  if (data.imageProfile !== null) {
    formData.append("image", data.imageProfile);
  }

  const response = await axios.post(`${API_URL}/register`, formData, {
    headers: {
      Accept: "application/json",
      "Content-Type": "multipart/form-data",
    },
  });

  return response;
}

// PAI Logout
export async function logout(token: string | undefined) {
  try {
    const response = await axios.post(`${API_URL}/logout`, {}, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    });

    return response;
  } catch (error: any) {
    return error.response;
  }
}

// API GET Member
export async function getMembers(token: string | undefined) {
  try {
    const response = await axios.get(`${API_URL}/member`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    });

    return response;
  } catch (error: any) {
    return error.response;
  }
}

// API CREATE Member
export async function createMember(data: MemberState, token: string | undefined) {
    try {
        const formData = new FormData();

        formData.append("username", data.username);
        formData.append("password", data.password);
        formData.append("email", data.email);
        formData.append("name", data.name);
        formData.append("address", data.address);
        formData.append("phone_number", data.phone_number);
        formData.append("position", data.role);
        formData.append("gender", data.gender);
        formData.append("religion", data.religion);
      
        if (data.imageProfile !== null) {
          formData.append("image", data.imageProfile);
        }

      const response = await axios.post(`${API_URL}/member`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
          "Content-Type": "multipart/form-data",
        },
      });
  
      return response;
    } catch (error: any) {
      return error.response;
    }
  }
  

// API CREATE Member
export async function deleteMember(id: number, token: string | undefined) {
    try {
      const response = await axios.delete(`${API_URL}/member/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      });
  
      return response;
    } catch (error: any) {
      return error.response;
    }
  }
  