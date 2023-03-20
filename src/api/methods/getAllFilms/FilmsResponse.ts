import { Response } from "../../types/Response";
import { Film } from "../../types/Film";

export interface FilmsResponse extends Response {
  results: Film[] | null;
}
