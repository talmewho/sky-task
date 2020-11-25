import React, {useState, useEffect} from 'react';
import {useLocation} from 'react-router-dom';

import {SearchResults as SearchResultsType} from '../service/the-movie-db/types';

import constants from '../common/TheMovieDB.constants';

import {fetcher} from '../service/the-movie-db';

import SearchResult from '../components/SearchResult';

import './SearchResults.css';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const SearchResults: React.FC = () => {
  const query = useQuery().get(constants.parameterName.query) || '';
  const [results, setResults] = useState<SearchResultsType>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hasError, setHasError] = useState<boolean>(false);
  const [hasNextPageError, setHasNextPageError] = useState<boolean>(false);

  const fetchResults = async (page: number) => {
    return await fetcher.search({
      query, page, posterImageSize: constants.posterSize.w92, profileImageSize: constants.profileSize.w45
    });
  };

  useEffect(() => {
    (async () => {
      setHasError(false);
      setResults(undefined);
      let newResults: SearchResultsType;
      try {
        newResults = await fetchResults(1);
      } catch (e) {
        setHasError(true);
        return;
      }
      setResults(newResults);
    })();
  }, [query]); // eslint-disable-line react-hooks/exhaustive-deps
  // ESLint compains about fetch not being listed, but this is fine as it must be different,
  // but that should not re-run the useEffect callback, only query changes should.

  if (hasError) {
    return (<div>Could not load the results. :( Try again later.</div>);
  } else if (!results) {
    return (<div>Loading...</div>);
  }

  if (!results.totalCount) {
    return (<article>I could not find anything for {query}, what a shame. :(</article>);
  }

  const handleShowMoreResults = async () => {
    setIsLoading(true);
    setHasNextPageError(false);
    let nextResults: SearchResultsType;
    try {
      nextResults = {...await fetchResults(results.page + 1)};
    } catch (e) {
      setHasNextPageError(true);
      setIsLoading(false);
      return;
    }

    nextResults.results =
      results.results.concat(
        // Workaround for "Leonardo" page 4 and 5 containing the same result ("Prof. Leonardo").
        nextResults.results.filter(
          ({id}) => !results.results.find(({id: existingID}) => id === existingID)));

    setIsLoading(false);
    setResults(nextResults);
  };

  const renderResults = () => {
    return results.results.map(item => <SearchResult key={item.id + item.type} data={item} />);
  };

  const renderShowMore = () => {
    if (results.page < results.totalPageCount) {
      const text =
        isLoading ?
          'Loading...' :
        hasNextPageError ?
          'Failed to show more. Click to try again' :
          'Show more results';

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
