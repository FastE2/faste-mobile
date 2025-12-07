import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Email không hợp lệ"),
  password: z.string().min(6, "Mật khẩu tối thiểu 6 ký tự"),
});

export const emailSchema = z.object({
  email: z.string().email("Email không hợp lệ"),
});

export const registerSchema = z
  .object({
    name: z.string().min(1, "Tên không được để trống"),
    phoneNumber: z.string().min(6, "Số điện thoại không hợp lệ"),
    password: z.string().min(6, "Mật khẩu tối thiểu 6 ký tự"),
    confirmPassword: z.string().min(6, "Xác nhận mật khẩu tối thiểu 6 ký tự"),
    code: z.string().length(6, "OTP phải 6 số"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Mật khẩu và xác nhận không khớp",
    path: ["confirmPassword"],
  });

export type LoginBodyType = z.infer<typeof loginSchema>;
export type RegisterBodyType = z.infer<typeof registerSchema>;