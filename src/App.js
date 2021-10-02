import { BrowserRouter as Router, Route,Switch } from 'react-router-dom';
import './App.css';
import Transfer from './Transfer';
import SignIn from "./SignIn"
import DashBoard from './DashBoard';
import PrivateRoute from './PrivateRoute';


function App() {
 
  return (
    <div >
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
