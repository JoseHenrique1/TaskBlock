import { ReactNode, createContext, useState } from "react";

interface alertValueInterface {
    handleNewAlert: (message: string)=>void,
    msg: string,
    show: boolean
}

interface alertProps {
    children: ReactNode
}

export const alertContext = createContext<alertValueInterface>({} as alertValueInterface)

export function AlertProvider({children}: alertProps) {
    const [msg, setMsg] = useState("");
    const [show, setShow] = useState(false);

    function handleNewAlert(message: string){
        setMsg(message);
        setShow(true);
        setTimeout(()=>{setShow(false)}, 5000);
    }

    return (
        <alertContext.Provider value={{
            handleNewAlert,
            msg,
            show
        }}>
            {children}
        </alertContext.Provider>
    )
}