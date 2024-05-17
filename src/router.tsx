import { Route, Routes } from 'react-router-dom';

import { Alert } from './components/Alert/index.tsx';
import { CreateTask } from './pages/Create/index.tsx';
import { Dashboard } from './pages/Dashboard/index.tsx';
import { Home } from './pages/Home/index.tsx';
import { Login } from './pages/Login/index.tsx';
import { Registration } from './pages/Registration/index.tsx';
import { Edit } from './pages/Edit/index.tsx';


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
