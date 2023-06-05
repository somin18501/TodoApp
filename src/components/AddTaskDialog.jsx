import { useEffect, useState } from "react";
import { Button, Dialog, DialogTitle, TextField, DialogActions, DialogContent } from "@material-ui/core";
import { setTaskInformation,addTask } from "../redux/actions";
import { useDispatch} from "react-redux";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';

export default function AddTaskDialog({para}){
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const [taskName,setTaskName] = useState("");
    const [taskDate,setTaskDate] = useState(new Date());
    const [taskDescription,setTaskDescription] = useState("");

    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    today = mm + '/' + dd + '/' + yyyy;

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
            isCompleted:false,
            createdon:today,
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
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                <path fillRule="evenodd" d="M12 3.75a.75.75 0 01.75.75v6.75h6.75a.75.75 0 010 1.5h-6.75v6.75a.75.75 0 01-1.5 0v-6.75H4.5a.75.75 0 010-1.5h6.75V4.5a.75.75 0 01.75-.75z" clipRule="evenodd" />
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
                        label="Task Name"
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
                        label="Task Description"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={taskDescription} 
                        onChange={(ev) => setTaskDescription(ev.target.value)}
                    />
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={['DatePicker']}>
                        <DatePicker label="Add Due Date" selected={taskDate} onChange={(date) => setTaskDate(date)}/>
                    </DemoContainer>
                    </LocalizationProvider>
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