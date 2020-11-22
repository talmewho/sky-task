import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import './App.css';

export const App: React.FC = () => {
  return (
    <>
      <h1 className="main-title">Sky Go</h1>
      <Router>
        <Switch>
          <Route path="/show/:id"></Route>
          <Route path="/movie/:id"></Route>
          <Route path="/cast/:id"></Route>
          <Route path="/search-results"></Route>
        </Switch>
      </Router>
    </>
  );
};
