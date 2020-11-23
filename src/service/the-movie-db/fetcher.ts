import {Content} from './types';
import {TheMovieDBCastCredit} from '../../data-access/TheMovieDB.types';
import TheMovieDBFetcher from '../../data-access/TheMovieDBFetcher';

const defaultFetcher = new TheMovieDBFetcher();

type GetShowOptions = {
  showID: string,
  fetcher?: TheMovieDBFetcher,
  posterImageSize: string
}

type GetMovieOptions = {
  movieID: string,
  fetcher?: TheMovieDBFetcher,
  posterImageSize: string
}

export const getShow =
  async ({showID, posterImageSize, fetcher = defaultFetcher}: GetShowOptions): Promise<Content> => {
  const {id, name, poster_path, first_air_date: release_date, overview, credits: {cast}} =
    await fetcher.getShow(showID);

  const year = new Date(release_date).getFullYear();

  const imageURL = poster_path ? await fetcher.getImageURL(poster_path, 'poster_sizes', posterImageSize) : '';

  return {
    id,
    name,
    year,
    type: 'tv',
    overview,
    imageURL,
    cast: cast.map(({name, id}: TheMovieDBCastCredit) => ({name, id}))};
};

export const getMovie =
  async ({movieID, posterImageSize, fetcher = defaultFetcher}: GetMovieOptions): Promise<Content> => {
  const {id, title: name, poster_path, release_date, overview, credits: {cast}} =
    await fetcher.getMovie(movieID);

  const year = new Date(release_date).getFullYear();

  const imageURL = poster_path ? await fetcher.getImageURL(poster_path, 'poster_sizes', posterImageSize) : '';

  return {
    id,
    name,
    year,
    type: 'movie',
    overview,
    imageURL,
    cast: cast.map(({name, id}: TheMovieDBCastCredit) => ({name, id}))};
};
