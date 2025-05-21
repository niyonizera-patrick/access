import { useEffect, useState } from "react";
import {
  fetchStocks,
  fetchAllOptions,
  addStock,
  updateStock,
  deleteStock,
} from "../api/stockApi";

const Stocks = () => {
  const [stocks, setStocks] = useState([]);
  const [options, setOptions] = useState({ products: [], categories: [], suppliers: [] });
  const [form, setForm] = useState({ product: "", category: "", supplier: "", quantity: 0 });
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchStocks().then(setStocks);
    fetchAllOptions().then(setOptions);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editId) {
      await updateStock(editId, form);
      setEditId(null);
    } else {
      await addStock(form);
    }
    setForm({ product: "", category: "", supplier: "", quantity: 0 });
    fetchStocks().then(setStocks);
  };

  const handleEdit = (stock) => {
    setForm({
      product: stock.product._id,
      category: stock.category._id,
      supplier: stock.supplier._id,
      quantity: stock.quantity,
    });
    setEditId(stock._id);
  };

  const handleDelete = async (id) => {
    await deleteStock(id);
    fetchStocks().then(setStocks);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">📦 Stock Records</h2>

      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4 mb-4">
        <select value={form.product} onChange={(e) => setForm({ ...form, product: e.target.value })} className="border p-2 rounded" required>
          <option value="">Select Product</option>
          {options.products.map(p => <option key={p._id} value={p._id}>{p.name}</option>)}
        </select>
        <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="border p-2 rounded" required>
          <option value="">Select Category</option>
          {options.categories.map(c => <option key={c._id} value={c._id}>{c.name}</option>)}
        </select>
        <select value={form.supplier} onChange={(e) => setForm({ ...form, supplier: e.target.value })} className="border p-2 rounded" required>
          <option value="">Select Supplier</option>
          {options.suppliers.map(s => <option key={s._id} value={s._id}>{s.name}</option>)}
        </select>
        <input
          type="number"
          placeholder="Quantity"
          value={form.quantity}
          onChange={(e) => setForm({ ...form, quantity: Number(e.target.value) })}
          className="border p-2 rounded"
          required
        />
        <button type="submit" className="col-span-2 bg-blue-600 text-white py-2 rounded">
          {editId ? "Update Stock" : "Add Stock"}
        </button>
      </form>

      <table className="w-full bg-white shadow rounded">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="p-2">Product</th>
            <th className="p-2">Category</th>
            <th className="p-2">Supplier</th>
            <th className="p-2">Quantity</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {stocks.map((s) => (
            <tr key={s._id} className="border-t">
              <td className="p-2">{s.product?.name}</td>
              <td className="p-2">{s.category?.name}</td>
              <td className="p-2">{s.supplier?.name}</td>
              <td className="p-2">{s.quantity}</td>
              <td className="p-2 space-x-2">
                <button onClick={() => handleEdit(s)} className="bg-yellow-400 px-3 py-1 rounded text-white">Edit</button>
                <button onClick={() => handleDelete(s._id)} className="bg-red-500 px-3 py-1 rounded text-white">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Stocks;
