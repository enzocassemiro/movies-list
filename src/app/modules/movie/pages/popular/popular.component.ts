import { Component, OnInit } from '@angular/core';
import { Movie } from 'src/app/core/models/movie.models';
import { MovieDbService } from 'src/app/core/services/api/movie-db.service';


@Component({
  selector: 'app-popular',
  templateUrl: './popular.component.html',
  styleUrls: ['./popular.component.scss']
})
export class PopularComponent implements OnInit {

  constructor(private movieService: MovieDbService) { }

  movies: Movie[] = [];
  linkImage: string = 'https://image.tmdb.org/t/p/w500/'; 

  ngOnInit(): void {
    this.getMoviesPopular(1, 'pt-BR')
  }
  
  getMoviesPopular(page: number, language: string): void {
    this.movieService.getAllMoviePopular(page, language).subscribe({
      next: (movies) => {
        this.movies = movies.results
        console.log(this.movies);
        
      },
      error: (err: Error) => {
        console.log('Deu ruim');        
      }
    });
  }
}
