// src/pages/StockRecords.jsx
import React, { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import { getStockRecords, createStockRecord, updateStockRecord, deleteStockRecord } from '../services/api';

export default function StockRecords() {
  const [stockRecords, setStockRecords] = useState([]);
  const [newRecord, setNewRecord] = useState({ product: '', quantity: 0, supplier: '', category: '' });
  const [editingId, setEditingId] = useState(null);
  const [editingRecord, setEditingRecord] = useState({ product: '', quantity: 0, supplier: '', category: '' });

  useEffect(() => {
    fetchStockRecords();
  }, []);

  const fetchStockRecords = async () => {
    try {
      const res = await getStockRecords();
      setStockRecords(res.data);
    } catch {
      alert('Failed to fetch stock records');
    }
  };

  const handleAdd = async () => {
    if (!newRecord.product || !newRecord.supplier || !newRecord.category || newRecord.quantity <= 0) {
      return alert('All fields are required and quantity must be positive');
    }
    try {
      await createStockRecord(newRecord);
      setNewRecord({ product: '', quantity: 0, supplier: '', category: '' });
      fetchStockRecords();
    } catch {
      alert('Failed to add stock record');
    }
  };

  const handleUpdate = async (id) => {
    if (!editingRecord.product || !editingRecord.supplier || !editingRecord.category || editingRecord.quantity <= 0) {
      return alert('All fields are required and quantity must be positive');
    }
    try {
      await updateStockRecord(id, editingRecord);
      setEditingId(null);
      fetchStockRecords();
    } catch {
      alert('Failed to update stock record');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this stock record?')) return;
    try {
      await deleteStockRecord(id);
      fetchStockRecords();
    } catch {
      alert('Failed to delete stock record');
    }
  };

  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 p-6">
        <h1 className="text-2xl font-bold mb-4">Stock Records</h1>

        <div className="mb-6 grid grid-cols-5 gap-2 items-center">
          <input
            type="text"
            placeholder="Product"
            value={newRecord.product}
            onChange={(e) => setNewRecord({ ...newRecord, product: e.target.value })}
            className="border p-2 rounded"
          />
          <input
            type="number"
            placeholder="Quantity"
            value={newRecord.quantity}
            onChange={(e) => setNewRecord({ ...newRecord, quantity: parseInt(e.target.value) || 0 })}
            className="border p-2 rounded"
          />
          <input
            type="text"
            placeholder="Supplier"
            value={newRecord.supplier}
            onChange={(e) => setNewRecord({ ...newRecord, supplier: e.target.value })}
            className="border p-2 rounded"
          />
          <input
            type="text"
            placeholder="Category"
            value={newRecord.category}
            onChange={(e) => setNewRecord({ ...newRecord, category: e.target.value })}
            className="border p-2 rounded"
          />
          <button
            onClick={handleAdd}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Add
          </button>
        </div>

        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 p-2">Product</th>
              <th className="border border-gray-300 p-2">Quantity</th>
              <th className="border border-gray-300 p-2">Supplier</th>
              <th className="border border-gray-300 p-2">Category</th>
              <th className="border border-gray-300 p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {stockRecords.map(({ _id, product, quantity, supplier, category }) => (
              <tr key={_id} className="hover:bg-gray-100">
                <td className="border border-gray-300 p-2">
                  {editingId === _id ? (
                    <input
                      value={editingRecord.product}
                      onChange={(e) => setEditingRecord({ ...editingRecord, product: e.target.value })}
                      className="border p-1 rounded"
                    />
                  ) : (
                    product
                  )}
                </td>
                <td className="border border-gray-300 p-2">
                  {editingId === _id ? (
                    <input
                      type="number"
                      value={editingRecord.quantity}
                      onChange={(e) => setEditingRecord({ ...editingRecord, quantity: parseInt(e.target.value) || 0 })}
                      className="border p-1 rounded"
                    />
                  ) : (
                    quantity
                  )}
                </td>
                <td className="border border-gray-300 p-2">
                  {editingId === _id ? (
                    <input
                      value={editingRecord.supplier}
                      onChange={(e) => setEditingRecord({ ...editingRecord, supplier: e.target.value })}
                      className="border p-1 rounded"
                    />
                  ) : (
                    supplier
                  )}
                </td>
                <td className="border border-gray-300 p-2">
                  {editingId === _id ? (
                    <input
                      value={editingRecord.category}
                      onChange={(e) => setEditingRecord({ ...editingRecord, category: e.target.value })}
                      className="border p-1 rounded"
                    />
                  ) : (
                    category
                  )}
                </td>
                <td className="border border-gray-300 p-2">
                  {editingId === _id ? (
                    <>
                      <button onClick={() => handleUpdate(_id)} className="mr-2 text-green-600">Save</button>
                      <button onClick={() => setEditingId(null)} className="text-red-600">Cancel</button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => {
                          setEditingId(_id);
                          setEditingRecord({ product, quantity, supplier, category });
                        }}
                        className="mr-2 text-blue-600"
                      >
                        Edit
                      </button>
                      <button onClick={() => handleDelete(_id)} className="text-red-600">Delete</button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </div>
  );
}
