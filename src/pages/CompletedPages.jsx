import {useParams} from "react-router-dom"
import { useSelector,useDispatch } from "react-redux";
import { useEffect } from "react";
import { setTaskInformation } from "../redux/actions";
export default function CompletedPages(){
    const {str} = useParams();
    const state = useSelector(state=>state.task);
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(setTaskInformation());
    },[])
    return (
        <>
            {str} : Completed
            <br />
            {
                state.tasks.length > 0 && state.tasks.map((task,index)=>(
                    (task.category === str && task.isCompleted === true) && <div><button >{task.name}:{task.description}</button></div>
                ))
            }
        </>
    )
}