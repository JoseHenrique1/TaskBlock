import 'bootstrap/dist/css/bootstrap.min.css';

export default function List({children}) {
    return (
        <div className='container'>
            <hr/>
            <p>List of tasks</p>
            {children}
        </div>
    )
}