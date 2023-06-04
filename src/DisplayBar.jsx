import { useSelector,useDispatch } from "react-redux";
import { setTaskName,editTaskInformation,deleteTask} from "./redux/actions";
import {useEffect, useState} from "react"
export default function DisplayBar(){
    const state = useSelector(state=>state.task);
    const dispatch = useDispatch();
    const [title,setTitle] = useState('');
    const [description,setDescription] = useState('');
    const [dueDate,setDueDate] = useState(new Date());
    const [complete,setComplete] = useState(false);
    const [imp,setImp] = useState(false);
    
    useEffect(()=>{
        setTitle(state.tasks[state.taskIndex].name);
        setDescription(state.tasks[state.taskIndex].description);
        setImp(!state.tasks[state.taskIndex].important);
        setDueDate(state.tasks[state.taskIndex].date);
        setComplete(state.tasks[state.taskIndex].isCompleted);
    },[state.taskIndex])

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
            name: title,
            description: description,
            category: state.tasks[state.taskIndex].category,
            important: !imp,
            date: dueDate,
            isCompleted: complete,
            createdon: state.tasks[state.taskIndex].createdon,
        };
        dispatch(editTaskInformation({index:state.taskIndex,task})); 
    }

    return (
        <div className="flex flex-col w-1/4">
            <div className="flex flex-row items-center justify-between my-2">
                <div>
                    <input type="checkbox" checked={complete} className="mx-2 my-2 w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" onChange={ev => setComplete(ev.target.checked)}/>
                </div>
                <div>
                    <input type="text" value={title} onChange={e=>setTitle(e.target.value)} />
                </div>
                <div className="ml-5">
                    <input type="checkbox" checked={imp} className="star mb-10" onChange={ev => setImp(ev.target.checked)} />
                </div>
                <div className="ml-5 mt-1 mr-1">
                    <button onClick={handleCloseBar} className="bg-gray-300 rounded">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
            </div>
            <div className="mx-5 border-2 ">
                <hr />
            </div>
            <div className="mx-auto my-5">
                <input type="date" value={dueDate} onChange={e=>setDueDate(e.target.value)} />
            </div>
            <div className="mx-5 border-2 ">
                <hr />
            </div>
            <div className="mx-5 my-5">
                <textarea className="w-full" rows="15" type="text" value={description} onChange={e=>setDescription(e.target.value)} />
            </div>
            <div className="mx-5 border-2 ">
                <hr />
            </div>
            <div className="absolute bottom-5 flex flex-col">
                <div className="my-5">
                    <button className="w-64 ml-8 bg-gray-200 rounded-2xl p-2" onClick={handleTaskEdit}>Save Changes</button>
                </div>
                <div className="flex flex-row items-center justify-between">
                    <div className="ml-5">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
                        <path fill-rule="evenodd" d="M16.28 11.47a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 01-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 011.06-1.06l7.5 7.5z" clip-rule="evenodd" />
                        </svg>
                    </div>
                    <div>
                        {state.tasks[state.taskIndex].createdon}
                    </div>
                    <button onClick={handleDeleteTask}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
}