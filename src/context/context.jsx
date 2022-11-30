import React, {createContext, useEffect, useState} from "react";
import {getToken} from "../utils/localStorage"
import { getUser } from "../api";
export const Context = createContext({
     token: getToken(),
     setToken: () => "",
     user: {},
     getUser: () => "",
})

const ContextProvider = (props) => {
    const [token, setToken] = useState(getToken());
   
    useEffect(()=>{
    },[token])
    return (
        <Context.Provider value={{token, setToken}}>
            {props.children}
        </Context.Provider>
    );

}

export default ContextProvider;