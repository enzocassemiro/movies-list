import { Movie } from "./movie.models";

export interface MovieCategoryPages {
  page: number,
  results: Movie[],
  total_pages: number,
  total_results: number
}
