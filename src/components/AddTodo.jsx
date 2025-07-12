// File: src/components/AddTodo.jsx
import { useState } from 'react';

export function AddTodo({ onAdd }) {
  const [title, setTitle] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    onAdd({ title, completed: false, priority: Math.floor(Math.random() * 5) + 1, createdAt: new Date().toISOString() });
    setTitle('');
  };

  return (
    // <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
    //   <input
    //     type="text"
    //     placeholder="Nhập công việc mới..."
    //     className="flex-grow p-2 border rounded"
    //     value={title}
    //     onChange={(e) => setTitle(e.target.value)}
    //   />
    //   <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Thêm</button>
    // </form>
    <form onSubmit={handleSubmit} className="flex gap-2 mb-6">
        <input
          type="text"
          placeholder="Nhập công việc mới..."
          className="flex-grow p-2 border rounded shadow bg-white text-gray-800"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700 transition">Thêm</button>
    </form>

  );
}