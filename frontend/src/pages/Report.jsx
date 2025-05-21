// src/pages/Report.jsx
import React, { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import { getStockRecords } from '../services/api';

export default function Report() {
  const [stockRecords, setStockRecords] = useState([]);

  useEffect(() => {
    fetchStockRecords();
  }, []);

  const fetchStockRecords = async () => {
    try {
      const res = await getStockRecords();
      setStockRecords(res.data);
    } catch {
      alert('Failed to load stock records for report');
    }
  };

  // Simple aggregation: total quantity per product
  const productTotals = stockRecords.reduce((acc, { product, quantity }) => {
    acc[product] = (acc[product] || 0) + quantity;
    return acc;
  }, {});

  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 p-6">
        <h1 className="text-2xl font-bold mb-4">Stock Report</h1>
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 p-2">Product</th>
              <th className="border border-gray-300 p-2">Total Quantity</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(productTotals).map(([product, total]) => (
              <tr key={product} className="hover:bg-gray-100">
                <td className="border border-gray-300 p-2">{product}</td>
                <td className="border border-gray-300 p-2">{total}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </div>
  );
}
