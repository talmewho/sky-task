import React, {useState, useEffect, useRef} from 'react';
import {useHistory} from 'react-router-dom';

import {Suggestion, FilterNames} from '../service/the-movie-db/types';

import constants from '../common/TheMovieDB.constants';

import {useQuery} from '../common/routingHooks';

import {fetcher} from '../service/the-movie-db';

import Suggestions from './Suggestions';
import Filters from './Filters';

import './SearchBar.css';

interface ISearchBarProps {
  onSearch(query: string, filter: FilterNames): void;
  shouldFocus?: boolean;
}

const SearchBar: React.FC<ISearchBarProps> = ({onSearch, shouldFocus}) => {
  const history = useHistory();
  const searchParameters = useQuery();
  const defaultQuery = searchParameters.get(constants.parameterName.query) || '';
  const defaultFilter =
    constants.mediaType[String(searchParameters.get(constants.parameterName.filter)) as FilterNames] ||
    constants.mediaType.all;

  const [query, setQuery] = useState<string>(defaultQuery);
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [selectedSuggestionIndex, setSelectedSuggestionIndex] = useState<number>(-1);
  const [filter, setFilter] = useState<FilterNames>(defaultFilter);

  const inputRef = useRef<HTMLInputElement>(null);
  const submitRef = useRef<HTMLInputElement>(null);
  const timerRef = useRef<NodeJS.Timer | null>(null);

  useEffect(() => {
    if (shouldFocus && inputRef.current) {
      inputRef.current.focus()
    }
  }, [shouldFocus]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (inputRef.current) {
      inputRef.current.blur();
    }
    if (submitRef.current) {
      submitRef.current.blur();
    }

    if (query) {
     onSearch(query, filter);
    }
  };

  const handleQueryInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    (async () => {
      const newQuery = event.target.value;
      setQuery(newQuery);
      if (newQuery.length > 4) {
        if (timerRef.current) {
          clearTimeout(timerRef.current);
        }
        timerRef.current =
          setTimeout(async () => {
            setSuggestions(await fetcher.getSuggestions({query: newQuery}));
            setSelectedSuggestionIndex(-1);
          }, 200);
      } else {
        setSuggestions([]);
      }
    })();
  };

  const handleSuggestionNavigation = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (!suggestions.length) {
      return;
    }

    if (event.key === 'ArrowDown') {
      event.preventDefault();
      const newIndex = selectedSuggestionIndex < (suggestions.length - 1) ? selectedSuggestionIndex + 1 : 0;
      setSelectedSuggestionIndex(newIndex);
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      const newIndex = selectedSuggestionIndex > -1 ? selectedSuggestionIndex - 1 : (suggestions.length - 1);
      setSelectedSuggestionIndex(newIndex);
    } else if (event.key === 'Enter' && selectedSuggestionIndex > -1) {
      event.preventDefault();
      const item = suggestions[selectedSuggestionIndex];
      history.push(`/${item.type}/${item.id}`);
      if (inputRef.current) {
        inputRef.current.blur();
      }
    }
  };

  const handleFilterChange = (filter: FilterNames) => {
    setFilter(filter);
  };

  return (
    <form className="search-form" action="/search-results" onSubmit={handleSubmit}>
      <input
        className="search-field"
        name={constants.parameterName.query}
        type="search"
        autoComplete="off"
        placeholder="Titanic"
        onChange={handleQueryInput}
        value={query}
        onKeyDown={handleSuggestionNavigation}
        ref={inputRef} />
      <Suggestions data={suggestions} selectedIndex={selectedSuggestionIndex} />
      <input className="submit" type="submit" value="Search" ref={submitRef} />
      <Filters selectedFilter={filter} onChange={handleFilterChange} />
    </form>
  );
};

export default SearchBar;