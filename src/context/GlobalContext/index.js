'use client'
import { createContext, useContext, useState } from "react";

export const GlobalContext = createContext({});



export const GlobalProvider = ({children}) => {

    const [user, setUser] = useState()
    
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    // id da task selecionada para leitura ou edição
    const [idtask, setIdtask] = useState()

    const [listtask, setListtask] = useState([])

    function create_item() {
        setListtask([...listtask, {title:title, description:description}])
    }

    function remove_item (id) {
        setListtask(listtask.filter((value, index)=> index != id))
    }


    
    return (
        <GlobalContext.Provider 
            value={{
                user, setUser,
                idtask, setIdtask,
                title, setTitle,
                description, setDescription,
                listtask, setListtask,
                create_item, 
                remove_item }}>
            {children}
        </GlobalContext.Provider>
    )
}