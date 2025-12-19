import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import AdminLoader from "./components/AdminLoader";

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

function ManageDocs() {
  const [loading, setLoading] = useState(true);
  const [docs, setDocs] = useState([]);
  const [uploading, setUploading] = useState(false);
  const token = localStorage.getItem("adminToken");

  const fetchDocs = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${SERVER_URL}/api/resources`, {
        headers: { Authorization: token ? `Bearer ${token}` : undefined },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to load resources");
      setDocs(data || data.data || []);
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

  const handleUpload = async (e) => {
    e.preventDefault();
    const form = e.target;
    const fileInput = form.elements["doc-file"];
    const videoInput = form.elements["doc-video"];
    const thumbInput = form.elements["doc-thumb"];
    if (
      (!fileInput || !fileInput.files || !fileInput.files[0]) &&
      (!videoInput || !videoInput.files || !videoInput.files[0])
    )
      return toast.error("Select a file or video to upload");
    const fd = new FormData();
    if (fileInput && fileInput.files && fileInput.files[0])
      fd.append("file", fileInput.files[0]);
    if (videoInput && videoInput.files && videoInput.files[0])
      fd.append("video", videoInput.files[0]);
    if (thumbInput && thumbInput.files && thumbInput.files[0])
      fd.append("thumbnail", thumbInput.files[0]);
    try {
      setUploading(true);
      const res = await fetch(`${SERVER_URL}/api/resources`, {
        method: "POST",
        headers: { Authorization: token ? `Bearer ${token}` : undefined },
        body: fd,
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Upload failed");
      toast.success("Uploaded resource");
      if (fileInput) fileInput.value = null;
      if (videoInput) videoInput.value = null;
      if (thumbInput) thumbInput.value = null;
      fetchDocs();
    } catch (err) {
      toast.error(err.message || "Upload failed");
    } finally {
      setUploading(false);
    }
  };

  const remove = async (id) => {
    if (!window.confirm("Delete document?")) return;
    try {
      const res = await fetch(`${SERVER_URL}/api/resources/${id}`, {
        method: "DELETE",
        headers: { Authorization: token ? `Bearer ${token}` : undefined },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Delete failed");
      toast.success("Document deleted");
      fetchDocs();
    } catch (err) {
      toast.error(err.message || "Failed to delete");
    }
  };

  if (loading) return <AdminLoader message="Loading documents..." />;

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6 items-center">
        <h2 className="text-2xl font-semibold sm:col-span-1">
          Manage Resources / Documents
        </h2>

        <form
          onSubmit={handleUpload}
          className="sm:col-span-2 flex flex-wrap items-center gap-3 w-full"
        >
          <label className="w-full sm:w-1/4">
            <div className="text-xs text-gray-500 mb-1">Document (pdf/doc)</div>
            <input
              name="doc-file"
              id="doc-file"
              type="file"
              accept=".pdf,.doc,.docx"
              className="w-full"
            />
          </label>

          <label className="w-full sm:w-1/4">
            <div className="text-xs text-gray-500 mb-1">Video (optional)</div>
            <input
              name="doc-video"
              id="doc-video"
              type="file"
              accept="video/*"
              className="w-full"
            />
          </label>

          <label className="w-full sm:w-1/4">
            <div className="text-xs text-gray-500 mb-1">
              Thumbnail (optional)
            </div>
            <input
              name="doc-thumb"
              id="doc-thumb"
              type="file"
              accept="image/*"
              className="w-full"
            />
          </label>

          <div className="w-full sm:w-auto">
            <button
              type="submit"
              disabled={uploading}
              className="px-4 py-2 bg-green-600 text-white rounded w-full sm:w-auto"
            >
              {uploading ? "Uploading..." : "Upload"}
            </button>
          </div>
        </form>
      </div>

      {docs.length === 0 ? (
        <div className="p-6 bg-white rounded shadow">No resources found.</div>
      ) : (
        <ul className="space-y-3">
          {docs.map((d) => (
            <li
              key={d._id || d.id}
              className="p-4 bg-white rounded shadow flex flex-col sm:flex-row sm:justify-between gap-3 sm:gap-0 items-start sm:items-center"
            >
              <div className="flex-1 min-w-0">
                <div className="font-semibold truncate">
                  {d.title || d.name}
                </div>
                <div className="text-sm text-gray-500 truncate">
                  {d.category || d.type || ""}
                </div>
              </div>
              <div className="flex gap-3 flex-wrap">
                <a
                  href={d.url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-600"
                >
                  View
                </a>
                <button
                  onClick={() => remove(d._id || d.id)}
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

export default ManageDocs;
