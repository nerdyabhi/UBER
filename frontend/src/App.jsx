import React, { useState } from 'react';
import './main.css'
import { Routes , Route } from 'react-router-dom';
import Start from './pages/Start';
import Home from './pages/Home';
import HomeGuard from './pages/HomePageGuard';
import UserLogin from './pages/UserLogin';
import UserSignup from './pages/UserSignup';
import CaptainSignup from './pages/CaptainSignup';
import CaptainLogin from './pages/CaptainLogin';
import CaptainHomeGuard from './pages/CaptainHomeGuard';
import CaptainHome from './pages/CaptainHome';
import SocketProvider from './store/atom/SocketContext';

const App = ()=>{
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <SocketProvider isLoggedIn={isLoggedIn}>
      <Routes>
        <Route path='/' element={<Start/>}/>
        <Route path='/login' element={<UserLogin setIsLoggedIn={setIsLoggedIn}/>}/>
        <Route path='/signup' element={<UserSignup setIsLoggedIn={setIsLoggedIn}/>}/>
        <Route path='/captain/register' element={<CaptainSignup setIsLoggedIn={setIsLoggedIn}/>}/>
        <Route path='/captain/login' element={<CaptainLogin setIsLoggedIn={setIsLoggedIn}/>}/>
        <Route path='/Home' element={<HomeGuard>{<Home/>}</HomeGuard>}/>
        <Route path='/captain/Home' element={<CaptainHomeGuard>{<CaptainHome/>}</CaptainHomeGuard>}/>
      </Routes>
    </SocketProvider>
  )
}

export default App;