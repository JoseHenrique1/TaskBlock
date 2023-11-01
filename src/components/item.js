import Link from "next/link";
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Item({ id, title, description, remove, view}) {
    return (
        <>
            <div className="container-fluid bg-primary-subtle" >
                <h1>{title}</h1>
                <p>{description.substr(0, 15) + " ..."}</p>
                <Link className="btn btn-secondary" onClick={view} href="/viewtask">edit or view</Link>
                <button className="btn btn-warning" onClick={remove}> delete</button>
            </div>
            <br></br>
        
        </>
        
    )
}