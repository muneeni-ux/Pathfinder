import React, { useEffect, useState, useMemo } from "react";
import toast from "react-hot-toast";
import AdminLoader from "./components/AdminLoader";
import Pagination from "./components/Pagination";
import AdminCard from "./components/AdminCard";

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

function ManageTestimonials() {
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: "", role: "", story: "" });
  const token = localStorage.getItem("adminToken");
  const [page, setPage] = useState(1);
  const [pageSize] = useState(6);
  const [query, setQuery] = useState("");

  const fetchAll = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${SERVER_URL}/api/testimonials/all`, {
        headers: { Authorization: token ? `Bearer ${token}` : undefined },
      });
      const data = await res.json();
      if (!res.ok)
        throw new Error(data.message || "Failed to load testimonials");
      setItems(data.data || []);
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

  const filtered = useMemo(() => {
    if (!query) return items;
    const q = query.toLowerCase();
    return items.filter(
      (it) =>
        (it.name || "").toLowerCase().includes(q) ||
        (it.role || "").toLowerCase().includes(q) ||
        (it.story || "").toLowerCase().includes(q)
    );
  }, [items, query]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const pageItems = filtered.slice((page - 1) * pageSize, page * pageSize);

  const handleApprove = async (id) => {
    try {
      const res = await fetch(`${SERVER_URL}/api/testimonials/approve/${id}`, {
        method: "PUT",
        headers: { Authorization: token ? `Bearer ${token}` : undefined },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Approve failed");
      toast.success("Testimonial approved");
      fetchAll();
    } catch (err) {
      toast.error(err.message || "Failed to approve");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this testimonial?")) return;
    try {
      const res = await fetch(`${SERVER_URL}/api/testimonials/${id}`, {
        method: "DELETE",
        headers: { Authorization: token ? `Bearer ${token}` : undefined },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Delete failed");
      toast.success("Deleted");
      fetchAll();
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
      toast.success("Testimonial submitted");
      setShowForm(false);
      setForm({ name: "", role: "", story: "" });
      fetchAll();
    } catch (err) {
      toast.error(err.message || "Failed to create testimonial");
    }
  };

  if (loading) return <AdminLoader message="Loading testimonials..." />;

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold">Manage Testimonials</h2>
        <div className="flex items-center gap-3">
          <input
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setPage(1);
            }}
            placeholder="Search testimonials..."
            className="p-2 border rounded"
          />
          <button
            onClick={() => setShowForm((s) => !s)}
            className="px-4 py-2 bg-green-600 text-white rounded"
          >
            {showForm ? "Close" : "Add"}
          </button>
        </div>
      </div>

      {showForm && (
        <form
          onSubmit={handleCreate}
          className="mb-6 p-4 bg-white rounded shadow"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <input
              required
              placeholder="Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="p-2 border rounded"
            />
            <input
              required
              placeholder="Role"
              value={form.role}
              onChange={(e) => setForm({ ...form, role: e.target.value })}
              className="p-2 border rounded"
            />
            <textarea
              required
              placeholder="Story"
              value={form.story}
              onChange={(e) => setForm({ ...form, story: e.target.value })}
              className="p-2 border rounded md:col-span-2"
            />
          </div>
          <div className="mt-3">
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded"
            >
              Submit
            </button>
          </div>
        </form>
      )}

      {filtered.length === 0 ? (
        <div className="p-6 bg-white rounded shadow">
          No testimonials found.
        </div>
      ) : (
        <div className="grid gap-3">
          {pageItems.map((it) => (
            <AdminCard key={it._id}>
              <div className="flex justify-between items-start">
                <div>
                  <div className="font-semibold">
                    {it.name}{" "}
                    <span className="text-sm text-gray-500">• {it.role}</span>
                  </div>
                  <p className="mt-2 text-sm text-gray-700">{it.story}</p>
                </div>
                <div className="flex flex-col gap-2">
                  {!it.approved && (
                    <button
                      onClick={() => handleApprove(it._id)}
                      className="text-green-600"
                    >
                      Approve
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(it._id)}
                    className="text-red-600"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </AdminCard>
          ))}

          <Pagination page={page} setPage={setPage} totalPages={totalPages} />
        </div>
      )}
    </div>
  );
}

export default ManageTestimonials;
