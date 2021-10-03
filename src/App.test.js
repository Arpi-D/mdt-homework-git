import { render, screen } from '@testing-library/react';
import App from './App';
import ReactDOM from 'react-dom';

import SignIn from './SignIn';
import DashBoard from './DashBoard';


it ('test if Signin component crash', () => {
  const div = document.createElement("div")
  ReactDOM.render(<SignIn></SignIn>, div)
})

it ('test if Dashboard component crash', () => {
  const div = document.createElement("div")
  ReactDOM.render(<DashBoard></DashBoard>, div)
})