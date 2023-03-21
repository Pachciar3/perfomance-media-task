import swapi from '@/api/base';

import { Starship } from '../../types/Starship';
import { starshipSchema } from '../../validators/validateStarship';

async function getStarship(id: number) {
  try {
    const data = await swapi.get(`/starships/${id}?format=json`);

    await starshipSchema.validate(data);
    return data as Starship;
  } catch (e: unknown) {
    throw new Error(`Error from ${getStarship.name}: ${e}`);
  }
}

export default getStarship;
