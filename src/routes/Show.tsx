import React, {useState, useEffect} from 'react';

import {useParams, Link} from 'react-router-dom';

import {Content} from '../service/the-movie-db/types';

import {fetcher} from '../service/the-movie-db';

import './Show.css';

const Show: React.FC = () => {
  const {id} = useParams();
  const [show, setShow] = useState<Content>();

  useEffect(() => {
    (async () => {
      setShow(await fetcher.getShow({showID: id, posterImageSize: 'w342'}));
    })();
  }, [id]);

  if (!show) {
    return (<div>Loading...</div>);
  }

  let cast: React.ReactNode;
  if (show.cast.length) {
    const names = show.cast.map(({id, name}, index, array) => {
      const comma: string =
        index === array.length - 2 ?
          ' and' :
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

  return (
    <article className="show-details">
      <figure className="hero"><img src={show.imageURL} alt={show.name} /></figure>
      <section className="details">
        <h1 className="content-title">{show.name} ({show.year})</h1>
        <div className="content-description">{show.overview}</div>
        {cast}
      </section>
    </article>
  );
};

export default Show;
