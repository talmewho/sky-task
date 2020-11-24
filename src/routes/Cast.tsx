import React, {useState, useEffect} from 'react';
import {useParams, Link} from 'react-router-dom';

import {Cast as CastData} from '../service/the-movie-db/types';

import {fetcher} from '../service/the-movie-db';

import './Cast.css';

const Cast: React.FC = () => {
  const {id} = useParams();
  const [cast, setCast] = useState<CastData>();

  useEffect(() => {
    (async () => {
      setCast(await fetcher.getCast({castID: id, profileImageSize: 'w185'}));
    })();
  }, [id]);

  if (!cast) {
    return (<div>Loading...</div>);
  }

  let contents: React.ReactNode;
  if (cast.contents.length) {
    const titles = cast.contents.map(({id, name, type, year}, index, array) => {
      const yearLabel = year ? ` (${year})` : '';
      const typeLabel = type === 'tv' ? ' (Show)' : undefined;
      return (
        <li key={id}>
          <Link to={`/${type}/${id}`}>{name}</Link>{yearLabel}{typeLabel}
        </li>
      );
    });
    contents = (
      <ul>
        {titles}
      </ul>
    );
  }

  return (
    <article className="cast-details">
      <figure className="hero"><img src={cast.imageURL} alt={cast.name} /></figure>
      <section className="details">
        <h1 className="content-title">{cast.name} ({cast.age})</h1>
        <div className="content-description">{cast.biography}</div>
        {contents}
      </section>
    </article>
  );
};

export default Cast;
