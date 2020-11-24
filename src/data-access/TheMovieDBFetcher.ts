import {
  TheMovieDBShowAndCredits,
  TheMovieDBMovieAndCredits,
  TheMovieDBShowCredits,
  TheMovieDBMovieCredits,
  TheMovieDBConfiguration,
  TheMovieDBCastContentCredits,
  TheMovieDBImageConfiguration,
  TheMovieDBSearchResults,
  TheMovieDBCastAndCredits
} from './TheMovieDB.types';
import {FetcherOptions} from './DataFetcher.types';

import DataFetcher from './DataFetcher';

import applicationConfiguration from '../configuration';

export default class TheMovieDbService extends DataFetcher {
  baseURL: string = applicationConfiguration.theMovieDB.apiBaseURL;

  baseParameters: Record<string, string> =
    {[applicationConfiguration.theMovieDB.apiKeyParameterName]: applicationConfiguration.theMovieDB.apiKey};

  configurationPromise: Promise<TheMovieDBConfiguration> | null = null;

  async get<T>(path: string, options?: FetcherOptions) {
    await this.getConfiguration();
    return super.get<T>(path, options);
  }

  async getConfiguration() {
    if (!this.configurationPromise) {
      this.configurationPromise = super.get<TheMovieDBConfiguration>('/3/configuration');
    }
    return await this.configurationPromise;
  }

  async getShow(id: string): Promise<TheMovieDBShowAndCredits> {
    return this.get<TheMovieDBShowAndCredits>(`/3/tv/${id}`, {parameters: {append_to_response: 'credits'}});
  }

  async getShowCredits(id: string): Promise<TheMovieDBShowCredits> {
    return this.get<TheMovieDBShowCredits>(`/3/tv/${id}/credits`);
  }

  async getMovie(id: string): Promise<TheMovieDBMovieAndCredits> {
    return this.get<TheMovieDBMovieAndCredits>(`/3/movie/${id}`, {parameters: {append_to_response: 'credits'}});
  }

  async getMovieCredits(id: string): Promise<TheMovieDBMovieCredits> {
    return this.get<TheMovieDBMovieCredits>(`/3/movie/${id}/credits`);
  }

  async getCast(id: string): Promise<TheMovieDBCastAndCredits> {
    return this.get<TheMovieDBCastAndCredits>(`/3/person/${id}`, {parameters: {append_to_response: 'combined_credits'}});
  }

  async getCastCredits(id: string): Promise<TheMovieDBCastContentCredits> {
    return this.get<TheMovieDBCastContentCredits>(`/3/person/${id}/combined_credits`);
  }

  async search(query: string, page: number): Promise<TheMovieDBSearchResults> {
    return this.get<TheMovieDBSearchResults>('/3/search/multi', {parameters: {query, page: String(page)}});
  }

  async getImageURL(
    relativeImageURL: string, type: keyof TheMovieDBImageConfiguration, size: string): Promise<string> {
    const configuration = await this.getConfiguration();
    if (!configuration.images[type].includes(size)) {
      throw new Error("Invalid image size");
    }
    return `${configuration.images.secure_base_url}${size}${relativeImageURL}`;
  }
}
