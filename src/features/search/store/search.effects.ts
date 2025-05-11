import { inject, Injectable } from '@angular/core';
import { SearchService } from '../services/search.service';
import {
  catchError,
  debounceTime,
  distinctUntilChanged,
  filter,
  forkJoin,
  map,
  of,
  switchMap,
} from 'rxjs';
import {
  ISearchResult,
  ISearchResultsDTO,
} from '../interfaces/search.interface';
import {
  searchMovies,
  searchMoviesFailure,
  searchMoviesSuccess,
  setQuery,
} from './search-view.actions';
import { Actions, createEffect, ofType } from '@ngrx/effects';

@Injectable()
export class SearchEffects {
  private actions$ = inject(Actions);
  private searchService = inject(SearchService);

  constructor() {}

  triggerSearch$ = createEffect(() =>
    this.actions$.pipe(
      ofType(setQuery),
      map((action) => action.query.trim()),
      filter((query) => query.length > 0),
      debounceTime(300),
      distinctUntilChanged(),
      map((query) => searchMovies({ query }))
    )
  );

  searchMovies$ = createEffect(() =>
    this.actions$.pipe(
      ofType(searchMovies),
      switchMap(({ query }) =>
        this.searchService.searchMovies(query).pipe(
          map((res: ISearchResultsDTO) => res.Search || []),
          switchMap((movies) =>
            movies.length > 0
              ? forkJoin(
                  movies.map((movie) =>
                    this.searchService
                      .getMovieDetails(movie.imdbID)
                      .pipe(catchError(() => of(null)))
                  )
                )
              : of([])
          ),
          map((movies) => movies.filter(Boolean) as ISearchResult[]),
          map((results) => searchMoviesSuccess({ results })),
          catchError(() => of(searchMoviesFailure()))
        )
      )
    )
  );
}
