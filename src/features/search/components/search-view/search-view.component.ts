import { CdkDragDrop, DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {
  catchError,
  debounceTime,
  distinctUntilChanged,
  filter,
  forkJoin,
  map,
  of,
  switchMap,
  tap,
} from 'rxjs';
import { SortService } from '../../../../shared/services/sort.service';
import {
  ISearchResult,
  ISearchResultsDTO,
} from '../../interfaces/search.interface';
import { SearchService } from '../../services/search.service';
import { SEARCH_RESULT_DATA } from '../search-view.data';

@Component({
  selector: 'app-search-view',
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    DragDropModule,
  ],
  templateUrl: './search-view.component.html',
})
export class SearchViewComponent {
  searchForm!: FormGroup;
  isLoading = signal(false);
  noResults = signal(false);
  SEARCH_RESULT_DATA = SEARCH_RESULT_DATA;

  constructor(
    private fb: FormBuilder,
    private searchService: SearchService,
    protected sortService: SortService
  ) {
    this.initForm();
    this.search();
  }

  getMovieImage(src: string) {
    return src === 'N/A' ? '/images/placeholder_image.png' : src;
  }

  sort(column: keyof ISearchResult) {
    this.sortService.toggleSortByColumn(column);
  }

  onColumnDrop(event: CdkDragDrop<number>) {
    const previousIndex = event.item.data as number;
    let newIndex = previousIndex;

    if (event.distance.x > 0) {
      newIndex = Math.min(
        previousIndex + 1,
        this.SEARCH_RESULT_DATA.length - 1
      );
    } else if (event.distance.x < 0) {
      newIndex = Math.max(previousIndex - 1, 0);
    }

    if (newIndex !== previousIndex) {
      const [removed] = this.SEARCH_RESULT_DATA.splice(previousIndex, 1);
      this.SEARCH_RESULT_DATA.splice(newIndex, 0, removed);
    }
  }

  private search() {
    this.searchForm.controls['query'].valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        filter((query) => query.trim().length > 0),
        tap(() => {
          this.isLoading.set(true);
          this.noResults.set(false);
        }),
        switchMap((query) =>
          this.searchService.searchMovies(query).pipe(
            map((result: ISearchResultsDTO) => result.Search || []),
            tap((movies) => {
              if (movies.length === 0) {
                this.noResults.set(true);
              }
            }),
            catchError(() => {
              this.noResults.set(true);
              return of([]);
            })
          )
        ),
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
        tap(() => this.isLoading.set(false))
      )
      .subscribe({
        next: (movies: (ISearchResult | null)[]) => {
          this.sortService.setMovies(movies as ISearchResult[]);
        },
        error: () => this.isLoading.set(false),
      });
  }

  private initForm() {
    this.searchForm = this.fb.group({
      query: [''],
    });
  }
}
