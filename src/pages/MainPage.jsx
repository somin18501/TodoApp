import {useParams,useNavigate,Link} from "react-router-dom"
import {useState,useEffect} from "react"
import { useDispatch,useSelector } from "react-redux";
import { setTaskInformation,addTask } from "../redux/actions";
import {DeleteTaskNameList, EditTaskNameList,makeCompleted} from "../redux/actions"
export default function MainPage(){
    const state = useSelector(state=>state.task);
    const navigate = useNavigate();
    const {str} = useParams();
    const dispatch = useDispatch();
    const [taskName,setTaskName] = useState("");
    const [newName,setNewName] = useState("");
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
        dispatch(addTask(task));
        setTaskDate("");
        setTaskDescription("");
        setTaskName("");
    }
    useEffect(()=>{
        dispatch(setTaskInformation())
    },[])
    const handleEdit =(e)=>{
        e.preventDefault();
        dispatch(EditTaskNameList({initialName:str,finalName:newName}));
        navigate(`/${newName}`);
        setNewName("");
    }
    const handleDelete = (e)=>{
        e.preventDefault();
        dispatch(DeleteTaskNameList(str));
        navigate("/General");
    }
    const renderOptions = ()=>{
        return(
            <>
                <input type="text" value={newName} placeholder="Enter new name" onChange={e=>setNewName(e.target.value)}/>
                <button onClick={(e)=>handleEdit(e)}>Edit</button>
                <br /><button onClick={e=>handleDelete(e)}>Delete</button>
            </>
        )
    }
    const makeComplete = (index)=>(e)=>{
        e.preventDefault();
        dispatch(makeCompleted(index));
    }
    return (
        <div className="w-full bg-indigo-400">
                <h1>{str}</h1>
                <br />
                {str !== "General" && renderOptions()}
                <br />
                <Link to= {`/completed/${str}`}>View Completed</Link>
                <br />
                <input type="text" placeholder="Enter task Name" value={taskName} onChange={(e)=>setTaskName(e.target.value)}/>
                <br />
                <input type="text" placeholder="Enter task Description" value={taskDescription} onChange={(e)=>setTaskDescription(e.target.value)}/>
                <br />
                <input type="text" placeholder="Enter task Due Date" value={taskDate} onChange={(e)=>setTaskDate(e.target.value)}/>
                <br />
                <button onClick={handleNewTaskSubmit}>Submit</button>
                <br />
                {
                    state.tasks.length > 0 && state.tasks.map((task,index)=>(
                        (task.category === str && task.isCompleted===false) && <div><button onClick={(e)=>makeComplete(index)(e)}>{task.name}:{task.description}</button></div>
                    ))
                }
        </div>
    );
}