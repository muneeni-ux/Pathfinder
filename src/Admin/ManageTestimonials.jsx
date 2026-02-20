import React, { useEffect, useState, useMemo } from "react";
import toast from "react-hot-toast";
import AdminLoader from "./components/AdminLoader";
import Pagination from "./components/Pagination";
import {
  CheckCircle,
  Trash2,
  Plus,
  Search,
  MessageSquare,
  Clock,
} from "lucide-react";

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

function ManageTestimonials() {
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState([]);
  const [filterStatus, setFilterStatus] = useState("all"); // 'all', 'pending', 'approved'

  // Form State
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: "", role: "Pathfinder", story: "" });

  // Pagination & Search
  const [page, setPage] = useState(1);
  const [pageSize] = useState(6);
  const [query, setQuery] = useState("");

  const token = localStorage.getItem("adminToken");

  // --- FETCH ALL ---
  const fetchAll = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${SERVER_URL}/api/testimonials/all`, {
        headers: { Authorization: token ? `Bearer ${token}` : undefined },
      });
      const data = await res.json();
      if (!res.ok)
        throw new Error(data.message || "Failed to load testimonials");

      // Handle response format
      setItems(data.success ? data.data : data || []);
    } catch (err) {
      toast.error(err.message || "Could not load testimonials");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAll();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // --- FILTERING ---
  const filtered = useMemo(() => {
    let result = items;

    // 1. Search Query
    if (query) {
      const q = query.toLowerCase();
      result = result.filter(
        (it) =>
          (it.name || "").toLowerCase().includes(q) ||
          (it.story || "").toLowerCase().includes(q),
      );
    }

    // 2. Status Filter
    if (filterStatus === "pending") {
      result = result.filter((it) => !it.approved);
    } else if (filterStatus === "approved") {
      result = result.filter((it) => it.approved);
    }

    return result;
  }, [items, query, filterStatus]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const pageItems = filtered.slice((page - 1) * pageSize, page * pageSize);

  // --- HANDLERS ---
  const handleApprove = async (id) => {
    try {
      const res = await fetch(`${SERVER_URL}/api/testimonials/approve/${id}`, {
        method: "PUT",
        headers: { Authorization: token ? `Bearer ${token}` : undefined },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Approve failed");

      toast.success("Testimonial approved successfully!");

      // Optimistic update
      setItems((prev) =>
        prev.map((item) =>
          item._id === id ? { ...item, approved: true } : item,
        ),
      );
    } catch (err) {
      toast.error(err.message || "Failed to approve");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this testimonial?"))
      return;
    try {
      const res = await fetch(`${SERVER_URL}/api/testimonials/${id}`, {
        method: "DELETE",
        headers: { Authorization: token ? `Bearer ${token}` : undefined },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Delete failed");

      toast.success("Deleted successfully");
      setItems((prev) => prev.filter((item) => item._id !== id));
    } catch (err) {
      toast.error(err.message || "Failed to delete");
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${SERVER_URL}/api/testimonials`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? `Bearer ${token}` : undefined,
        },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Create failed");

      toast.success("Testimonial added (Pending Approval)");
      setShowForm(false);
      setForm({ name: "", role: "Pathfinder", story: "" });
      fetchAll();
    } catch (err) {
      toast.error(err.message || "Failed to create testimonial");
    }
  };

  if (loading) return <AdminLoader message="Loading testimonials..." />;

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Testimonials</h2>
          <p className="text-gray-500 text-sm">
            Review, approve, and manage user stories.
          </p>
        </div>

        <div className="flex gap-3 w-full md:w-auto">
          {/* Search */}
          <div className="relative flex-1 md:w-64">
            <Search
              className="absolute left-3 top-2.5 text-gray-400"
              size={18}
            />
            <input
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setPage(1);
              }}
              placeholder="Search stories..."
              className="pl-10 p-2 w-full border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none bg-slate-50 transition-all"
            />
          </div>

          <button
            onClick={() => setShowForm(true)}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 transition shadow-md font-medium whitespace-nowrap"
          >
            <Plus size={18} /> Add New
          </button>
        </div>
      </div>

      {/* FILTERS */}
      <div className="flex gap-2 mb-6 border-b border-gray-200 pb-1">
        {[
          { key: "all", label: "All Stories" },
          { key: "pending", label: "Pending Approval" },
          { key: "approved", label: "Approved" },
        ].map((f) => (
          <button
            key={f.key}
            onClick={() => {
              setFilterStatus(f.key);
              setPage(1);
            }}
            className={`px-4 py-2 text-sm font-medium rounded-t-lg transition-colors border-b-2 ${
              filterStatus === f.key
                ? "border-blue-600 text-blue-700 bg-slate-50 bg-gradient-to-t from-blue-50/50 to-transparent"
                : "border-transparent text-slate-500 hover:text-slate-700 hover:bg-slate-100"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* --- ADD MODAL --- */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md animate-in fade-in zoom-in duration-200">
            <div className="p-6 border-b">
              <h3 className="text-lg font-bold text-gray-800">
                Add Testimonial
              </h3>
            </div>
            <form onSubmit={handleCreate} className="p-6 space-y-4">
              <div>
                <label className="text-xs font-bold text-gray-500 uppercase">
                  Name
                </label>
                <input
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full mt-1 p-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none bg-slate-50"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-gray-500 uppercase">
                  Role
                </label>
                <select
                  value={form.role}
                  onChange={(e) => setForm({ ...form, role: e.target.value })}
                  className="w-full mt-1 p-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none bg-slate-50"
                >
                  <option>Pathfinder</option>
                  <option>Parent</option>
                  <option>Leader</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-bold text-gray-500 uppercase">
                  Story
                </label>
                <textarea
                  required
                  value={form.story}
                  onChange={(e) => setForm({ ...form, story: e.target.value })}
                  rows={4}
                  className="w-full mt-1 p-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none resize-none bg-slate-50"
                />
              </div>
              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 shadow-md transition-all"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* --- LIST --- */}
      {filtered.length === 0 ? (
        <div className="p-12 text-center bg-white rounded-xl border border-dashed border-gray-300 text-gray-400">
          No testimonials found.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pageItems.map((it) => (
            <div
              key={it._id}
              className="bg-white rounded-xl shadow-sm border border-gray-200 flex flex-col hover:shadow-md transition-shadow"
            >
              {/* Card Body */}
              <div className="p-5 flex-1">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-sm">
                      {it.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-800 text-sm">
                        {it.name}
                      </h4>
                      <p className="text-xs text-gray-500">{it.role}</p>
                    </div>
                  </div>
                  {/* Status Badge */}
                  <span
                    className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wide ${
                      it.approved
                        ? "bg-blue-100 text-blue-700"
                        : "bg-pink-100 text-pink-700"
                    }`}
                  >
                    {it.approved ? "Approved" : "Pending"}
                  </span>
                </div>

                <div className="relative">
                  <MessageSquare
                    size={16}
                    className="text-gray-300 absolute -top-1 -left-1"
                  />
                  <p className="text-sm text-gray-600 italic pl-6 line-clamp-4 leading-relaxed">
                    "{it.story}"
                  </p>
                </div>
              </div>

              {/* Card Footer */}
              <div className="px-5 py-3 bg-gray-50 border-t border-gray-100 rounded-b-xl flex justify-between items-center">
                <span className="text-xs text-gray-400 flex items-center gap-1">
                  <Clock size={12} />{" "}
                  {new Date(it.createdAt).toLocaleDateString()}
                </span>

                <div className="flex gap-2">
                  {!it.approved && (
                    <button
                      onClick={() => handleApprove(it._id)}
                      className="flex items-center gap-1 px-3 py-1.5 bg-white border border-blue-200 text-blue-700 text-xs font-medium rounded hover:bg-blue-50 transition-colors shadow-sm"
                    >
                      <CheckCircle size={14} /> Approve
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(it._id)}
                    className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                    title="Delete"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* PAGINATION */}
      <div className="mt-8">
        <Pagination page={page} setPage={setPage} totalPages={totalPages} />
      </div>
    </div>
  );
}

export default ManageTestimonials;
