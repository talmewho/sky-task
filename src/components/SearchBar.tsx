import React, {useState, useEffect, useRef} from 'react';

import constants from '../common/TheMovieDB.constants';

import './SearchBar.css';

interface ISearchBarProps {
  onSearch(query: string): void;
  shouldFocus?: boolean;
}

const SearchBar: React.FC<ISearchBarProps> = ({onSearch, shouldFocus}) => {
  const [query, setQuery] = useState<string>('');

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (shouldFocus && inputRef.current) {
      inputRef.current.focus()
    }
  }, [shouldFocus]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSearch(query);
  };

  const handleQueryInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  return (
    <form className="search-form" action="/search-results" onSubmit={handleSubmit}>
      <input
        className="search-field"
        name={constants.parameterName.query}
        type="search"
        placeholder="Titanic"
        onChange={handleQueryInput}
        ref={inputRef} />
      <input className="submit" type="submit" />
    </form>
  );
};

export default SearchBar;