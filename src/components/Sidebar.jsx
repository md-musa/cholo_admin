import React from "react";
import { Link, useLocation } from "react-router-dom";
import { FaRoute, FaCalendarPlus, FaCalendarCheck, FaBus, FaTachometerAlt, FaInfo } from "react-icons/fa";
import { useAuth } from "../contexts/AuthContext";

function Sidebar() {
  const location = useLocation();
  const { userData } = useAuth();

  const isActive = (path) => location.pathname === path;

  const navItems = [
    { label: "Dashboard", to: "/dashboard", icon: <FaTachometerAlt /> },
    { label: "Routes", to: "/route", icon: <FaRoute /> },
    { label: "Schedule", to: "/add-schedule", icon: <FaCalendarPlus /> },
    // { label: "View Schedules", to: "/view-schedules", icon: <FaCalendarCheck /> },
    { label: "Buses", to: "/bus", icon: <FaBus /> },
    { label: "Logs", to: "/logs", icon: <FaInfo /> },
  ];

  return (
    <div className="drawer lg:drawer-open bg-gray-50">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />

      <div className="drawer-content">
        {/* Page content */}
        <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden m-4">
          Open Sidebar
        </label>
      </div>

      <div className="drawer-side">
        <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>

        <ul className="menu p-5 w-72 min-h-full bg-slate-700 text-white space-y-2">
          <h2 className="text-xl font-semibold mb-4 text-gray-100">Admin Menu</h2>

          {navItems.map((item) => (
            <li key={item.to}>
              <Link
                to={item.to}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                  isActive(item.to)
                    ? "bg-gray-800 text-white font-bold"
                    : "hover:bg-gray-900 hover:text-white text-gray-300"
                }`}
              >
                <span className="text-lg">{item.icon}</span>
                <span className="text-md">{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Sidebar;
