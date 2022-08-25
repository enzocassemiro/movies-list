import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { MovieDetail } from 'src/app/core/models/movie-detail.model';
import { MovieDbService } from 'src/app/core/services/api/movie-db.service';

@Component({
  selector: 'app-movie-id',
  templateUrl: './movie-id.component.html',
  styleUrls: ['./movie-id.component.scss']
})
export class MovieIdComponent implements OnInit, OnDestroy {

  constructor(
    private movieService: MovieDbService,
    private route: ActivatedRoute
  ) {
    this.route.params.subscribe((params: Params) => {
      this.linkId = params['id']
      this.getMovieById()
    })
   }

  public linkId!: string;

  componentDestroyed$: Subject<boolean> = new Subject()

  linkImage: string = 'https://image.tmdb.org/t/p/w500';

  movieDetail!: MovieDetail;

  ngOnInit(): void {
    console.log(this.linkId);

  }

  ngOnDestroy(): void {
    this.componentDestroyed$.next(true);
    this.componentDestroyed$.complete()
  }

  getMovieById() {
    this.movieService.getMovieById(this.linkId)
    .pipe(takeUntil(this.componentDestroyed$))
    .subscribe({
      next: (movie) => {
        console.log(this.movieDetail);
        this.movieDetail = movie;
        console.log(this.movieDetail);

      }
    })
  }

  navigateTo(movieHomePage: string) {
    window.open(movieHomePage, '_blank');
  }

}
