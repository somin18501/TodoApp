import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

export default function Layout(){
    return (
        <div className="flex flex-row min-h-screen">
            <Sidebar/>
            <Outlet />
        </div>
    );
}