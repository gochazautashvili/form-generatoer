import { z } from "zod";

const String = z.string().min(1);

export const link_schema = z.object({
  code: String.max(15),
  name: String.max(25),
  location: String,
});

export type TLink_schema = z.infer<typeof link_schema>;
