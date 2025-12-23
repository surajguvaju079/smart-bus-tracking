import { z } from "zod";

// Safe emoji regex
const noEmoji = (val: string) =>
  !/[\u{1F600}-\u{1F64F}|\u{1F300}-\u{1F5FF}|\u{1F680}-\u{1F6FF}|\u{1F1E0}-\u{1F1FF}]/u.test(
    val
  );

export const signInSchema = z.object({
  email: z
    .string()
    .min(2, "Must be at least 2 characters")
    .email("Invalid email format")
    .refine((v) => !v.startsWith(" "), "No leading space allowed")
    .refine(noEmoji, "Emoji not allowed"),

  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .refine(noEmoji, "Emoji not allowed"),
});

export type SignInType = z.infer<typeof signInSchema>;
