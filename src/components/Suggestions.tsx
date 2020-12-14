import React from 'react';
import {Link} from 'react-router-dom';

import {Suggestion} from '../service/the-movie-db/types';

import './Suggestion.css';

interface ISuggestionsProps {
  data: Suggestion[];
  selectedIndex: number;
}

const Suggestions: React.FC<ISuggestionsProps> = ({data, selectedIndex}) => {
  if (!data) {
    return null;
  }

  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    (event.target as HTMLAnchorElement).blur();
  };

  const suggestions = data.map((item, index) => {
    const path = `/${item.type}/${item.id}`;
    const selected = selectedIndex === index ? 'selected' : undefined;
    return (<Link key={path} to={path} className={selected} onClick={handleClick}>{item.name}</Link>)
  });

  return (
    <div className="suggestions">{suggestions}</div>
  );
};

export default Suggestions;