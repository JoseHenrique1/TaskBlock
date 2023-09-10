'use client'
import { createContext, useState } from "react";


//nome main é referente a rota...
export const MainContext = createContext({});


const axios = require('axios')
//funcao usada em home para fazer a requisição das tasks
async function getData(user) {
  const url = 'http://127.0.0.1:5000/task/list';
  let data = {"key_user": user};
  let resposta = await axios.post(url, data,()=>{console.log('call back')})
  .then((response)=>{
          return response['data'];})
  .catch ((erro)=>{
          console.log(erro)
          return {msg:'error'};})
  return resposta;
}

//fazendo requisicao para criar task no banco
async function postTask(user, title, description) {
    const url = 'http://127.0.0.1:5000/task/create';
    let data = {"key_user": user, "title":title ,"description":description };
    let resposta = await axios.post(url, data,()=>{console.log('call back')})
    .then((response)=>{
            return response['data'];})
    .catch ((erro)=>{
            console.log(erro)
            return {msg:'error'};})
    return resposta;
  }




export const MainProvider = ({children}) => {

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    // id da task selecionada para leitura ou edição
    const [idtask, setIdtask] = useState()

    const [listtask, setListtask] = useState([])

    async function create_item(user) {
        let requisicao = await postTask(user, title, description);
        if (requisicao.msg == "success") {
            setListtask([...listtask, {title:title, description:description}])

            //recarregando lista
            loadData(user)
        }
    }

    function remove_item (id) {
        setListtask(listtask.filter((value, index)=> index != id))
    }

    async function loadData(user) {
        let requisicao = await getData(user);
        if (requisicao.msg !="error"){
            let dados = await requisicao['dados'];
            delete dados['auth'];
            let lista_tasks = [];
            let keys = Object.keys(dados);
            for (const key of keys) {
                lista_tasks.push({"id": key, "title": dados[key]["title"], "description": dados[key]["description"]})
            }
            setListtask(lista_tasks) 
        }
           
    }


    
    return (
        <MainContext.Provider 
            value={{
                idtask, setIdtask,
                title, setTitle,
                description, setDescription,
                listtask, setListtask,
                create_item, 
                remove_item,
                loadData }}>
            {children}
        </MainContext.Provider>
    )
}