import { Movie } from "./movie.models";

export interface MoviePopularPages {
  page: number,
  results: Movie[],
  total_pages: number,
  total_results: number
}
