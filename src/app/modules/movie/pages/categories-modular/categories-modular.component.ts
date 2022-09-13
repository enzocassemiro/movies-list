import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Country } from 'src/app/core/models/country.model';
import { Movie } from 'src/app/core/models/movie.models';
import { Page } from 'src/app/core/models/pages.model';
import { MovieDbService } from 'src/app/core/services/api/movie-db.service';
import { Subject } from "rxjs"
import { debounceTime, takeUntil } from "rxjs/operators"
import { ListService } from 'src/app/core/services/list/list.service';
import { MessageService } from 'primeng/api';
import { FormBuilder, FormGroup } from '@angular/forms';

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
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) {
      this.route.params.subscribe((params: Params) => {
        this.category = params['category']
        // this.searchForm.reset();
        this.renderDefaultPage();
      })
      this.setupSearchForm();
    }

  public category!: string;

  private subjectKeyUp = new Subject<any>();

  componentDestroyed$: Subject<boolean> = new Subject()

  movies: Movie[] = [];

  linkImage: string = 'https://image.tmdb.org/t/p/w500/';

  selectedCountry: Country = {name: 'United States', code_country: 'US', code: 'en'};

  searchInput!: string;

  searchForm!: FormGroup;

  pageActual!: number;

  pageCount!: number;

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
    this.subjectKeyUp
    .pipe((debounceTime(900)), takeUntil(this.componentDestroyed$))
    .subscribe(
      (inputText) => {
        this.getMoviesSearch(inputText)
      }
    )
  }

  ngOnDestroy(): void {
    this.componentDestroyed$.next(true);
    this.componentDestroyed$.complete()
  }

  setupSearchForm(): void {
    this.searchForm = this.fb.group({
      search: ['']
    })
  }

  onSearch(event: any): void {
    const value = event.target.value;
    this.subjectKeyUp.next(value)
  }

  getMoviesPopular(category: string, page: number, language: string): void {
    this.movieService.getAllMovieByCategory(category, page, language)
    .pipe(takeUntil(this.componentDestroyed$))
    .subscribe({
      next: (movies) => {
        this.movies = movies.results;
        this.pageActual = movies.page;
        this.pageCount = movies.total_pages;
      }
    });
  }

  getMoviesSearch(text: string): void {
    this.movieService.getMovieSearch(text)
    .pipe(takeUntil(this.componentDestroyed$))
    .subscribe({
      next: movies => {
      }
    })
  }

  addMovieUserList(movie: Movie): void {
    this.listService.postMovieList(movie)
    .pipe(takeUntil(this.componentDestroyed$))
    .subscribe({
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

  renderDefaultPage(): void {
    this.getMoviesPopular(this.category, 1, `${this.selectedCountry.code}-${this.selectedCountry.code_country}`)
  }

  changeLanguage(): void {
    this.movies = [];
    this.getMoviesPopular(this.category, 1, `${this.selectedCountry.code}-${this.selectedCountry.code_country}`)
  }

  onPageChange(event: Page): void {
    this.pageActual = event.page
    this.pageCount = event.pageCount
    this.movies = [];
    this.getMoviesPopular(this.category, event.page+1, `${this.selectedCountry.code}-${this.selectedCountry.code_country}`)
  }

  showSuccess(title: string, message: string): void {
    this.messageService.add({severity:'success', summary: title, detail: message});
  }
  showError(title:string, message: string): void {
    this.messageService.add({severity:'error', summary: title, detail: message});
  }
}
