// src/pages/Categories.jsx
import React, { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import { getCategories, createCategory, updateCategory, deleteCategory } from '../services/api';

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState({ name: '' });
  const [editingId, setEditingId] = useState(null);
  const [editingName, setEditingName] = useState('');

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await getCategories();
      setCategories(res.data);
    } catch {
      alert('Failed to fetch categories');
    }
  };

  const handleAdd = async () => {
    if (!newCategory.name) return alert('Category name required');
    try {
      await createCategory(newCategory);
      setNewCategory({ name: '' });
      fetchCategories();
    } catch {
      alert('Failed to add category');
    }
  };

  const handleUpdate = async (id) => {
    if (!editingName) return alert('Category name required');
    try {
      await updateCategory(id, { name: editingName });
      setEditingId(null);
      fetchCategories();
    } catch {
      alert('Failed to update category');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this category?')) return;
    try {
      await deleteCategory(id);
      fetchCategories();
    } catch {
      alert('Failed to delete category');
    }
  };

  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 p-6">
        <h1 className="text-2xl font-bold mb-4">Categories</h1>

        <div className="mb-6">
          <input
            type="text"
            placeholder="Category name"
            value={newCategory.name}
            onChange={(e) => setNewCategory({ name: e.target.value })}
            className="border p-2 mr-2 rounded"
          />
          <button onClick={handleAdd} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            Add Category
          </button>
        </div>

        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 p-2">Name</th>
              <th className="border border-gray-300 p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.map(({ _id, name }) => (
              <tr key={_id} className="hover:bg-gray-100">
                <td className="border border-gray-300 p-2">
                  {editingId === _id ? (
                    <input
                      value={editingName}
                      onChange={(e) => setEditingName(e.target.value)}
                      className="border p-1 rounded"
                    />
                  ) : (
                    name
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
                          setEditingName(name);
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
