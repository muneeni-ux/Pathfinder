import React, { useEffect, useState, useMemo, useRef } from "react";
import toast from "react-hot-toast";
import AdminLoader from "./components/AdminLoader";
import Pagination from "./components/Pagination";
import { 
  Plus, Search, Edit2, Trash2, X, UploadCloud, 
  Image as ImageIcon, FileText, Calendar 
} from "lucide-react";

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

const CATEGORIES = ["News", "Reports", "Events", "Sport", "Editorial"];

function ManageNewsUpdates() {
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  
  // Modal / Form State
  const [showForm, setShowForm] = useState(false);
  const [isEditing, setIsEditing] = useState(null); 
  const fileInputRef = useRef(null);
  
  // Helper to get today's date in YYYY-MM-DD format
  const getTodayDate = () => new Date().toISOString().split('T')[0];

  const [form, setForm] = useState({ 
    title: "", 
    category: "News", 
    snippet: "", 
    content: "", 
    date: getTodayDate(),
    image: null 
  });
  const [preview, setPreview] = useState(null);

  // Pagination & Search
  const [page, setPage] = useState(1);
  const [pageSize] = useState(6);
  const [query, setQuery] = useState("");

  const token = localStorage.getItem("adminToken");

  // --- FETCH POSTS ---
  const fetchPosts = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${SERVER_URL}/api/posts`, {
        headers: { Authorization: token ? `Bearer ${token}` : undefined },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to load posts");
      setPosts(Array.isArray(data) ? data : data.data || []);
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

  // --- FILTERING ---
  const filtered = useMemo(() => {
    if (!query) return posts;
    const q = query.toLowerCase();
    return posts.filter(
      (p) =>
        (p.title || "").toLowerCase().includes(q) ||
        (p.category || "").toLowerCase().includes(q)
    );
  }, [posts, query]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const pageItems = filtered.slice((page - 1) * pageSize, page * pageSize);

  // --- HANDLERS ---
  const resetForm = () => {
    setForm({ 
        title: "", 
        category: "News", 
        snippet: "", 
        content: "", 
        date: getTodayDate(),
        image: null 
    });
    setPreview(null);
    setIsEditing(null);
    setShowForm(false);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setForm({ ...form, image: file });
      setPreview(URL.createObjectURL(file));
    }
  };

  const openEdit = (post) => {
    setIsEditing(post._id);
    const formattedDate = post.date ? new Date(post.date).toISOString().split('T')[0] : getTodayDate();

    setForm({
      title: post.title,
      category: post.category,
      snippet: post.snippet,
      content: post.content,
      date: formattedDate,
      image: null 
    });
    setPreview(post.image);
    setShowForm(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const toastId = toast.loading(isEditing ? "Updating post..." : "Creating post...");

    try {
      const fd = new FormData();
      fd.append("title", form.title);
      fd.append("category", form.category);
      fd.append("snippet", form.snippet);
      fd.append("content", form.content);
      fd.append("date", form.date);
      
      if (form.image) {
        fd.append("image", form.image);
      }

      const url = isEditing 
        ? `${SERVER_URL}/api/posts/${isEditing}` 
        : `${SERVER_URL}/api/posts`;
      
      const method = isEditing ? "PUT" : "POST"; 

      const res = await fetch(url, {
        method: method,
        headers: { Authorization: token ? `Bearer ${token}` : undefined },
        body: fd,
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || data.error || "Operation failed");

      toast.success(isEditing ? "Post updated!" : "Post created!", { id: toastId });
      resetForm();
      fetchPosts();
    } catch (err) {
      toast.error(err.message || "Failed to save post", { id: toastId });
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this news post?")) return;
    try {
      const res = await fetch(`${SERVER_URL}/api/posts/${id}`, {
        method: "DELETE",
        headers: { Authorization: token ? `Bearer ${token}` : undefined },
      });
      if (!res.ok) throw new Error("Delete failed");
      toast.success("Post deleted");
      fetchPosts();
    } catch (err) {
      toast.error(err.message || "Failed to delete");
    }
  };

  if (loading) return <AdminLoader message="Loading news & updates..." />;

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">News & Updates</h2>
          <p className="text-gray-500 text-sm">Manage articles, sports highlights, and reports.</p>
        </div>
        
        <div className="flex gap-3 w-full md:w-auto">
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
            <input
              value={query}
              onChange={(e) => { setQuery(e.target.value); setPage(1); }}
              placeholder="Search news..."
              className="pl-10 p-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
            />
          </div>
          <button
            onClick={() => { resetForm(); setShowForm(true); }}
            className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition shadow-sm font-medium"
          >
            <Plus size={18} /> New Post
          </button>
        </div>
      </div>

      {/* --- RESPONSIVE MODAL --- */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center bg-black/60 backdrop-blur-sm p-0 md:p-4">
          
          {/* Modal Container: Full height on mobile, Centered on desktop */}
          <div className="bg-white w-full h-[95vh] md:h-auto md:max-h-[90vh] md:max-w-2xl md:rounded-xl shadow-2xl flex flex-col animate-in fade-in zoom-in duration-200 rounded-t-2xl">
            
            {/* 1. STICKY HEADER */}
            <div className="flex justify-between items-center p-4 border-b shrink-0">
              <h3 className="text-lg md:text-xl font-bold text-gray-800">
                {isEditing ? "Edit Post" : "Create New Post"}
              </h3>
              <button onClick={resetForm} className="p-2 bg-gray-100 rounded-full text-gray-500 hover:text-red-500 transition-colors">
                <X size={20} />
              </button>
            </div>
            
            {/* 2. SCROLLABLE BODY */}
            <div className="flex-1 overflow-y-auto p-4 md:p-6 custom-scrollbar">
              <form id="post-form" onSubmit={handleSubmit} className="space-y-5">
                
                {/* Image Upload Area */}
                <div 
                  onClick={() => fileInputRef.current.click()}
                  className="border-2 border-dashed border-gray-300 rounded-xl p-4 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors relative overflow-hidden h-36 md:h-48 bg-gray-50"
                >
                  {preview ? (
                    <img src={preview} alt="Preview" className="absolute inset-0 w-full h-full object-cover" />
                  ) : (
                    <>
                      <div className="bg-blue-100 p-3 rounded-full mb-3">
                        <UploadCloud className="text-blue-600" size={24} />
                      </div>
                      <p className="text-gray-500 font-medium text-sm md:text-base">Click to upload cover image</p>
                    </>
                  )}
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                    required={!isEditing} 
                  />
                </div>

                {/* Title */}
                <div>
                  <label className="text-xs font-bold text-gray-500 uppercase mb-1 block">Title</label>
                  <input
                    required
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
                    placeholder="Enter engaging title"
                  />
                </div>

                {/* Category & Date Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-gray-500 uppercase mb-1 block">Category</label>
                    <select
                      value={form.category}
                      onChange={(e) => setForm({ ...form, category: e.target.value })}
                      className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none bg-white"
                    >
                      {CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="text-xs font-bold text-gray-500 uppercase mb-1 block">Date (Event/Publish)</label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-3.5 text-gray-400" size={16} />
                      <input
                        type="date"
                        required
                        value={form.date}
                        onChange={(e) => setForm({ ...form, date: e.target.value })}
                        className="w-full pl-10 p-3 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
                      />
                    </div>
                  </div>
                </div>

                {/* Snippet */}
                <div>
                  <label className="text-xs font-bold text-gray-500 uppercase mb-1 block">Snippet</label>
                  <input
                    required
                    value={form.snippet}
                    onChange={(e) => setForm({ ...form, snippet: e.target.value })}
                    maxLength={150}
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
                    placeholder="Brief preview text (Max 150 chars)"
                  />
                </div>

                {/* Full Content */}
                <div>
                  <label className="text-xs font-bold text-gray-500 uppercase mb-1 block">Full Content</label>
                  <textarea
                    required
                    value={form.content}
                    onChange={(e) => setForm({ ...form, content: e.target.value })}
                    rows={6}
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none resize-y"
                    placeholder="Write the full story here..."
                  />
                </div>
              </form>
            </div>

            {/* 3. STICKY FOOTER */}
            <div className="p-4 border-t bg-gray-50 md:rounded-b-xl shrink-0 flex justify-end gap-3">
              <button 
                type="button" 
                onClick={resetForm} 
                className="px-5 py-2.5 text-gray-600 font-medium hover:bg-gray-200 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button 
                type="submit" 
                form="post-form" // Connects to the form ID above
                className="px-6 py-2.5 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 shadow-lg shadow-green-200 transition-all"
              >
                {isEditing ? "Update Post" : "Publish Post"}
              </button>
            </div>

          </div>
        </div>
      )}

      {/* --- POSTS GRID --- */}
      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-12 bg-white rounded-xl border border-dashed border-gray-300 text-gray-400">
          <FileText size={48} className="mb-4 text-gray-300" />
          <p>No posts found matching your criteria.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pageItems.map((p) => (
            <div key={p._id || p.id} className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all border border-gray-100 overflow-hidden group">
              <div className="h-40 bg-gray-100 relative overflow-hidden">
                {p.image ? (
                  <img src={p.image} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                ) : (
                  <div className="flex items-center justify-center h-full text-gray-300">
                    <ImageIcon size={32} />
                  </div>
                )}
                <span className="absolute top-3 right-3 bg-white/90 backdrop-blur px-2 py-1 text-xs font-bold text-gray-700 rounded shadow-sm">
                  {p.category}
                </span>
              </div>

              <div className="p-4">
                <h3 className="font-bold text-gray-800 line-clamp-1 mb-2" title={p.title}>{p.title}</h3>
                <p className="text-gray-500 text-sm line-clamp-2 mb-4 h-10">{p.snippet}</p>
                
                <div className="flex items-center justify-between border-t pt-3">
                  <span className="text-xs text-gray-500 flex items-center gap-1">
                     <Calendar size={12} />
                     {p.date ? new Date(p.date).toLocaleDateString() : "No Date"}
                  </span>
                  <div className="flex gap-2">
                    <button 
                      onClick={() => openEdit(p)}
                      className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      title="Edit"
                    >
                      <Edit2 size={16} />
                    </button>
                    <button 
                      onClick={() => handleDelete(p._id || p.id)}
                      className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      title="Delete"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      <div className="mt-8">
        <Pagination page={page} setPage={setPage} totalPages={totalPages} />
      </div>
    </div>
  );
}

export default ManageNewsUpdates;