import {
  Invoice,
  Member,
  MemberState,
  PaymentState,
  ReceivableData,
  RegisterState,
  installmentData,
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
    const response = await axiosInstance.get(`/group-member`, {
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
  members: any[],
  monthYear: string,
  description: string,
  invoiceId: number,
  token: string | undefined
) {
  try {
    const data = {
      members,
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
  data: FormData,
  token: string | undefined
) {
  try {
    const response = await axiosInstance.post(`payment`, data, {
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

// DOWNLOAD API Detail Invoice Excel
export async function downloadExcelInvoice(
  invoiceCode: string,
  token: string | undefined
) {
  try {

    const response: any = await axiosInstance.get(
      `export/invoice-excel/${invoiceCode}`,
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
  invoiceCode: string,
  token: string | undefined
) {
  try {

    const response: any = await axiosInstance.get(
      `export/invoice-pdf/${invoiceCode}`,
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

// DOWNLOAD API Detail Invoice member PDF
export async function downloadPdfInvoiceMember(
  memberId: number,
  invoiceCode: string,
  token: string | undefined
) {
  try {
    const data = {
      member_id: memberId,
      invoice_code: invoiceCode
    };

    const response: any = await axiosInstance.post(
      `/export/invoice-member`,
      data,
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


// API CREATE Angsuran
export async function createInstallmentMember(data: installmentData, token: string | undefined) {
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

// API GET MEMBERS INVOICES
export async function getMembersInvoice(token: string | undefined) {
  try {
    const response = await axiosInstance.get(`/members-invoice`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data.data;
  } catch (error: any) {
    return error.response;
  }   
}

// API GET Sub Category Invoices
export async function getSubCategoriesInvoice(token: string | undefined) {
  try {
    const response = await axiosInstance.get(`/sub-categories-invoice`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data.data;
  } catch (error: any) {
    return error.response;
  }
}

// API UPDATE Password User
export async function changePassword(data: FormData, id: number, token: string | undefined) {
  try {
    const response = await axiosInstance.post(`change-password/${id}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response;
  } catch (error: any) {
    return error.response;
  }
}

// API GET Profil App
export async function getProfilApp(token: string | undefined) {
  try {
    const response = await axiosInstance.get(`profile-app`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data.data;
  } catch (error: any) {
    return error.response;
  }
}

// API Update Profile App
export async function updateProfileApp(
  id: number,
  data: FormData,
  token: string | undefined
) {
  try {
    const response = await axiosInstance.post(`profile-app/${id}`, data, {
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

// API GET Saving Sub Categories
export async function getSubCategoriesSaving(token: string | undefined) {
  try {
    const response = await axiosInstance.get(`sub-categories-saving`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data.data;
  } catch (error: any) {
    return error.response;
  }
}

// API GET Savings Member
export async function getSavingsMember(token: string | undefined) {
  try {
    const response = await axiosInstance.get(`saving`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data.data;
  } catch (error: any) {
    return error.response;
  }
}

// API GET Member Saving
export async function getMemberSaving(token: string | undefined) {
  try {
    const response = await axiosInstance.get(`member-saving`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data.data;
  } catch (error: any) {
    return error.response;
  }
}

// API GET Loan Sub Categories
export async function getSubCategoriesLoan(token: string | undefined) {
  try {
    const response = await axiosInstance.get(`sub-categories-receivable`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data.data;
  } catch (error: any) {
    return error.response;
  }
}

// API GET Loan Sub Categories
export async function getLoansMember(token: string | undefined) {
  try {
    const response = await axiosInstance.get(`receivable`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data.data;
  } catch (error: any) {
    return error.response;
  }
}

// API GET Member Have Loan
export async function getInstallmentMembers(token: string | undefined) {
  try {
    const response = await axiosInstance.get(`installment`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data.data;
  } catch (error: any) {
    return error.response;
  }
}

// DOWNLOAD API Laporan Anggota
export async function downloadExcelReportMembers(
  token: string | undefined
) {
  try {

    const response: any = await axiosInstance.get(
      `report/export/report-members`,
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


// DOWNLOAD API Report member
export async function downloadPdfReportMember(
  id: number,
  token: string | undefined
) {
  try {

    const response: any = await axiosInstance.get(
      `report/export/report-member/${id}`,
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

// API GET Sub Kategori SImpanan
export async function getReportSavingMembers(token: string | undefined) {
  try {
    const response = await axiosInstance.get(`report/saving-members`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data.data;
  } catch (error: any) {
    return error.response;
  }
}


// DOWNLOAD API Laporan Simpanan Anggota
export async function downloadExcelReportSavingMembers(
  token: string | undefined
) {
  try {

    const response: any = await axiosInstance.get(
      `report/export/report-saving-members`,
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

// DOWNLOAD API Laporan Simpanan Anggota Per Member
export async function downloadPdfReportSavingMember(
  id: number,
  token: string | undefined
) {
  try {

    const response: any = await axiosInstance.get(
      `report/export/report-saving-member/${id}`,
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


// DOWNLOAD API Laporan Pinjaman Anggota
export async function downloadExcelReportLoanMembers(
  token: string | undefined
) {
  try {

    const response: any = await axiosInstance.get(
      `report/export/report-loan-members`,
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

// DOWNLOAD API Laporan Pinjaman Anggota Per Member
export async function downloadPdfReportLoanMember(
  id: number,
  token: string | undefined
) {
  try {

    const response: any = await axiosInstance.get(
      `report/export/report-loan-member/${id}`,
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

// API UPDATE Password Member
export async function changePasswordMember(data: FormData, token: string | undefined) {
  try {
    const response = await axiosInstance.post(`change-password-member`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response;
  } catch (error: any) {
    return error.response;
  }
}

// API GET Download Daftar Anggota
export async function downloadMembersData(
  token: string | undefined
) {
  try {

    const response: any = await axiosInstance.get(
      `export/members`,
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