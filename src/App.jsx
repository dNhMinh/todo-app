// File: src/App.jsx
import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { ReactSortable } from 'react-sortablejs';
import { TodoItem } from './components/TodoItem';
import { AddTodo } from './components/AddTodo';
import { FilterSortControls } from './components/FilterSortControls';
import { BulkEditModal } from './components/BulkEditModal';
import { ConfirmDialog } from './components/ConfirmDialog';

const API_URL = 'https://68727a7f76a5723aacd4ddd5.mockapi.io/todos';

export default function App() {
  const [incompleteTodos, setIncompleteTodos] = useState([]);
  const [completedTodos, setCompletedTodos] = useState([]);
  const [filter, setFilter] = useState('all');
  const [sort, setSort] = useState('priority');
  const [selectedIds, setSelectedIds] = useState([]);
  const [showConfirm, setShowConfirm] = useState(false);
  const [showBulkEdit, setShowBulkEdit] = useState(false);
  const todosRef = useRef([]);

  // sắp xếp
  const sortList = (list) =>
    [...list].sort((a, b) =>
      sort === 'priority' ? b.priority - a.priority : a.createdAt.localeCompare(b.createdAt)
    );

  // fetch on mount
  useEffect(() => { fetchTodos(); }, []);

  // dnah sách mới nhất trong ref
  useEffect(() => { todosRef.current = [...incompleteTodos, ...completedTodos]; },
    [incompleteTodos, completedTodos]);

  // sắp xếp lại dnah sách khi thay đổi sắp xếp
  useEffect(() => {
    setIncompleteTodos((prev) => sortList(prev));
    setCompletedTodos((prev) => sortList(prev));
  }, [sort]);

  const fetchTodos = async () => {
    try {
      const { data } = await axios.get(API_URL);
      setIncompleteTodos(sortList(data.filter((t) => !t.completed)));
      setCompletedTodos(sortList(data.filter((t) => t.completed)));
    } catch (error) {
      console.error({ feature: 'Fetch Todos', timestamp: new Date().toISOString(), error: error.toString(), stack: error.stack });
    }
  };

  const addTodo = async (newTodo) => {
    try {
      const { data } = await axios.post(API_URL, newTodo);
      setIncompleteTodos((prev) => sortList([data, ...prev]));
    } catch (error) {
      console.error({ feature: 'Add Todo', timestamp: new Date().toISOString(), error: error.toString(), stack: error.stack });
    }
  };

  // *Trung tâm*: cập nhật 1 task (cả API + di chuyển list)
  const updateTodo = async (updatedTodo) => {
    try {
      await axios.put(`${API_URL}/${updatedTodo.id}`, updatedTodo);
      if (updatedTodo.completed) {
        setCompletedTodos((prev) => sortList([updatedTodo, ...prev.filter((t) => t.id !== updatedTodo.id)]));
        setIncompleteTodos((prev) => prev.filter((t) => t.id !== updatedTodo.id));
      } else {
        setIncompleteTodos((prev) => sortList([updatedTodo, ...prev.filter((t) => t.id !== updatedTodo.id)]));
        setCompletedTodos((prev) => prev.filter((t) => t.id !== updatedTodo.id));
      }
    } catch (error) {
      console.error({ feature: 'Update Todo', timestamp: new Date().toISOString(), error: error.toString(), stack: error.stack });
    }
  };

  const deleteTodo = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setIncompleteTodos((prev) => prev.filter((t) => t.id !== id));
      setCompletedTodos((prev) => prev.filter((t) => t.id !== id));
      setSelectedIds((prev) => prev.filter((i) => i !== id));
    } catch (error) {
      console.error({ feature: 'Delete Todo', timestamp: new Date().toISOString(), error: error.toString(), stack: error.stack });
    }
  };

  const toggleSelect = (id) =>
    setSelectedIds((prev) => (prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]));

  const visibleIncomplete = filter === 'all' || filter === 'incomplete' ? incompleteTodos : [];
  const visibleCompleted = filter === 'all' || filter === 'completed' ? completedTodos : [];
  const visibleAll = [...visibleIncomplete, ...visibleCompleted];

  const toggleSelectAll = () => {
    if (selectedIds.length === visibleAll.length) setSelectedIds([]);
    else setSelectedIds(visibleAll.map((t) => t.id));
  };

  const deleteSelected = async () => {
    try {
      await Promise.all(selectedIds.map((id) => axios.delete(`${API_URL}/${id}`)));
      setIncompleteTodos((prev) => prev.filter((t) => !selectedIds.includes(t.id)));
      setCompletedTodos((prev) => prev.filter((t) => !selectedIds.includes(t.id)));
      setSelectedIds([]);
    } catch (error) {
      console.error({ feature: 'Bulk Delete', timestamp: new Date().toISOString(), error: error.toString(), stack: error.stack });
    }
  };

  const toggleCompleteSelected = async () => {
    try {
      let newIncomplete = [...incompleteTodos];
      let newCompleted = [...completedTodos];

      const promises = selectedIds.map(async (id) => {
        const inIncomplete = newIncomplete.find((t) => t.id === id);
        if (inIncomplete) {
          const updated = { ...inIncomplete, completed: true };
          newIncomplete = newIncomplete.filter((t) => t.id !== id);
          newCompleted = [updated, ...newCompleted];
          await axios.put(`${API_URL}/${id}`, updated);
        } else {
          const inCompleted = newCompleted.find((t) => t.id === id);
          if (inCompleted) {
            const updated = { ...inCompleted, completed: false };
            newCompleted = newCompleted.filter((t) => t.id !== id);
            newIncomplete = [updated, ...newIncomplete];
            await axios.put(`${API_URL}/${id}`, updated);
          }
        }
      });

      await Promise.all(promises);
      setIncompleteTodos(sortList(newIncomplete));
      setCompletedTodos(sortList(newCompleted));
      setSelectedIds([]);
    } catch (error) {
      console.error({ feature: 'Bulk Toggle', timestamp: new Date().toISOString(), error: error.toString(), stack: error.stack });
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="w-full bg-white rounded-lg shadow p-6">
        <h1 className="text-3xl font-bold text-center mb-6">Quản lý công việc cá nhân</h1>

        <div className="mb-4">
          <AddTodo onAdd={addTodo} />
        </div>

        <div className="mb-6">
          <FilterSortControls filter={filter} setFilter={setFilter} sort={sort} setSort={setSort} />
        </div>

        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              onChange={toggleSelectAll}
              checked={selectedIds.length === visibleAll.length && visibleAll.length > 0}
              className="form-checkbox h-5 w-5 text-blue-600 accent-blue-600"
            />
            <span className="font-medium text-blue-600">Chọn tất cả</span>
          </div>

          {selectedIds.length > 0 && (
            <div className="flex gap-2">
              <button onClick={() => setShowConfirm(true)} className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded">Xoá đã chọn</button>
              <button onClick={toggleCompleteSelected} className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded">Đổi trạng thái</button>
              <button onClick={() => setShowBulkEdit(true)} className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">Sửa</button>
            </div>
          )}
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Chưa hoàn thành */}
          <div>
            <h2 className="font-semibold mb-2">Chưa hoàn thành</h2>
            <ReactSortable
              list={incompleteTodos}
              setList={(newList) => setIncompleteTodos(newList)}   // giữ thứ tự user kéo
              group="shared"
              animation={150}
              className="space-y-3"
              swapThreshold={0.65}
              onAdd={(evt) => {
                const id = evt.item.dataset.id;
                const moved = todosRef.current.find((t) => t.id === id);
                if (moved) updateTodo({ ...moved, completed: false }); // chỉ gọi 1 chỗ
              }}
            >
              {visibleIncomplete.map((todo) => (
                <TodoItem
                  key={`${todo.id}-${todo.completed ? 'done' : 'todo'}`}
                  todo={todo}
                  onUpdate={updateTodo}
                  isSelected={selectedIds.includes(todo.id)}
                  onSelect={toggleSelect}
                />
              ))}
            </ReactSortable>
          </div>

          {/* Đã hoàn thành */}
          <div>
            <h2 className="font-semibold mb-2">Đã hoàn thành</h2>
            <ReactSortable
              list={completedTodos}
              setList={(newList) => setCompletedTodos(newList)}
              group="shared"
              animation={150}
              className="space-y-3"
              swapThreshold={0.65}
              onAdd={(evt) => {
                const id = evt.item.dataset.id;
                const moved = todosRef.current.find((t) => t.id === id);
                if (moved) updateTodo({ ...moved, completed: true });
              }}
            >
              {visibleCompleted.map((todo) => (
                <TodoItem
                  key={`${todo.id}-${todo.completed ? 'done' : 'todo'}`}
                  todo={todo}
                  onUpdate={updateTodo}
                  isSelected={selectedIds.includes(todo.id)}
                  onSelect={toggleSelect}
                />
              ))}
            </ReactSortable>
          </div>
        </div>
      </div>

      {showConfirm && (
        <ConfirmDialog
          message="Bạn có chắc chắn muốn xoá các công việc đã chọn?"
          onCancel={() => setShowConfirm(false)}
          onConfirm={() => { deleteSelected(); setShowConfirm(false); }}
        />
      )}

      {showBulkEdit && (
        <BulkEditModal
          onCancel={() => setShowBulkEdit(false)}
          onConfirm={({ newTitle, newPriority }) => {
            selectedIds.forEach((id) => {
              const all = [...incompleteTodos, ...completedTodos];
              const t = all.find((x) => x.id === id);
              if (t) updateTodo({ ...t, title: newTitle || t.title, priority: newPriority });
            });
            setShowBulkEdit(false);
          }}
        />
      )}
    </div>
  );
}
