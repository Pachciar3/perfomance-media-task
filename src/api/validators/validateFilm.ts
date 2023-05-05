
import { object, string, array, number } from 'yup';

export const filmSchema = object({
  title: string().required(),
  episode_id: number().required(),
  opening_crawl: string().required(),
  director: string().required(),
  producer: string().required(),
  release_date: string().required(),
  characters: array().of(string()).required(),
  planets: array().of(string()).required(),
  starships: array().of(string()).required(),
  vehicles: array().of(string()).required(),
  species: array().of(string()).required(),
  created: string().required(),
  edited: string().required(),
  url: string().required(),
}).required();
