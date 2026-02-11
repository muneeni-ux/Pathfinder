import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import AdminLoader from "./components/AdminLoader";
import { Plus, Edit2, Trash2, X } from "lucide-react";

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

const DAYS = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];
const ICONS = ["🌿", "🔥", "💧", "🌍", "🐾", "⭐", "❤️", "🎨", "🏥", "🚀"];

function ManageThemes() {
  const [loading, setLoading] = useState(true);
  const [themes, setThemes] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);

  const [form, setForm] = useState({
    day: "MON",
    theme: "",
    icon: "🌿",
    order: 1,
  });

  const token = localStorage.getItem("adminToken");

  // --- FETCH DATA ---
  const fetchThemes = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${SERVER_URL}/api/honor-themes`);
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
  }, []);

  // --- FORM HANDLERS ---
  const resetForm = () => {
    setEditing(null);
    setForm({ day: "MON", theme: "", icon: "🌿", order: 1 });
    setShowForm(false);
  };

  const openNew = () => {
    resetForm();
    setShowForm(true);
  };

  const openEdit = (t) => {
    setEditing(t);
    setForm({ day: t.day, theme: t.theme, icon: t.icon, order: t.order || 1 });
    setShowForm(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = editing
        ? `${SERVER_URL}/api/honor-themes/${editing._id}`
        : `${SERVER_URL}/api/honor-themes`;

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

      toast.success(
        editing ? "Theme updated successfully" : "Theme created successfully",
      );
      resetForm();
      fetchThemes();
    } catch (err) {
      toast.error(err.message || "Failed to save theme");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this daily theme?")) return;
    try {
      const res = await fetch(`${SERVER_URL}/api/honor-themes/${id}`, {
        method: "DELETE",
        headers: { Authorization: token ? `Bearer ${token}` : undefined },
      });
      if (!res.ok) throw new Error("Delete failed");
      toast.success("Theme removed");
      fetchThemes();
    } catch (err) {
      toast.error(err.message || "Failed to delete theme");
    }
  };

  if (loading) return <AdminLoader message="Loading weekly schedule..." />;

  // Sort themes by order or custom day sort
  const sortedThemes = themes.sort((a, b) => (a.order || 0) - (b.order || 0));

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">
            Weekly Honor Themes
          </h2>
          <p className="text-gray-500 text-sm">
            Manage the daily themes displayed on the "About" page.
          </p>
        </div>
        <button
          onClick={openNew}
          className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition shadow-sm font-medium"
        >
          <Plus size={18} /> Add Day
        </button>
      </div>

      {/* --- FORM MODAL --- */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md animate-in fade-in zoom-in duration-200">
            <div className="flex justify-between items-center p-5 border-b">
              <h3 className="text-xl font-bold text-gray-800">
                {editing ? "Edit Theme" : "New Daily Theme"}
              </h3>
              <button
                onClick={resetForm}
                className="text-gray-400 hover:text-red-500"
              >
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-gray-500 uppercase">
                    Day
                  </label>
                  <select
                    value={form.day}
                    onChange={(e) => setForm({ ...form, day: e.target.value })}
                    className="w-full mt-1 p-2 border rounded focus:ring-2 focus:ring-green-500 outline-none bg-white"
                  >
                    {DAYS.map((d) => (
                      <option key={d} value={d}>
                        {d}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-500 uppercase">
                    Sort Order
                  </label>
                  <input
                    type="number"
                    value={form.order}
                    onChange={(e) =>
                      setForm({ ...form, order: e.target.value })
                    }
                    className="w-full mt-1 p-2 border rounded focus:ring-2 focus:ring-green-500 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-gray-500 uppercase">
                  Theme Title
                </label>
                <input
                  required
                  value={form.theme}
                  onChange={(e) => setForm({ ...form, theme: e.target.value })}
                  className="w-full mt-1 p-2 border rounded focus:ring-2 focus:ring-green-500 outline-none"
                  placeholder="e.g. Nature Appreciation"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-gray-500 uppercase mb-2 block">
                  Select Icon
                </label>
                <div className="flex gap-2 flex-wrap">
                  {ICONS.map((icon) => (
                    <button
                      key={icon}
                      type="button"
                      onClick={() => setForm({ ...form, icon })}
                      className={`w-10 h-10 flex items-center justify-center rounded-lg border text-xl transition-all ${
                        form.icon === icon
                          ? "bg-green-100 border-green-500 scale-110 shadow-sm"
                          : "bg-gray-50 border-gray-200 hover:bg-gray-100"
                      }`}
                    >
                      {icon}
                    </button>
                  ))}
                </div>
                {/* Fallback custom icon input */}
                <input
                  placeholder="Or type custom emoji/text"
                  value={form.icon}
                  onChange={(e) => setForm({ ...form, icon: e.target.value })}
                  className="mt-2 w-full p-2 text-sm border rounded bg-gray-50"
                />
              </div>

              <div className="pt-2 flex justify-end gap-3 border-t mt-2">
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 shadow"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* --- WEEKLY GRID --- */}
      {sortedThemes.length === 0 ? (
        <div className="p-12 text-center bg-white rounded-xl border border-dashed border-gray-300 text-gray-400">
          No daily themes set up yet.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-4">
          {sortedThemes.map((t) => (
            <div
              key={t._id}
              className="bg-white rounded-xl shadow-sm border border-green-100 hover:shadow-md transition-all group overflow-hidden flex flex-col h-full"
            >
              {/* Day Header */}
              <div className="bg-green-50/50 p-3 border-b border-green-100 flex justify-between items-center">
                <span className="font-bold text-green-700 text-sm tracking-wide">
                  {t.day}
                </span>
                <span className="text-[10px] text-green-400 bg-white px-1.5 rounded border border-green-100">
                  #{t.order}
                </span>
              </div>

              {/* Body */}
              <div className="p-4 flex flex-col items-center justify-center text-center flex-grow">
                <div className="text-4xl mb-2 filter drop-shadow-sm">
                  {t.icon}
                </div>
                <h3 className="font-semibold text-gray-800 text-sm leading-snug">
                  {t.theme}
                </h3>
              </div>

              {/* Actions Footer (Hidden by default, shown on hover) */}
              <div className="p-2 border-t border-gray-50 flex justify-center gap-2 bg-gray-50 opacity-100 sm:opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={() => openEdit(t)}
                  className="p-1.5 text-blue-600 hover:bg-blue-100 rounded transition-colors"
                  title="Edit"
                >
                  <Edit2 size={16} />
                </button>
                <button
                  onClick={() => handleDelete(t._id)}
                  className="p-1.5 text-red-600 hover:bg-red-100 rounded transition-colors"
                  title="Delete"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ManageThemes;
