import { createRoot } from 'react-dom/client'
import App from './App'
import { BrowserRouter } from 'react-router-dom'
import { RecoilRoot } from 'recoil'
import SocketProvider from './store/atom/SocketContext'; // Import SocketProvider

createRoot(document.getElementById('root')).render(
   <BrowserRouter>
      <RecoilRoot>
         <SocketProvider>
            <App/>
         </SocketProvider>
      </RecoilRoot>
   </BrowserRouter>
)
