import './main.css'
import { Routes , Route } from 'react-router-dom';
import Start from './pages/Start';
import Home from './pages/Home';
import HomeGuard from './pages/HomePageGuard';
import UserLogin from './pages/UserLogin';
import UserSignup from './pages/UserSignup';
import CaptainSignup from './pages/CaptainSignup';
import CaptainLogin from './pages/CaptainLogin';
const App = ()=>{
  return (
    <>
     <Routes>
      <Route path='/' element={<Start/>}/>
      <Route path='/login' element={<UserLogin/>}/>
      <Route path='/signup' element={<UserSignup/>}/>
      <Route path='/captain/register' element={<CaptainSignup/>}/>
      <Route path='/captain/login' element={<CaptainLogin/>}/>
      <Route path='/Home' element={<HomeGuard>{<Home/>}</HomeGuard>}/>
     </Routes>
    </>
  )
}

export default App;