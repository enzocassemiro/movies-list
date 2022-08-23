import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { Movie } from 'src/app/core/models/movie.models';
import { ListService } from 'src/app/core/services/list/list.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit, OnDestroy {

  constructor(
    private listService: ListService
  ) { }

  componentDestroyer$: Subject<boolean> = new Subject;

  movies: Movie[] = [];

  linkImage: string = 'https://image.tmdb.org/t/p/w500/';

  renderList(): void {
    this.listService.getllAllMovieList()
    .pipe(takeUntil(this.componentDestroyer$))
    .subscribe({
      next: (movies) => {
        this.movies = movies
      }
    })
  }

  test(movie: Movie) {
    
  }

  deleteMovie(movie: Movie) {
    this.listService.deleteMovieList(movie.id)
    .pipe(takeUntil(this.componentDestroyer$))
    .subscribe({
      next: () => {
        const indexOfObject = this.movies.findIndex(object => {
          return object.id === movie.id;
        });    
        this.movies.splice(indexOfObject,1);
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
