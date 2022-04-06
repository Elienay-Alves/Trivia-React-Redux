import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import Login from './pages/Login';
import Jogo from './pages/Jogo';
import Config from './pages/Config';

export default function App() {
  return (
    <Switch>
      <Route exact to="/" component={ Login } />
      <Route to="/jogo" component={ Jogo } />
      <Route to="/config" component={ Config } />
    </Switch>
  );
}
