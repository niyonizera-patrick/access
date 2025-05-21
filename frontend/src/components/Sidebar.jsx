// src/components/Sidebar.jsx
import { NavLink } from 'react-router-dom';

export default function Sidebar() {
  const activeClass = "bg-blue-600 text-white";
  const baseClass = "block py-2 px-4 rounded hover:bg-blue-400";

  return (
    <div className="w-48 h-screen bg-gray-800 text-white p-4">
      <nav className="flex flex-col space-y-2">
        <NavLink to="/dashboard" className={({ isActive }) => isActive ? activeClass : baseClass}>Dashboard</NavLink>
        <NavLink to="/suppliers" className={({ isActive }) => isActive ? activeClass : baseClass}>Suppliers</NavLink>
        <NavLink to="/categories" className={({ isActive }) => isActive ? activeClass : baseClass}>Categories</NavLink>
        <NavLink to="/stockrecords" className={({ isActive }) => isActive ? activeClass : baseClass}>Stock Records</NavLink>
        <NavLink to="/report" className={({ isActive }) => isActive ? activeClass : baseClass}>Report</NavLink>
      </nav>
    </div>
  );
}
