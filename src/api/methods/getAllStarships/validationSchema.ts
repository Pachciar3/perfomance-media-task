import { object, string, number, array } from "yup";

import { starshipSchema } from "../../validators/validateStarship";

export const allStarshipsResponseSchema = object({
  count: number().required(),
  next: string().required().nullable(),
  previous: string().required().nullable(),
  results: array().of(starshipSchema).required().nullable(),
}).required();
