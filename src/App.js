import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'

import { About } from './Componentes/About';
import {Users} from './Componentes/Users';
import {Navbar} from './Componentes/Navbar';

function App() {
  return (
    <Router>
      <Navbar></Navbar>
      <div className="container p-4">
      <Switch>
        <Route path="/about" component={About} />
        <Route path="/" component={Users} />
        </Switch>
        </div>
      </Router>
  );
}

export default App;
