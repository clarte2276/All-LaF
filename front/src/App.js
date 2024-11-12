import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';

import LostPostList from './components/lostpostlist/LostPostList';
import Login from './components/login/Login';

import './App.css';

function App() {
  function setScreenSize() {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  }

  useEffect(() => {
    setScreenSize();
    window.addEventListener('resize', setScreenSize);
    return () => window.removeEventListener('resize', setScreenSize);
  }, []);

  return (
    <Routes>
      <Route path="/" element={<LostPostList />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}

export default App;
