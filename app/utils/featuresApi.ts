import { Invoice, Member, MemberState, RegisterState } from "@/types/interface";
import axios from "axios";
import { z } from "zod";
import { invoiceSchema } from "./formSchema";
import { format } from "date-fns";
import axiosInstance from "@/axiosConfig";

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
export async function createSavingMembers(
  data: any,
  token: string | undefined
) {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/saving-members`,
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

// API GET Payment Determination
export async function getPayments(token: string | undefined) {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/payment-determination`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      }
    );

    return response.data.data;
  } catch (error: any) {
    return error.Response;
  }
}

// API GET Payment Principal Member
export async function getPrincivalSavings(token: string | undefined) {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/tab/principal-saving`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      }
    );

    return response.data.data;
  } catch (error: any) {
    return error.Response;
  }
}

// API GET Position Category
export async function getPositionCategories(token: string | undefined) {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/position-category`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      }
    );

    return response.data.data;
  } catch (error: any) {
    return error.Response;
  }
}

// API GET Position Category
export async function getReceivables(token: string | undefined) {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/tab/receivable`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      }
    );
    return response.data.data;
  } catch (error: any) {
    return error.Response;
  }
}

// API GET Position Category
export async function getAccountsReceivable(token: string | undefined) {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/tab/accounts-receivable`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      }
    );
    return response.data.data;
  } catch (error: any) {
    return error.Response;
  }
}

// API Download Excel Report Payment
export async function downloadInvoiceReport(
  monthYear: string,
  token: string | undefined
) {
  try {
    const response: any = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/export/invoice/${monthYear}`, {
        responseType: "blob",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept:
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        },
      }
    );

    return response;
  } catch (error: any) {
    return error.response;
  }
}

// API CREATE Invoice
export async function createInvoice(
  data: {
    invoice_name: string;
    due_date: string;
    payment_source: string;
    payment_method: string
},
  token: string | undefined,
) {
  try {


    const response: any = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/invoice`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept:
            "application/json",
        },
      }
    );

    return response;
  } catch (error: any) {
    return error.response;
  }
}

// CREATE API Detail Invoice
export async function createDetailInvoice(
  principalSavings: Member[] | undefined,
  mandatorySavings: Member[] | undefined,
  specialMandatorySavings: Member[] | undefined,
  voluntarySavings: Member[] | undefined,
  recretionalSavings: Member[] | undefined,
  receivables: Member[] | undefined,
  accountsReceivable: Member[] | undefined,
  token: string | undefined,
  monthYear: string,
  description: string,
  invoiceId: number
) {
  try {
    const data = {
      principal_savings: principalSavings,
      mandatory_savings: mandatorySavings,
      special_mandatory_savings: specialMandatorySavings,
      voluntary_savings: voluntarySavings,
      recretional_savings: recretionalSavings,
      receivables,
      accounts_receivable: accountsReceivable,
      month_year: monthYear,
      description,
      invoice_id: invoiceId
    };

    const response: any = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/invoice-detail`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept:
            "application/json",
        },
      }
    );

    return response;
  } catch (error: any) {
    return error.response;
  }
}

// GET API Invoice
export async function getInvoices(token: string | undefined) {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/invoice`,
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

// GET API Member Principal Saving
export async function getMemberPrincipalSaving(token: string | undefined) {
  try {
    const response = await axiosInstance.get('/member-principal', {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    })

    return response.data.data
  } catch (error: any) {
    return error.response
  }
}

// GET API Member Principal Saving
export async function getMemberMandatorySaving(token: string | undefined) {
  try {
    const response = await axiosInstance.get('/member-mandatory', {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    })

    return response.data.data
  } catch (error: any) {
    return error.response
  }
}

