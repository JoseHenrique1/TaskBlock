'use client'
import Link from "next/link"
import { useState, useContext } from "react";

import 'bootstrap/dist/css/bootstrap.min.css';

import { MainContext } from "@/context/MainContext";
import { GlobalContext } from "@/context/GlobalContext";

const axios = require("axios")

async function patchTask(user, task, title, description) {
    const url = 'http://127.0.0.1:5000/task/update';
    let data = {"key_user": user, "key_task": task, "title":title, "description":description};
    let resposta = await axios.patch(url, data,()=>{console.log('call back')})
    .then((response)=>{
            return response['data'];})
    .catch ((erro)=>{
            console.log(erro)
            return {msg:'error'};})
    return resposta;
}



export default function Viewtask(){
    const {idtask, setIdtask, listtask, setListtask} = useContext(MainContext);
    const {user} = useContext(GlobalContext);

    if ((idtask === undefined)||(idtask === "")) {
        return (<>Você está forçando uma vizualização de uma view! <br/> Volte a 'Home' e selecione uma tarefa</>)
    }

    //tentei usar o filtar, mas não funcionou...
    //criei então o busca item
    function buscaItem(array, id) {
        for (let obj of array) {
            if (obj.id == id) {
                return obj;
            }
        }
    }


    const [title, setTitle] = useState(buscaItem(listtask, idtask).title);
    const [description, setDescription] = useState(buscaItem(listtask, idtask).description);

    
    async function save_item() {
        let lista = listtask;
        let requisicao = await patchTask(user, idtask, title, description);
        console.log(requisicao)

        /*
        lista[idtask] = {title: title, description: description};
        setListtask(lista);
        setIdtask("")*/
    }

    return(
        <main className="container">
            <Link href="/home">home</Link>
            <p>viewtask</p>

            <div className="mb-3">
                <label for="title">Title</label>
                <input 
                id="title"
                className="form-control"
                type="text" 
                placeholder="What is your task?" 
                value={title} 
                onChange={(e) => {setTitle(e.target.value)}}/>
            </div>
            
            <div className="mb-3">
                <label for="description">Description</label>
                <textarea 
                id="description"
                className="form-control"
                rows={5} 
                placeholder="Write about your task..."
                value={description} 
                onChange={(e) => {setDescription(e.target.value)}}/>
            </div>

            <button className="btn btn-primary" onClick={save_item}>Save</button>
            <br/>
        </main>
    )
}