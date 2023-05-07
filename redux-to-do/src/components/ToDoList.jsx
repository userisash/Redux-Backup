import React, { useEffect, useState } from 'react'
import {useDispatch, useSelector} from "react-redux"
import { addToDo, sortTodo, updateTodo, setToDoList, toggleCompleted } from '../redux/todoSlice'
import {TiPencil} from "react-icons/ti"
import {BsTrash} from "react-icons/bs"

const ToDoList = () => {
    const dispatch = useDispatch()
    const todoList = useSelector((state)=> state.todo.todoList)
    const sortCriteria = useSelector((state) => state.todo.sortCriteria)
    const [showModel, setShowMpdel] = useState(false)
    const [currentTodo, setCurrentTodo] = useState(null)
    const [newTask, setNewTask]= useState("")
    console.log(newTask)
    useEffect(()=>{
        if(todoList.length > 0){
            localStorage.setItem("todolist", JSON.stringify(todoList))
        }
    },[])

    useEffect(()=>{
        const localTodoList = JSON.parse(localStorage.getItem("todolist"))
        if(localTodoList){
            dispatch(setToDoList(localTodoList))
        }
    },[dispatch])

    const handleAddTodo = (task) =>{
        if(task.trim().length === 0){
            alert("Please Add a Task")
        }else{
            dispatch(addToDo({
                task : task,
                id: Date.now()
            }))
            setNewTask("")
            setShowMpdel(true)
        }
    }
const handleSort = (sortCriteria) =>{
    dispatch(sortTodo(sortCriteria))
}

    const sortTodoList =todoList.filter((todo) =>{
        if(sortCriteria === "All") return true
        if(sortCriteria === "completed" && todo.completed) return true
        if(sortCriteria === "Not Completed" && !todo.completed) return true
        return false
    })
  return (
    <div>
        {showModel && (
            <div>
                <input type="text" 
                placeholder={currentTodo ? "Update Your Task Here" : "Enter Your Task Here"}
                value={newTask}
                onChange={(e)=> setNewTask(e.target.value)}
                />
                <div>{currentTodo ?(<>
                    <button>Save</button>
                    <button>Cancel</button>
                </>):(
                    <>
                    <button onClick={() =>{setShowMpdel(false); handleAddTodo(newTask)}}>Add</button>
                    <button onClick={() =>{setShowMpdel(false)}}>Cancel</button>
                    </>
                )}</div>
            </div>
        )}
        <div className="todo-list">
            {todoList === 0 ? <>
            <div>
            <div className="empty">Add A Task Here</div>
            <p>You Have No Tasks</p>
            </div>
            </>:<>
                {sortTodoList.map(todo =>(
                    <div key={todo.id} className="list">
                        <div>{todo.task}</div>
                        <div className="crud-btns">
                            <button><TiPencil/></button>
                            <button><BsTrash/></button>
                        </div>
                    </div>
                ))}
            </>}
        </div>
        <button onClick={() => setShowMpdel(true)}>Add Task</button>
    </div>
  )
}

export default ToDoList