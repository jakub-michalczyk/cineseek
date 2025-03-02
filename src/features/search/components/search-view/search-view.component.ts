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
import { debounceTime, distinctUntilChanged, filter, switchMap } from 'rxjs';
import { ISearchResultsDTO } from '../../interfaces/search.interface';
import { SearchService } from '../../services/search.service';

@Component({
  selector: 'app-search-view',
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
  ],
  templateUrl: './search-view.component.html',
})
export class SearchViewComponent {
  searchForm!: FormGroup;
  isLoading = signal(false);

  constructor(private fb: FormBuilder, private searchService: SearchService) {
    this.initForm();
    this.search();
  }

  private search() {
    this.searchForm
      .get('query')
      ?.valueChanges.pipe(
        debounceTime(300),
        distinctUntilChanged(),
        filter((query) => query && query.trim().length > 0),
        switchMap((query) => {
          this.isLoading.set(true);
          return this.searchService.searchMovies(query);
        })
      )
      .subscribe({
        next: (res: ISearchResultsDTO) => {
          console.log(res);
          this.isLoading.set(false);
        },
        error: (err) => {
          console.error(err);
          this.isLoading.set(false);
        },
      });
  }

  private initForm() {
    this.searchForm = this.fb.group({
      query: [''],
    });
  }
}
