// File: src/App.jsx
import { useEffect, useState } from 'react';
import axios from 'axios';
import { TodoItem } from './components/TodoItem';
import { AddTodo } from './components/AddTodo';
import { FilterSortControls } from './components/FilterSortControls';
import Sortable from 'sortablejs';

const API_URL = 'https://68727a7f76a5723aacd4ddd5.mockapi.io/todos';

export default function App() {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState('all');
  const [sort, setSort] = useState('priority');

  useEffect(() => {
    fetchTodos();
  }, []);

  useEffect(() => {
    Sortable.create(document.getElementById('todo-list'), {
      animation: 150,
      onEnd: function (evt) {
        const updatedTodos = [...todos];
        const [moved] = updatedTodos.splice(evt.oldIndex, 1);
        updatedTodos.splice(evt.newIndex, 0, moved);
        setTodos(updatedTodos);
      },
    });
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

  const filteredTodos = todos
    .filter(todo => (filter === 'all' ? true : filter === 'completed' ? todo.completed : !todo.completed))
    .sort((a, b) => (sort === 'priority' ? b.priority - a.priority : a.createdAt.localeCompare(b.createdAt)));

  return (
    // <div className="p-8 max-w-3xl mx-auto">
    <div className="min-h-screen bg-gray-100 p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Quản lý công việc cá nhân</h1>
      <AddTodo onAdd={addTodo} />
      <FilterSortControls filter={filter} setFilter={setFilter} sort={sort} setSort={setSort} />
      <ul id="todo-list" className="mt-4 space-y-2">
        {filteredTodos.map((todo, index) => (
          <TodoItem key={todo.id} todo={todo} onDelete={deleteTodo} onUpdate={updateTodo} />
        ))}
      </ul>
    </div>
  );
}