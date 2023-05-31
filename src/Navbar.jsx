import { Link, useLocation } from "react-router-dom";

export default function AccountNav(){
    const {pathname} = useLocation();
    let subpage = pathname.split('/')?.[1];
    let tp;
    if(subpage === "Completed"){
        tp=pathname.split('/')?.[2];
    }else{
        tp=subpage;
    }

    function linkClasses(type=null){
        let classes = 'inline-flex gap-1 py-2 px-6'
        if(type === subpage){
            classes += ' border-b-2 border-white-300 text-white';
        }else{
            classes += ' bg-indigo-400 text-gray'
        }
        return classes;
    }

    return (
        <nav className="w-full flex gap-2 mb-4">
            <Link className={linkClasses(tp)} to={'/'+tp}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                </svg>
                To Do
            </Link>
            <Link className={linkClasses('Completed')} to={'/Completed/'+tp}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" />
                </svg>
                Completed
            </Link>
        </nav>
    );
}