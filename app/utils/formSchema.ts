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
    required_error: "Nama tidak boleh kosong"
  })
})