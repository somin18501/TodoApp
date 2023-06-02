import { createSlice } from '@reduxjs/toolkit'

export const counterSlice = createSlice({
    name: 'task',
    initialState: {
      user:{userName:"",userEmail:""},
        taskNameList:["General"],
        tasks:[],
        taskIndex:""
    },
    reducers: {
    setUser:(state,obj)=>{
        localStorage.setItem("user",JSON.stringify(obj.payload));
        state.user = obj.payload;
    },
    setTaskInformation:(state)=>{
        let d = localStorage.getItem("taskNameList");
        if(d){
            d = JSON.parse(d);
            state.taskNameList = d;
        }
        else{
            state.taskNameList = ["General"];
        }
        d = localStorage.getItem("tasks");
        if(d){
            state.tasks= JSON.parse(d);
        }
        else state.tasks = [];
        d = localStorage.getItem("user");
        if(d){
            d = JSON.parse(d);
            state.user = d;
        }
        else state.user = {userEmail:"",userName:""};
    },
    EditTaskNameList:(state,name)=>{
        const initialName = name.payload.initialName;
        const finalName = name.payload.finalName;
        const index = state.taskNameList.indexOf(initialName);
        state.taskNameList[index] = finalName;
        for(let i = 0;i<state.tasks.length;++i){
            if(state.tasks[i].category === initialName){
                state.tasks[i].category = finalName;
            }
        }
        localStorage.setItem("taskNameList",JSON.stringify(state.taskNameList));
        localStorage.setItem("tasks",JSON.stringify(state.tasks));
    },
    DeleteTaskNameList:(state,name)=>{
        state.taskNameList = state.taskNameList.filter(element=>element!== name.payload);
        state.tasks = state.tasks.filter(element=>element.category !== name.payload);
        localStorage.setItem("taskNameList",JSON.stringify(state.taskNameList));
        localStorage.setItem("tasks",JSON.stringify(state.tasks));
    },
    addNewList:(state,name)=>{
        state.taskNameList.push(name.payload);
        localStorage.setItem("taskNameList",JSON.stringify(state.taskNameList));
    },
    addTask:(state,t)=>{
        state.tasks.push(t.payload);
        localStorage.setItem("tasks",JSON.stringify(state.tasks));
    },
    makeCompleted:(state,index)=>{
        state.tasks[index.payload].isCompleted = !state.tasks[index.payload].isCompleted;
        localStorage.setItem("tasks",JSON.stringify(state.tasks));
    },
    makeImportant:(state,index)=>{
        state.tasks[index.payload].important = !state.tasks[index.payload].important;
        localStorage.setItem("tasks",JSON.stringify(state.tasks));
    },
    setTaskName:(state,name)=>{
        state.taskIndex = name.payload;
    },
    editTaskInformation:(state,obj)=>{
        const index = obj.payload.index;
        state.tasks[index] = obj.payload.task;
        localStorage.setItem('tasks',JSON.stringify(state.tasks));
    },
    deleteTask:(state,index)=>{
        state.tasks.splice(index.payload,1);
        state.taskIndex = "";
        localStorage.setItem('tasks',JSON.stringify(state.tasks))
    }
  },
})

export const { setUser, setTaskInformation, EditTaskNameList,DeleteTaskNameList,addNewList,addTask,makeCompleted, makeImportant, setTaskName,editTaskInformation,deleteTask } = counterSlice.actions

export default counterSlice.reducer