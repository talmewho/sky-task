import {
  TheMovieDBShowAndCredits,
  TheMovieDBMovieAndCredits,
  TheMovieDBConfiguration,
  TheMovieDBImageConfiguration
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

  async getShow<TheMovieDBShowAndCredits>(id: string): Promise<TheMovieDBShowAndCredits> {
    return this.get(`/3/tv/${id}`, {parameters: {append_to_response: 'credits'}});
  }

  async getShowCredits<TheMovieDBCredits>(id: string): Promise<TheMovieDBCredits> {
    return this.get(`/3/tv/${id}/credits`);
  }

  async getMovie<TheMovieDBMovieAndCredits>(id: string): Promise<TheMovieDBMovieAndCredits> {
    return this.get(`/3/movie/${id}`, {parameters: {append_to_response: 'credits'}});
  }

  async getMovieCredits<TheMovieDBCredits>(id: string): Promise<TheMovieDBCredits> {
    return this.get(`/3/movie/${id}/credits`);
  }

  async getImageURL(relativeImageURL: string, type: keyof TheMovieDBImageConfiguration, size: string) {
    const configuration = await this.getConfiguration();
    if (!configuration.images[type].includes(size)) {
      throw new Error("Invalid image size");
    }
    return `${configuration.images.secure_base_url}${size}${relativeImageURL}`;
  }
}
