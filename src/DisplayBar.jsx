
import { useSelector,useDispatch } from "react-redux";
import { setTaskName,editTaskInformation,deleteTask } from "./redux/actions";
import {useState} from "react"
export default function DisplayBar(){
    const state = useSelector(state=>state.task);
    const dispatch = useDispatch();
    const [title,setTitle] = useState(state.tasks[state.taskIndex].name);
    const [description,setDescription] = useState(state.tasks[state.taskIndex].description);
    const [dueDate,setDueDate] = useState(state.tasks[state.taskIndex].date);
    const handleCloseBar = () =>{
        dispatch(setTaskName(""));
    }
    const handleDeleteTask = (e)=>{
        e.preventDefault();
        dispatch(deleteTask(state.taskIndex));
    }
    const handleTaskEdit = (e)=>{
        e.preventDefault();
        const task = {
            name:title,
            description:description,
            category: state.tasks[state.taskIndex].category,
            important:state.tasks[state.taskIndex].important,
            date:dueDate,
            isCompleted:state.tasks[state.taskIndex].isCompleted,
            createdon:state.tasks[state.taskIndex].catedon,
        };
        dispatch(editTaskInformation({index:state.taskIndex,task})); 
    }
    return (
        <div className="flex flex-col w-1/4">
            <button onClick={handleCloseBar}>close</button>
            <input type="text" value={title} onChange={e=>setTitle(e.target.value)} />
            <input type="text" value={description} onChange={e=>setDescription(e.target.value)} />
            <input type="text" value={dueDate} onChange={e=>setDueDate(e.target.value)} />
            <button onClick={handleTaskEdit}>Edit</button>
            <button onClick={handleDeleteTask}>Delete</button>
        </div>
    );
}