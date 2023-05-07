import React, { useEffect, useState } from 'react'
import {useDispatch, useSelector} from "react-redux"
import { addToDo, sortTodo, updateTodo, setToDoList, toggleCompleted } from '../redux/todoSlice'
import {TiPencil} from "react-icons/ti"
import {BsTrash} from "react-icons/bs"
import '../todo.css'

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

    const handleUpdateTodo = (id, task) => {
        if (task.trim().length === 0) {
          alert("Please Add a Task");
        } else {
          dispatch(updateTodo({
            id: id,
            task: task
          }));
          setShowMpdel(false);
        }
      };
      

      const handleDeleteTodo = (id) => {
        const newToDoList = todoList.filter((todo) => todo.id !== id);
        dispatch(setToDoList(newToDoList));
        localStorage.setItem("todolist", JSON.stringify(newToDoList));
      };
      
const handleSort = (sortCriteria) =>{
    dispatch(sortTodo(sortCriteria))
}

    const handleToggleComplete = (id) =>{
        dispatch(toggleCompleted({id}))
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
            <div className='overlay'>
                <input type="text" 
                placeholder={currentTodo ? "Update Your Task Here" : "Enter Your Task Here"}
                value={newTask}
                onChange={(e)=> setNewTask(e.target.value)}
                />
                <div>{currentTodo ?(<>
                    <button onClick={()=>{
                        setShowMpdel(false),
                        handleUpdateTodo(currentTodo.id, newTask)
                    }}>Save</button>
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
            <div className="flex justify-center mb-6">
              <select
                onChange={(e) => handleSort(e.target.value)}
                className="p-1 outline-none text-sm"
              >
                <option value="All">
                  All
                </option>
                <option value="Completed">
                  Completed
                </option>
                <option value="Not Completed">
                  Not Completed
                </option>
              </select>
            </div>
                {sortTodoList.map(todo =>(
                    <div key={todo.id} className="list">
                        <div onClick={() =>{
                            handleToggleComplete(todo.id)
                        }}>{todo.task}</div>
                        <div className="crud-btns">
                            <button onClick={()=> {setShowMpdel(true); setCurrentTodo(todo); setNewTask(todo.task)}}><TiPencil/></button>
                            <button onClick={()=> handleDeleteTodo(todo.id)}><BsTrash/></button>
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