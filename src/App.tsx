import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import constants from './common/TheMovieDB.constants';

import Header from './components/Header';
import Show from './routes/Show';
import Movie from './routes/Movie';
import Person from './routes/Person';
import SearchResults from './routes/SearchResults';

import './App.css';

export const App: React.FC = () => {
  return (
    <>
      <Router>
        <Header />
        <main>
          <Switch>
            <Route path="/" exact>Welcome to Sky Go!</Route>
            <Route path={`/${constants.mediaType.tv}/:id`}><Show /></Route>
            <Route path={`/${constants.mediaType.movie}/:id`}><Movie /></Route>
            <Route path={`/${constants.mediaType.person}/:id`}><Person /></Route>
            <Route path="/search-results"><SearchResults /></Route>
          </Switch>
        </main>
      </Router>
    </>
  );
};
