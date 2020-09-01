//Redux
import React,{Fragment,useEffect} from 'react';
import {BrowserRouter as Router, Route,Switch} from 'react-router-dom';
import {Provider} from 'react-redux';
import {loadUser} from './actions/auth'
import store from './store'
import Routes from './components/routes/routes/Routes'

//Main css
import '../src/App.css'
//Components
import Navbar from './components/navbar/Navbar'
import Landing from './components/landing/landing'
import setAuthToken from './utils/setAuthToken'




const App = () => {    
    useEffect(() => {
      if (localStorage.token) {
      setAuthToken(localStorage.token);
      store.dispatch(loadUser());
      }
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
