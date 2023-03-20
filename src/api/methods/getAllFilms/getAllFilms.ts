import { FilmsResponse } from './FilmsResponse';
import { allFilmsResponseSchema } from './validationSchema';

async function getAllFilms() {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/films?format=json`,
    );
    if (response.ok) {
      const data = await response.json();
      await allFilmsResponseSchema.validate(data);
      return data as FilmsResponse;
    } else {
      throw new Error(`Bad response code: ${response.status}`);
    }
  } catch (e: unknown) {
    console.error(e);
    throw new Error(`Unknown error: ${e}`);
  }
}

export default getAllFilms;
