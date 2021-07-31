import React from 'react';
import './style.scss';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'
import Register from '../Register';
import LogIn from '../LogIn';
import Dashboard from '../Dashboard';


function App() {

  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path='/'>
            <Register />
          </Route>
          <Route exact path='/log-in'>
            <LogIn />
          </Route>
          <Route exact path="/dashboard" >
            <Dashboard />
          </Route>
          <Route path='/*' >
              <p>You're lost</p>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
