import React, {useState, useEffect} from 'react';
import {useParams, Link} from 'react-router-dom';

import {Content} from '../service/the-movie-db/types';

import {fetcher} from '../service/the-movie-db';

import './Movie.css';

const Movie: React.FC = () => {
  const {id} = useParams();
  const [movie, setMovie] = useState<Content>();

  useEffect(() => {
    (async () => {
      setMovie(await fetcher.getMovie({movieID: id, posterImageSize: 'w342'}));
    })();
  }, [id]);

  if (!movie) {
    return (<div>Loading...</div>);
  }

  let cast: React.ReactNode;
  if (movie.cast.length) {
    const names = movie.cast.map(({id, name}, index, array) => {
      const comma: string =
        index === array.length - 2 ?
          ' and ' :
        index < array.length - 2 ?
          ', ' :
          '.';
      return (
        <React.Fragment key={id}>
          <Link to={`/cast/${id}`}>{name}</Link>{comma}
        </React.Fragment>
      );
    });
    cast = (
      <>
        {'Starring '}
        {names}
      </>
    );
  }

  const year = movie.year ? ` (${movie.year})` : '';

  return (
    <article className="movie-details">
      <figure className="hero"><img src={movie.imageURL} alt={movie.name} /></figure>
      <section className="details">
        <h1 className="content-title">{movie.name}{year}</h1>
        <div className="content-description">{movie.overview}</div>
        {cast}
      </section>
    </article>
  );
};

export default Movie;
