import { z } from "zod";

const noEmoji = (val: string) =>
  !/[\u{1F600}-\u{1F64F}|\u{1F300}-\u{1F5FF}|\u{1F680}-\u{1F6FF}|\u{1F1E0}-\u{1F1FF}]/u.test(
    val
  );

export const signUpSchema = z
  .object({
    name: z
      .string()
      .min(2, "Name must be at least 2 characters")
      .refine((v) => !v.startsWith(" "), "No leading space allowed")
      .refine(noEmoji, "Emoji not allowed"),

    email: z
      .string()
      .email("Invalid email")
      .refine((v) => !v.startsWith(" "), "No leading space allowed")
      .refine(noEmoji, "Emoji not allowed"),

    password: z
      .string()
      .min(6, "Password must be at least 6 characters")
      .refine(noEmoji, "Emoji not allowed"),

    confirmPassword: z.string().min(6, "Confirm password required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type SignUpType = z.infer<typeof signUpSchema>;
