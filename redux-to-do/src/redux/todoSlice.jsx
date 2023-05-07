import {createSlice} from "@reduxjs/toolkit"
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const initialState = {
    todoList:[],
    sortCriteria: "All"
}

const todoSlice = createSlice({
    name: "todo",
    initialState,
    reducers:{
        setToDoList: (state, action) =>{
            state.todoList = action.payload
        },
        addToDo: (state, action) =>{
            state.todoList.push({
                task: action.payload.task,
                id: action.payload.id,
                completed: false,
            })
        },
        sortTodo:(state, action) =>{
            state.sortCriteria = action.payload
        },
        updateTodo:(state, action) =>{
            const {id, task} = action.payload
            const index = state.todoList.findIndex((todo) => todo.id === id)
            state.todoList[index].task = task;
        },
        toggleCompleted:(state, action) =>{
            const {id} = action.payload
            const index = state.todoList.findIndex((todo) => todo.id === id)
            state.todoList[index].completed = !state
            state.todoList[index].completed = !state.todoList[index].completed;
        },
    }
})

export const {setToDoList, addToDo, sortTodo, updateTodo, toggleCompleted} = todoSlice.actions
export default todoSlice.reducer