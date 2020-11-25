import {
  TheMovieDBShowEntityName,
  TheMovieDBMovieEntityName,
  TheMovieDBPersonEntityName
} from '../data-access/TheMovieDB.types';

import {AllFilterName} from '../service/the-movie-db/types';

export default {
  mediaType: {
    tv: 'tv' as TheMovieDBShowEntityName,
    movie: 'movie' as TheMovieDBMovieEntityName,
    person: 'person' as TheMovieDBPersonEntityName,
    // Filter-specific.
    all: 'all' as AllFilterName
  },
  parameterName: {
    query: 'query',
    appendToResponse: 'append_to_response',
    apiKey: 'api_key',
    // Filter-specific.
    filter: 'filter'
  },
  sizeField: {
    poster: 'poster_sizes' as 'poster_sizes',
    profile: 'profile_sizes' as 'profile_sizes'
  },
  appendToResponseName: {
    credits: 'credits',
    combinedCredits: 'combined_credits'
  },
  posterSize: {
    w92: 'w92',
    w342: 'w342'
  },
  profileSize: {
    w45: 'w45',
    w185: 'w185'
  }
};
