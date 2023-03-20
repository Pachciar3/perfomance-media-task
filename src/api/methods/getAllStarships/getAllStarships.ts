import { StarshipsResponse } from './StarshipsResponse';
import { allStarshipsResponseSchema } from './validationSchema';

async function getAllStarships(
  page: number = 1,
  searchQuery: string | undefined,
) {
  try {
    const query = searchQuery ? `&search=${searchQuery}` : '';
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/starships?page=${page}${query}&format=json`,
    );
    if (response.ok) {
      const data = await response.json();
      await allStarshipsResponseSchema.validate(data);
      return data as StarshipsResponse;
    } else {
      throw new Error(`Bad response code: ${response.status}`);
    }
  } catch (e: unknown) {
    console.error(e);
    throw new Error(`Unknown error: ${e}`);
  }
}

export default getAllStarships;
