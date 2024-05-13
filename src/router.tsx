import { Route, Routes } from 'react-router-dom';

import { Alert } from './components/Alert/index.tsx';
import { CreateTask } from './templates/Create/index.tsx';
import { Dashboard } from './templates/Dashboard/index.tsx';
import { Home } from './templates/Home/index.tsx';
import { Login } from './templates/Login/index.tsx';
import { Registration } from './templates/Registration/index.tsx';
import { Edit } from './templates/Edit/index.tsx';


export function Router() {
    return ( 
        <div className='flex flex-col flex-grow relative'>
            <Alert/>
            <Routes>
                <Route path='/' element={<Home/>}/>
                <Route path='/login' element={<Login/>}/>
                <Route path='/registration' element={<Registration/>}/>
                <Route path='/dashboard' element={<Dashboard/>}/>
                <Route path='/create' element={<CreateTask/>}/>
                <Route path='/dashboard/:id' element={<Edit/>}/>
            </Routes>
        </div>
     );
}
