// File: src/components/BulkEditModal.jsx
import { useState } from 'react';

export function BulkEditModal({ onConfirm, onCancel }) {
  const [newTitle, setNewTitle] = useState('');
  const [newPriority, setNewPriority] = useState(3);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow max-w-md w-full">
        <h2 className="text-lg font-semibold mb-4">Sửa hàng loạt</h2>
        <div className="mb-4">
          <label className="block mb-1">Tiêu đề mới (bỏ trống nếu không thay đổi):</label>
          <input
            className="w-full border p-2 rounded"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Mức ưu tiên mới:</label>
          <select
            value={newPriority}
            onChange={(e) => setNewPriority(parseInt(e.target.value))}
            className="w-full border p-2 rounded"
          >
            {[1, 2, 3, 4, 5].map(p => (
              <option key={p} value={p}>{p}</option>
            ))}
          </select>
        </div>
        <div className="flex justify-end gap-2">
          <button onClick={onCancel} className="px-4 py-2 bg-gray-300 rounded">Huỷ</button>
          <button onClick={() => onConfirm({ newTitle, newPriority })} className="px-4 py-2 bg-blue-600 text-white rounded">Cập nhật</button>
        </div>
      </div>
    </div>
  );
}