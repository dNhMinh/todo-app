// File: src/components/TodoItem.jsx
import { useState } from 'react';

export function TodoItem({ todo, onUpdate, isSelected, onSelect }) {
  const [editedTitle, setEditedTitle] = useState(todo.title);

  const toggleComplete = () => {
    onUpdate({ ...todo, completed: !todo.completed });
  };

  const handlePriorityChange = (e) => {
    onUpdate({ ...todo, priority: parseInt(e.target.value) });
  };

  const priorityLabels = {
    1: 'Rất thấp',
    2: 'Thấp',
    3: 'Trung bình',
    4: 'Cao',
    5: 'Rất cao',
  };

  return (
    <li className="flex justify-between items-center p-4 border rounded bg-white shadow w-full">
      <div className="flex items-center gap-3 flex-1">
        <input
          type="checkbox"
          checked={isSelected}
          onChange={() => onSelect(todo.id)}
        />
        <span
          onClick={toggleComplete}
          className={todo.completed ? 'line-through text-gray-500 font-medium cursor-pointer hover:text-gray-600' : 'text-gray-800 font-medium cursor-pointer hover:text-blue-600'}
          style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}
        >
          {todo.title}
        </span>
      </div>
      <div className="flex items-center gap-2">
                <select
          value={todo.priority}
          onChange={handlePriorityChange}
          className="border rounded p-1 bg-white text-gray-800 shadow"
        >
          {[1, 2, 3, 4, 5].map(p => (
            <option key={p} value={p}>{priorityLabels[p]}</option>
          ))}
        </select>
      </div>
    </li>
  );
}
