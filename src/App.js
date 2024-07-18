import './App.css';
import React, { useState } from 'react'
import { MdOutlineDelete } from "react-icons/md";
import { BsCheckLg } from "react-icons/bs";
function App() {

  const [isCompleteScrenn, setIsCompleteScreen] = useState(false);
  const [allTodos, setAllTodos] = useState([]);
  const [todos, setTodos] = useState('');
  const [editingIndex, setEditingIndex] = useState(null);
  const [editingTask, setEditingTask] = useState('');

  const handleAddTodo = () => {
    if (todos.trim()) {
      setAllTodos([...allTodos, { text: todos, status: 'pending' }]);
      setTodos('');
    }
  }

  const handleDeleteTodo = (index) => {
    const newtodo = allTodos.filter((_, i) => i !== index);
    setAllTodos(newtodo);
  };

  const handleEditTask = (index) => {
    setEditingIndex(index);
    setEditingTask(allTodos[index].text);
  };

  const handleSaveTask = () => {
    const newTodo = allTodos.map((todos, index) =>
      index === editingIndex ? { ...todos, text: editingTask } : todos
    );
    setAllTodos(newTodo);
    setEditingIndex(null);
    setEditingTask('');
  };

  const handleToggleStatus = (index) => {
    const newtodo = allTodos.map((todos, i) =>
      i === index && todos.status === 'pending' 
      ? { ...todos, status:'completed'} : todos
    );
    setAllTodos(newtodo);
  };

  return (
    <div className="app">
      <h1>My Todo List</h1>

      <div className="todo-wrapper">
        <div className="todo-input">
          <div className="todo-input-item">
            <label>Title</label>
            <input type="text" value={todos}
              onChange={(e) => setTodos(e.target.value)}
              placeholder="Enter task title" />
          </div>

          <div className="todo-input-item">
            <button type='button' onClick={handleAddTodo}
              className='primarybtn'>Add task</button>
          </div>
        </div>

        <div className='todo-list'>
          <ul style={{listStyleType: 'none', padding: 0, margin: 0}}>
            {allTodos.map((todos, index) => (
              <li key={index}>
                {editingIndex === index ? (
                  <>
                    <input
                      type="text"
                      value={editingTask}
                      onChange={(e) => setEditingTask(e.target.value)}
                    />
                    <button onClick={handleSaveTask}>Save</button>
                  </>
                ) : (
                  <>
                    <div className="todo-item">
                      <div className="todo-text">
                        {todos.text}
                      </div>
                      <div className='todo-list-buttons'>
                        <button className='editbutton' onClick={() => handleEditTask(index)}>Edit</button>
                        <button className='deletebutton' onClick={() => handleDeleteTodo(index)}>Delete</button>
                        <BsCheckLg 
                         className={` ${todos.status === 'completed' ? 'check-icon' : 'check-icon-pending'}`} 
                        title='Complete?' 
                        onClick={() => handleToggleStatus(index)} />({todos.status})
                      </div>
                    </div>
                  </>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>

  );
}

export default App;
