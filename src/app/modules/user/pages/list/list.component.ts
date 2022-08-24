import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { Movie } from 'src/app/core/models/movie.models';
import { ListService } from 'src/app/core/services/list/list.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  providers: [MessageService]
})
export class ListComponent implements OnInit, OnDestroy {

  constructor(
    private listService: ListService,
    private messageService: MessageService
  ) { }

  componentDestroyer$: Subject<boolean> = new Subject;

  movies: Movie[] = [];

  movieSelectedDelete!: Movie;

  linkImage: string = 'https://image.tmdb.org/t/p/w500/';

  display: boolean = false;

  renderList(): void {
    this.listService.getllAllMovieList()
    .pipe(takeUntil(this.componentDestroyer$))
    .subscribe({
      next: (movies) => {
        this.movies = movies
      }
    })
  }

  showSuccess(title: string, message: string) {
    this.messageService.add({severity:'success', summary: title, detail: message});
  }

  showWarn(title: string, message: string) {
    this.messageService.add({severity:'warn', summary: title, detail: message});
    this.display = false;
  }

  showError(title:string, message: string) {
    this.messageService.add({severity:'error', summary: title, detail: message});
  }

  showDialogDelete(movie: Movie) {
    this.display = true;
    this.movieSelectedDelete = movie;
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
        this.showSuccess('You delete movie!', `You delete movie ${title}`)

      }
    })
  }

  ngOnInit(): void {
    this.renderList();
  }

  ngOnDestroy(): void {
    this.componentDestroyer$.next(true);
    this.componentDestroyer$.complete()
  }
}
