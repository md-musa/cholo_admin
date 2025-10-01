import React from "react";
import { FaUserCircle } from "react-icons/fa";
import { useAuth } from "../contexts/AuthContext";

/**
 * NOTE: This component toggles the sidebar by referencing the input in Sidebar:
 * <label htmlFor="app-drawer"> will toggle the checkbox inside Sidebar
 */
function Navbar() {
  const { userData, logout } = useAuth();

  return (
    <div className="w-full">
      <div className="navbar bg-slate-700 text-white shadow-md px-4">
        {/* Sidebar toggle - visible on small screens only */}
        <div className="flex-none lg:hidden">
          <label htmlFor="app-drawer" className="btn btn-ghost btn-circle text-white" aria-label="open sidebar">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </label>
        </div>

        <div className="flex-1 text-white text-xl font-semibold">Cholo</div>

        <div className="flex items-center gap-4">
          {userData && (
            <div className="hidden sm:flex items-center space-x-3">
              <div className="flex flex-col text-right mr-2">
                <p className="text-sm font-semibold">{userData.name}</p>
                <p className="text-xs capitalize bg-blue-100 text-blue-700 px-2 rounded-md">{userData.role}</p>
              </div>
            </div>
          )}

          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
              <div>{userData ? <FaUserCircle className="text-3xl text-white" /> : <FaUserCircle className="text-3xl text-gray-400" />}</div>
            </div>
            <ul tabIndex={0} className="mt-3 z-[100] p-2 shadow menu menu-sm dropdown-content bg-white text-black rounded-box w-52">
              <li>
                <a className="justify-between">Profile</a>
              </li>
              <li>
                <a>Settings</a>
              </li>
              <li onClick={logout}>
                <a>Logout</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
