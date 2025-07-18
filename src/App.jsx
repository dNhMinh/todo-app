// File: src/App.jsx
import { useEffect, useState } from 'react';
import axios from 'axios';
import { TodoItem } from './components/TodoItem';
import { AddTodo } from './components/AddTodo';
import { FilterSortControls } from './components/FilterSortControls';
import Sortable from 'sortablejs';
import { BulkEditModal } from './components/BulkEditModal';
import { ConfirmDialog } from './components/ConfirmDialog';

const API_URL = 'https://68727a7f76a5723aacd4ddd5.mockapi.io/todos';

export default function App() {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState('all');
  const [sort, setSort] = useState('priority');
  const [selectedIds, setSelectedIds] = useState([]);
  const [showConfirm, setShowConfirm] = useState(false);
  const [showBulkEdit, setShowBulkEdit] = useState(false);

  useEffect(() => {
    fetchTodos();
  }, []);

  useEffect(() => {
    if (todos.length > 0) {
      Sortable.create(document.getElementById('todo-list'), {
        animation: 150,
        onEnd: function (evt) {
          const updatedTodos = [...todos];
          const [moved] = updatedTodos.splice(evt.oldIndex, 1);
          updatedTodos.splice(evt.newIndex, 0, moved);
          setTodos(updatedTodos);
        },
      });
    }
  }, [todos]);

  const fetchTodos = async () => {
    try {
      const response = await axios.get(API_URL);
      setTodos(response.data);
    } catch (error) {
      console.error('Fetch Error:', error);
    }
  };

  const addTodo = async (newTodo) => {
    try {
      const res = await axios.post(API_URL, newTodo);
      setTodos([...todos, res.data]);
    } catch (error) {
      console.error('Add Error:', error);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setTodos(todos.filter(todo => todo.id !== id));
    } catch (error) {
      console.error('Delete Error:', error);
    }
  };

  const updateTodo = async (updatedTodo) => {
    try {
      await axios.put(`${API_URL}/${updatedTodo.id}`, updatedTodo);
      setTodos(todos.map(todo => (todo.id === updatedTodo.id ? updatedTodo : todo)));
    } catch (error) {
      console.error('Update Error:', error);
    }
  };

  const toggleSelect = (id) => {
    setSelectedIds(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    if (selectedIds.length === filteredTodos.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filteredTodos.map(todo => todo.id));
    }
  };

  const deleteSelected = async () => {
    try {
      await Promise.all(selectedIds.map(id => axios.delete(`${API_URL}/${id}`)));
      setTodos(todos.filter(todo => !selectedIds.includes(todo.id)));
      setSelectedIds([]);
    } catch (error) {
      console.error('Bulk Delete Error:', error);
    }
  };

  const toggleCompleteSelected = async () => {
    try {
      const updates = await Promise.all(selectedIds.map(async id => {
        const todo = todos.find(t => t.id === id);
        const updated = await axios.put(`${API_URL}/${id}`, { ...todo, completed: !todo.completed });
        return updated.data;
      }));
      setTodos(prev => prev.map(todo => updates.find(u => u.id === todo.id) || todo));
      setSelectedIds([]);
    } catch (error) {
      console.error('Bulk Toggle Error:', error);
    }
  };

  const filteredTodos = todos
    .filter(todo => (filter === 'all' ? true : filter === 'completed' ? todo.completed : !todo.completed))
    .sort((a, b) => (sort === 'priority' ? b.priority - a.priority : a.createdAt.localeCompare(b.createdAt)));

  return (
    <div className="min-h-screen bg-gray-100 p-6 max-w-full mx-auto">
      <h1 className="text-3xl text-center font-bold mb-4">Quản lý công việc cá nhân</h1>
      <AddTodo onAdd={addTodo} />
      <FilterSortControls filter={filter} setFilter={setFilter} sort={sort} setSort={setSort} />

      <div className="text-black flex justify-between items-center mb-3">
        <div className="flex items-center gap-2">
          <input type="checkbox" onChange={toggleSelectAll} checked={selectedIds.length === filteredTodos.length && filteredTodos.length > 0} />
          <span>Chọn tất cả</span>
        </div>

        {selectedIds.length > 0 && (
          <div className="flex gap-3">
            <button onClick={() => setShowConfirm(true)} className="bg-red-600 text-white px-3 py-1 rounded">Xoá</button>
            <button onClick={() => toggleCompleteSelected()} className="bg-yellow-600 text-white px-3 py-1 rounded">Đổi trạng thái</button>
            <button onClick={() => setShowBulkEdit(true)} className="bg-blue-600 text-white px-3 py-1 rounded">Sửa</button>
          </div>
        )}
      </div>

      <ul id="todo-list" className="mt-4 space-y-2">
        {filteredTodos.map((todo, index) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onUpdate={updateTodo}
            isSelected={selectedIds.includes(todo.id)}
            onSelect={toggleSelect}
          />
        ))}
      </ul>

      {showConfirm && (
        <ConfirmDialog
          message="Bạn có chắc chắn muốn xoá các công việc đã chọn?"
          onCancel={() => setShowConfirm(false)}
          onConfirm={() => {
            deleteSelected();
            setShowConfirm(false);
          }}
        />
      )}

      {showBulkEdit && (
        <BulkEditModal
          onCancel={() => setShowBulkEdit(false)}
          onConfirm={({ newTitle, newPriority }) => {
            selectedIds.forEach(id => {
              const todo = todos.find(t => t.id === id);
              updateTodo({ ...todo, title: newTitle || todo.title, priority: newPriority });
            });
            setShowBulkEdit(false);
          }}
        />
      )}
    </div>
  );
}



