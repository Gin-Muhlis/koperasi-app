import { MemberState, RegisterState } from "@/types/interface";
import axios from "axios";

// API register
export async function register(data: RegisterState) {
 try {
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
  
    const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/register`, formData, {
      headers: {
        Accept: "application/json",
        "Content-Type": "multipart/form-data",
      },
    });
  
    return response;
 } catch (error: any) {
    return error.response
 }
}

// PAI Logout
export async function logout(token: string | undefined) {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/logout`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      }
    );

    return response
  } catch (error: any) {
    return error.response
  }
}

// API GET Member
export async function getMembers(token: string | undefined) {
  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/member`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    });

    return response.data.data
  } catch (error: any) {
    return error.response
  }
}

// API CREATE Member
export async function createMember(
  data: FormData,
  token: string | undefined
) {
  try {
    

    const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/member`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        "Content-Type": "multipart/form-data",
      },
    });

    return response
  } catch (error: any) {
    return error.response
  }
}

// API CREATE Member
export async function deleteMember(id: number, token: string | undefined) {
  try {
    const response = await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/member/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    });

    return response
  } catch (error: any) {
    return error.response
  }
}

// API CREATE Member
export async function updateMember(
  id: number,
  data: FormData,
  token: string | undefined,
) {
  try {
    const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/member/${id}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        "Content-Type": "multipart/form-data",
      },
    });

    return response
  } catch (error: any) {
    return error.response
  }
}

// API GET Role
export async function getRoles(token: string | undefined) {
  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/role`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json"
      }
    })

    return response.data.data
  } catch (error: any) {
    return error.response
  }
}

// API GET Profile
export async function getProfile(token: string | undefined) {
  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/profile`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json"
      }
    })

    return response.data.data
  } catch (error: any) {
    return error.response
  }
}

// API GET Category
export async function getCategories(token: string | undefined) {
  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/category`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json"
      }
    })

    return response.data.data
  } catch (error: any) {
    return error.response
  }
}

// API CREATE Category
export async function createCategory(
  data: FormData,
  token: string | undefined,
) {
  try {
    const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/category/`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    });

    return response
  } catch (error: any) {
    return error.response
  }
}

// API UPDATE Category
export async function updateCategory(
  id: number,
  data: FormData,
  token: string | undefined,
) {
  try {
    const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/category/${id}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    });

    return response
  } catch (error: any) {
    return error.response
  }
}

// API UPDATE Category
export async function deleteCategory(
  id: number,
  token: string | undefined,
) {
  try {
    const response = await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/category/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    });

    return response
  } catch (error: any) {
    return error.response
  }
}