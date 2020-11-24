import {Content, Cast, SearchResult, SearchResults} from './types';
import {
  TheMovieDBCastShowCredit,
  TheMovieDBCastMovieCredit,
  TheMovieDBShowCastCredit,
  TheMovieDBMovieCastCredit,
  TheMovieDBCastAndCredits,
  TheMovieDBShowSearchResult,
  TheMovieDBMovieSearchResult,
  TheMovieDBCastSearchResult,
  TheMovieDBSearchResult
} from '../../data-access/TheMovieDB.types';

import configuration from '../../configuration';

import TheMovieDBFetcher from '../../data-access/TheMovieDBFetcher';


const defaultFetcher = new TheMovieDBFetcher();

type GetShowOptions = {
  showID: string,
  fetcher?: TheMovieDBFetcher,
  posterImageSize: string
};

type GetMovieOptions = {
  movieID: string,
  fetcher?: TheMovieDBFetcher,
  posterImageSize: string
};

type GetCastOptions = {
  castID: string,
  fetcher?: TheMovieDBFetcher,
  profileImageSize: string
};

type SearchOptions = {
  query: string,
  page: number,
  fetcher?: TheMovieDBFetcher,
  profileImageSize: string,
  posterImageSize: string
};


const getImageURL =
  async (
    relativeURL: string | null,
    type: 'poster_sizes' | 'profile_sizes',
    size: string,
    fallbackURL: string,
    fetcher: TheMovieDBFetcher) => {
  return relativeURL ?
           await fetcher.getImageURL(relativeURL, type, size) :
           fallbackURL;
};

export const getShow =
  async ({showID, posterImageSize, fetcher = defaultFetcher}: GetShowOptions): Promise<Content> => {
  const {id, name, poster_path, first_air_date: release_date, overview, credits: {cast}} =
    await fetcher.getShow(showID);

  const year = release_date ? new Date(release_date).getFullYear() : 0;

  const imageURL =
    await getImageURL(
      poster_path,
      'poster_sizes',
      posterImageSize,
      configuration.defaultContentImageURL,
      fetcher
    );


  return {
    id,
    name,
    year,
    type: 'tv',
    overview,
    imageURL,
    cast: cast.map(({name, id}: TheMovieDBShowCastCredit) => ({name, id}))};
};

export const getMovie =
  async ({movieID, posterImageSize, fetcher = defaultFetcher}: GetMovieOptions): Promise<Content> => {
  const {id, title: name, poster_path, release_date, overview, credits: {cast}} =
    await fetcher.getMovie(movieID);

  const year = release_date ? new Date(release_date).getUTCFullYear() : 0;

  const imageURL =
    await getImageURL(
      poster_path,
      'poster_sizes',
      posterImageSize,
      configuration.defaultContentImageURL,
      fetcher
    );

  return {
    id,
    name,
    year,
    type: 'movie',
    overview,
    imageURL,
    cast: cast.map(({name, id}: TheMovieDBMovieCastCredit) => ({name, id}))};
};

export const getCast =
  async ({castID, profileImageSize, fetcher = defaultFetcher}: GetCastOptions): Promise<Cast> => {
  const {id, name, profile_path, birthday, deathday, biography, combined_credits: {cast}}: TheMovieDBCastAndCredits =
    await fetcher.getCast(castID);

  const age =
    new Date(
      (new Date(deathday || Date.now()).getTime()) -
      (new Date(birthday)).getTime()
    ).getUTCFullYear() - 1970;

  const imageURL =
    await getImageURL(
      profile_path,
      'profile_sizes',
      profileImageSize,
      configuration.defaultCastImageURL,
      fetcher
    );

  const contents = cast.map((credit: TheMovieDBCastShowCredit | TheMovieDBCastMovieCredit) => {
    let name: string;
    let year: number;
    if (credit.media_type === 'tv') {
      const showCredit = credit as TheMovieDBCastShowCredit;
      name = showCredit.name;
      year = showCredit.first_air_date ? new Date(showCredit.first_air_date).getFullYear() : 0;
    } else {
      const movieCredit = credit as TheMovieDBCastMovieCredit;
      name = movieCredit.title;
      year = movieCredit.release_date ? new Date(movieCredit.release_date).getFullYear() : 0;
    }
    return {id: credit.id, name, type: credit.media_type, year};
  })
    .sort(({year}, {year: year2}) => (year2 - year))
    // Removing duplicates, assumes a sorted array.
    .filter(({id}, index, array) => {
      if (array[index - 1] && array[index - 1].id === id) {
        return false;
      }
      return true;
    });

  return {
    imageURL,
    id,
    name,
    age,
    biography,
    contents
  };
};

const getKnownFor = (
  rawResults: TheMovieDBSearchResult[],
  posterImageSize: string,
  profileImageSize: string,
  fetcher: TheMovieDBFetcher
): Promise<SearchResult>[] => {
  return rawResults.map<Promise<SearchResult>>(async (item: TheMovieDBSearchResult): Promise<SearchResult> => {
      let name;
      let knownFor: string[] | undefined = undefined;
      let imageURL: string;
      if (item.media_type === 'tv') {
        const show = item as TheMovieDBShowSearchResult;
        name = show.name;
        imageURL =
          await getImageURL(
            show.poster_path,
            'poster_sizes',
            posterImageSize,
            configuration.defaultContentImageURL,
            fetcher
          );
      } else if (item.media_type === 'movie') {
        const movie = item as TheMovieDBMovieSearchResult;
        name = movie.title;
        imageURL =
          await getImageURL(
            movie.poster_path,
            'poster_sizes',
            posterImageSize,
            configuration.defaultContentImageURL,
            fetcher
          );
      } else {
        const cast = item as TheMovieDBCastSearchResult;
        name = cast.name;
        imageURL =
          await getImageURL(
            cast.profile_path,
            'profile_sizes',
            profileImageSize,
            configuration.defaultCastImageURL,
            fetcher
          );

        knownFor = cast.known_for.slice(0, 3).map(content => {
          return (content as TheMovieDBShowSearchResult).name ||
                 (content as TheMovieDBMovieSearchResult).title;
        });
      }
      return {name, id: item.id, type: item.media_type, knownFor, imageURL};
  });
};

export const search =
  async ({
    query,
    page,
    posterImageSize,
    profileImageSize,
    fetcher = defaultFetcher
  }: SearchOptions): Promise<SearchResults> => {
    const {
      results: rawResults,
      total_results: totalCount,
      total_pages: totalPageCount,
      page: outputPage
    } = await fetcher.search(query, page);

    const results: SearchResult[] =
      await Promise.all(getKnownFor(rawResults, posterImageSize, profileImageSize, fetcher));
    return {results, totalCount, page: outputPage, totalPageCount};
};
