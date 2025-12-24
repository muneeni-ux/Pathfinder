import React, { useEffect, useState, useRef } from "react";
import toast from "react-hot-toast";
import AdminLoader from "./components/AdminLoader";
import { 
  FileText, 
  Video, 
  Trash2, 
  UploadCloud, 
  BookOpen, 
  CheckCircle,
  Film
} from "lucide-react";

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

// Tab options corresponding to your backend categories
const TABS = [
  { id: "document", label: "Documents", icon: <BookOpen size={18} /> },
  { id: "video", label: "Training Videos", icon: <Film size={18} /> },
  { id: "form", label: "Forms", icon: <FileText size={18} /> },
];

function ManageDocs() {
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [docs, setDocs] = useState([]);
  const [activeTab, setActiveTab] = useState("document");
  
  // Form State
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  
  // File Refs
  const fileInputRef = useRef(null);
  const videoInputRef = useRef(null);
  const thumbInputRef = useRef(null);

  const token = localStorage.getItem("adminToken");

  // --- FETCH RESOURCES ---
  const fetchDocs = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${SERVER_URL}/api/resources`, {
        headers: { Authorization: token ? `Bearer ${token}` : undefined },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to load resources");
      setDocs(Array.isArray(data) ? data : []);
    } catch (err) {
      toast.error(err.message || "Could not load resources");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDocs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // --- UPLOAD HANDLER ---
  const handleUpload = async (e) => {
    e.preventDefault();
    
    if (!title) return toast.error("Please enter a title");

    const fd = new FormData();
    fd.append("title", title);
    fd.append("description", description);
    fd.append("category", activeTab); // 'document', 'video', or 'form'
    
    // Auto-set 'type' based on category for UI icons on frontend
    if (activeTab === "document") fd.append("type", "Handbook/Guide");
    if (activeTab === "video") fd.append("type", "Tutorial");
    if (activeTab === "form") fd.append("type", "Official Form");

    // Append Files based on Tab
    if (activeTab === "video") {
      if (!videoInputRef.current?.files[0]) return toast.error("Please select a video file");
      fd.append("video", videoInputRef.current.files[0]);
      
      // Videos might have a thumbnail
      if (thumbInputRef.current?.files[0]) {
        fd.append("thumbnail", thumbInputRef.current.files[0]);
      }
    } else {
      // Documents and Forms use the generic 'file' input
      if (!fileInputRef.current?.files[0]) return toast.error("Please select a document file");
      fd.append("file", fileInputRef.current.files[0]);
    }

    try {
      setUploading(true);
      const res = await fetch(`${SERVER_URL}/api/resources`, {
        method: "POST",
        headers: { Authorization: token ? `Bearer ${token}` : undefined },
        body: fd,
      });
      
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Upload failed");
      
      toast.success(`${activeTab} uploaded successfully!`);
      
      // Reset Form
      setTitle("");
      setDescription("");
      if (fileInputRef.current) fileInputRef.current.value = "";
      if (videoInputRef.current) videoInputRef.current.value = "";
      if (thumbInputRef.current) thumbInputRef.current.value = "";
      
      fetchDocs();
    } catch (err) {
      toast.error(err.message || "Upload failed");
    } finally {
      setUploading(false);
    }
  };

  // --- DELETE HANDLER ---
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this resource?")) return;
    try {
      const res = await fetch(`${SERVER_URL}/api/resources/${id}`, {
        method: "DELETE",
        headers: { Authorization: token ? `Bearer ${token}` : undefined },
      });
      if (!res.ok) throw new Error("Delete failed");
      toast.success("Resource deleted");
      fetchDocs();
    } catch (err) {
      toast.error(err.message || "Failed to delete");
    }
  };

  // Filter docs for current view (optional: show all or filter by tab)
  // Showing ALL in the list below is usually better for overview
  const filteredDocs = docs; 

  if (loading) return <AdminLoader message="Loading resources..." />;

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      
      {/* HEADER */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800">Resource Center</h2>
        <p className="text-gray-500 text-sm">Upload handbooks, training videos, and forms.</p>
      </div>

      {/* --- UPLOAD SECTION --- */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
        
        {/* Tabs */}
        <div className="flex gap-2 mb-6 border-b pb-1">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-t-lg transition-colors ${
                activeTab === tab.id
                  ? "bg-green-50 text-green-700 border-b-2 border-green-600"
                  : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
              }`}
            >
              {tab.icon} {tab.label}
            </button>
          ))}
        </div>

        {/* Upload Form */}
        <form onSubmit={handleUpload} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* Left Column: Details */}
            <div className="space-y-4">
              <div>
                <label className="text-xs font-bold text-gray-500 uppercase">Resource Title</label>
                <input
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full mt-1 p-2.5 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
                  placeholder={`e.g., ${activeTab === 'video' ? 'Knot Tying Tutorial' : '2025 Membership Form'}`}
                />
              </div>
              <div>
                <label className="text-xs font-bold text-gray-500 uppercase">Description (Optional)</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={3}
                  className="w-full mt-1 p-2.5 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none resize-none"
                  placeholder="Brief description..."
                />
              </div>
            </div>

            {/* Right Column: File Inputs */}
            <div className="space-y-4">
              
              {/* Document / Form Input */}
              {(activeTab === "document" || activeTab === "form") && (
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center text-center hover:bg-gray-50 transition h-full">
                  <UploadCloud className="text-gray-400 mb-2" size={32} />
                  <p className="text-sm font-medium text-gray-600">Select PDF or Doc file</p>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".pdf,.doc,.docx"
                    className="mt-2 text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100"
                  />
                </div>
              )}

              {/* Video Input */}
              {activeTab === "video" && (
                <div className="space-y-4">
                  <div className="border rounded-lg p-3 bg-gray-50">
                    <label className="block text-xs font-bold text-gray-500 mb-1">Video File (MP4/WebM)</label>
                    <input
                      ref={videoInputRef}
                      type="file"
                      accept="video/*"
                      className="w-full text-sm"
                    />
                  </div>
                  <div className="border rounded-lg p-3 bg-gray-50">
                    <label className="block text-xs font-bold text-gray-500 mb-1">Thumbnail (Image)</label>
                    <input
                      ref={thumbInputRef}
                      type="file"
                      accept="image/*"
                      className="w-full text-sm"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="pt-2 flex justify-end">
            <button
              type="submit"
              disabled={uploading}
              className={`flex items-center gap-2 px-6 py-2.5 bg-green-600 text-white rounded-lg font-medium shadow hover:bg-green-700 transition-all ${
                uploading ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              {uploading ? (
                <>Loading...</>
              ) : (
                <>
                  <CheckCircle size={18} /> Upload {activeTab}
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* --- LIST SECTION --- */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-4 border-b bg-gray-50/50">
          <h3 className="font-semibold text-gray-700">Recent Uploads</h3>
        </div>
        
        {docs.length === 0 ? (
          <div className="p-8 text-center text-gray-500 italic">No resources uploaded yet.</div>
        ) : (
          <div className="divide-y divide-gray-100">
            {docs.map((d) => (
              <div key={d._id || d.id} className="p-4 flex items-center justify-between hover:bg-gray-50 transition-colors group">
                <div className="flex items-center gap-4 overflow-hidden">
                  {/* Icon Badge */}
                  <div className={`p-3 rounded-lg shrink-0 ${
                    d.category === 'video' ? 'bg-purple-100 text-purple-600' :
                    d.category === 'form' ? 'bg-amber-100 text-amber-600' :
                    'bg-blue-100 text-blue-600'
                  }`}>
                    {d.category === 'video' ? <Video size={20} /> : d.category === 'form' ? <FileText size={20} /> : <BookOpen size={20} />}
                  </div>
                  
                  <div className="min-w-0">
                    <h4 className="font-semibold text-gray-800 truncate">{d.title}</h4>
                    <p className="text-xs text-gray-500 uppercase tracking-wide">{d.category}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 pl-4">
                  <a 
                    href={d.fileUrl} 
                    target="_blank" 
                    rel="noreferrer"
                    className="text-sm font-medium text-blue-600 hover:text-blue-800 hover:underline"
                  >
                    View
                  </a>
                  <button 
                    onClick={() => handleDelete(d._id || d.id)}
                    className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    title="Delete Resource"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default ManageDocs;