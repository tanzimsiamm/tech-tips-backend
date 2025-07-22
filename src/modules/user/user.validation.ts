import { z } from "zod";

const userValidationSchema = z.object({
  name: z.string({
    required_error: "Name is required",
  }),
  email: z.string({
    required_error: "Email is required",
  }),
  role: z.enum(["user", "admin"]),
  password: z.string().optional(),
  image: z.string().optional(),
  isBlocked: z.boolean().optional(),
});

export const userValidations = {
  userValidationSchema,
};
