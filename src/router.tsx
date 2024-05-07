import { Routes, Route } from 'react-router-dom';

import {Home} from './templates/Home/index.tsx';
import { Login } from './templates/Login/index.tsx';
import { Registration } from './templates/Registration/index.tsx';
import { Alert } from './components/Alert/index.tsx';
import { Dashboard } from './templates/Dashboard/index.tsx';
import { CreateTask } from './templates/Create/index.tsx';

export function Router() {
    return ( 
        <div className='flex flex-col flex-grow relative'>
            <Alert/>
            <Routes>
                <Route path='/' element={<Home/>}/>
                <Route path='/login' element={<Login/>}/>
                <Route path='/registration' element={<Registration/>}/>
                <Route path='/dashboard' element={<Dashboard/>}/>
                <Route path='/dashboard/create' element={<CreateTask/>}/>
            </Routes>
        </div>
     );
}
