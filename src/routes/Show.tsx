import React, {useState, useEffect} from 'react';
import {useParams, Link} from 'react-router-dom';

import {Content} from '../service/the-movie-db/types';

import constants from '../common/TheMovieDB.constants';

import {fetcher} from '../service/the-movie-db';

import './Show.css';

const Show: React.FC = () => {
  const {id} = useParams() as {id: string};
  const [show, setShow] = useState<Content>();
  const [hasError, setHasError] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      let newShow: Content;
      try {
        newShow = await fetcher.getShow({showID: id, posterImageSize: constants.posterSize.w342});
      } catch (e) {
        setHasError(true);
        return;
      }
      setShow(newShow);
    })();
  }, [id]);

  if (hasError) {
    return (<div>Could not load the show. :( Try again later.</div>);
  } else if (!show) {
    return (<div>Loading...</div>);
  }

  let cast: React.ReactNode;
  if (show.cast.length) {
    const names = show.cast.map(({id, name}, index, array) => {
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

  const year = show.year ? ` (${show.year})` : '';

  return (
    <article className="show-details">
      <figure className="hero"><img src={show.imageURL} alt={show.name} /></figure>
      <section className="details">
        <h1 className="content-title">{show.name}{year} (Show)</h1>
        <div className="content-description">{show.overview}</div>
        {cast}
      </section>
    </article>
  );
};

export default Show;
