import { ReactNode, createContext, useState } from "react";
import Cookies from "js-cookie";

const API = import.meta.env.VITE_API;

export const taskContext = createContext<taskValueInterface>({} as taskValueInterface);

interface taskInterface {
    id: string,
    title: string,
    description?: string,
    isFavorite: boolean,
    colorBackground: string,
    userId: string
}

interface taskProps {
    children: ReactNode
}

interface getDataInterface {
    statusCode: number,
    tasks: Array<taskInterface>
}

interface taskValueInterface {
    tasks: Array<taskInterface>,
    setTasks: (tasks: Array<taskInterface>)=>void,
    handleGetTasks: ()=>void
}

export function TaskProvider({children}: taskProps) {
    const [tasks, setTasks] = useState<Array<taskInterface>>([])

    function handleGetTasks () {
        const token = Cookies.get("token");
        fetch(API+"tasks", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "token": token!
            }
        })
        .then(data=>data.json())
        .then((data: getDataInterface)=>{
            if (data.statusCode == 200) {
                setTasks(data.tasks);      
            }
        })
        .catch(error=>console.log(error))
    }

    return (
        <taskContext.Provider value={{
            tasks,
            setTasks,
            handleGetTasks
        }}>
            {children}
        </taskContext.Provider>
    )
}