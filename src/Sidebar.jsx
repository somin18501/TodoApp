import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const getTaskNameList = ()=>{
    const tln = localStorage.getItem('taskNameList')
    if(tln){
        return JSON.parse(tln);
    }
    else return [];
}

const getuserLS = ()=>{
    const data = localStorage.getItem('user');
    if(data){
        // to get object in JSON from string
        return JSON.parse(data);
    }else {
        return [];
    }
}  

export default function Sidebar(){
    const user = getuserLS();
    const [taskNameList,setTaskNameList] = useState(getTaskNameList);
    const [listName,setListName] = useState('');


    const handleAddNewTaskList = ()=>{
        setTaskNameList([...taskNameList,listName])
        setListName('')
    }

    useEffect(()=>{
        localStorage.setItem('taskNameList',JSON.stringify(taskNameList))
    },[taskNameList])
    
    return (
        <div className="bg-blue-500 flex flex-col justify-between w-1/5">
            <div>
                <h1>{user.userEmail}</h1>
                <h1>{user.userName}</h1>
            </div>
            <div>
                serach
            </div>
            <div>
                important
            </div>
            <div>
            {taskNameList.length > 0 && taskNameList.map(name=>(
                <div>
                    <Link to={'/'+name}>{name}</Link>
                </div>
            ))}
            </div>
            <div>
                <input type="text" value={listName} 
                placeholder="your List name"
                onChange={(ev) => setListName(ev.target.value)}/>
                <button onClick={handleAddNewTaskList}>add</button>
            </div>
        </div>
    );
}