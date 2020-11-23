import configuration from '../configuration';
import FetcherError from './FetcherError';
import {FetcherOptions} from './DataFetcher.types';

export default class DataFetcher {
  baseURL: string = '';
  
  baseParameters: Record<string, string> = {};
  
  async fetch<T>(
    path: string, {
      baseURL = this.baseURL || configuration.apiBaseURL,
      parameters = {},
      ...options
   }: FetcherOptions = {}
  ): Promise<T> {
    let relativeURL;

    if (this.baseParameters || parameters) {
      const searchParameters = new URLSearchParams({...this.baseParameters, ...parameters}).toString();
      relativeURL = `${path}?${searchParameters}`;
    } else {
      relativeURL = path;
    }

    const fullURL = `${baseURL}${relativeURL}`;

    const response: Response = await fetch(fullURL, options);

    if (response.ok) {
      return await response.json() as T;
    }

    let responseText;
    try {
      responseText = await response.text();
    } catch (e) {
      responseText = '';
    }
    const error = new FetcherError(`Could not fetch ${fullURL}`, { status: response.status, responseText });
    throw error;
  }

  async get<T>(path: string, options?: FetcherOptions): Promise<T> {
    return this.fetch<T>(path, options);
  }
}
