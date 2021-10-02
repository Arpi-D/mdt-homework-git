import './App.css';
import { Router, Route, Switch } from 'react-router-dom';
import { SignIn } from './SignIn';
import DashBoard from './DashBoard';

const Routing = () => {
  return(
    <Router>
      <Switch>
        <Route exact path="/" component={SignIn} />
        <Route path="/dashboard" component={DashBoard} />
      </Switch>
    </Router>
  )
}

function App() {
  return (
    <div className="App">
     <DashBoard/>
    </div>
  );
}

export default App;
