import {
  TheMovieDBShowEntityName,
  TheMovieDBMovieEntityName,
  TheMovieDBPersonEntityName,
  TheMovieDBEntityNames
} from '../../data-access/TheMovieDB.types';

type SummarizedContent = {
  id: number,
  name: string,
  type: TheMovieDBShowEntityName | TheMovieDBMovieEntityName,
  year: number
};

export type Person = {
  id: number,
  name: string,
  imageURL: string,
  biography: string,
  contents: SummarizedContent[],
  age?: number
};

export type Content = SummarizedContent & {
  imageURL: string,
  overview: string,
  cast: {id: number, name: string}[],
  year: number
};

export type SearchResult = {
  id: number,
  name: string,
  imageURL: string,
  year?: number,
  knownFor?: string[],
  type: TheMovieDBEntityNames
};

export type SearchResults = {
  results: SearchResult[],
  totalCount: number,
  totalPageCount: number,
  page: number
};

export type Suggestion = {
  id: number,
  name: string,
  type: TheMovieDBEntityNames
};

export type AllFilterName = 'all';
export type FilterNames = AllFilterName | TheMovieDBEntityNames;
