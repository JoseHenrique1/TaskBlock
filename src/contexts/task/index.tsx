import { ReactNode, createContext, useState } from "react";
import Cookies from "js-cookie";

const API = import.meta.env.VITE_API;

export const taskContext = createContext<taskValueInterface>({} as taskValueInterface);

interface taskInterface {
    id: string,
    title: string,
    description: string,
    isFavorite: boolean,
    colorBackground: string,
    userId: string
}

interface taskProps {
    children: ReactNode
}

interface getDataInterface {
    statusCode: number,
    tasks: Array<taskInterface>,
    task: taskInterface
}

interface taskValueInterface {
    tasks: Array<taskInterface>,
    setTasks: (tasks: Array<taskInterface>)=>void,
    getTasks: ()=>void,
    deleteTask: (id: string)=>void,
    createTask: (title:string, description:string, isFavorite:boolean, colorBackground:string)=>void,
    updateTask: (id: string, title:string, description:string, isFavorite:boolean, colorBackground:string)=>void,
    getTask: (idTask: string)=> Promise<getDataInterface|null>
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

    async function getTask (idTask: string) {
        let url = API+"tasks/"+idTask;      
        const token = Cookies.get("token");
        const req = await fetch(url, {
            method: "get",
            headers: {
                "Content-Type": "application/json",
                "token": token!
            }
        })
        .then(data=>data.json())
        .then((data: getDataInterface)=>data)
        .catch(()=>null);
        return req;
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

    function createTask (title:string, description:string, isFavorite:boolean, colorBackground:string) {
        const token = Cookies.get("token")
        fetch(API+"tasks", {
            method: "POST",
            headers: {
                "Content-Type": "application/json;charset=UTF-8",
                "token": token!
            },
            body: JSON.stringify({
                title,
                description,
                isFavorite,
                colorBackground
            })
        })
        .then(data=>data.json())
        .then((data: getDataInterface )=>{
            setTasks(prev=>[...prev, data.task])
        });
    }

    function updateTask(id: string, title:string, description:string, isFavorite:boolean, colorBackground:string) {
        const token = Cookies.get("token");
        let url = API+"tasks/"+id;
        fetch(url, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json;charset=UTF-8",
                "token": token!
            },
            body: JSON.stringify({
                title,
                description,
                isFavorite,
                colorBackground
            })
        })
        /* .then(data=>data.json())
        .then((data: getDataInterface )=>{
            setTasks((prev)=>(prev.map((task)=>{
                    if (task.id === id) {
                        return data.task;
                    }
                    return task
            })))
        }); */

    }

    return (
        <taskContext.Provider value={{
            tasks,
            setTasks,
            getTasks,
            deleteTask,
            createTask,
            updateTask,
            getTask
        }}>
            {children}
        </taskContext.Provider>
    )
}