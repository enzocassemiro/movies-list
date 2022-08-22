import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Country } from 'src/app/core/models/country.model';
import { Movie } from 'src/app/core/models/movie.models';
import { Page } from 'src/app/core/models/pages.model';
import { MovieDbService } from 'src/app/core/services/api/movie-db.service';

@Component({
  selector: 'app-categories-modular',
  templateUrl: './categories-modular.component.html',
  styleUrls: ['./categories-modular.component.scss']
})
export class CategoriesModularComponent implements OnInit {

  public lang!: string;
  public category!: string;

  constructor(
    private movieService: MovieDbService,
    private route: ActivatedRoute
  ) {
      this.route.params.subscribe((params: Params) => {
        this.lang = params['lang']
        this.category = params['category']
        this.renderDefaultPage();
      })
    }

  movies: Movie[] = [];

  linkImage: string = 'https://image.tmdb.org/t/p/w500/';

  selectedCountry: Country = {name: 'United States', code_country: 'US', code: 'en'};

  countries: Country[] = [
    {name: 'United States', code_country: 'US', code: 'en'},
    {name: 'Brazil', code_country: 'BR', code: 'pt'},
    {name: 'Spain', code_country: 'ES', code: 'es'},
    {name: 'China', code_country: 'CN', code: 'zh'},
    {name: 'Germany', code_country: 'DE', code: 'de'},
    {name: 'Japan', code_country: 'JP', code: 'ja'}
  ];

  name: any = '';

  ngOnInit(): void {
    this.renderDefaultPage();
    console.log(this.lang, this.category);
  }

  test() {
    console.log('Testes:');
    console.log('Categoria',this.category);
    console.log('Categoria',this.lang);
  }

  renderDefaultPage(): void {
    this.getMoviesPopular(this.category, 1, `${this.selectedCountry.code}-${this.selectedCountry.code_country}`)
  }

  changeLanguage(): void {
    this.movies = [];
    this.getMoviesPopular(this.category, 1, `${this.selectedCountry.code}-${this.selectedCountry.code_country}`)
  }

  getMoviesPopular(category: string, page: number, language: string): void {
    console.log('Page:',page);
    console.log('Language:',language);

    this.movieService.getAllMovieByCategory(category, page, language).subscribe({
      next: (movies) => {
        this.movies = movies.results
      },
      error: (err: Error) => {
        console.log('Deu ruim');
      }
    });
  }

  onPageChange(event: Page): void {
    console.log(event);
    this.movies = [];
    this.getMoviesPopular(this.category, event.page+1, `${this.selectedCountry.code}-${this.selectedCountry.code_country}`)
  }
}
