import { z } from "zod";

export const contentValidation = z.object({
  content: z.string(),
});
