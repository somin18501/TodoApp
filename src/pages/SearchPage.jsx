import {useParams,useNavigate} from "react-router-dom"
import { useState} from "react"
import { useDispatch,useSelector } from "react-redux";
import { makeCompleted, makeImportant, setTaskName} from "../redux/actions"

export default function SearchPage(){
    const {str} = useParams();
    const state = useSelector(state=>state.task);
    const dispatch = useDispatch();

    const res = state.tasks.filter((task)=>{return task.name.toLowerCase().includes(str.toLowerCase())});

    const makeComplete = (index)=>(e)=>{
        e.preventDefault();
        dispatch(makeCompleted(index));
    }

    const doImportant = (index)=>(e)=>{
        e.preventDefault();
        dispatch(makeImportant(index));
    }

    function linkClasses(){
        let classes = 'flex flex-col bg-gray-400'
        if(state.taskIndex === ""){
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
                    <h1>Search</h1>
                </div>
            </div>
            <div>
                {
                    res.length > 0 && res.map((task,index)=>(
                            <div className="relative flex flex-row items-center px-2 py-2 mx-5 my-5 bg-white rounded-lg">
                                <div>
                                    <input type="checkbox" checked={task.isCompleted} className="cursor-pointer mx-2 my-2 w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" onChange={makeComplete(index)} />
                                </div>
                                <div className="mx-2 cursor-pointer" onClick={()=>dispatch(setTaskName(index))}>
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
                    )
                }
                {
                    str === '' || res.length === 0 && (
                        <div className="h-screen flex flex-row items-center justify-center text-white text-2xl">
                            No Such Task Found
                        </div>
                    )
                }
            </div>
        </div>
    );
}