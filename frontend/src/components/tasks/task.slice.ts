import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../../store'
import { TaskItemProps } from './TaskItemProps'


// Define the initial state using that type
const initialState = {
    tasks : [
        { id : 1 , taskName : "programieren" , done : true},
        { id : 2 , taskName : "Deutsch" , done : false},
        { id : 3 , taskName : "sport" , done : false},
    ]
}

export const taskSlice = createSlice({
  name: 'task',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    addTask : (state , action : PayloadAction<string>) => {
        state.tasks.push({
            id : Math.floor(Math.random() *101)+10,
            taskName : action.payload,
            done : false
        })
    },
    toggleTask  : (state , action :PayloadAction<TaskItemProps> ) => {
        const task =  state.tasks.find( t => t.id === action.payload.id);
        if(task){
            task.done = !task.done;
        }
        
    },
    removeTask  : (state , action: PayloadAction<TaskItemProps> ) => {
       state.tasks = state.tasks.filter(t => t.id !== action.payload.id)

    },
    newTask : (state) => {
        const newId = Math.floor(Math.random() *101)+10;
        state.tasks.push({
            id : newId,
            taskName : 'TaskNumber ' + newId,
            done : false
        })
    },
    editTask : (state , action : PayloadAction<{id : number , title : string}>) => {
        const task =  state.tasks.find( t => t.id === action.payload.id);
        if(task){
            task.taskName = action.payload.title;
        }
    }
}
})

export const { addTask , newTask , toggleTask , removeTask , editTask } = taskSlice.actions;

// Other code such as selectors can use the imported `RootState` type

export default taskSlice.reducer;
export const taskListSelector = (state : RootState) => state.taskList.tasks;