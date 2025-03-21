import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  ISearchResult,
  ISearchResultsDTO,
} from '../interfaces/search.interface';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  constructor(private http: HttpClient) {}

  searchMovies(query: string): Observable<any> {
    const url = `?s=${encodeURIComponent(query)}`;
    return this.http.get<ISearchResultsDTO>(url);
  }

  getMovieDetails(imdbID: string): Observable<ISearchResult> {
    return this.http.get<ISearchResult>(`?i=${imdbID}`);
  }
}
