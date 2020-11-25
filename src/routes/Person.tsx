import React, {useState, useEffect} from 'react';
import {useParams, Link} from 'react-router-dom';

import {Person as PersonData} from '../service/the-movie-db/types';

import constants from '../common/TheMovieDB.constants';

import {fetcher} from '../service/the-movie-db';

import './Person.css';

const Person: React.FC = () => {
  const {id} = useParams();
  const [person, setPerson] = useState<PersonData>();
  const [hasError, setHasError] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      let newPerson: PersonData;
      try {
        newPerson = await fetcher.getPerson({personID: id, profileImageSize: constants.profileSize.w185});
      } catch (e) {
        setHasError(true);
        return;
      }
      setPerson(newPerson);
    })();
  }, [id]);

  if (hasError) {
    return (<div>Could not load the person. :( Try again later.</div>);
  } else if (!person) {
    return (<div>Loading...</div>);
  }

  let contents: React.ReactNode;
  if (person.contents.length) {
    const titles = person.contents.map(({id, name, type, year}, index, array) => {
      const yearLabel = year ? ` (${year})` : '';
      const typeLabel = type === constants.mediaType.tv ? ' (Show)' : undefined;
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
    <article className="person-details">
      <figure className="hero"><img src={person.imageURL} alt={person.name} /></figure>
      <section className="details">
        <h1 className="content-title">{person.name} ({person.age})</h1>
        <div className="content-description">{person.biography}</div>
        {contents}
      </section>
    </article>
  );
};

export default Person;
