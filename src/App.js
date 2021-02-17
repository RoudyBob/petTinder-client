import './App.css';
import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Auth from './Auth/Auth';
import Navigation from './components/Homepage/Navigation';
import PetIndex from './components/Pets/PetIndex';
import './myStyles.css'
import PetSwipe from './components/Homepage/PetSwipe';

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

const protectedViews = () => {
  return (sessionToken === localStorage.getItem('token') ? <PetSwipe token={sessionToken} /> : <Auth updateToken={updateToken} />)
};

  return (
    <div>
      <Navigation clickLogout={clearToken} />
      {protectedViews()}
    </div>
  );
}

export default App;
