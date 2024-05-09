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
    getTasks: ()=>void,
    deleteTask: (id: string)=>void
}

export function TaskProvider({children}: taskProps) {
    const [tasks, setTasks] = useState<Array<taskInterface>>([])

    function getTasks () {
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

    function deleteTask (id: string) {
        const token = Cookies.get("token");
        let endpoint = `${API}tasks/${id}`

        fetch(endpoint, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json;charset=UTF-8",
                "token": token!
            },
        })
        .then(()=>{
            setTasks((prev)=>prev.filter(task=>task.id!==id))
        })
        .catch((error)=>{
            console.log("erro ao deletar task");
            console.log(error);
        })
    }

    return (
        <taskContext.Provider value={{
            tasks,
            setTasks,
            getTasks,
            deleteTask
        }}>
            {children}
        </taskContext.Provider>
    )
}