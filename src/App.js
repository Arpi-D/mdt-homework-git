import { BrowserRouter as Router, Route, Redirect ,Switch } from 'react-router-dom';
import './App.css';
import Transfer from './Transfer';
import SignIn from "./SignIn"
import DashBoard from './DashBoard';
import PrivateRoute from './PrivateRoute';
import { useState, useEffect } from 'react';


function App() {

  const [validate,setValidate] = useState(true)
 
  return (
    <div className="App">
      <Router>
      <Switch>
        <Route exact path='/' component={SignIn} />
        <Route exact path='/signin' component={SignIn} />
        <PrivateRoute exact path="/dashboard" component={DashBoard} />
        <Route  path='/transfer' component={Transfer} />
        </Switch>
      </Router>
    </div>
  );
}


export default App;
