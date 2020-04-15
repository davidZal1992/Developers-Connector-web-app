import React,{Fragment} from 'react';
import '../src/App.scss'
import {Navbar} from '../src/components/Layout/Navbar'
import {Landing} from '../src/components/Layout/Landing'
import {Login} from './components/auth/Login/Login'
import {Register} from './components/auth/Register/Register'
import {BrowserRouter as Router, Route,Switch} from 'react-router-dom';
const App = () => (
  <Router>
  <Fragment>
    <Navbar/>
    <Route exact path="/" component={Landing}/>
    <Switch>
   <Route exact path="/register" component={Register}/>
   <Route exact path="/login" component={Login}/>
   </Switch>
  </Fragment>
  </Router>
);

export default App;
