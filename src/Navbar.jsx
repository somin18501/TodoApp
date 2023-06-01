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
                To Do
            </Link>
            <Link className={linkClasses('Completed')} to={'/Completed/'+tp}>
                Completed
            </Link>
        </nav>
    );
}