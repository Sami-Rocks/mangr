import React from 'react';
import './style.scss';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'
import Register from '../Register';
import LogIn from '../LogIn';
import { Cross, Doughnut, Square, Times } from '../../components/shapes';



function App() {

  const background = () =>{
    let b:any =[]
    for(let i = 0; i<100; i++){
      b.push(<><Square /><Cross /><Times /><Doughnut /></>)
    }
    return(
      <>
        {b}
      </>
    )
  }

  return (
    <Router>
      <div className="App">
        <div className="background">
          {background()}
          {/* <Cross /> */}
        </div>
        <Switch>
          <Route exact path='/'>
            <Register />
          </Route>
          <Route exact path='/log-in'>
            <LogIn />
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
