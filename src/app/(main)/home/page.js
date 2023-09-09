'use client'
import { useState } from "react";
import List from "@/components/list";
import Item from "@/components/item";
import Link from "next/link";

import { GlobalContext } from "@/context/GlobalContext";
import { useContext } from "react";
import { useEffect } from "react";

const axios = require('axios')
const url = 'http://127.0.0.1:5000/task/list';

async function getData(user) {
  let data = {"key_user": user};
  let resposta = await axios.post(url, data,()=>{console.log('call back')})
  .then((response)=>{
          return response['data'];})
  .catch ((erro)=>{
          console.log(erro)
          return {msg:'error'};})

  await console.log("resposta: "+resposta.msg)

  return resposta;
}



export default function Home() {
  const {user, setUser, idtask, setIdtask,title, setTitle,  description, setDescription, listtask, setListtask, create_item, remove_item} = useContext(GlobalContext);
  
  async function loadData(user) {
    let dados = await getData(user);
    let lista = await dados['dados'];
    delete lista['auth'];
    let lista_tasks = [];

    let keys = Object.keys(lista);
    for (const key of keys) {
      lista_tasks.push({"title": lista[key]["title"], "description": lista[key]["description"]})
    }
    await console.log("dados: "+ lista_tasks);

    setListtask(lista_tasks)


    
  }
  useEffect(()=>{
    loadData("-NdovfK5LdeE6GGiCRV5")  
  },[])
  return (
    <main>
      <p>Title </p>
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
      <button onClick={create_item}>send</button>
      <br/>



      {listtask.length!=0?
        <List>
          {listtask.map(
            (item, id) =>{
              
              return <Item key={id} title={item.title} description={item.description} remove={()=>{remove_item(id)}} view={()=>{setIdtask(id)}}/>
            }
          )}
      </List>
      :<p>Create your first task!</p>
      
    }
      

      

      
    </main>
  )
}
