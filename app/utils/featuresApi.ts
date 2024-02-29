import {
  Invoice,
  Member,
  MemberState,
  PaymentState,
  ReceivableData,
  RegisterState,
} from "@/types/interface";
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
    formData.append("group_id", data.group_id);
    formData.append("gender", data.gender);
    formData.append("religion", data.religion);

    if (data.imageProfile !== null) {
      formData.append("image", data.imageProfile);
    }

    const response = await axiosInstance.post(`/register`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response;
  } catch (error: any) {
    return error.response;
  }
}

// API GET Golongan untuk daftar
export async function getRegisterPositioCategories() {
  try {
    const response = await axiosInstance.get('/register/position-categories');

    return response.data.data;
  } catch (error: any) {
    return error.response
  }
}

// PAI Logout
export async function logout(token: string | undefined) {
  try {
    const response = await axiosInstance.post(
      `/logout`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
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
    const response = await axiosInstance.get(`/member`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data.data;
  } catch (error: any) {
    return error.response;
  }
}

// API CREATE Member
export async function createMember(data: FormData, token: string | undefined) {
  try {
    const response = await axiosInstance.post(`/member`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
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
    const response = await axiosInstance.delete(`/member/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

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
    const response = await axiosInstance.post(`/member/${id}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });

    return response;
  } catch (error: any) {
    return error.response;
  }
}

// API GET Role
export async function getRoles(token: string | undefined) {
  try {
    const response = await axiosInstance.get(`/role`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data.data;
  } catch (error: any) {
    return error.response;
  }
}

// API GET Profile
export async function getProfile(token: string | undefined) {
  try {
    const response = await axiosInstance.get(`/profile`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data.data;
  } catch (error: any) {
    return error.response;
  }
}

// API UPDATE PROFILE
export async function updateProfile(
  id: number,
  data: FormData,
  token: string | undefined
) {
  try {
    
    const response = await axiosInstance.post(`/profile/${id}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });

    return response;
  } catch (error: any) {
    return error.response;
  }
}

// API GET Category
export async function getCategories(token: string | undefined) {
  try {
    const response = await axiosInstance.get(`/category`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

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
    const response = await axiosInstance.post(`/category/`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

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
    const response = await axiosInstance.post(`/category/${id}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response;
  } catch (error: any) {
    return error.response;
  }
}

// API UPDATE Category
export async function deleteCategory(id: number, token: string | undefined) {
  try {
    const response = await axiosInstance.delete(`/category/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response;
  } catch (error: any) {
    return error.response;
  }
}

// API GET Sub-Category
export async function getSubCategories(token: string | undefined) {
  try {
    const response = await axiosInstance.get(`/sub-category`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

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
    const response = await axiosInstance.post(`/sub-category/`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

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
    const response = await axiosInstance.post(`/sub-category/${id}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response;
  } catch (error: any) {
    return error.response;
  }
}

// API DELETE Sub-Category
export async function deleteSubCategory(id: number, token: string | undefined) {
  try {
    const response = await axiosInstance.delete(`/sub-category/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response;
  } catch (error: any) {
    return error.response;
  }
}

// API GET Product
export async function getProducts(token: string | undefined) {
  try {
    const response = await axiosInstance.get(`/product`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data.data;
  } catch (error: any) {
    return error.response;
  }
}

// API CREATE Product
export async function createProduct(data: FormData, token: string | undefined) {
  try {
    const response = await axiosInstance.post(`/product/`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response;
  } catch (error: any) {
    return error.response;
  }
}

// API DELETE Product
export async function deleteProduct(id: number, token: string | undefined) {
  try {
    const response = await axiosInstance.delete(`/product/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

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
    const response = await axiosInstance.post(`/product/${id}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response;
  } catch (error: any) {
    return error.response;
  }
}

// API GET Stuff
export async function getStuffs(token: string | undefined) {
  try {
    const response = await axiosInstance.get(`/stuff`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data.data;
  } catch (error: any) {
    return error.response;
  }
}

// API CREATE Stuff
export async function createStuff(data: FormData, token: string | undefined) {
  try {
    const response = await axiosInstance.post(`/stuff/`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

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
    const response = await axiosInstance.post(`/stuff/${id}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response;
  } catch (error: any) {
    return error.response;
  }
}

// API DELETE Stuff
export async function deleteStuff(id: number, token: string | undefined) {
  try {
    const response = await axiosInstance.delete(`/stuff/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

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
    const response = await axiosInstance.post(`/saving`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response;
  } catch (error: any) {
    return error.response;
  }
}

// API GET Payment Principal Member
export async function getPrincivalSavings(token: string | undefined) {
  try {
    const response = await axiosInstance.get(`/tab/principal-saving`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data.data;
  } catch (error: any) {
    return error.response;
  }
}

// API GET Position Category
export async function getPositionCategories(token: string | undefined) {
  try {
    const response = await axiosInstance.get(`/position-category`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data.data;
  } catch (error: any) {
    return error.response;
  }
}

// API CREATE Position Category
export async function createPositionCategory(
  data: FormData,
  token: string | undefined
) {
  try {
    const response = await axiosInstance.post(`/position-category`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response;
  } catch (error: any) {
    return error.response;
  }
}

// API UPDATE Position Category
export async function updatePositionCategory(
  id: number,
  data: FormData,
  token: string | undefined
) {
  try {
    const response = await axiosInstance.post(
      `/position-category/${id}`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response;
  } catch (error: any) {
    return error.response;
  }
}

// API DELETE Position Category
export async function deletePositionCategory(
  id: number,
  token: string | undefined
) {
  try {
    const response = await axiosInstance.delete(`/position-category/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response;
  } catch (error: any) {
    return error.response;
  }
}

// API GET Piutang S/P
export async function getReceivables(token: string | undefined) {
  try {
    const response = await axiosInstance.get(`/tab/receivable`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.data;
  } catch (error: any) {
    return error.response;
  }
}

// API GET Piutang Dagang
export async function getAccountsReceivable(token: string | undefined) {
  try {
    const response = await axiosInstance.get(`/tab/accounts-receivable`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.data;
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
    payment_method: string;
  },
  token: string | undefined
) {
  try {
    const response: any = await axiosInstance.post(`/invoice`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

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
      invoice_id: invoiceId,
    };

    const response: any = await axiosInstance.post(`/invoice-detail`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response;
  } catch (error: any) {
    return error.response;
  }
}

// GET API Invoice
export async function getInvoices(token: string | undefined) {
  try {
    const response = await axiosInstance.get(`/invoice`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data.data;
  } catch (error: any) {
    return error.response;
  }
}

// GET API Member simpanan pokok
export async function getMemberPrincipalSaving(token: string | undefined) {
  try {
    const response = await axiosInstance.get("/member-principal", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data.data;
  } catch (error: any) {
    return error.response;
  }
}

// GET API Member simapan wajib
export async function getMemberMandatorySaving(token: string | undefined) {
  try {
    const response = await axiosInstance.get("/member-mandatory", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data.data;
  } catch (error: any) {
    return error.response;
  }
}

// GET API Member simapan wajib khusus
export async function getMemberSpecialMandatorySaving(
  token: string | undefined
) {
  try {
    const response = await axiosInstance.get("/member-mandatory", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data.data;
  } catch (error: any) {
    return error.response;
  }
}

// GET API Member simapan sukarela
export async function getMemberVoluntarySaving(token: string | undefined) {
  try {
    const response = await axiosInstance.get("/member-voluntary", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data.data;
  } catch (error: any) {
    return error.response;
  }
}

// GET API Member tabungan rekreasi
export async function getMemberRecretionalSaving(token: string | undefined) {
  try {
    const response = await axiosInstance.get("/member-recretional", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data.data;
  } catch (error: any) {
    return error.response;
  }
}

// GET API Member piutang s/p
export async function getMemberReceivable(token: string | undefined) {
  try {
    const response = await axiosInstance.get("/member-receivable", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data.data;
  } catch (error: any) {
    return error.response;
  }
}

// GET API Member piutang dagang
export async function getMemberAccountReceivable(token: string | undefined) {
  try {
    const response = await axiosInstance.get("/member-account-receivable", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data.data;
  } catch (error: any) {
    return error.response;
  }
}

// GET API Detail Invoice
export async function getDetailInvoice(
  token: string | undefined,
  code: string
) {
  try {
    const response = await axiosInstance.get(`/invoice-detail/${code}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data.data;
  } catch (error: any) {
    return error.response;
  }
}

// CREATE API Payment
export async function createPaymentInvoice(
  data: PaymentState,
  token: string | undefined
) {
  try {
    const response = await axiosInstance.post(`payment`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response;
  } catch (error: any) {
    return error.response;
  }
}

// DOWNLOAD API Detail Invoice Excel
export async function downloadExcelInvoice(
  data: Invoice[],
  timeInvoice: string,
  token: string | undefined
) {
  try {
    const invoiceData = {
      data: data,
      time_invoice: timeInvoice,
    };

    const response: any = await axiosInstance.post(
      `export/invoice-excel`,
      invoiceData,
      {
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

// DOWNLOAD API Detail Invoice PDF
export async function downloadPdfInvoice(
  data: Invoice[],
  timeInvoice: string,
  token: string | undefined
) {
  try {
    const invoiceData = {
      data: data,
      time_invoice: timeInvoice,
    };

    const response: any = await axiosInstance.post(
      `export/invoice-pdf`,
      invoiceData,
      {
        responseType: "blob",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/pdf",
        },
      }
    );

    return response;
  } catch (error: any) {
    return error.response;
  }
}

// API GET Dashboard Member
export async function getDashboardMember(
  token: string | undefined
) {
  try {
    const response = await axiosInstance.get(`/dashboard/member`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data.data;
  } catch (error: any) {
    return error.response;
  }
}

// API GET Dashboard Admin
export async function getDashboardAdmin(token: string | undefined) {
  try {
    const response = await axiosInstance.get(`/dashboard/admin`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data.data;
  } catch (error: any) {
    return error.response;
  } 
}

// API CREATE Pinjaman
export async function createLoanMember(data: ReceivableData, token: string | undefined) {
  try {
      const response = await axiosInstance.post('/receivable', data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      return response;
  } catch (error: any) {
    return error.response;
  } 

}

// API GET Laporan Anggota
export async function getReportMembers(token: string | undefined) {
  try {
    const response = await axiosInstance.get(`/report/members`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data.data;
  } catch (error: any) {
    return error.response;
  } 
}

// API GET Laporan Per orang
export async function getReportMember(token: string | undefined) {
  try {
    const response = await axiosInstance.get(`/report/nasabah`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data.data;
  } catch (error: any) {
    return error.response;
  } 
}

// API GET Laporan Pinjaman Member
export async function getReportLoanMembers(token: string | undefined) {
  try {
    const response = await axiosInstance.get(`/report/loan-members`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data.data;
  } catch (error: any) {
    return error.response;
  } 
}

// API CREATE Angsuran
export async function createInstallmentMember(data: any, token: string | undefined) {
  try {
      const response = await axiosInstance.post('/installment', data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      return response;
  } catch (error: any) {
    return error.response;
  } 

}
