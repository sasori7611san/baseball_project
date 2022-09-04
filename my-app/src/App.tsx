import React from 'react';
import './App.css';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
import { Router } from './router/Router';


function App() {
  return (
      <BrowserRouter>
        <div>
        <Link to="/">タイトルに戻る</Link>
          <br />
          <Link to="/playGamen">PlayBall!</Link>
        </div>
        <Router />
      </BrowserRouter>


  );
}

export default App;
