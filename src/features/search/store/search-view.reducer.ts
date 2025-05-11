import {
  createFeatureSelector,
  createReducer,
  createSelector,
  on,
} from '@ngrx/store';
import { SearchState } from '../model/search-view.model';
import {
  searchMoviesFailure,
  searchMoviesSuccess,
  setQuery,
} from './search-view.actions';

export const initialState: SearchState = {
  query: '',
  results: [],
  loading: false,
  noResults: false,
};

export const searchReducer = createReducer(
  initialState,
  on(setQuery, (state, { query }) => ({
    ...state,
    query,
    loading: true,
    noResults: false,
  })),
  on(searchMoviesSuccess, (state, { results }) => ({
    ...state,
    results,
    loading: false,
    noResults: results.length === 0,
  })),
  on(searchMoviesFailure, (state) => ({
    ...state,
    results: [],
    loading: false,
    noResults: true,
  }))
);
