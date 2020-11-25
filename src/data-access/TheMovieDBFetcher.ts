import {
  TheMovieDBShowAndCredits,
  TheMovieDBMovieAndCredits,
  TheMovieDBShowCredits,
  TheMovieDBMovieCredits,
  TheMovieDBConfiguration,
  TheMovieDBPersonContentCredits,
  TheMovieDBImageConfiguration,
  TheMovieDBSearchResults,
  TheMovieDBPersonAndCredits
} from './TheMovieDB.types';
import {FetcherOptions} from './DataFetcher.types';

import constants from '../common/TheMovieDB.constants';

import DataFetcher from './DataFetcher';

import applicationConfiguration from '../configuration';

export default class TheMovieDbService extends DataFetcher {
  baseURL: string = applicationConfiguration.theMovieDB.apiBaseURL;

  baseParameters: Record<string, string> =
    {[constants.parameterName.apiKey]: applicationConfiguration.theMovieDB.apiKey};

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
    return this.get<TheMovieDBShowAndCredits>(
      `/3/tv/${id}`, {
        parameters: {
          [constants.parameterName.appendToResponse]: constants.appendToResponseName.credits
        }
      }
    );
  }

  async getShowCredits(id: string): Promise<TheMovieDBShowCredits> {
    return this.get<TheMovieDBShowCredits>(`/3/tv/${id}/credits`);
  }

  async getMovie(id: string): Promise<TheMovieDBMovieAndCredits> {
    return this.get<TheMovieDBMovieAndCredits>(
      `/3/movie/${id}`, {
        parameters: {
          [constants.parameterName.appendToResponse]: constants.appendToResponseName.credits
        }
      }
    );
  }

  async getMovieCredits(id: string): Promise<TheMovieDBMovieCredits> {
    return this.get<TheMovieDBMovieCredits>(`/3/movie/${id}/credits`);
  }

  async getPerson(id: string): Promise<TheMovieDBPersonAndCredits> {
    return this.get<TheMovieDBPersonAndCredits>(
      `/3/person/${id}`, {
        parameters: {
          [constants.parameterName.appendToResponse]: constants.appendToResponseName.combinedCredits
        }
      }
    );
  }

  async getPersonCredits(id: string): Promise<TheMovieDBPersonContentCredits> {
    return this.get<TheMovieDBPersonContentCredits>(`/3/person/${id}/combined_credits`);
  }

  async search(query: string, page: number): Promise<TheMovieDBSearchResults> {
    return this.get<TheMovieDBSearchResults>(
      '/3/search/multi', {parameters: {[constants.parameterName.query]: query, page: String(page)}});
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
