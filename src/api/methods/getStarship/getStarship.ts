import { Starship } from "../../types/Starship";
import { starshipSchema } from "../../validators/validateStarship";

async function getStarship(id: number) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/starships/${id}?format=json`
    );
    if (response.ok) {
      const data = await response.json();
      await starshipSchema.validate(data);
      return data as Starship;
    } else {
      throw new Error(`Bad response code: ${response.status}`);
    }
  } catch (e: unknown) {
    throw new Error(`Unknown error: ${e}`);
  }
}

export default getStarship;
