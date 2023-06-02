import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import { useDispatch, useSelector } from "react-redux";
import DisplayBar from "./DisplayBar";

export default function Layout(){
    const dispatch = useDispatch();
    const state = useSelector(state=>state.task);
    return (
        <div className="flex flex-row min-h-screen">
            <Sidebar/>
            <Outlet />
            { 
                state.taskName !== "" && (
                    <DisplayBar/>
                )
            }
        </div>
    );
}