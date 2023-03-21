import swapi from '@/api/base';

import { StarshipsResponse } from './StarshipsResponse';
import { allStarshipsResponseSchema } from './validationSchema';

async function getAllStarships(
  page: number = 1,
  searchQuery: string | undefined,
) {
  try {
    const query = searchQuery ? `&search=${searchQuery}` : '';

    const data = await swapi.get(`/starships?page=${page}${query}&format=json`);
    await allStarshipsResponseSchema.validate(data);
    return data as StarshipsResponse;
  } catch (e: unknown) {
    console.error(e);
    throw new Error(`Error from ${getAllStarships.name}: ${e}`);
  }
}

export default getAllStarships;
