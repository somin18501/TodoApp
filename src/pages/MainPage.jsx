import {useParams,useNavigate} from "react-router-dom"
import { useState} from "react"
import { useDispatch,useSelector } from "react-redux";
import {DeleteTaskNameList, EditTaskNameList, makeCompleted, makeImportant, setTaskName} from "../redux/actions"
import AddTaskDialog from "../components/AddTaskDialog";
import { Button, Dialog, DialogTitle, TextField, DialogActions, DialogContent, DialogContentText } from "@material-ui/core";
import Navbar from "../Navbar"

export default function MainPage(){
    const {str} = useParams();
    const state = useSelector(state=>state.task);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [newName,setNewName] = useState(str);
    const [open, setOpen] = useState(false);
    const [open2, setOpen2] = useState(false);

    const handleOpen = ()=>{
        setOpen(true);
    }

    const handleOpen2 = ()=>{
        setOpen2(true);
    }

    const handleCancel = ()=>{
        setOpen(false);
    }

    const handleCancel2 = ()=>{
        setOpen2(false);
    }

    const handleEdit =(e)=>{
        e.preventDefault();
        dispatch(EditTaskNameList({initialName:str,finalName:newName}));
        setOpen(false);
        navigate(`/${newName}`);
        setNewName("");
    }

    const handleDelete = (e)=>{
        e.preventDefault();
        dispatch(DeleteTaskNameList(str));
        setOpen2(false);
        navigate("/General");
    }

    const makeComplete = (index)=>(e)=>{
        e.preventDefault();
        dispatch(makeCompleted(index));
    }

    const doImportant = (index)=>(e)=>{
        e.preventDefault();
        dispatch(makeImportant(index));
    }

    function linkClasses(){
        let classes = 'flex flex-col bg-indigo-400'
        if(state.taskName === ""){
            classes += ' w-full';
        }else{
            classes += ' w-3/4'
        }
        return classes;
    }

    return (
        <div className={linkClasses()}>
            <div className="flex flex-row justify-between text-2xl text-white mx-5 my-5">
                <div>
                    <h1>{str}</h1>
                </div>
                <div>
                    {
                        str !== "General" && (
                            <div>        
                                <Button onClick={handleOpen2}>Delete</Button>
                                <Dialog open={open2} onClose={handleCancel2} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
                                    <DialogTitle id="alert-dialog-title">Are You Sure?</DialogTitle>
                                    <DialogContent>
                                    <DialogContentText id="alert-dialog-description">
                                        List Will be deleted permanently
                                    </DialogContentText>
                                    </DialogContent>
                                    <DialogActions>
                                    <Button onClick={handleCancel2}>Cancel</Button>
                                    <Button onClick={handleDelete}>Delete</Button>
                                    </DialogActions>
                                </Dialog>

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
            <div className="mx-5">
                <Navbar />
            </div>
            <div>
                <AddTaskDialog para={str}/>
            </div>
            <div>
                {
                    state.tasks.length > 0 && state.tasks.map((task,index)=>((task.category === str) && (task.isCompleted===false) && (
                            <div className="relative flex flex-row items-center px-2 py-2 mx-5 my-5 bg-white rounded-lg cursor-pointer" onClick={()=>dispatch(setTaskName(task.name))}>
                                <div>
                                    <input type="checkbox" className="mx-2 my-2 w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" onChange={makeComplete(index)} />
                                </div>
                                <div className="mx-2">
                                    {task.name}
                                </div>
                                <div className="absolute right-12">
                                    {task.important===true && (
                                        <input type="checkbox" className="star mb-10" onChange={doImportant(index)} />
                                    )}
                                    {task.important===false && (
                                        <input type="checkbox" checked className="star mb-10" onChange={doImportant(index)} />
                                    )}
                                </div>
                            </div>
                        )
                    ))
                }
            </div>
        </div>
    );
}