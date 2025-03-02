export interface ISearchResultsDTO {
  Response: string;
  Search: ISearchResult[];
  totalResults: string;
}

export interface ISearchResult {
  Poster: string;
  Title: string;
  Type: EResultType;
  Year: string;
  imdbID: string;
}

export enum EResultType {
  MOVIE = 'movie',
  EPISODE = 'episode',
  SERIES = 'series',
}
