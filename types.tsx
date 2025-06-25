import { UseFormReturn } from "react-hook-form";
import { z, ZodObject, ZodType } from "zod";
export interface loginFormData {
  email: string;
  password: string;
}
export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});
export const signupSchema = z
  .object({
    firstName: z.string(),
    lastName: z.string(),
    email: z.string().email(),
    phone: z.string().regex(/^\d+$/, "Only digits allowed"),
    password: z.string().min(8),
    confirmPassword: z.string().min(8),
    userType: z.enum(["event-planner", "artist-manager"]),
    agreeToTerms: z.boolean(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"], // path of error
  });
