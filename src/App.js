import { BrowserRouter as Router, Route,Switch } from 'react-router-dom';
import Transfer from './screens/Transfer';
import SignIn from "./screens/SignIn"
import DashBoard from './screens/DashBoard';
import PrivateRoute from './Components/PrivateRoute';


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
