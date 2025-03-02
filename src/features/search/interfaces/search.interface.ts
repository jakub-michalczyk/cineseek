export interface ISearchResultsDTO {
  Response: string;
  Search: ISearchResult[];
  totalResults: string;
}

export interface ISearchResult {
  Poster: string;
  Title: string;
  Year: string;
  Runtime: string;
  Genre: string;
  Director: string;
  Plot: string;
  imdbID: string;
}
