import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { MovieCategoryPages } from '../../models/movie-category.model';
import { MovieDetail } from '../../models/movie-detail.model';


@Injectable({
  providedIn: 'root'
})
export class MovieDbService {

  constructor(private http: HttpClient) { }

  private apiURL = 'https://api.themoviedb.org/3/';
  private apiKEY = '4a15c71ea03c69929b12a7476575d76c';

  getAllMovieByCategory(category: string, page: number, language: string): Observable<MovieCategoryPages> {
    return this.http.get<MovieCategoryPages>(`${this.apiURL}movie/${category}?api_key=${this.apiKEY}&language=${language}&page=${page}`)
  }

  getMovieById(id: string): Observable<MovieDetail> {
    return this.http.get<MovieDetail>(`${this.apiURL}movie/${id}?api_key=${this.apiKEY}&language=en-US`)
  }

  getMovieSearch(text: string): Observable<MovieCategoryPages> {
    return this.http.get<MovieCategoryPages>(`${this.apiURL}search/movie?api_key=${this.apiKEY}&language=en-US&query=${text}&include_adult=false`)
  }
}
