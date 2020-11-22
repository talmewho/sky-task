export type BasicResponse = { status: number, responseText: string };

export default class FetcherError extends Error {
  errorData: BasicResponse;
  
  constructor(message: string, errorData: BasicResponse) {
    super(message);
    this.errorData = errorData;
  }
}