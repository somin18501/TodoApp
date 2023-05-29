import {useParams,Link} from "react-router-dom"
import {useState,useEffect} from "react"
const fetchTaskData = ()=>{
    let d = localStorage.getItem("tasks");
    console.log(d)
    console.log("object")
    if(d){
        return JSON.parse(d)
    }
    else{
        return [];
    }
}

export default function MainPage(){
    const {str} = useParams();
    // const d = fetchTaskData();
    const [taskData,setTaskData] = useState(fetchTaskData);
    const [taskName,setTaskName] = useState("");
    const [taskDate,setTaskDate] = useState("");
    const [taskDescription,setTaskDescription] = useState("");
    const handleNewTaskSubmit = ()=>{
        const task = {
            name:taskName,
            description:taskDescription,
            category: str,
            important:false,
            date:taskDate,
            isCompleted:false
        };
        setTaskData([...taskData,task])
        setTaskDate("");
        setTaskDescription("");
        setTaskName("");
    }
    useEffect(()=>{
        console.log(taskData.length)
        if(taskData.length > 0)localStorage.setItem("tasks",JSON.stringify(taskData));
    },[taskData]);
    return (
        <div>
                <h1>{str}</h1>
                <input type="text" placeholder="Enter task Name" value={taskName} onChange={(e)=>setTaskName(e.target.value)}/>
                <br />
                <input type="text" placeholder="Enter task Description" value={taskDescription} onChange={(e)=>setTaskDescription(e.target.value)}/>
                <br />
                <input type="text" placeholder="Enter task Due Date" value={taskDate} onChange={(e)=>setTaskDate(e.target.value)}/>
                <br />
                <button onClick={handleNewTaskSubmit}>Submit</button>
                <br />
                {
                    taskData.length > 0 && taskData.map(task=>(
                        (task.category === str) && <div>{task.name}:{task.description}</div>
                    ))
                }
        </div>
    );
}