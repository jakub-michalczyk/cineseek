import { createAction, props } from '@ngrx/store';
import { ISearchResult } from '../interfaces/search.interface';

export const setQuery = createAction(
  '[Search View] Set Query',
  props<{ query: string }>()
);

export const searchMovies = createAction(
  '[Search API] Search Movies',
  props<{ query: string }>()
);

export const searchMoviesSuccess = createAction(
  '[Search API] Search Movies Success',
  props<{ results: ISearchResult[] }>()
);

export const searchMoviesFailure = createAction(
  '[Search API] Search Movies Failure'
);
