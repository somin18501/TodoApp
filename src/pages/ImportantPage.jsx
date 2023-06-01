import { useDispatch,useSelector } from "react-redux";
import {makeCompleted, makeImportant} from "../redux/actions"

export default function ImportantPage(){
    const state = useSelector(state=>state.task);
    const dispatch = useDispatch();

    const makeComplete = (index)=>(e)=>{
        e.preventDefault();
        dispatch(makeCompleted(index));
    }

    const doImportant = (index)=>(e)=>{
        e.preventDefault();
        dispatch(makeImportant(index));
    }

    function checkImp(imp){
        return imp.important === true;
    }

    return (
        <div className="flex flex-col bg-red-400 w-full">
            <div className="flex flex-row justify-between text-2xl text-white mx-5 my-5">
                <div>
                    <h1>Important</h1>
                </div>
            </div>
            <div>
                {
                    state.tasks.length > 0 && state.tasks.map((task,index)=>((task.important===true) && (
                            <div className="flex flex-row items-center px-2 py-2 mx-5 my-5 bg-white rounded-lg">
                                <div>    
                                    {task.isCompleted===true && (
                                        <input type="checkbox" className="mx-2 my-2 w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" checked onChange={makeComplete(index)} />
                                        )}
                                    {task.isCompleted===false && (
                                    <input type="checkbox" className="mx-2 my-2 w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" onChange={makeComplete(index)} />
                                    )}
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
                        ))
                    )
                }
                {
                    state.tasks.filter(checkImp).length === 0 && (
                        <div className="h-screen flex flex-row items-center justify-center text-white text-2xl">
                            Try starring some tasks to see them here.
                        </div>
                    )
                }
            </div>
        </div>
    );
}