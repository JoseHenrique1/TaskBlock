import { useEffect, useState } from "react";
import { Cart } from "../Cart";
import Cookies from "js-cookie";

const API = import.meta.env.VITE_API;

interface taskInterface {
    id: string,
    title: string,
    description?: string,
    isFavorite: boolean,
    colorBackground: string,
    userId: string
}

interface getDataInterface {
    statusCode: number,
    tasks: Array<taskInterface>
}

export function ContainerCart() {
    const token = Cookies.get("token");
    const [tasks, setTasks] = useState<Array<taskInterface>>([])

    function handleGetData () {
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

    useEffect(handleGetData, [])

    return ( 
        <div className="w-full grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 lg:gap-3  max-w-screen-xl lg:mx-auto lg:my-0">
            {tasks.map(task => <Cart key={task.id} task={task} />)}
        </div>
     );
}







