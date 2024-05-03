import ReactDOM from 'react-dom/client';
import { BrowserRouter} from 'react-router-dom';
import './globals.css';

import { AlertProvider } from './contexts/alert/index.tsx';

import { NavBar } from './components/NavBar/index.tsx';
import { Footer } from './components/Footer/index.tsx';
import { Router } from './router.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <AlertProvider>
    <div className='flex flex-col min-h-screen'>
      <NavBar/>
      <Router/>
      <Footer/>
    </div>
    </AlertProvider>
  </BrowserRouter>
);
