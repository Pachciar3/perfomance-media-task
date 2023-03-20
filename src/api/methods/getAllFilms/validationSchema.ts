import { object, string, number, array } from "yup";

import { filmSchema } from "../../validators/validateFilm";

export const allFilmsResponseSchema = object({
  count: number().required(),
  next: string().required().nullable(),
  previous: string().required().nullable(),
  results: array().of(filmSchema).required().nullable(),
}).required();
