import { Starship } from '../../types/Starship';
import { Response } from '../../types/Response';

export interface StarshipsResponse extends Response {
  results: Starship[] | null;
}
