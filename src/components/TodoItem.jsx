

// // File: src/components/TodoItem.jsx
// export function TodoItem({ todo, onDelete, onUpdate }) {
//   const toggleComplete = () => {
//     onUpdate({ ...todo, completed: !todo.completed });
//   };

//   const handlePriorityChange = (e) => {
//     onUpdate({ ...todo, priority: parseInt(e.target.value) });
//   };

//   return (
//     <li className="flex justify-between items-center p-4 border rounded bg-white shadow">
//       <div className="flex items-center gap-3">
//         <input type="checkbox" checked={todo.completed} onChange={toggleComplete} />
//         <span className={todo.completed ? 'line-through text-gray-500' : ''}>{todo.title}</span>
//       </div>
//       <div className="flex items-center gap-2">
//         <select value={todo.priority} onChange={handlePriorityChange} className="border rounded p-1">
//           {[1, 2, 3, 4, 5].map(p => (
//             <option key={p} value={p}>{p}</option>
//           ))}
//         </select>
//         <button onClick={() => onDelete(todo.id)} className="text-red-500">Xóa</button>
//       </div>
//     </li>
//   );
// }

// File: src/components/TodoItem.jsx
export function TodoItem({ todo, onDelete, onUpdate }) {
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
    <li className="flex justify-between items-center p-4 border rounded bg-white shadow">
      <div className="flex items-center gap-3">
        <input type="checkbox" checked={todo.completed} onChange={toggleComplete} />
        <span className={todo.completed ? 'line-through text-gray-500' : 'text-gray-800'}>
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
        <button
          onClick={() => onDelete(todo.id)}
          className="text-red-600 hover:text-red-800 transition"
        >
          Xóa
        </button>
      </div>
    </li>
  );
}
