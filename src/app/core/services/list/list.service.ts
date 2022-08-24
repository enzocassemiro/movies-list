import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Movie } from '../../models/movie.models';
import { MovieCustom } from '../../models/movie-custom.models';

@Injectable({
  providedIn: 'root'
})
export class ListService {

  constructor(private http: HttpClient) { }

  private apiUrl = 'http://localhost:3000';

  postMovieList(movie: Movie): Observable<Movie> {
    return this.http.post<Movie>(`${this.apiUrl}/list`, movie)
  }

  postMovieCustomList(movie: MovieCustom): Observable<MovieCustom> {
    return this.http.post<MovieCustom>(`${this.apiUrl}/list-custom`, movie)
  }

  getAllMovieList(): Observable<Movie[]> {
    return this.http.get<Movie[]>(`${this.apiUrl}/list`)
  }

  getAllCustomMovieList(): Observable<MovieCustom[]> {
    return this.http.get<MovieCustom[]>(`${this.apiUrl}/list-custom`)
  }

  deleteCustomMovieList(id: number): Observable<Movie> {
    return this.http.delete<Movie>(`${this.apiUrl}/list-custom/${id}`)
  }

  deleteMovieList(id: number): Observable<Movie> {
    return this.http.delete<Movie>(`${this.apiUrl}/list/${id}`)
  }
}
