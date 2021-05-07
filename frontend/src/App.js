import logo from './logo.svg';
// import './App.css';
// import {useState, useEffect} from 'react';
import {HashRouter as Router, Route} from 'react-router-dom';
import { CookiesProvider } from 'react-cookie';
// import { useCookies } from 'react-cookie';
// import { useHistory } from 'react-router-dom';

// COMPONENTS IMPORT
import HomeScreen from './components/screens/HomeScreen';
import ContactScreen from './components/screens/ContactScreen';
import AboutScreen from './components/screens/AboutScreen';
import RegisterScreen from './components/screens/RegisterScreen';
import Dashboard from './components/screens/Dashboard';
import AllProducts from './components/AllProducts';
import WelcomeScreen from './components/screens/WelcomeScreen';
import AccountSettingsScreen from './components/screens/AccountSettingsScreen';

function App() {
  return (
    <CookiesProvider>
    <Router>
      <Route exact path='/' component={HomeScreen} />
      <Route path='/contact' component={ContactScreen} />
      <Route path='/about' component={AboutScreen} />
      <Route path='/register' component={RegisterScreen} />
      <Route path='/dashboard' component={Dashboard} />
      <Route path='/products' component={AllProducts} />
      <Route path='/welcome' component={WelcomeScreen} />
      <Route path='/account_settings' component={AccountSettingsScreen} />


      {/* <Route exact path='/'> <HomeScreen> </Route> */}
    </Router>
    </CookiesProvider>
  )
}

export default App;
