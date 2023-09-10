'use client'
import List from "@/components/list";
import Item from "@/components/item";

import { GlobalContext } from "@/context/GlobalContext";
import { MainContext } from "@/context/MainContext";
import { useContext, useEffect, useState } from "react";


export default function Home() {
  const {setIdtask,listtask, create_item, remove_item, loadData} = useContext(MainContext);
  const {user} = useContext(GlobalContext);

  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")

  //toda vez que uma task é adiconada, "modificado"
  //passa a ser true e ativa um useeffect para
  //atualizar a pagina
  const [modificado, setModificado] = useState(false);


  useEffect(()=>{
    loadData(user)  
  },[])

  useEffect(()=>{
    setModificado(false)
    loadData(user)  
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
      <button onClick={ async ()=>{await create_item(user, title, description); await setModificado(true)}}>send</button>
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
