import swapi from '@/api/base';

import { FilmsResponse } from './FilmsResponse';
import { allFilmsResponseSchema } from './validationSchema';

async function getAllFilms() {
  try {
    const data = await swapi.get('/films?format=json');
    await allFilmsResponseSchema.validate(data);
    return data as FilmsResponse;
  } catch (e: unknown) {
    console.error(e);
    throw new Error(`Error from ${getAllFilms.name}: ${e}`);
  }
}

export default getAllFilms;
