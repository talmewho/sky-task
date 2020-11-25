import React, {useState} from 'react';
import {Link} from 'react-router-dom';

import {SearchResult as SearchResultType} from '../service/the-movie-db/types';

import constants from '../common/TheMovieDB.constants';

import './SearchResult.css';

interface ISearchResultProp {
  data: SearchResultType
}

const SearchResult: React.FC<ISearchResultProp> = ({data}) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const handleResultClick = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    if (!isExpanded) {
      event.preventDefault();
      setIsExpanded(true);
    }
  };

  const expandedClass = isExpanded ? ' expanded' : '';

  let expandedDetails;
  let showLabel;
  if (isExpanded) {
    showLabel = data.type === constants.mediaType.tv ? ' (Show)' : '';
    const yearLabel = data.year ? <div className="extra-detail">Released in {data.year}.</div> : undefined;

    const knownForList = data.knownFor ? data.knownFor.join(' | ') : undefined;
    const knownFor = knownForList ? <div className="extra-detail">Known for {knownForList}.</div> : undefined;

    expandedDetails = (
      <>
        {yearLabel}
        {knownFor}
        <div className="extra-detail">Click for more details.</div>
      </>
    );
  }

  const className = `search-result ${data.type}${expandedClass}`;

  return (
    <Link
      key={data.type + data.id}
      to={`/${data.type}/${data.id}`}
      className={className}
      onClick={handleResultClick}>
      <figure><img src={data.imageURL} alt={data.name} /></figure>
      <div className="details">
        <span className="name">{data.name}</span>{showLabel}
        {expandedDetails}
      </div>
    </Link>
  );
};

export default SearchResult;