import { createContext, useEffect, useState } from "react";

export const TaskContext = createContext({});

export function TaskContextProvider({children}){
    const [listNames,setListNames] = useState([]); 
    useEffect(() => {
        const tln = localStorage.getItem('taskNameList')
        if(tln){
            setListNames(JSON.parse(tln));
        }
    }, []);
    return (
        <TaskContext.Provider value={{listNames,setListNames}}>
            {children} 
        </TaskContext.Provider>
    );
}