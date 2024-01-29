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

    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/register`,
      formData,
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return response;
  } catch (error: any) {
    return error.response;
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

    return response;
  } catch (error: any) {
    return error.response;
  }
}

// API GET Member
export async function getMembers(token: string | undefined) {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/member`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      }
    );

    return response.data.data;
  } catch (error: any) {
    return error.response;
  }
}

// API CREATE Member
export async function createMember(data: FormData, token: string | undefined) {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/member`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return response;
  } catch (error: any) {
    return error.response;
  }
}

// API CREATE Member
export async function deleteMember(id: number, token: string | undefined) {
  try {
    const response = await axios.delete(
      `${process.env.NEXT_PUBLIC_API_URL}/member/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      }
    );

    return response;
  } catch (error: any) {
    return error.response;
  }
}

// API CREATE Member
export async function updateMember(
  id: number,
  data: FormData,
  token: string | undefined
) {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/member/${id}`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return response;
  } catch (error: any) {
    return error.response;
  }
}

// API GET Role
export async function getRoles(token: string | undefined) {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/role`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      }
    );

    return response.data.data;
  } catch (error: any) {
    return error.response;
  }
}

// API GET Profile
export async function getProfile(token: string | undefined) {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/profile`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      }
    );

    return response.data.data;
  } catch (error: any) {
    return error.response;
  }
}

// API GET Category
export async function getCategories(token: string | undefined) {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/category`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      }
    );

    return response.data.data;
  } catch (error: any) {
    return error.response;
  }
}

// API CREATE Category
export async function createCategory(
  data: FormData,
  token: string | undefined
) {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/category/`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      }
    );

    return response;
  } catch (error: any) {
    return error.response;
  }
}

// API UPDATE Category
export async function updateCategory(
  id: number,
  data: FormData,
  token: string | undefined
) {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/category/${id}`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      }
    );

    return response;
  } catch (error: any) {
    return error.response;
  }
}

// API UPDATE Category
export async function deleteCategory(id: number, token: string | undefined) {
  try {
    const response = await axios.delete(
      `${process.env.NEXT_PUBLIC_API_URL}/category/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      }
    );

    return response;
  } catch (error: any) {
    return error.response;
  }
}

// API GET Sub-Category
export async function getSubCategories(token: string | undefined) {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/sub-category`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      }
    );

    return response.data.data;
  } catch (error: any) {
    return error.response;
  }
}

// API CREATE Sub-Category
export async function createSubCategory(
  data: FormData,
  token: string | undefined
) {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/sub-category/`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      }
    );

    return response;
  } catch (error: any) {
    return error.response;
  }
}

// API UPDATE Sub-Category
export async function updateSubCategory(
  id: number,
  data: FormData,
  token: string | undefined
) {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/sub-category/${id}`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      }
    );

    return response;
  } catch (error: any) {
    return error.response;
  }
}

// API DELETE Sub-Category
export async function deleteSubCategory(id: number, token: string | undefined) {
  try {
    const response = await axios.delete(
      `${process.env.NEXT_PUBLIC_API_URL}/sub-category/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      }
    );

    return response;
  } catch (error: any) {
    return error.response;
  }
}

// API GET Product
export async function getProducts(token: string | undefined) {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/product`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      }
    );

    return response.data.data;
  } catch (error: any) {
    return error.response;
  }
}

// API CREATE Product
export async function createProduct(data: FormData, token: string | undefined) {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/product/`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      }
    );

    return response;
  } catch (error: any) {
    return error.response;
  }
}

// API DELETE Product
export async function deleteProduct(id: number, token: string | undefined) {
  try {
    const response = await axios.delete(
      `${process.env.NEXT_PUBLIC_API_URL}/product/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      }
    );

    return response;
  } catch (error: any) {
    return error.response;
  }
}

// API UPDATE Product
export async function updateProduct(
  id: number,
  data: FormData,
  token: string | undefined
) {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/product/${id}`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      }
    );

    return response;
  } catch (error: any) {
    return error.response;
  }
}

// API GET Stuff
export async function getStuffs(token: string | undefined) {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/stuff`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      }
    );

    return response.data.data;
  } catch (error: any) {
    return error.response;
  }
}

// API CREATE Stuff
export async function createStuff(data: FormData, token: string | undefined) {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/stuff/`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      }
    );

    return response;
  } catch (error: any) {
    return error.response;
  }
}

// API UPDATE Stuff
export async function updateStuff(
  id: number,
  data: FormData,
  token: string | undefined
) {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/stuff/${id}`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      }
    );

    return response;
  } catch (error: any) {
    return error.response;
  }
}

// API DELETE Stuff
export async function deleteStuff(id: number, token: string | undefined) {
  try {
    const response = await axios.delete(
      `${process.env.NEXT_PUBLIC_API_URL}/stuff/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      }
    );

    return response;
  } catch (error: any) {
    return error.response;
  }
}

// API CREATE SAVING
export async function createSavingMembers(data: any, token: string | undefined) {
  try {
    const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/saving-members`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json"
      }
    })

    return response
  } catch (error: any) {
    return error.response
  }
}

