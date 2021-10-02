import './App.css';
import { Router, Route, Switch } from 'react-router-dom';
import DashBoard from './DashBoard';
import Transfer from './Transfer';
import SignIn from "./SignIn"

const Routing = () => {
  return(
    <Router>
      <Switch>
        <Route exact path="/" component={SignIn} />
        <Route path="/dashboard" component={DashBoard} />
        <Route path="/transfer" component={Transfer} />
      </Switch>
    </Router>
  )
}

function App() {
  return (
    <div className="App">
     <Transfer/>
    </div>
  );
}

export default App;
