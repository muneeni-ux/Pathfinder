import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import AdminLoader from "./components/AdminLoader";

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

function ManageThemes() {
  const [loading, setLoading] = useState(true);
  const [themes, setThemes] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({
    day: "MON",
    theme: "",
    icon: "",
    order: 0,
  });

  const token = localStorage.getItem("adminToken");

  const fetchThemes = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${SERVER_URL}/api/honour-themes`);
      if (!res.ok) throw new Error("Failed to load themes");
      const data = await res.json();
      setThemes(data);
    } catch (err) {
      toast.error(err.message || "Could not load themes");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchThemes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const openNew = () => {
    setEditing(null);
    setForm({ day: "MON", theme: "", icon: "", order: 0 });
    setShowForm(true);
  };

  const openEdit = (t) => {
    setEditing(t);
    setForm({ day: t.day, theme: t.theme, icon: t.icon, order: t.order || 0 });
    setShowForm(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = editing
        ? `${SERVER_URL}/api/honour-themes/${editing._id}`
        : `${SERVER_URL}/api/honour-themes`;

      const method = editing ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? `Bearer ${token}` : undefined,
        },
        body: JSON.stringify({
          day: form.day,
          theme: form.theme,
          icon: form.icon,
          order: Number(form.order),
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to save theme");

      toast.success(editing ? "Theme updated" : "Theme created");
      setShowForm(false);
      fetchThemes();
    } catch (err) {
      toast.error(err.message || "Failed to save theme");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this theme?")) return;
    try {
      const res = await fetch(`${SERVER_URL}/api/honour-themes/${id}`, {
        method: "DELETE",
        headers: { Authorization: token ? `Bearer ${token}` : undefined },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Delete failed");
      toast.success("Theme deleted");
      fetchThemes();
    } catch (err) {
      toast.error(err.message || "Failed to delete theme");
    }
  };

  if (loading) return <AdminLoader message="Loading themes..." />;

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold">Manage Honor Themes</h2>
        <button
          onClick={openNew}
          className="px-4 py-2 bg-green-600 text-white rounded"
        >
          New Theme
        </button>
      </div>

      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="mb-6 p-4 bg-white rounded shadow"
        >
          <div className="grid grid-cols-2 gap-4">
            <label className="flex flex-col">
              Day
              <select
                value={form.day}
                onChange={(e) => setForm({ ...form, day: e.target.value })}
                className="mt-1 p-2 border rounded"
              >
                {["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"].map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>
            </label>
            <label className="flex flex-col">
              Theme
              <input
                value={form.theme}
                onChange={(e) => setForm({ ...form, theme: e.target.value })}
                className="mt-1 p-2 border rounded"
              />
            </label>
            <label className="flex flex-col">
              Icon (class/url)
              <input
                value={form.icon}
                onChange={(e) => setForm({ ...form, icon: e.target.value })}
                className="mt-1 p-2 border rounded"
              />
            </label>
            <label className="flex flex-col">
              Order
              <input
                type="number"
                value={form.order}
                onChange={(e) => setForm({ ...form, order: e.target.value })}
                className="mt-1 p-2 border rounded"
              />
            </label>
          </div>
          <div className="flex gap-2 mt-4">
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded"
            >
              Save
            </button>
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="px-4 py-2 bg-gray-200 rounded"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {themes.length === 0 ? (
        <div className="p-6 bg-white rounded shadow">No themes found.</div>
      ) : (
        <ul className="space-y-3">
          {themes.map((t) => (
            <li
              key={t._id}
              className="p-4 bg-white rounded shadow flex justify-between items-center"
            >
              <div>
                <div className="font-semibold">{t.theme}</div>
                <div className="text-sm text-gray-500">
                  {t.day} • order: {t.order}
                </div>
              </div>
              <div className="flex gap-3">
                <button onClick={() => openEdit(t)} className="text-blue-600">
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(t._id)}
                  className="text-red-600"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ManageThemes;
