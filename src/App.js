import './App.css';
import React,{useState,useEffect} from 'react'
import { MdOutlineDelete } from "react-icons/md";
import { BsCheckLg } from "react-icons/bs";
function App() {
  const[isCompleteScrenn,setIsCompleteScreen] = useState(false);
  const[allTodos,setTodos] = useState([]);
  const [newTitle,setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");

  const handleAddTodo =()=>{
    let newTodoItem={
      title:newTitle,
      description:newDescription
    }
    let updatedTodoArr=[...allTodos];
    updatedTodoArr.push(newTodoItem);
    setTodos(updatedTodoArr);
    localStorage.setItem('todolist',JSON.stringify(updatedTodoArr))
  }

  useEffect(()=>{
let savedTodo=JSON.parse(localStorage.getItem('todolist'));
if(savedTodo){
  setTodos(savedTodo);
}
},[])
  return (
    <div className="app">
       <h1>My Todo List</h1>

    <div className="todo-wrapper">
      <div className="todo-input">
        <div className="todo-input-item">
          <label>Title</label>
          <input type="text" value={newTitle} 
          onChange={(e) =>setNewTitle(e.target.value)}
           placeholder="Enter task title"/>     
      </div>

      <div className="todo-input-item">
          <label>Description</label>
          <input type="text"  value={newDescription} 
          onChange={(e) =>setNewDescription(e.target.value)} 
          placeholder="Enter task description"/>     
      </div>

      <div className="todo-input-item">
         <button type='button' onClick={handleAddTodo}
          className='primarybtn'>Add task</button>
      </div>
      </div>


      <div className='btn-area'>
        <button className={`secondarybtn 
        ${isCompleteScrenn=== false && 'active'}`}
        onClick={() => setIsCompleteScreen(false)}>
          Todo
        </button>


        <button className={`secondarybtn
         ${isCompleteScrenn=== true && 'active'}`}
        onClick={() => setIsCompleteScreen(true)}>
          Completed task
          </button>
      </div>

      <div className='todo-list'>
      
      {allTodos.map((item,index)=>{
        return(
          <div className='todo-list-item' key={index}>
       <div>
       <h3>{item.title}</h3>
       <p>{item.description}</p>
       </div>
       <div>
        <MdOutlineDelete className='icon'/>
         <BsCheckLg className='check-icon'/>
       </div>
      </div>
        )
      })}
      </div>
    </div>
    </div>
    
  );
}

export default App;
