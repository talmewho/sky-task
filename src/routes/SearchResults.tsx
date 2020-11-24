import React, {useState, useEffect} from 'react';
import {useLocation} from 'react-router-dom';

import {SearchResults as SearchResultsType} from '../service/the-movie-db/types';

import {fetcher} from '../service/the-movie-db';

import SearchResult from '../components/SearchResult';

import './SearchResults.css';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const SearchResults: React.FC = () => {
  const query = useQuery().get('query') || '';
  const [results, setResults] = useState<SearchResultsType>();
  const [isLoading, setIsLoading] = useState<boolean>();

  const fetch = async (page: number) => {
    setIsLoading(true);
    const nextResults = await fetcher.search({query, page, posterImageSize: 'w92', profileImageSize: 'w45'});
    setIsLoading(false);
    return nextResults;
  };

  useEffect(() => {
    (async () => {
      setResults(await fetch(1));
    })();
  }, [query]); // eslint-disable-line react-hooks/exhaustive-deps

  if (!results) {
    return (<div>Loading...</div>);
  }

  if (!results.totalCount) {
    return (<article>I could not find anything for {query}, what a shame. :(</article>);
  }

  const handleShowMoreResults = async () => {
    const nextResults = {...await fetch(results.page + 1)};
    nextResults.results =
      results.results.concat(
        // Workaround for "Leonardo" page 4 and 5 containing the same result ("Prof. Leonardo").
        nextResults.results.filter(
          ({id}) => !results.results.find(({id: existingID}) => id === existingID)));
    setResults(nextResults);
  };

  const renderResults = () => {
    return results.results.map(item => <SearchResult key={item.id + item.type} data={item} />);
  };

  const renderShowMore = () => {
    if (results.page < results.totalPageCount) {
      const text = isLoading ? 'Loading...' : 'Show more results';
      return (
        <button disabled={isLoading}
          className="show-more-results"
          type="button"
          onClick={handleShowMoreResults}>
          {text}
        </button>
      );
    }
  };

  return (
    <article className="search-results-container">
      <header className="search-results-header">Found {results.totalCount} results for "{query}".</header>
      <section className="search-results-wrapper">
        {renderResults()}
      </section>
      {renderShowMore()}
    </article>
  );
};

export default SearchResults;
