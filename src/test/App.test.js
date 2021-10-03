import ReactDOM from 'react-dom';
import Transfer from '../screens/Transfer';
import SignIn from "../screens/SignIn"
import DashBoard from '../screens/DashBoard';


it ('test if Signin screen crash', () => {
  const div = document.createElement("div")
  ReactDOM.render(<SignIn></SignIn>, div)
})

it ('test if Dashboard screen crash', () => {
  const div = document.createElement("div")
  ReactDOM.render(<DashBoard></DashBoard>, div)
})

it ('test if Transfer screen crash', () => {
  const div = document.createElement("div")
  ReactDOM.render(<Transfer></Transfer>, div)
})

//TBD- currently only testing screen crash, need to add test cases for components and API calls. Snapshot testing to be included. 