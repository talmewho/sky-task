export type TheMovieDBShowEntityName = 'tv';
export type TheMovieDBMovieEntityName = 'movie';
export type TheMovieDBPersonEntityName = 'person';
export type TheMovieDBEntityNames =
  TheMovieDBShowEntityName | TheMovieDBMovieEntityName | TheMovieDBPersonEntityName;

export type TheMovieDBImageConfiguration = {
    base_url: string,
    secure_base_url: string,
    backdrop_sizes: string[],
    logo_sizes: string[],
    poster_sizes: string[],
    profile_sizes: string[],
    still_sizes: string[]
};

export type TheMovieDBConfiguration = {
  images: TheMovieDBImageConfiguration,
  change_keys: string[]
};

type Network = {
  name: string,
  id: number,
  logo_path: string,
  origin_country: string
};

type Creator = {
  id: number,
  credit_id: string,
  name: string,
  gender: number,
  profile_path: string
};

type Genre = {
  id: number,
  name: string
};

type Episode = {
  air_date: string,
  episode_number: number,
  id: number,
  name: string,
  overview: string,
  production_code: string,
  season_number: number,
  still_path: string,
  vote_average: number,
  vote_count: number
};

type Company = {
  id: number,
  logo_path: string,
  name: string,
  origin_country: string
};

type Country = {
  iso_3166_1: string,
  name: string
};

type Season = {
  air_date: string,
  episode_count: number,
  id: number,
  name: string,
  overview: string,
  poster_path: string,
  season_number: number
};

type Language =  {
  english_name: string,
  iso_639_1: string,
  name: string
};

export type TheMovieDBShowCastCredit = {
  adult: boolean,
  gender: number,
  id: number,
  known_for_department: string,
  name: string,
  original_name: string,
  popularity: number,
  profile_path: string,
  character: string,
  credit_id: string,
  order: number
};

export type TheMovieDBMovieCastCredit = TheMovieDBShowCastCredit & {
  cast_id: number
};

export type TheMovieDBCrewCredit = {
  adult: boolean,
  gender: number,
  id: number,
  known_for_department: string,
  name: string,
  original_name: string,
  popularity: number,
  profile_path: string,
  credit_id: string,
  department: string,
  job: string
};

export type TheMovieDBShowCredits = {
  cast: TheMovieDBShowCastCredit[],
  crew: TheMovieDBCrewCredit[]
};

export type TheMovieDBMovieCredits = {
  cast: TheMovieDBMovieCastCredit[],
  crew: TheMovieDBCrewCredit[]
};

export type TheMovieDBShow = {
  backdrop_path: string,
  created_by: Creator[],
  episode_run_time: number[],
  first_air_date: string,
  genres: Genre[],
  homepage: string,
  id: number,
  in_production: boolean,
  languages: string[],
  last_air_date: string,
  last_episode_to_air: Episode[] | null,
  name: string,
  next_episode_to_air: Episode[] | null,
  networks: Network[],
  number_of_episodes: number,
  number_of_seasons: number,
  origin_country: string[],
  original_language: string,
  original_name: string,
  overview: string,
  popularity: number,
  poster_path: string,
  production_companies: Company[],
  production_countries: Country[],
  seasons: Season[],
  spoken_languages: Language[],
  status: string,
  tagline: string,
  vote_average: number,
  vote_count: number
};

export type TheMovieDBShowAndCredits = TheMovieDBShow & {
  credits: TheMovieDBShowCredits
};

export type TheMovieDBMovie = {
  adult: boolean,
  backdrop_path: string,
  belongs_to_collection: string | null,
  budget: number,
  genres: Genre[],
  homepage: string,
  id: number,
  imdb_id: string,
  original_language: string,
  original_title: string,
  overview: string,
  popularity: number,
  poster_path: string | null,
  production_companies: Company[],
  production_countries: Country[],
  release_date: string,
  revenue: number,
  runtime: number,
  spoken_languages: Language[],
  status: string,
  tagline: string,
  title: string,
  video: boolean,
  vote_average: number,
  vote_count: number
}

export type TheMovieDBMovieAndCredits = TheMovieDBMovie & {
  credits: TheMovieDBMovieCredits
};

export type TheMovieDBPerson = {
  birthday: string,
  known_for_department: string,
  deathday: string | null,
  id: number,
  name: string,
  also_known_as: string[]
  gender: number,
  biography: string,
  popularity: number,
  place_of_birth: string,
  profile_path: string,
  adult: boolean,
  imdb_id: string
  homepage: string | null
};

export type TheMovieDBPersonContentCredit = TheMovieDBShowCastCredit & {
  media_type: TheMovieDBShowEntityName | TheMovieDBMovieEntityName
};

type TheMovieDBCrewContentCredit = TheMovieDBCrewCredit & {
  media_type: TheMovieDBShowEntityName | TheMovieDBMovieEntityName
};


type TheMovieDBPersonContentCreditBase = {
  id: number,
  original_language: string,
  overview: string,
  origin_country: string[],
  genre_ids: number[],
  poster_path: string,
  vote_average: number,
  vote_count: number,
  character: string,
  backdrop_path: string,
  popularity: number,
  credit_id: string
};

export type TheMovieDBPersonShowCredit = TheMovieDBPersonContentCreditBase & {
  episode_count: number,
  original_name: string,
  name: string,
  media_type: TheMovieDBShowEntityName,
  first_air_date: string
};

export type TheMovieDBPersonMovieCredit = TheMovieDBPersonContentCreditBase & {
  media_type: TheMovieDBMovieEntityName,
  original_title: string,
  video: boolean,
  release_date: string,
  title: string,
  adult: boolean
};

export type TheMovieDBPersonContentCredits = {
  cast: (TheMovieDBPersonMovieCredit | TheMovieDBPersonShowCredit)[],
  crew: TheMovieDBPersonMovieCredit[]
};

export type TheMovieDBPersonAndCredits = TheMovieDBPerson & {
  combined_credits: TheMovieDBPersonContentCredits
};

export type TheMovieDBShowSearchResult = {
  origin_country: string[]
  first_air_date: string,
  name: string,
  vote_average: number,
  vote_count: number,
  original_name: string,
  poster_path: string,
  overview: string,
  original_language: string,
  backdrop_path: string | null,
  media_type: TheMovieDBShowEntityName,
  genre_ids: number[],
  popularity: number,
  id: number
};

export type TheMovieDBMovieSearchResult = {
  original_title: string,
  poster_path: string,
  video: boolean,
  vote_average: number,
  backdrop_path: string,
  vote_count: number,
  release_date: string,
  id: number,
  overview: string,
  adult: boolean,
  title: string,
  media_type: TheMovieDBMovieEntityName,
  genre_ids: number[],
  popularity: number,
  original_language: string
};

export type TheMovieDBPersonSearchResult = {
  gender: number,
  known_for_department: string,
  popularity: number,
  profile_path: string,
  adult: boolean,
  name: string,
  id: number,
  media_type: TheMovieDBPersonEntityName,
  known_for: (TheMovieDBShowSearchResult | TheMovieDBMovieSearchResult)[]
};

export type TheMovieDBSearchResult =
  TheMovieDBShowSearchResult | TheMovieDBMovieSearchResult | TheMovieDBPersonSearchResult;

export type TheMovieDBSearchResults = {
  page: number,
  results: TheMovieDBSearchResult[],
  total_pages: number,
  total_results: number
};
