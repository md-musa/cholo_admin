import React from "react";
import { Link, useLocation } from "react-router-dom";
import { FaRoute, FaCalendarAlt, FaTachometerAlt } from "react-icons/fa";

function Sidebar() {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

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
        <ul className="menu p-4 w-80 min-h-full bg-primary-1000 text-black space-y-2">
          <li>
            <Link
              to="/dashboard"
              className={`flex items-center gap-2 p-3 rounded-md hover:bg-primary-900 ${
                isActive("/dashboard") ? "bg-primary-900 font-bold" : ""
              }`}
            >
              <FaTachometerAlt /> Dashboard
            </Link>
          </li>
          <li>
            <Link
              to="/route"
              className={`flex items-center gap-2 p-3 rounded-md hover:bg-primary-900 ${
                isActive("/routes") ? "bg-primary-900 font-bold" : ""
              }`}
            >
              <FaRoute /> Routes
            </Link>
          </li>
          <li>
            <Link
              to="/add-schedule"
              className={`flex items-center gap-2 p-3 rounded-md hover:bg-primary-900 ${
                isActive("/add-schedule") ? "bg-primary-900 font-bold" : ""
              }`}
            >
              <FaCalendarAlt /> Add Schedule
            </Link>
          </li>
          <li>
            <Link
              to="/view-schedules"
              className={`flex items-center gap-2 p-3 rounded-md hover:bg-primary-900 ${
                isActive("/view-schedules") ? "bg-primary-900 font-bold" : ""
              }`}
            >
              <FaCalendarAlt /> View Schedules
            </Link>
          </li>
          <li>
            <Link
              to="/bus"
              className={`flex items-center gap-2 p-3 rounded-md hover:bg-primary-900 ${
                isActive("/bus") ? "bg-primary-900 font-bold" : ""
              }`}
            >
              <FaCalendarAlt /> Buses
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Sidebar;
