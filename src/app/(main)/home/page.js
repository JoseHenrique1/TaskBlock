'use client'
import { useState } from "react";
import List from "@/components/list";
import Item from "@/components/item";
import Link from "next/link";

import { GlobalContext } from "@/context/GlobalContext";
import { MainContext } from "@/context/MainContext";
import { useContext } from "react";
import { useEffect } from "react";


export default function Home() {
  const {idtask, setIdtask,title, setTitle,  description, setDescription, listtask, setListtask, create_item, remove_item, loadData} = useContext(MainContext);
  const {user, setUser} = useContext(GlobalContext);

  //toda vez que uma task é adiconada, "modificado"
  //passa a ser true e ativa um useeffect para
  //atualizar a pagina
  const [modificado, setModificado] = useState(false);


  useEffect(()=>{
    loadData("-NdovfK5LdeE6GGiCRV5")  
  },[])

  useEffect(()=>{
    setModificado(false)
    loadData("-NdovfK5LdeE6GGiCRV5")  
  },[modificado])



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
      <button onClick={ async ()=>{await create_item(user); await setModificado(true)}}>send</button>
      <br/>



      {listtask.length!=0?
        <List>
          {listtask.map(
            (item, index) =>{
              
              return <Item key={index} id={item.id} title={item.title} description={item.description} remove={async ()=>{await remove_item(user, item.id), setModificado(true)}} view={()=>{setIdtask(item.id)}}/>
            }
          )}
      </List>
      :<p>Create your first task!</p>
      
    }
    </main>
  )
}
