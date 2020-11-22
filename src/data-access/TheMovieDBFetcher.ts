import {TheMovieDBShow} from './TheMovieDB.types';

import DataFetcher from './DataFetcher';

import configuration from '../configuration';

export default class TheMovieDbService extends DataFetcher {
  baseURL: string = configuration.theMovieDB.apiBaseURL;
  
  baseParameters: Record<string, string> =
    {[configuration.theMovieDB.apiKeyParameterName]: configuration.theMovieDB.apiKey};

  async getShow<TheMovieDBShow>(id: string): Promise<TheMovieDBShow> {
    return this.get(`/3/movie/${id}`);
  }

  async getShowCredits<TheMovieDBCredits>(id: string): Promise<TheMovieDBCredits> {
    return this.get(`/3/tv/${id}/credits`);
  }
}
