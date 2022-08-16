import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Movie } from '../../models/movie.models';


@Injectable({
  providedIn: 'root'
})
export class MovieDbService {

  private apiURL = 'https://api.themoviedb.org/3/';
  private apiKEY = '4a15c71ea03c69929b12a7476575d76c';

  constructor(private http: HttpClient) { }

  getAllMoviePopular(page: number, language: string): Observable<any> {
    return this.http.get<any>(`${this.apiURL}movie/popular?api_key=${this.apiKEY}&language=${language}&page=${page}`)
  }
}
