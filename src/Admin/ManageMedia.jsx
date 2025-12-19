import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import AdminLoader from "./components/AdminLoader";
import AdminCard from "./components/AdminCard";
import Pagination from "./components/Pagination";

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

function ManageMedia() {
  const [loading, setLoading] = useState(true);
  const [media, setMedia] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const pageSize = 9;
  const token = localStorage.getItem("adminToken");

  const fetchMedia = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${SERVER_URL}/api/gallery`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to load media");
      // Normalize response: backend returns { success: true, data: [...] }
      if (Array.isArray(data)) {
        setMedia(data);
      } else if (data && Array.isArray(data.data)) {
        setMedia(data.data);
      } else {
        console.warn("Unexpected media response shape:", data);
        setMedia([]);
      }
    } catch (err) {
      toast.error(err.message || "Could not load media");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMedia();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleUpload = async (e) => {
    e.preventDefault();
    const input = e.target.elements["media-file"];
    if (!input || !input.files || !input.files[0])
      return toast.error("Select a file to upload");
    const fd = new FormData();
    fd.append("media", input.files[0]);
    try {
      setUploading(true);
      const res = await fetch(`${SERVER_URL}/api/gallery/upload`, {
        method: "POST",
        headers: { Authorization: token ? `Bearer ${token}` : undefined },
        body: fd,
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Upload failed");
      toast.success("Uploaded");
      input.value = null;
      fetchMedia();
    } catch (err) {
      toast.error(err.message || "Upload failed");
    } finally {
      setUploading(false);
    }
  };

  const remove = async (id) => {
    if (!window.confirm("Remove this media item?")) return;
    try {
      const res = await fetch(`${SERVER_URL}/api/gallery/${id}`, {
        method: "DELETE",
        headers: { Authorization: token ? `Bearer ${token}` : undefined },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Delete failed");
      toast.success("Removed");
      fetchMedia();
    } catch (err) {
      toast.error(err.message || "Failed to remove media");
    }
  };

  if (loading) return <AdminLoader message="Loading media..." />;

  // filtering + pagination
  const filtered = media.filter((m) => {
    if (!query) return true;
    const q = query.toLowerCase();
    return (
      (m.title && m.title.toLowerCase().includes(q)) ||
      (m.public_id && m.public_id.toLowerCase().includes(q)) ||
      (m._id && String(m._id).includes(q))
    );
  });
  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const pageItems = filtered.slice((page - 1) * pageSize, page * pageSize);

  return (
    <div className="p-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <h2 className="text-2xl font-semibold">Manage Media & Gallery</h2>

        <div className="flex items-center gap-2">
          <input
            placeholder="Search title or id"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setPage(1);
            }}
            className="px-3 py-2 border rounded mr-2"
          />
          <form onSubmit={handleUpload} className="flex items-center gap-2">
            <input
              id="media-file"
              name="media-file"
              type="file"
              accept="image/*,video/*"
            />
            <button
              type="submit"
              disabled={uploading}
              className="px-4 py-2 bg-green-600 text-white rounded"
            >
              {uploading ? "Uploading..." : "Upload"}
            </button>
          </form>
        </div>
      </div>

      {pageItems.length === 0 ? (
        <AdminCard>
          <div className="p-6">No media found.</div>
        </AdminCard>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {pageItems.map((m) => (
            <AdminCard
              key={m._id || m.id}
              title={m.title || m.public_id || "Media"}
            >
              <div>
                {m.url ? (
                  <img
                    src={m.url}
                    alt={m.title || "media"}
                    className="w-full h-40 object-cover rounded"
                  />
                ) : (
                  <div className="w-full h-40 bg-gray-100 flex items-center justify-center rounded text-sm">
                    No preview
                  </div>
                )}

                <div className="flex justify-between items-center mt-2">
                  <div className="text-sm text-gray-700">
                    {m.caption || m.title || ""}
                  </div>
                  <button
                    onClick={() => remove(m._id || m.id)}
                    className="text-red-600"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </AdminCard>
          ))}
        </div>
      )}

      <Pagination page={page} setPage={setPage} totalPages={totalPages} />
    </div>
  );
}

export default ManageMedia;
