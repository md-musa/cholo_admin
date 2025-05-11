import React, { useState } from "react";

const RoutePage = () => {
  const [routes, setRoutes] = useState([
    { id: 1, name: "Route A", start: "Point A", end: "Point B" },
    { id: 2, name: "Route B", start: "Point C", end: "Point D" },
  ]);

  const [form, setForm] = useState({ name: "", start: "", end: "" });
  const [editId, setEditId] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editId) {
      setRoutes((prev) =>
        prev.map((r) => (r.id === editId ? { ...r, ...form } : r))
      );
      setEditId(null);
    } else {
      const newRoute = { ...form, id: Date.now() };
      setRoutes((prev) => [...prev, newRoute]);
    }
    setForm({ name: "", start: "", end: "" });
  };

  const handleEdit = (route) => {
    setForm({ name: route.name, start: route.start, end: route.end });
    setEditId(route.id);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Manage Routes</h2>

      <form onSubmit={handleSubmit} className="space-y-4 mb-8">
        <input
          type="text"
          placeholder="Route Name"
          className="input input-bordered w-full"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Start Point"
          className="input input-bordered w-full"
          value={form.start}
          onChange={(e) => setForm({ ...form, start: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="End Point"
          className="input input-bordered w-full"
          value={form.end}
          onChange={(e) => setForm({ ...form, end: e.target.value })}
          required
        />
        <button type="submit" className="btn btn-primary">
          {editId ? "Update Route" : "Add Route"}
        </button>
      </form>

      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Start</th>
              <th>End</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {routes.map((route, index) => (
              <tr key={route.id}>
                <td>{index + 1}</td>
                <td>{route.name}</td>
                <td>{route.start}</td>
                <td>{route.end}</td>
                <td>
                  <button
                    onClick={() => handleEdit(route)}
                    className="btn btn-sm btn-outline btn-info"
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
            {routes.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center">
                  No routes found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RoutePage;
