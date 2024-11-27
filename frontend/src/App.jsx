import './main.css'
import { Routes , Route } from 'react-router-dom';
import Home from './pages/Home';
import UserLogin from './pages/UserLogin';

const App = ()=>{
  return (
    <>
     <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/login' element={<UserLogin/>}/>
     </Routes>
    </>
  )
}

export default App;