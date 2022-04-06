import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import Jogo from './pages/Jogo';
import Config from './pages/Config';
import Login from './pages/Login';

export default function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route exact path="/jogo" component={ Jogo } />
      <Route exact path="/config" component={ Config } />
    </Switch>
  );
}
