import {useParams,useNavigate,Link} from "react-router-dom"
import {useState,useEffect} from "react"
import { useDispatch,useSelector } from "react-redux";
import { setTaskInformation,addTask } from "../redux/actions";
import {DeleteTaskNameList, EditTaskNameList, makeCompleted} from "../redux/actions"
import AddTaskDialog from "../components/AddTaskDialog";
import { Button, Dialog, DialogTitle, TextField, DialogActions, DialogContent } from "@material-ui/core";
import Navbar from "../Navbar"

export default function MainPage(){
    const {str} = useParams();
    const state = useSelector(state=>state.task);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [newName,setNewName] = useState("");
    const [open, setOpen] = useState(false);
    
    const handleOpen = ()=>{
        setOpen(true);
    }

    const handleCancel = ()=>{
        setOpen(false);
    }

    // useEffect(()=>{
    //     dispatch(setTaskInformation())
    // },[])

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

    // const renderOptions = ()=>{
    //     return(
    //         <>
    //             <input type="text" value={newName} placeholder="Enter new name" onChange={e=>setNewName(e.target.value)}/>
    //             <button onClick={(e)=>handleEdit(e)}>Edit</button>
    //             <br /><button onClick={e=>handleDelete(e)}>Delete</button>
    //         </>
    //     )
    // }

    // const makeComplete = (index)=>(e)=>{
    //     e.preventDefault();
    //     dispatch(makeCompleted(index));
    // }

    return (
        <div className="flex flex-col bg-indigo-400 w-full">
            <div className="flex flex-row justify-between text-2xl text-white mx-5 my-5">
                <div>
                    <h1>{str}</h1>
                </div>
                <div>
                    {
                        str !== "General" && (
                            <div>        
                                <Button onClick={handleDelete}>Delete</Button>
                                <Button onClick={handleOpen}>Edit Name</Button>
                                <Dialog open={open} onClose={handleCancel}>
                                    <DialogTitle>Enter New Name</DialogTitle>
                                    <DialogContent>
                                    <TextField
                                        autoFocus
                                        margin="dense"
                                        id="name"
                                        label="New Name"
                                        type="text"
                                        fullWidth
                                        variant="standard"
                                        value={newName} 
                                        onChange={(ev) => setNewName(ev.target.value)}
                                        />
                                    </DialogContent>
                                    <DialogActions>
                                    <Button onClick={handleCancel}>Cancel</Button>
                                    <Button onClick={handleEdit}>Update</Button>
                                    </DialogActions>
                                </Dialog>
                            </div>
                        )
                    }
                </div>
            </div>
            <Navbar />
            <div>
                <AddTaskDialog para={str}/>
            </div>
            <div>
                {
                    state.tasks.length > 0 && state.tasks.map(task=>((task.category === str) && (task.isCompleted===true) && (
                            <div className="px-2 py-2 mx-5 bg-white rounded-lg">
                                {task.name}
                            </div>
                        )
                    ))
                }
            </div>
        </div>


        // <div className="w-full bg-indigo-400">
        //         <h1>{str}</h1>
        //         <br />
        //         {str !== "General" && renderOptions()}
        //         <br />
        //         <Link to= {`/completed/${str}`}>View Completed</Link>
        //         <br />
        //         <input type="text" placeholder="Enter task Name" value={taskName} onChange={(e)=>setTaskName(e.target.value)}/>
        //         <br />
        //         <input type="text" placeholder="Enter task Description" value={taskDescription} onChange={(e)=>setTaskDescription(e.target.value)}/>
        //         <br />
        //         <input type="text" placeholder="Enter task Due Date" value={taskDate} onChange={(e)=>setTaskDate(e.target.value)}/>
        //         <br />
        //         <button onClick={handleNewTaskSubmit}>Submit</button>
        //         <br />
        //         {
        //             state.tasks.length > 0 && state.tasks.map((task,index)=>(
        //                 (task.category === str && task.isCompleted===false) && <div><button onClick={(e)=>makeComplete(index)(e)}>{task.name}:{task.description}</button></div>
        //             ))
        //         }
        // </div>
    );
}