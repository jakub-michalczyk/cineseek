import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, map } from 'rxjs';
import { ISearchResult } from '../../features/search/interfaces/search.interface';

@Injectable({
  providedIn: 'root',
})
export class SortService {
  private _movies$ = new BehaviorSubject<ISearchResult[]>([]);
  private _sortColumn$ = new BehaviorSubject<keyof ISearchResult | null>(null);
  private _ascending$ = new BehaviorSubject<boolean>(true);

  sortedMovies$ = combineLatest([
    this._movies$,
    this._sortColumn$,
    this._ascending$,
  ]).pipe(
    map(([movies, column, isAscending]) => {
      if (!column) return movies;
      return [...movies].sort((a, b) =>
        this.compareValues(a[column], b[column], isAscending)
      );
    })
  );

  setMovies(movies: ISearchResult[]): void {
    this._movies$.next(movies);
  }

  toggleSortByColumn(column: keyof ISearchResult): void {
    if (this._sortColumn$.value === column) {
      this._ascending$.next(!this._ascending$.value);
    } else {
      this._sortColumn$.next(column);
      this._ascending$.next(true);
    }
  }

  private compareValues(a: string, b: string, isAscending: boolean): number {
    if (typeof a === 'string' && typeof b === 'string') {
      return isAscending ? a.localeCompare(b) : b.localeCompare(a);
    }
    return 0;
  }

  get sortColumn() {
    return this._sortColumn$.value;
  }

  get ascending() {
    return this._ascending$.value;
  }
}
