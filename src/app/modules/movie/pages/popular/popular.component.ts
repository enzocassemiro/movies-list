import { Component, OnInit } from '@angular/core';
import { City } from 'src/app/core/models/city.model';
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

  selectedCountry: City = {name: 'United States', code_country: 'US', code: 'en'};
  cities: City[] = [
    {name: 'United States', code_country: 'US', code: 'en'},
    {name: 'Brazil', code_country: 'BR', code: 'pt'},
    {name: 'Spain', code_country: 'ES', code: 'es'},
    {name: 'China', code_country: 'CN', code: 'zh'},
    {name: 'Germany', code_country: 'DE', code: 'de'},
    {name: 'Japan', code_country: 'JP', code: 'ja'}
  ];

  ngOnInit(): void {
    this.renderDefaultPage();
  }

  renderDefaultPage() {
    this.getMoviesPopular(1, `${this.selectedCountry.code}-${this.selectedCountry.code_country}`)
  }

  changeLanguage() {
    console.log('Mudou');
    console.log(this.selectedCountry.code);
    console.log(this.selectedCountry.code_country);
    this.movies = [];
    this.getMoviesPopular(1, `${this.selectedCountry.code}-${this.selectedCountry.code_country}`)
  }

  getMoviesPopular(page: number, language: string): void {
    console.log('Page:',page);
    console.log('Language:',language);

    this.movieService.getAllMoviePopular(page, language).subscribe({
      next: (movies) => {
        console.log(movies);

        this.movies = movies.results
      },
      error: (err: Error) => {
        console.log('Deu ruim');
      }
    });
  }
}
