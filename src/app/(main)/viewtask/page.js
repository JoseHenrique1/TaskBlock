'use client'
import Link from "next/link"
import { useState, useContext } from "react";

import { GlobalContext } from "@/context/GlobalContext";


export default function Viewtask(){
    const {idtask, setIdtask, listtask, setListtask} = useContext(GlobalContext);

    if (idtask === undefined) {
        return (<>Você está forçando uma vizualização de uma view! Volte a 'Home' e selecione uma tarefa</>)
    }

    const [title, setTitle] = useState(listtask[idtask].title);
    const [description, setDescription] = useState(listtask[idtask].description);

    

    function save_item() {
        let lista = listtask;
        lista[idtask] = {title: title, description: description};
        setListtask(lista);
    }

    return(
        <main>
            <Link href="/home">home</Link>
            <p>viewtask</p>

            <p>Title</p>
            <input 
                type="text" 
                placeholder="What is your task?" 
                value={title} 
                onChange={(e) => {setTitle(e.target.value)}}/>
            <br></br>
            <br></br>
            <p>Description</p>
            <textarea 
                rows={5} 
                placeholder="Write about your task..."
                value={description} 
                onChange={(e) => {setDescription(e.target.value)}}/>
            <button onClick={save_item}>Save</button>
            <br/>
        </main>
    )
}