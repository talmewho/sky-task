import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import Header from './components/Header';
import Show from './routes/Show';
import Movie from './routes/Movie';
import Cast from './routes/Cast';
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
            <Route path="/tv/:id"><Show /></Route>
            <Route path="/movie/:id"><Movie /></Route>
            <Route path="/cast/:id"><Cast /></Route>
            <Route path="/search-results"><SearchResults /></Route>
          </Switch>
        </main>
      </Router>
    </>
  );
};
