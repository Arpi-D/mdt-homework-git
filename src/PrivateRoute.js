import './App.css';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';

function PrivateRoute({ component: Component, ...rest }) {
    
    var isAuthenticated = false

    console.log("Token from routec "+ localStorage.getItem('token'))
    const token = localStorage.getItem('token')

    if (token == undefined || token == null)
    {
      console.log("Inside validator" + isAuthenticated)
     isAuthenticated = false
    } else{
      isAuthenticated = true
      console.log("Outside validator"+ isAuthenticated) 
    }
    return (
        <Route
            {...rest}
            render={props =>
                isAuthenticated ? <Component {...props} /> : <Redirect to="/signin" />
            }
        />
    );
}

  export default PrivateRoute