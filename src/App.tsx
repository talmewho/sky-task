import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import Show from './routes/Show';
import Movie from './routes/Movie';
import Cast from './routes/Cast';

import './App.css';

export const App: React.FC = () => {
  return (
    <>
      <header className="main-title">
        <img className="logo" src="https://www.sky.com/assets2/icons/app/sky-go-app-new.png" alt="Sky Go" />
      </header>
      <main>
        <Router>
          <Switch>
            <Route path="/tv/:id"><Show /></Route>
            <Route path="/movie/:id"><Movie /></Route>
            <Route path="/cast/:id"><Cast /></Route>
            <Route path="/search-results"></Route>
          </Switch>
        </Router>
      </main>
    </>
  );
};
