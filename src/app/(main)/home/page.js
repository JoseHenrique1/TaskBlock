'use client'
import { useState } from "react";
import List from "@/components/list";
import Item from "@/components/item";
import Link from "next/link";

import { GlobalContext } from "@/context/GlobalContext";
import { useContext } from "react";


export default function Home() {
  const {idtask, setIdtask,title, setTitle,  description, setDescription, listtask, setListtask, create_item, remove_item} = useContext(GlobalContext);
  

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


      {/*ISSO ESTA ERRADO, pois vai criar varias lista

      sendo que é pra criar VARIOS ITENS            */}

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
