import { CdkDragDrop, DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { Component, DestroyRef, signal } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { SortService } from '../../../../shared/services/sort.service';
import { ISearchResult } from '../../interfaces/search.interface';
import { SEARCH_RESULT_DATA } from '../search-view.data';
import { Store } from '@ngrx/store';
import {
  selectLoading,
  selectNoResults,
  selectQuery,
  selectResults,
} from '../../store/search-view.selectors';
import { setQuery } from '../../store/search-view.actions';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-search-view',
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    DragDropModule,
    MatProgressSpinnerModule,
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
    protected sortService: SortService,
    private store: Store,
    private destroyerRef: DestroyRef
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
        takeUntilDestroyed(this.destroyerRef)
      )
      .subscribe((query) => {
        this.store.dispatch(setQuery({ query }));
      });

    this.store
      .select(selectLoading)
      .pipe(takeUntilDestroyed(this.destroyerRef))
      .subscribe((loading) => this.isLoading.set(loading));
    this.store
      .select(selectNoResults)
      .pipe(takeUntilDestroyed(this.destroyerRef))
      .subscribe((noResults) => this.noResults.set(noResults));
    this.store
      .select(selectResults)
      .pipe(takeUntilDestroyed(this.destroyerRef))
      .subscribe((results) => {
        this.sortService.setMovies(results);
      });
  }

  private initForm() {
    this.searchForm = this.fb.group({
      query: [''],
    });

    this.store.select(selectQuery).subscribe((query) => {
      this.searchForm.patchValue({ query }, { emitEvent: false });
    });
  }
}
