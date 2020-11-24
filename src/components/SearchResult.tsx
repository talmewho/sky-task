import React from 'react';
import {Link} from 'react-router-dom';

import {SearchResult as SearchResultType} from '../service/the-movie-db/types';

import './SearchResult.css';

interface ISearchResultProp {
  data: SearchResultType
}

const SearchResult: React.FC<ISearchResultProp> = ({data}) => {
  const className = `search-result ${data.type}`;
  return (
    <section className={className} key={data.type + data.id}>
      <Link to={`/${data.type === 'person'?'cast':data.type}/${data.id}`}>
        <figure><img src={data.imageURL} alt={data.name} /></figure>
        {data.name}
      </Link>
    </section>
  );
};

export default SearchResult;