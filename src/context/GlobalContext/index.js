'use client'
import { createContext, useContext, useState } from "react";

export const GlobalContext = createContext({});

export const GlobalProvider = ({children}) => {

    //key_user do usuario logado
    const [user, setUser] = useState(localStorage.getItem("user") || "")
    
    
    return (
        <GlobalContext.Provider value={{user, setUser }}>
            {children}
        </GlobalContext.Provider>
    )
}