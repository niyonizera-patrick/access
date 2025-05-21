// src/pages/Suppliers.jsx
import React, { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import { getSuppliers, createSupplier, updateSupplier, deleteSupplier } from '../services/api';

export default function Suppliers() {
  const [suppliers, setSuppliers] = useState([]);
  const [newSupplier, setNewSupplier] = useState({ name: '', contact: '' });
  const [editingId, setEditingId] = useState(null);
  const [editingName, setEditingName] = useState('');
  const [editingContact, setEditingContact] = useState('');

  useEffect(() => {
    fetchSuppliers();
  }, []);

  const fetchSuppliers = async () => {
    try {
      const res = await getSuppliers();
      setSuppliers(res.data);
    } catch (err) {
      alert('Error fetching suppliers');
    }
  };

  const handleAdd = async () => {
    if (!newSupplier.name || !newSupplier.contact) return alert('Fill all fields');
    try {
      await createSupplier(newSupplier);
      setNewSupplier({ name: '', contact: '' });
      fetchSuppliers();
    } catch {
      alert('Error adding supplier');
    }
  };

  const handleUpdate = async (id) => {
    if (!editingName || !editingContact) return alert('Fill all fields');
    try {
      await updateSupplier(id, { name: editingName, contact: editingContact });
      setEditingId(null);
      fetchSuppliers();
    } catch {
      alert('Error updating supplier');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this supplier?')) return;
    try {
      await deleteSupplier(id);
      fetchSuppliers();
    } catch {
      alert('Error deleting supplier');
    }
  };

  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 p-6">
        <h1 className="text-2xl font-bold mb-4">Suppliers</h1>

        <div className="mb-6">
          <input
            type="text"
            placeholder="Name"
            value={newSupplier.name}
            onChange={(e) => setNewSupplier({ ...newSupplier, name: e.target.value })}
            className="border p-2 mr-2 rounded"
          />
          <input
            type="text"
            placeholder="Contact"
            value={newSupplier.contact}
            onChange={(e) => setNewSupplier({ ...newSupplier, contact: e.target.value })}
            className="border p-2 mr-2 rounded"
          />
          <button onClick={handleAdd} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            Add Supplier
          </button>
        </div>

        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 p-2">Name</th>
              <th className="border border-gray-300 p-2">Contact</th>
              <th className="border border-gray-300 p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {suppliers.map(({ _id, name, contact }) => (
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
                    <input
                      value={editingContact}
                      onChange={(e) => setEditingContact(e.target.value)}
                      className="border p-1 rounded"
                    />
                  ) : (
                    contact
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
                          setEditingContact(contact);
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
