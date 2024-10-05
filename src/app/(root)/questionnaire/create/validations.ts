import { z } from "zod";

export const selectTypes = [
  "textarea",
  "rating",
  "date",
  "tel",
  "email",
  "number",
  "password",
  "text",
  "slider",
  "select",
  "checkbox",
  "radio",
] as const;

export const FiledSchema = z.object({
  formTitle: z.string().min(1),
  formSubheading: z.string().min(1),

  fieldType: z.string().min(1),
  fieldName: z.string().min(1),
  fieldLabel: z.string().min(1),
  placeholder: z.string().min(1),
  options: z.string().optional(),
  required: z.boolean().default(false),
});

export type TFiledSchema = z.infer<typeof FiledSchema>;
