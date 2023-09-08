import Link from "next/link"
export default function Item({ title, description, remove, view}) {
    return (
        
        <div>
            <p>{title}</p>
            <p>{description.substr(0, 15) + " ..."}</p>
            <Link onClick={view} href="/viewtask">edit or view</Link>
            <button onClick={remove}> delete</button>
        </div>
    )
}