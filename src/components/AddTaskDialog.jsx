import { useEffect, useState } from "react";
import { Button, Dialog, DialogTitle, TextField, DialogActions, DialogContent } from "@material-ui/core";
import { setTaskInformation,addTask } from "../redux/actions";
import { useDispatch,useSelector } from "react-redux";

export default function AddTaskDialog({para}){
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const [taskName,setTaskName] = useState("");
    const [taskDate,setTaskDate] = useState("");
    const [taskDescription,setTaskDescription] = useState("");
    

    const handleOpen = ()=>{
        setOpen(true);
    }

    const handleCancel = ()=>{
        setOpen(false);
    }

    const handleNewTaskSubmit = ()=>{
        const task = {
            name:taskName,
            description:taskDescription,
            category: para,
            important:false,
            date:taskDate,
            isCompleted:false
        };
        dispatch(addTask(task));
        setTaskDate("");
        setTaskDescription("");
        setTaskName("");
        setOpen(false);
    }

    useEffect(()=>{
        dispatch(setTaskInformation())
    },[])

    return (
        <div className="absolute bottom-5 flex flex-row mx-10 items-center">
            <div>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
                <path fill-rule="evenodd" d="M12 3.75a.75.75 0 01.75.75v6.75h6.75a.75.75 0 010 1.5h-6.75v6.75a.75.75 0 01-1.5 0v-6.75H4.5a.75.75 0 010-1.5h6.75V4.5a.75.75 0 01.75-.75z" clip-rule="evenodd" />
                </svg>
            </div>
            <div>
                <Button onClick={handleOpen}>Add Task</Button>
                <Dialog open={open} onClose={handleCancel}>
                    <DialogTitle>Task Details</DialogTitle>
                    <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="List Name"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={taskName} 
                        onChange={(ev) => setTaskName(ev.target.value)}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="List Name"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={taskDescription} 
                        onChange={(ev) => setTaskDescription(ev.target.value)}
                    />
                    </DialogContent>
                    <DialogActions>
                    <Button onClick={handleCancel}>Cancel</Button>
                    <Button onClick={handleNewTaskSubmit}>Create</Button>
                    </DialogActions>
                </Dialog>
            </div>
        </div>
    );
}