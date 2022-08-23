import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Movie } from '../../models/movie.models';

@Injectable({
  providedIn: 'root'
})
export class ListService {

  constructor(private http: HttpClient) { }

  private apiUrl = 'http://localhost:3000';

  postMovieList(movie: Movie): Observable<Movie> {
    return this.http.post<Movie>(`${this.apiUrl}/list`, movie)
  }

  getllAllMovieList(): Observable<Movie[]> {
    return this.http.get<Movie[]>(`${this.apiUrl}/list`)
  }

  deleteMovieList(id: number): Observable<Movie> {
    return this.http.delete<Movie>(`${this.apiUrl}/list/${id}`)
  }
}
