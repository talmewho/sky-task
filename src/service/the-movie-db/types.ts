export type Cast = {
  id: number,
  name: string,
  shows?: Content[],
  movies?: Content[]
};

export type Content = {
  id: number,
  name: string,
  imageURL: string,
  overview: string,
  type: 'tv' | 'movie'
  cast: Cast[],
  year: number,
};
