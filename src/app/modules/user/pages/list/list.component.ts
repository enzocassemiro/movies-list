import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { Movie } from 'src/app/core/models/movie.models';
import { ListService } from 'src/app/core/services/list/list.service';
import { MessageService } from 'primeng/api';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MovieCustom } from 'src/app/core/models/movie-custom.models';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  providers: [MessageService]
})
export class ListComponent implements OnInit, OnDestroy {

  constructor(
    private listService: ListService,
    private messageService: MessageService,
    private fb: FormBuilder
  ) {
      this.setupForm();
    }

  componentDestroyer$: Subject<boolean> = new Subject;

  movies: Movie[] = [];

  moviesCustom: MovieCustom[] = [];

  movieSelectedDelete!: Movie;
  
  movieCustomSelectedDelete!: MovieCustom;

  movieCustom!: MovieCustom;
  
  linkImage: string = 'https://image.tmdb.org/t/p/w500/';

  display: boolean = false;
  displayCustom: boolean = false;

  movieCustomForm!: FormGroup;

  ngOnInit(): void {
    this.renderCustomMovieList();
    this.renderMovieList();
  }

  ngOnDestroy(): void {
    this.componentDestroyer$.next(true);
    this.componentDestroyer$.complete()
  }

  test() {

  }

  setupForm() {
    this.movieCustomForm = this.fb.group({
      title: ['',[Validators.required]],
      poster_path: [''],
      plataform: ['',[Validators.required]],
    })
  }

  sendForm() {
    console.log(this.movieCustom);
    console.log(this.movieCustomForm);
    this.movieCustom = this.movieCustomForm.value;

    this.listService.postMovieCustomList(this.movieCustom)
    .pipe(takeUntil(this.componentDestroyer$))
    .subscribe({
      complete: () => {
        this.renderCustomMovieList();
        this.showSuccess('You added a movie in your custom list', `You added movie ${this.movieCustom.title}`);
        // this.movieCustomForm = '';
        this.movieCustom.poster_path = '';
        this.movieCustom.plataform = '';
      }
    })
  }

  renderCustomMovieList(): void {
    this.listService.getAllCustomMovieList()
    .pipe(takeUntil(this.componentDestroyer$))
    .subscribe({
      next: (moviesCustom) => {
        console.log('Custom');
        
        console.log(this.moviesCustom);
        this.moviesCustom = moviesCustom
        console.log(this.moviesCustom);
        
      }
    })
  }

  renderMovieList(): void {
    this.listService.getAllMovieList()
    .pipe(takeUntil(this.componentDestroyer$))
    .subscribe({
      next: (movies) => {
        console.log('Movie');
        
        console.log(this.movies);
        this.movies = movies
        console.log(this.movies);
      }
    })
  }

  deleteMovie() {
    const {id, title} = this.movieSelectedDelete
    this.listService.deleteMovieList(id)
    .pipe(takeUntil(this.componentDestroyer$))
    .subscribe({
      next: () => {
        const indexOfObject = this.movies.findIndex(object => {
          return object.id === id;
        });
        this.movies.splice(indexOfObject,1);
        this.display = false;
      },
      complete: () => {
        this.showSuccess('You removed a movie from your List!', `You removed movie: ${title}`)
      }
    })
  }

  deleteCustomMovie() {
    const {id, title} = this.movieCustomSelectedDelete
    this.listService.deleteCustomMovieList(id)
    .pipe(takeUntil(this.componentDestroyer$))
    .subscribe({
      next: () => {
        const indexOfObject = this.moviesCustom.findIndex(object => {
          return object.id === id;
        });
        this.moviesCustom.splice(indexOfObject,1);
        this.displayCustom = false;
      },
      complete: () => {
        this.showSuccess('You removed a movie from your List!', `You removed movie: ${title}`)
      }
    })
  }

  showSuccess(title: string, message: string) {
    this.messageService.add({severity:'success', summary: title, detail: message});
  }

  showWarn(title: string, message: string) {
    this.messageService.add({severity:'warn', summary: title, detail: message});
    this.display = false;
    this.displayCustom = false;
  }

  showError(title:string, message: string) {
    this.messageService.add({severity:'error', summary: title, detail: message});
  }

  showDialogDelete(movie: Movie) {
    this.display = true;
    this.movieSelectedDelete = movie;
  }

  showDialogCustomDelete(movie: MovieCustom) {
    this.displayCustom = true;
    this.movieCustomSelectedDelete = movie;
  }
}
