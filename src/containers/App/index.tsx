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
import { AuthProvider } from '../../helpers/Auth';
import PrivateRoute from '../../helpers/PrivateRoute';


function App() {

  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Switch>
            <Route exact path='/' component={Register} />
            <Route exact path='/login' component={LogIn} />
            <PrivateRoute exact path="/dashboard" component={Dashboard} />
            <Route path='/*' >
                <p>You're lost</p>
            </Route>
          </Switch>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
