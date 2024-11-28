import { createRoot } from 'react-dom/client'
import App from './App'
import { BrowserRouter } from 'react-router-dom'
import { RecoilRoot } from 'recoil'

createRoot(document.getElementById('root')).render(
   
   <BrowserRouter>
      <RecoilRoot>
         <App/>
      </RecoilRoot>
   </BrowserRouter>
)
