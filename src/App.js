import React, { useState } from 'react';
import TodoItem from './TodoItem';

function App() {
  const [todos, setTodos] = useState([]);
  const [completedTodos, setCompletedTodos] = useState([]);
  const [input, setInput] = useState('');
  const [priority, setPriority] = useState('Medium');
  const [dueTime, setDueTime] = useState('');

  const addTodo = () => {
    if (!input.trim() || !dueTime) return;

    const newTodo = {
      text: input,
      priority,
      dueTime,
    };

    setTodos([...todos, newTodo]);
    setInput('');
    setPriority('Medium');
    setDueTime('');
  };

  const deleteTodo = (index) => {
    const updated = [...todos];
    updated.splice(index, 1);
    setTodos(updated);
  };

  const deleteCompletedTodo = (index) => {
    const updated = [...completedTodos];
    updated.splice(index, 1);
    setCompletedTodos(updated);
  };

  const markComplete = (index) => {
    const task = todos[index];
    setTodos(todos.filter((_, i) => i !== index));
    setCompletedTodos([...completedTodos, task]);
  };

  const editTodo = (index, newText, newPriority, newTime) => {
    const updated = [...todos];
    updated[index].text = newText;
    updated[index].priority = newPriority;
    updated[index].dueTime = newTime;
    setTodos(updated);
  };

  return (
    <div className="app-container">
      <h2>The Things you should do!</h2>

      <div className="input-group">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter a task"
        />
        <select value={priority} onChange={(e) => setPriority(e.target.value)}>
          <option>High</option>
          <option>Medium</option>
          <option>Low</option>
        </select>
        <input
          type="time"
          value={dueTime}
          onChange={(e) => setDueTime(e.target.value)}
        />
        <button onClick={addTodo}>Add</button>
      </div>

      <ul className="todo-list">
        {todos.map((todo, index) => (
          <TodoItem
            key={index}
            index={index}
            todo={todo}
            onDelete={deleteTodo}
            onToggle={markComplete}
            onEdit={editTodo}
          />
        ))}
      </ul>

      <div className="footer">
          Tasks Completed: {completedTodos.length} / {todos.length + completedTodos.length}
      </div>

      {completedTodos.length > 0 && (
        <div className="completed-section">
          <h3> Completed Tasks</h3>
          <ul className="todo-list">
            {completedTodos.map((todo, index) => (
              <li key={index} className="todo-item completed">
                <span>{todo.text}  {todo.dueTime}</span>
                <button onClick={() => deleteCompletedTodo(index)}>Delete</button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;
