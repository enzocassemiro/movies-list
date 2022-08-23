import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Country } from 'src/app/core/models/country.model';
import { Movie } from 'src/app/core/models/movie.models';
import { Page } from 'src/app/core/models/pages.model';
import { MovieDbService } from 'src/app/core/services/api/movie-db.service';
import { Subject } from "rxjs"
import { takeUntil } from "rxjs/operators"
import { ListService } from 'src/app/core/services/list/list.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-categories-modular',
  templateUrl: './categories-modular.component.html',
  styleUrls: ['./categories-modular.component.scss'],
  providers: [MessageService]
})
export class CategoriesModularComponent implements OnInit, OnDestroy {

  constructor(
    private movieService: MovieDbService,
    private listService: ListService,
    private messageService: MessageService,
    private route: ActivatedRoute
  ) {
      this.route.params.subscribe((params: Params) => {
        this.category = params['category']
        this.renderDefaultPage();
      })
    }

  public category!: string;

  componentDestroyed$: Subject<boolean> = new Subject()

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
    console.log(this.category);
  }

  ngOnDestroy(): void {
    this.componentDestroyed$.next(true);
    this.componentDestroyed$.complete()
  }

  getMoviesPopular(category: string, page: number, language: string): void {
    console.log('Page:',page);
    console.log('Language:',language);

    this.movieService.getAllMovieByCategory(category, page, language).pipe(takeUntil(this.componentDestroyed$)).subscribe({
      next: (movies) => {
        this.movies = movies.results
      },
      error: (err: Error) => {
        console.log('Deu ruim');
      }
    });
  }

  addMovieUserList(movie: Movie) {
    this.listService.postMovieList(movie).pipe(takeUntil(this.componentDestroyed$)).subscribe({
      next: movie => {
      },
      error: err => {
        if (err.status === 0) {
          this.showError('Cannot add this movie in your list!', 'Looks like the api is down!');
        }
        if (err.status === 500) {
          this.showError(err.statusText, 'This Movie is already in your list!');
        }

      },
      complete: () => {
        this.showSuccess('Movie added in your list!',`You added movie: ${movie.title}`);        
      },
    })
    

  }

  test() {
    console.log('Testes:');
    console.log('Categoria',this.category);
  }

  renderDefaultPage(): void {
    this.getMoviesPopular(this.category, 1, `${this.selectedCountry.code}-${this.selectedCountry.code_country}`)
  }

  changeLanguage(): void {
    this.movies = [];
    this.getMoviesPopular(this.category, 1, `${this.selectedCountry.code}-${this.selectedCountry.code_country}`)
  }

  onPageChange(event: Page): void {
    console.log(event);
    this.movies = [];
    this.getMoviesPopular(this.category, event.page+1, `${this.selectedCountry.code}-${this.selectedCountry.code_country}`)
  }

  showSuccess(title: string, message: string) {
    this.messageService.add({severity:'success', summary: title, detail: message});
  }
  showError(title:string, message: string) {
    this.messageService.add({severity:'error', summary: title, detail: message});
  }
}
