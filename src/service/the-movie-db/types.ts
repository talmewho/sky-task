type SummarizedContent = {
  id: number,
  name: string,
  type: 'tv' | 'movie',
  year: number
};

export type Cast = {
  id: number,
  name: string,
  imageURL: string,
  biography: string,
  contents: SummarizedContent[],
  age?: number
};

export type Content = SummarizedContent & {
  imageURL: string,
  overview: string,
  cast: {id: number, name: string}[],
  year: number
};
