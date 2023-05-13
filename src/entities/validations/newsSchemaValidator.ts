import { z } from "zod";
export const NewsSchemaValidator = z.object({
  id: z.string().uuid().max(100),
  title: z.string().min(15).max(100),
  description: z.string().min(15),
  date: z.string().min(8).max(30),
  link: z.string().nonempty(),
  sentiment: z.object({
    positive: z.number(),
    neutral: z.number(),
    negative: z.number(),
  }),
});
