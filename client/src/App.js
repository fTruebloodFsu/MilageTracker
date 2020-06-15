import React from 'react';
import './App.css';
import Home from './Home.js'
import CreateAccount from './CreateAccount.js'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

function App() {
  return (

    <div>
      <Router>
          <Switch>
            <Route path='/' exact component={Home} />
            <Route path='/CreateAccount' component={CreateAccount} />
          </Switch>
      </Router>
    </div>
  );
  
}

export default App;
