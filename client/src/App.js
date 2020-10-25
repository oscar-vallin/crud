import React from 'react';

import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

import Empleados from './components/Empleados';

function App() {
  return (
    <Router>
        <Switch>
          <Route exact path="/" component={Empleados} />
        </Switch>
    </Router>
  );
}

export default App;
