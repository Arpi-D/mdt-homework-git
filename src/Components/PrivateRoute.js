import { Route, Redirect } from 'react-router-dom';

function PrivateRoute({ component: Component, ...rest }) {

  var isAuthenticated = false

  const token = localStorage.getItem('token')

  if (token === undefined || token === null) {
    isAuthenticated = false
  } else {
    isAuthenticated = true
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