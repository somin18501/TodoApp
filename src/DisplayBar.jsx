
import { useSelector,useDispatch } from "react-redux";
import { setTaskName } from "./redux/actions";

export default function DisplayBar(){
    const state = useSelector(state=>state.task);
    const dispatch = useDispatch();

    const handleCloseBar = () =>{
        dispatch(setTaskName(""));
    }

    return (
        <div className="flex flex-col w-1/4">
            <button onClick={handleCloseBar}>close</button>
            displaybar
        </div>
    );
}