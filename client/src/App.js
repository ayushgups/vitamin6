import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [todos, setTodos] = useState([]);
  const [newTask, setNewTask] = useState('');

  // Load todos from backend
  useEffect(() => {
    fetch('/todos')
      .then(res => res.json())
      .then(data => setTodos(data));
  }, []);

  const handleAdd = () => {
    fetch('/todos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ task: newTask }),
    })
      .then(res => res.json())
      .then(data => {
        setTodos([...todos, data]);
        setNewTask('');
      });
  }

  const handleDelete = (id) => {
    fetch(`/todos/${id}`, { method: 'DELETE' })
      .then(() => setTodos(todos.filter(todo => todo.id !== id)));
  };


  return (
    <div className="App">

      <h1>Todo List</h1>

      <input
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        placeholder="Enter a task"
      />
      <button onClick={handleAdd}>Add Task</button>

      <ul>
        {todos.map(todo => (
          <li key={todo.id}>
            {todo.description}
            <button onClick={() => handleDelete(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
      
    </div>
  );
}

export default App;
