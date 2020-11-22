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
}

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

export type TheMovieDBCastCredit = {
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

export type TheMovieDBCredits = {
  cast: TheMovieDBCastCredit[],
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
  in_production: false,
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
  type: 'tv',
  vote_average: number,
  vote_count: number
};