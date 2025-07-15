

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
// export function TodoItem({ todo, onDelete, onUpdate }) {
//   const toggleComplete = () => {
//     onUpdate({ ...todo, completed: !todo.completed });
//   };

//   const handlePriorityChange = (e) => {
//     onUpdate({ ...todo, priority: parseInt(e.target.value) });
//   };

//   const priorityLabels = {
//     1: 'Rất thấp',
//     2: 'Thấp',
//     3: 'Trung bình',
//     4: 'Cao',
//     5: 'Rất cao',
//   };

//   return (
//     <li className="flex justify-between items-center p-4 border rounded bg-white shadow">
//       <div className="flex items-center gap-3">
//         <input type="checkbox" checked={todo.completed} onChange={toggleComplete} />
//         <span className={todo.completed ? 'line-through text-gray-500' : 'text-gray-800'}>
//           {todo.title}
//         </span>
//       </div>
//       <div className="flex items-center gap-2">
//         <select
//           value={todo.priority}
//           onChange={handlePriorityChange}
//           className="border rounded p-1 bg-white text-gray-800 shadow"
//         >
//           {[1, 2, 3, 4, 5].map(p => (
//             <option key={p} value={p}>{priorityLabels[p]}</option>
//           ))}
//         </select>
//         <button
//           onClick={() => onDelete(todo.id)}
//           className="text-red-600 hover:text-red-800 transition"
//         >
//           Xóa
//         </button>
//       </div>
//     </li>
//   );
// }


// File: src/components/TodoItem.jsx
// import { useState } from 'react';

// export function TodoItem({ todo, onDelete, onUpdate }) {
//   const [isEditing, setIsEditing] = useState(false);
//   const [editedTitle, setEditedTitle] = useState(todo.title);

//   const toggleComplete = () => {
//     onUpdate({ ...todo, completed: !todo.completed });
//   };

//   const handlePriorityChange = (e) => {
//     onUpdate({ ...todo, priority: parseInt(e.target.value) });
//   };

//   const handleEdit = () => {
//     setIsEditing(true);
//   };

//   const handleEditSubmit = (e) => {
//     e.preventDefault();
//     if (editedTitle.trim()) {
//       onUpdate({ ...todo, title: editedTitle });
//       setIsEditing(false);
//     }
//   };

//   const priorityLabels = {
//     1: 'Rất thấp',
//     2: 'Thấp',
//     3: 'Trung bình',
//     4: 'Cao',
//     5: 'Rất cao',
//   };

//   return (
//     <li className="flex justify-between items-center p-4 border rounded bg-white shadow w-full">
//       <div className="flex items-center gap-3 flex-1">
//         <input type="checkbox" checked={todo.completed} onChange={toggleComplete} />
//         {isEditing ? (
//           <form onSubmit={handleEditSubmit} className="flex-1">
//             <input
//               type="text"
//               className="w-full border rounded px-2 py-1"
//               value={editedTitle}
//               onChange={(e) => setEditedTitle(e.target.value)}
//               autoFocus
//             />
//           </form>
//         ) : (
//           <span className={todo.completed ? 'line-through text-gray-500' : 'text-gray-800'}>
//             {todo.title}
//           </span>
//         )}
//       </div>
//       <div className="flex items-center gap-2">
//         <select
//           value={todo.priority}
//           onChange={handlePriorityChange}
//           className="border rounded p-1 bg-white text-gray-800 shadow"
//         >
//           {[1, 2, 3, 4, 5].map(p => (
//             <option key={p} value={p}>{priorityLabels[p]}</option>
//           ))}
//         </select>
//         {!isEditing && (
//           <>
//             <button
//               onClick={handleEdit}
//               className="text-blue-600 hover:text-blue-800 transition"
//             >
//               Sửa
//             </button>
//             <button
//               onClick={() => onDelete(todo.id)}
//               className="text-red-600 hover:text-red-800 transition"
//             >
//               Xóa
//             </button>
//           </>
//         )}
//       </div>
//     </li>
//   );
// }






// // File: src/components/TodoItem.jsx
// import { useState } from 'react';

// export function TodoItem({ todo, onUpdate, isSelected, onSelect }) {
//   const [editedTitle, setEditedTitle] = useState(todo.title);

//   const toggleComplete = () => {
//     onUpdate({ ...todo, completed: !todo.completed });
//   };

//   const handlePriorityChange = (e) => {
//     onUpdate({ ...todo, priority: parseInt(e.target.value) });
//   };

//   const priorityLabels = {
//     1: 'Rất thấp',
//     2: 'Thấp',
//     3: 'Trung bình',
//     4: 'Cao',
//     5: 'Rất cao',
//   };

//   return (
//     <li className="flex justify-between items-center p-4 border rounded bg-white shadow w-full">
//       <div className="flex items-center gap-3 flex-1">
//         <input
//           type="checkbox"
//           checked={isSelected}
//           onChange={() => onSelect(todo.id)}
//         />
//         <span className={todo.completed ? 'line-through text-gray-500' : 'text-gray-800'}>
//           {todo.title}
//         </span>
//       </div>
//       <div className="flex items-center gap-2">
//         <button
//           onClick={toggleComplete}
//           className={`px-2 py-1 rounded text-white ${todo.completed ? 'bg-yellow-500' : 'bg-green-600'} hover:opacity-90`}
//         >
//           {todo.completed ? 'Chưa hoàn thành' : 'Hoàn thành'}
//         </button>
//         <select
//           value={todo.priority}
//           onChange={handlePriorityChange}
//           className="border rounded p-1 bg-white text-gray-800 shadow"
//         >
//           {[1, 2, 3, 4, 5].map(p => (
//             <option key={p} value={p}>{priorityLabels[p]}</option>
//           ))}
//         </select>
//       </div>
//     </li>
//   );
// }






// // File: src/components/TodoItem.jsx
// import { useState } from 'react';

// export function TodoItem({ todo, onUpdate, isSelected, onSelect }) {
//   const [editedTitle, setEditedTitle] = useState(todo.title);

//   const toggleComplete = () => {
//     onUpdate({ ...todo, completed: !todo.completed });
//   };

//   const handlePriorityChange = (e) => {
//     onUpdate({ ...todo, priority: parseInt(e.target.value) });
//   };

//   const priorityLabels = {
//     1: 'Rất thấp',
//     2: 'Thấp',
//     3: 'Trung bình',
//     4: 'Cao',
//     5: 'Rất cao',
//   };

//   return (
//     <li className="flex justify-between items-center p-4 border rounded bg-white shadow w-full">
//       <div className="flex items-center gap-3 flex-1">
//         <input
//           type="checkbox"
//           checked={isSelected}
//           onChange={() => onSelect(todo.id)}
//         />
//         {/* <span className={todo.completed ? 'line-through text-gray-500' : 'text-gray-800'}> */}
//          <span className={todo.completed ? 'line-through text-gray-500 font-medium' : 'text-gray-800 font-medium'} style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
//           {todo.title}
//         </span>
//       </div>
//       <div className="flex items-center gap-2">
//         <button
//           onClick={toggleComplete}
//           className="px-2 py-1 rounded bg-blue-600 text-white hover:opacity-90"
//         >
//           Đổi trạng thái
//         </button>
//         <select
//           value={todo.priority}
//           onChange={handlePriorityChange}
//           className="border rounded p-1 bg-white text-gray-800 shadow"
//         >
//           {[1, 2, 3, 4, 5].map(p => (
//             <option key={p} value={p}>{priorityLabels[p]}</option>
//           ))}
//         </select>
//       </div>
//     </li>
//   );
// }



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
