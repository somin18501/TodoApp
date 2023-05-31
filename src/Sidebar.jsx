import { useEffect, useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import { Button, Dialog, DialogTitle, TextField, DialogActions, DialogContent } from "@material-ui/core";
import { useSelector,useDispatch } from "react-redux";
import { DeleteTaskNameList, EditTaskNameList, addNewList, setTaskInformation } from "./redux/actions";

export default function Sidebar(){
    const state = useSelector(state=>state.task);
    const navigate = useNavigate();
    const [listName,setListName] = useState('');
    const [open, setOpen] = useState(false);
    const dispatch = useDispatch();
    const [newName,setNewName] = useState("");

    const handleAddNewTaskList = ()=>{
        setOpen(true);
    }

    // const handleEdit = (name)=>(e)=>{
    //     e.preventDefault();
    //     dispatch(EditTaskNameList({initialName:name,finalName:newName}));
    //     navigate(`/${newName}`);
    //     setNewName("");
    // }
    // const handleDelete = (name)=>(e)=>{
    //     e.preventDefault();
    //     dispatch(DeleteTaskNameList(name));
    //     navigate("/General");
    // }
    // const renderOptions = (name)=>{
    //     return(
    //         <>
    //             <input type="text" value={newName} placeholder="Enter new name" onChange={e=>setNewName(e.target.value)}/>
    //             <button onClick={(e)=>handleEdit(name)(e)}>Edit</button>
    //             <br /><button onClick={e=>handleDelete(name)(e)}>Delete</button>
    //         </>
    //     )
    // }
    const handleClose = () => {
        setListName('')
        setOpen(false);
    };
    useEffect(()=>{
        dispatch(setTaskInformation());
    },[]);
    const handleAddNewList = ()=>{
        dispatch(addNewList(listName));
        setOpen(false)
        setListName("");
        navigate(`/${listName}`);
    }
    return (
        <div className="flex flex-col w-1/5">
            <div className="flex flex-row justify-around mx-5 mt-4">
                <div className="mx-2 pt-3">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="blue" className="w-6 h-6">
                        <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clipRule="evenodd" />
                    </svg>
                </div>
                <div className="mr-10">
                    <div className="text-lg">
                        {state.user.userName}
                    </div>
                    <div className="text-sm pb-1">
                        {state.user.userEmail}
                    </div>
                </div> 
            </div>
            <div className="mt-5 mb-5 mx-5 border border-gray-300 shadow-md shadow-gray-300">
                <input type="search" placeholder="search list" />
            </div>
            <div className="flex flex-row mx-5 my-5">
                <div className="mx-4">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="red" class="w-6 h-6">
                    <path fill-rule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clip-rule="evenodd" />
                    </svg>
                </div>
                <div className="mr-12">
                    Important
                </div>
                <div>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
                    <path fill-rule="evenodd" d="M16.28 11.47a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 01-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 011.06-1.06l7.5 7.5z" clip-rule="evenodd" />
                    </svg>
                </div>
            </div>
            <div className="mx-5 border-2">
                <hr />
            </div>
            <div className="flex flex-col mt-5">
                {state.taskNameList.length > 0 && state.taskNameList.map(name=>(
                    <div className="flex flex-row mx-5 my-5 justify-between">
                        <div className="mx-4">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
                            <path fill-rule="evenodd" d="M2.625 6.75a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0zm4.875 0A.75.75 0 018.25 6h12a.75.75 0 010 1.5h-12a.75.75 0 01-.75-.75zM2.625 12a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0zM7.5 12a.75.75 0 01.75-.75h12a.75.75 0 010 1.5h-12A.75.75 0 017.5 12zm-4.875 5.25a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0zm4.875 0a.75.75 0 01.75-.75h12a.75.75 0 010 1.5h-12a.75.75 0 01-.75-.75z" clip-rule="evenodd" />
                            </svg>
                        </div>
                        <div className="mr-10">
                            <Link to={'/'+name}>{name}</Link> 
                            {/* {name !== "General" && renderOptions(name)} */}
                        </div>
                        <div className="mr-5">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
                            <path fill-rule="evenodd" d="M16.28 11.47a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 01-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 011.06-1.06l7.5 7.5z" clip-rule="evenodd" />
                            </svg>
                        </div>
                    </div>
                ))}
            </div>
            <div className="absolute bottom-0 left-0">
                <Button onClick={handleAddNewTaskList}>add</Button>
                <Dialog open={open} onClose={handleClose}>
                    <DialogTitle>New List</DialogTitle>
                    <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="List Name"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={listName} 
                        onChange={(ev) => setListName(ev.target.value)}
                    />
                    </DialogContent>
                    <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleAddNewList}>Create</Button>
                    </DialogActions>
                </Dialog>
            </div>
        </div>
    );
}