import { object, string, array } from 'yup';

export const starshipSchema = object({
  name: string().required(),
  model: string().required(),
  manufacturer: string().required(),
  cost_in_credits: string().required(),
  length: string().required(),
  max_atmosphering_speed: string().required(),
  crew: string().required(),
  passengers: string().required(),
  cargo_capacity: string().required(),
  consumables: string().required(),
  hyperdrive_rating: string().required(),
  MGLT: string().required(),
  starship_class: string().required(),
  pilots: array().of(string()).required(),
  films: array().of(string()).required(),
  created: string().required(),
  edited: string().required(),
  url: string().required(),
}).required();
