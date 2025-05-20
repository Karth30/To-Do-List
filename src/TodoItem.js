import React, { useState } from 'react';

function TodoItem({ todo, index, onDelete, onToggle, onEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [newText, setNewText] = useState(todo.text);
  const [newPriority, setNewPriority] = useState(todo.priority);
  const [newTime, setNewTime] = useState(todo.dueTime);

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High': return '#ff4d4d';
      case 'Medium': return '#ffa500';
      case 'Low': return '#00cc66';
      default: return 'white';
    }
  };

  const isOverdue = () => {
    const now = new Date();
    const [hours, minutes] = todo.dueTime.split(':');
    const due = new Date();
    due.setHours(hours, minutes, 0);
    return now > due;
  };

  return (
    <li className="todo-item">
      {isEditing ? (
        <>
          <input value={newText} onChange={(e) => setNewText(e.target.value)} />
          <select value={newPriority} onChange={(e) => setNewPriority(e.target.value)}>
            <option>High</option>
            <option>Medium</option>
            <option>Low</option>
          </select>
          <input type="time" value={newTime} onChange={(e) => setNewTime(e.target.value)} />
          <button onClick={() => {
            onEdit(index, newText, newPriority, newTime);
            setIsEditing(false);
          }}>Save</button>
        </>
      ) : (
        <>
          <span
            style={{ color: getPriorityColor(todo.priority) }}
            className={isOverdue() ? 'overdue' : ''}
          >
            [{todo.priority}] {todo.text} {todo.dueTime}
          </span>
          <div className="btn-group">
            <button onClick={() => onToggle(index)}>Complete</button>
            <button onClick={() => setIsEditing(true)}>Edit</button>
            <button onClick={() => onDelete(index)}>Delete</button>
          </div>
        </>
      )}
    </li>
  );
}

export default TodoItem;
