//Redux
import React,{Fragment,useEffect} from 'react';

import {Provider} from 'react-redux';
import {loadUser} from './actions/auth'
import store from './store'
import { LOGOUT } from './actions/types';

//Main css
import '../src/App.css'
//Components
import Navbar from './components/navbar/Navbar'
import Landing from './components/landing/landing'
import setAuthToken from './utils/setAuthToken'
import {BrowserRouter as Router, Route,Switch} from 'react-router-dom';
import Routes from './components/routes/routes/Routes'


const App = () => {    

  useEffect(() => {
    // check for token in LS and load user
    if (localStorage.token) {
      setAuthToken(localStorage.token);
      store.dispatch(loadUser());
  }
      window.addEventListener('storage', () => {
        if (!localStorage.token) store.dispatch({ type: LOGOUT });
      });
    }, []);

  return(
  <Provider store={store}>
    <Router>
    <Fragment>
        <Navbar/>
        <Switch>
          <Route exact path="/" component={Landing} />
          <Route component={Routes}/>
        </Switch>
      </Fragment>
    </Router>
  </Provider>
)}

export default App;
