import * as z from "zod";

export const createMemberSchema = z.object({
  name: z
    .string({
      invalid_type_error: "Nama harus valid",
    })
    .max(100, {
      message: "Nama tidak boleh lebih dari 100 karakter",
    })
    .min(1, {
      message: "Nama tidak boleh kosong",
    }),
  email: z
    .string({
      invalid_type_error: "Email harus valid",
    })
    .email({
      message: "Email harus valid",
    })
    .min(1, {
      message: "Email tidak boleh kosong",
    }),
  address: z
    .string({
      invalid_type_error: "Alamat harus valid",
    })
    .min(1, {
      message: "Alamat tidak boleh kosong",
    }),
  phone_number: z
    .string()
    .max(20, {
      message: "No Telp tidak boleh lebih dari 20 karakter",
    })
    .min(1, {
      message: "No Telp tidak boleh kosong",
    }),
  religion: z
    .string({
      invalid_type_error: "Alamat harus valid",
    })
    .min(1, {
      message: "Agama tidak boleh kosong",
    })
    .max(20, {
      message: "No Telp tidak boleh lebih dari 20 karakter",
    })
    .toLowerCase(),
  gender: z.enum(["L", "P"]),
  position: z.enum(["pns", "p3k", "cpns"]),
  image: z.any(),
  username: z
    .string({
      invalid_type_error: "Username harus valid",
    })
    .max(100, {
      message: "Username tidak boleh lebih dari 100 karakter",
    })
    .min(1, {
      message: "Username tidak boleh kosong",
    }),
  password: z
    .string({
      invalid_type_error: "Password harus valid",
    })
    .min(8, {
      message: "Password minimal 8 karakter",
    }),
  role: z.enum(["super-admin", "member"]),
});

export const updateMemberSchema = z.object({
  name: z
    .string({
      invalid_type_error: "Nama harus valid",
    })
    .max(100, {
      message: "Nama tidak boleh lebih dari 100 karakter",
    })
    .min(1, {
      message: "Nama tidak boleh kosong",
    }),
  email: z
    .string({
      invalid_type_error: "Email harus valid",
    })
    .email({
      message: "Email harus valid",
    })
    .min(1, {
      message: "Email tidak boleh kosong",
    }),
  address: z
    .string({
      invalid_type_error: "Alamat harus valid",
    })
    .min(1, {
      message: "Alamat tidak boleh kosong",
    }),
  phone_number: z
    .string()
    .max(20, {
      message: "No Telp tidak boleh lebih dari 20 karakter",
    })
    .min(1, {
      message: "No Telp tidak boleh kosong",
    }),
  religion: z
    .string({
      invalid_type_error: "Alamat harus valid",
    })
    .min(1, {
      message: "Agama tidak boleh kosong",
    })
    .max(20, {
      message: "No Telp tidak boleh lebih dari 20 karakter",
    })
    .toLowerCase(),
  gender: z.enum(["L", "P"]),
  position: z.enum(["pns", "p3k", "cpns"]),
  image: z.any(),
  username: z
    .string({
      invalid_type_error: "Username harus valid",
    })
    .max(100, {
      message: "Username tidak boleh lebih dari 100 karakter",
    })
    .min(1, {
      message: "Username tidak boleh kosong",
    }),
  password: z.optional(z.string()),
  role: z.enum(["super-admin", "member"]),
  active: z.boolean(),
});

export const categorySchema = z.object({
  name: z.string({
    invalid_type_error: "Nama kategori harus valid",
    required_error: "Nama tidak boleh kosong",
  }),
});

export const createSubCategorySchema = z.object({
  name: z
    .string({
      invalid_type_error: "Nama kategori harus valid",
      required_error: "Nama tidak boleh kosong",
    })
    .max(255, {
      message: "Nama kategori tidak boleh lebih dari 255 karakter",
    }),
  type: z.enum(["debit", "kredit"]),
  category_id: z.string({
    required_error: "Kategori tidak boleh kosong",
    invalid_type_error: "Kategori tidak valid",
  }),
});

export const updateSubCategorySchema = z.object({
  name: z
    .string({
      invalid_type_error: "Nama kategori harus valid",
      required_error: "Nama tidak boleh kosong",
    })
    .max(255, {
      message: "Nama kategori tidak boleh lebih dari 255 karakter",
    }),
  type: z.enum(["debit", "kredit"]),
  category_id: z.optional(
    z.string({
      required_error: "Kategori tidak boleh kosong",
      invalid_type_error: "Kategori tidak valid",
    })
  ),
});

export const productSchema = z.object({
  name: z.string({
    invalid_type_error: "Nama produk harus valid",
    required_error: "Nama tidak boleh kosong",
  }),
});

export const addStuffSchema = z.object({
  name: z
    .string({
      invalid_type_error: "Nama barang harus valid",
      required_error: "Nama barang tidak boleh kosong",
    })
    .max(255, {
      message: "Nama barang tidak boleh lebih dari 255 karakter",
    }),
  price: z.string({
    invalid_type_error: "Harga barang harus valid",
    required_error: "Harga barang tidak boleh kosong",
  }),
  image: z.any(),
  product_id: z.string({
    required_error: "Kategori tidak boleh kosong",
    invalid_type_error: "Kategori tidak valid",
  }),
});

export const editStuffSchema = z.object({
  name: z
    .string({
      invalid_type_error: "Nama barang harus valid",
      required_error: "Nama barang tidak boleh kosong",
    })
    .max(255, {
      message: "Nama barang tidak boleh lebih dari 255 karakter",
    }),
  price: z.string({
    invalid_type_error: "Harga barang harus valid",
    required_error: "Harga barang tidak boleh kosong",
  }),
  image: z.any(),
  product_id: z.optional(
    z.string({
      required_error: "Kategori tidak boleh kosong",
      invalid_type_error: "Kategori tidak valid",
    })
  ),
});

export const addPaymentDeterminationSchema = z.object({
  sub_category_id: z.string({
    required_error: "Sub kategori tidak boleh kosong",
    invalid_type_error: "Sub kategori tidak valid",
  }),

  amount: z.number({
    required_error: "Jumlah tidak boleh kosong",
    invalid_type_error: "Jumlah tidak valid",
  }),

  payment_month: z.string({
    required_error: "Bulan pembayaran tidak boleh kosong",
    invalid_type_error: "Bulan pembayaran tidak valid",
  }),
});

export const invoiceSchema = z.object({
  invoice_name: z.string({
    required_error: "Nama invoice tidak boleh kosong",
    invalid_type_error: "Nama invoice tidak valid",
  }),

  due_date: z.date({
    required_error: "Tenggat tidak boleh kosong",
    invalid_type_error: "Tenggat tidak valid",
  }),

  payment_source: z.enum(["gaji pns", "gaji p3k", "komiter", "TPP"]),

  payment_method: z.enum(["cash", "transfer"]),
});
