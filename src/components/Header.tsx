import React from 'react';
import {useHistory, useLocation} from 'react-router-dom';

import SearchBar from './SearchBar';

import './Header.css';

const Header: React.FC = () => {
  const history = useHistory();
  const location = useLocation();
  const handleSearch = (query: string) => {
    (async () => {
      const queryString = new URLSearchParams({query}).toString();
      history.push(`/search-results?${queryString}`);
    })();
  };

  return (
    <header className="main-title">
      <img className="logo" src="https://www.sky.com/assets2/icons/app/sky-go-app-new.png" alt="Sky Go" />
      <SearchBar onSearch={handleSearch} shouldFocus={location.pathname === '/'} />
    </header>
  );
};

export default Header;