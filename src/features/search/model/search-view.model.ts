import { ISearchResult } from "../interfaces/search.interface";

export interface SearchState {
    query: string;
    results: ISearchResult[];
    loading: boolean;
    noResults: boolean;
}