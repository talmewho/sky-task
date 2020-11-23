import {TheMovieDBShow, TheMovieDBCredits} from '../../data-access/TheMovieDB.types';
import {Content} from './types';
import TheMovieDBFetcher from '../../data-access/TheMovieDBFetcher';

const defaultFetcher = new TheMovieDBFetcher();

type GetShowOptions = {
  showID: string,
  fetcher?: TheMovieDBFetcher,
  posterImageSize: string
}

export const getShow =
  async ({showID, posterImageSize, fetcher = defaultFetcher}: GetShowOptions): Promise<Content> => {
  const [{id, name, poster_path, first_air_date, type, overview}, {cast}] =
    await Promise.all<TheMovieDBShow, TheMovieDBCredits>(
      [fetcher.getShow(showID), fetcher.getShowCredits(showID)]);

  const year = new Date(first_air_date).getFullYear();

  const imageURL = poster_path ? await fetcher.getImageURL(poster_path, 'poster_sizes', posterImageSize) : '';

  return {id, name, year, type, overview, imageURL, cast: cast.map(({name, id}) => ({name, id}))};
};
