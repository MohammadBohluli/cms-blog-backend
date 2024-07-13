import z from "zod";

const REQUIRED_ERROR = "پر کردن این فیلد اجباری می باشد";
const STRING_ERROR = "این فیلد نمی تواند عدد باشد";
export const createUserSchema = z.object({
  firstName: z
    .string({
      required_error: REQUIRED_ERROR,
      message: STRING_ERROR,
    })
    .min(3, { message: "تعداد کاراکتر نباید کمتر از 3 باشد" })
    .max(50, { message: "تعداد کاراکتر نباید بیشتر از 50 باشد" }),
  lastName: z
    .string({ required_error: REQUIRED_ERROR, message: STRING_ERROR })
    .min(3, { message: "تعداد کاراکتر نباید کمتر از 3 باشد" })
    .max(50, { message: "تعداد کاراکتر نباید بیشتر از 50 باشد" }),
  email: z
    .string({ required_error: REQUIRED_ERROR, message: STRING_ERROR })
    .email({ message: "ایمیل وارد شده نامعتبر می باشد" }),
});
