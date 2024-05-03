import { Routes, Route } from 'react-router-dom';

import {Home} from './templates/Home/index.tsx';
import { Login } from './templates/Login/index.tsx';
import { Registration } from './templates/Registration/index.tsx';
import { Alert } from './components/Alert/index.tsx';

export function Router() {
    return ( 
        <div className='flex flex-col flex-grow relative'>
            <Alert/>
            <Routes>
                <Route path='/' element={<Home/>}/>
                <Route path='/login' element={<Login/>}/>
                <Route path='/registration' element={<Registration/>}/>
            </Routes>
        </div>
     );
}
