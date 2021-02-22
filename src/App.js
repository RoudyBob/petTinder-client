import './App.css';
import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch, Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Auth from './Auth/Auth';
import Navigation from './components/Homepage/Navigation';
import PetIndex from './components/Pets/PetIndex';
import PetSwipe from './components/Homepage/PetSwipe';
import './myStyles.css'
import Signup from './Auth/Signup';
import PetEmail from './components/Pets/PetEmail';

function App() {

  const [sessionToken, setSessionToken] = useState('');

  useEffect(() => {
    if (localStorage.getItem('token')){
      setSessionToken(localStorage.getItem('token'));
  }
}, [])

const updateToken = (newToken) => {
  localStorage.setItem('token', newToken);
  setSessionToken(newToken);
  console.log(newToken);
}

const clearToken =() => {
  localStorage.clear();
  setSessionToken('');
}


const petIndexView = () => {
  return (sessionToken === localStorage.getItem('token') ? <PetIndex token={sessionToken} /> : <Auth updateToken={updateToken} />)
};

const petSwipeView = () => {
  return (sessionToken === localStorage.getItem('token') ? <PetSwipe token={sessionToken} /> : <Auth updateToken={updateToken} />)
};

const petEmailView = () => {
  return (sessionToken === localStorage.getItem('token') ? <PetEmail token={sessionToken} /> : <Auth updateToken={updateToken} />)
};

const signupView = () => {
  return (
    <Signup />
  )
}

  return (
    <div>
      <BrowserRouter>
        <Navigation clickLogout={clearToken} />
        <Switch>
          <Route exact path="/" component={petSwipeView} />
          <Route path="/mypets" component={petIndexView} />
          <Route path="/signup" component={signupView} />
          <Route path="/email" component={petEmailView} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
