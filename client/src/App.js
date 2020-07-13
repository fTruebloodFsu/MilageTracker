import React from 'react';
import './App.css';
import Home from './Home.js'
import CreateAccount from './CreateAccount.js'
import StartTrip from './StartATrip.js'
import MyNavBar from './NavBar.js'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

function App() {
  return (

    <div>
      <Router>
        <MyNavBar />
          <Switch>
            <Route path='/' exact component={Home} />
            <Route path='/CreateAccount' component={CreateAccount} />
            <Route path='/StartATrip' component={StartTrip} />
          </Switch>
      </Router>
    </div>
  );
  
}

export default App;
