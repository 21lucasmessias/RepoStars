import React from 'react';

import {Switch, Route, BrowserRouter} from 'react-router-dom';

import Landing from './pages/landing';
import Search from './pages/search';

const Routes: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path='/' exact component={Landing}/>
        <Route path='/search/:language' component={Search}/>
      </Switch>
    </BrowserRouter>  
  );
}

export default Routes;