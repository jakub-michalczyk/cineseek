import { createFeatureSelector, createSelector } from "@ngrx/store";
import { SearchState } from "../model/search-view.model";

export const selectSearchState = createFeatureSelector<SearchState>('search');

export const selectQuery = createSelector(selectSearchState, s => s.query);
export const selectResults = createSelector(selectSearchState, s => s.results);
export const selectLoading = createSelector(selectSearchState, s => s.loading);
export const selectNoResults = createSelector(selectSearchState, s => s.noResults);