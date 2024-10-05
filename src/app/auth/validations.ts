import z from "zod";

export const organization_schema_sign_in = z.object({
  email: z.string().email().min(1),
  password: z.string().min(1),
});

export type organization_schema_sign_in_type = z.infer<
  typeof organization_schema_sign_in
>;

export const organization_schema_sign_up = z.object({
  email: z.string().email().min(1),
  name: z.string().min(2).max(50),
  password: z.string().min(1),
});

export type organization_schema_sign_up_type = z.infer<
  typeof organization_schema_sign_up
>;
