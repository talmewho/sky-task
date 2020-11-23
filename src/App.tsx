import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import Show from './routes/Show';

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
            <Route path="/show/:id"><Show /></Route>
            <Route path="/movie/:id"></Route>
            <Route path="/cast/:id"></Route>
            <Route path="/search-results"></Route>
          </Switch>
        </Router>
      </main>
    </>
  );
};
