import React, {useState, useEffect} from 'react';
import {useParams, Link} from 'react-router-dom';

import {Content} from '../service/the-movie-db/types';

import constants from '../common/TheMovieDB.constants';

import {fetcher} from '../service/the-movie-db';

import './Movie.css';

const Movie: React.FC = () => {
  const {id} = useParams() as {id: string};
  const [movie, setMovie] = useState<Content>();
  const [hasError, setHasError] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      let newMovie: Content;
      try {
        newMovie = await fetcher.getMovie({movieID: id, posterImageSize: constants.posterSize.w342});
      } catch (e) {
        setHasError(true);
        return;
      }
      setMovie(newMovie);
    })();
  }, [id]);

  if (hasError) {
    return (<div>Could not load the movie. :( Try again later.</div>);
  } else if (!movie) {
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
          <Link to={`/${constants.mediaType.person}/${id}`}>{name}</Link>{comma}
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
