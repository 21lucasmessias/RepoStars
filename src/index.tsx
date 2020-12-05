import React from 'react';
import ReactDOM from 'react-dom';

import './styles/global.css';

import {Switch, Route, BrowserRouter} from 'react-router-dom';

import Landing from './pages/landing';
import Search from './pages/search';


ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Switch>
        <Route path='/' exact component={Landing}/>
        <Route path='/search' exact component={Search}/>
      </Switch>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);