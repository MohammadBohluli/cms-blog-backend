import z from "zod";

export const loginSchema = z.object({
  body: z.strictObject({
    email: z
      .string({ required_error: "Email field is required" })
      .email({ message: "Invalid email" }),
    password: z
      .string({
        required_error: "Password field is required",
      })
      .min(8, "Password must be more than 6 characters"),
  }),
});

export const registerSchema = z.object({
  body: z
    .strictObject({
      firstName: z
        .string({
          required_error: "firstName field is required",
        })
        .min(3, { message: "firstName must be more than 3 characters" })
        .max(155, { message: "firstName must be less than 155 characters" }),
      lastName: z
        .string({ required_error: "lastName field is required" })
        .min(3, { message: "lastName must be more than 3 characters" })
        .max(155, { message: "lastName must be less than 155 characters" }),
      email: z
        .string({ required_error: "Email field is required" })
        .email({ message: "Invalid email" }),
      password: z
        .string({
          required_error: "Password field is required",
        })
        .min(6, "Password must be more than 6 characters"),
      passwordConfirm: z
        .string({
          required_error: "passwordConfirm field is required",
        })
        .min(6, "passwordConfirm must be more than 6 characters"),
    })
    .refine(({ password, passwordConfirm }) => password === passwordConfirm, {
      message: "The passwords does not match",
      path: ["passwordConfirm"],
    }),
});

export const updateUserSchema = z.object({
  body: z.strictObject({
    firstName: z
      .string({
        required_error: "firstName field is required",
      })
      .min(3, { message: "firstName must be more than 3 characters" })
      .max(155, { message: "firstName must be less than 155 characters" })
      .optional(),
    lastName: z
      .string({ required_error: "lastName field is required" })
      .min(3, { message: "lastName must be more than 3 characters" })
      .max(155, { message: "lastName must be less than 155 characters" })
      .optional(),
  }),
});

export const verifyUserSchema = z.object({
  params: z.strictObject({
    id: z.string({
      required_error: "Id field is required",
    }),
    verifyCode: z.string({
      required_error: "verificationCode field is required",
    }),
  }),
});

export const forgotPasswordSchema = z.object({
  body: z.strictObject({
    email: z
      .string({ required_error: "Email field is required" })
      .email({ message: "Invalid email" }),
  }),
});

export const resetPasswordSchema = z.object({
  params: z.strictObject({
    id: z.string({
      required_error: "Id field is required",
    }),
    passwordResetCode: z.string({
      required_error: "PassowrdResetCode field is required",
    }),
  }),
  body: z
    .strictObject({
      password: z
        .string({
          required_error: "Password field is required",
        })
        .min(6, "Password must be more than 6 characters"),
      passwordConfirm: z
        .string({
          required_error: "passwordConfirm field is required",
        })
        .min(6, "passwordConfirm must be more than 6 characters"),
    })
    .refine(({ password, passwordConfirm }) => password === passwordConfirm, {
      message: "The passwords did not match",
      path: ["passwordConfirm"],
    }),
});

export const refreshTokenSchema = z.object({
  body: z.strictObject({
    refreshToken: z.string({ required_error: "refresh token is required" }),
  }),
});

export type LoginSchema = z.infer<typeof loginSchema>["body"];
export type RegisterSchema = z.infer<typeof registerSchema>["body"];
export type UpdateUserSchema = z.infer<typeof updateUserSchema>["body"];
export type VerifyUserSchema = z.infer<typeof verifyUserSchema>["params"];
export type ForgotPasswordSchema = z.infer<typeof forgotPasswordSchema>["body"];
export type ResetPasswordSchema = z.infer<typeof resetPasswordSchema>;
export type RefreshTokenSchema = z.infer<typeof refreshTokenSchema>["body"];
