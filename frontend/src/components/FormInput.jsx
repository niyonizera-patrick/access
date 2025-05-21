// src/components/FormInput.jsx
import React from 'react';

export default function FormInput({ label, type="text", value, onChange }) {
  return (
    <div className="mb-4">
      {/* Label for the input */}
      <label className="block text-gray-700 mb-1">{label}</label>
      {/* The input itself */}
      <input
        type={type}
        value={value}
        onChange={onChange}
        className="border border-gray-300 p-2 rounded w-full"
      />
    </div>
  );
}
