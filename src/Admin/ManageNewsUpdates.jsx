import React, { useEffect, useState, useMemo } from "react";
import toast from "react-hot-toast";
import AdminLoader from "./components/AdminLoader";
import Pagination from "./components/Pagination";
import AdminCard from "./components/AdminCard";

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

function ManageNewsUpdates() {
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ title: "", body: "" });
  const token = localStorage.getItem("adminToken");
  const [page, setPage] = useState(1);
  const [pageSize] = useState(6);
  const [query, setQuery] = useState("");

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${SERVER_URL}/api/posts`, {
        headers: { Authorization: token ? `Bearer ${token}` : undefined },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to load posts");
      setPosts(data || data.data || []);
    } catch (err) {
      toast.error(err.message || "Could not load posts");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filtered = useMemo(() => {
    if (!query) return posts;
    const q = query.toLowerCase();
    return posts.filter(
      (p) =>
        (p.title || "").toLowerCase().includes(q) ||
        (p.body || "").toLowerCase().includes(q)
    );
  }, [posts, query]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const pageItems = filtered.slice((page - 1) * pageSize, page * pageSize);

  const createPost = () => setShowForm((s) => !s);
  const editPost = (p) => toast("Edit post - not implemented", { icon: "✏️" });

  const deletePost = async (id) => {
    if (!window.confirm("Delete this post?")) return;
    try {
      const res = await fetch(`${SERVER_URL}/api/posts/${id}`, {
        method: "DELETE",
        headers: { Authorization: token ? `Bearer ${token}` : undefined },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Delete failed");
      toast.success("Post deleted");
      fetchPosts();
    } catch (err) {
      toast.error(err.message || "Failed to delete post");
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const fd = new FormData();
      fd.append("title", form.title);
      fd.append("body", form.body);
      const fileInput = document.getElementById("post-image");
      if (fileInput && fileInput.files[0])
        fd.append("image", fileInput.files[0]);

      const res = await fetch(`${SERVER_URL}/api/posts`, {
        method: "POST",
        headers: { Authorization: token ? `Bearer ${token}` : undefined },
        body: fd,
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Create failed");
      toast.success("Post created");
      setShowForm(false);
      setForm({ title: "", body: "" });
      fetchPosts();
    } catch (err) {
      toast.error(err.message || "Failed to create post");
    }
  };

  if (loading) return <AdminLoader message="Loading news & updates..." />;

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold">Manage News & Updates</h2>
        <div className="flex items-center gap-3">
          <input
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setPage(1);
            }}
            placeholder="Search posts..."
            className="p-2 border rounded"
          />
          <button
            onClick={createPost}
            className="px-4 py-2 bg-green-600 text-white rounded"
          >
            {showForm ? "Close" : "New Post"}
          </button>
        </div>
      </div>

      {showForm && (
        <form
          onSubmit={handleCreate}
          className="mb-6 p-4 bg-white rounded shadow"
        >
          <input
            required
            placeholder="Title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            className="w-full p-2 border rounded mb-2"
          />
          <textarea
            required
            placeholder="Body"
            value={form.body}
            onChange={(e) => setForm({ ...form, body: e.target.value })}
            className="w-full p-2 border rounded mb-2"
          />
          <input
            id="post-image"
            type="file"
            accept="image/*"
            className="mb-2"
          />
          <div>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded"
            >
              Create
            </button>
          </div>
        </form>
      )}

      {filtered.length === 0 ? (
        <div className="p-6 bg-white rounded shadow">No posts found.</div>
      ) : (
        <div className="grid gap-3">
          {pageItems.map((p) => (
            <AdminCard key={p._id || p.id} title={p.title}>
              <div className="flex justify-between items-center">
                <div className="text-sm text-gray-600">
                  {p.createdAt ? new Date(p.createdAt).toLocaleString() : ""}
                </div>
                <div className="flex gap-2">
                  <button onClick={() => editPost(p)} className="text-blue-600">
                    Edit
                  </button>
                  <button
                    onClick={() => deletePost(p._id || p.id)}
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

export default ManageNewsUpdates;
