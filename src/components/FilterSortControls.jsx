// File: src/components/FilterSortControls.jsx
export function FilterSortControls({ filter, setFilter, sort, setSort }) {
  return (
    // <div className="flex justify-between items-center mb-4">
    //   <div className="flex gap-2">
    //     <button onClick={() => setFilter('all')} className={`px-3 py-1 rounded ${filter === 'all' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>Tất cả</button>
    //     <button onClick={() => setFilter('completed')} className={`px-3 py-1 rounded ${filter === 'completed' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>Đã hoàn thành</button>
    //     <button onClick={() => setFilter('incomplete')} className={`px-3 py-1 rounded ${filter === 'incomplete' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>Chưa hoàn thành</button>
    //   </div>
    //   <div>
    //     <select value={sort} onChange={(e) => setSort(e.target.value)} className="border p-2 rounded">
    //       <option value="priority">Ưu tiên</option>
    //       <option value="created">Ngày tạo</option>
    //     </select>
    //   </div>
    // </div>
    <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
        <div className="flex gap-2">
            <button onClick={() => setFilter('all')} className={`px-3 py-1 rounded ${filter === 'all' ? 'bg-blue-600 text-white' : 'bg-white text-gray-800 border'}`}>Tất cả</button>
            <button onClick={() => setFilter('completed')} className={`px-3 py-1 rounded ${filter === 'completed' ? 'bg-blue-600 text-white' : 'bg-white text-gray-800 border'}`}>Đã hoàn thành</button>
            <button onClick={() => setFilter('incomplete')} className={`px-3 py-1 rounded ${filter === 'incomplete' ? 'bg-blue-600 text-white' : 'bg-white text-gray-800 border'}`}>Chưa hoàn thành</button>
        </div>
    <div>
        <select value={sort} onChange={(e) => setSort(e.target.value)} className="border p-2 rounded shadow bg-white text-black">
            <option value="priority">Sắp xếp theo ưu tiên</option>
            <option value="created">Sắp xếp theo ngày tạo</option>
        </select>
    </div>
    </div>

  );
}