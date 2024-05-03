import { useContext } from "react";
import { alertContext } from "../../contexts/alert";
export function Alert() {
    const {msg, show} = useContext(alertContext)
    return ( 
        <>
        {show && 
            <div 
                className="absolute top-4 right-4 bg-blue-600 text-white shadow rounded px-2 py-1 opacity-80">
                {msg}
            </div>
        }
        </>

    );
}
