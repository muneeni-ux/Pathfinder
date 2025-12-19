import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import AdminLoader from "./components/AdminLoader";

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

function ManageProfiles() {
  const [loading, setLoading] = useState(true);
  const [profiles, setProfiles] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ name: "", title: "", bio: "" });

  const token = localStorage.getItem("adminToken");

  const fetchProfiles = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${SERVER_URL}/api/leadership/admin`, {
        headers: { Authorization: token ? `Bearer ${token}` : undefined },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to load profiles");
      setProfiles(data.data || []);
    } catch (err) {
      toast.error(err.message || "Could not load profiles");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfiles();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const createProfile = () => {
    setEditing(null);
    setForm({ name: "", title: "", bio: "" });
    setShowForm(true);
  };

  const editProfile = (p) => {
    setEditing(p);
    setForm({ name: p.name || "", title: p.title || "", bio: p.bio || "" });
    setShowForm(true);
  };

  const deleteProfile = async (id) => {
    if (!window.confirm("Delete profile?")) return;
    try {
      const res = await fetch(`${SERVER_URL}/api/leadership/${id}`, {
        method: "DELETE",
        headers: { Authorization: token ? `Bearer ${token}` : undefined },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Delete failed");
      toast.success("Profile deleted");
      fetchProfiles();
    } catch (err) {
      toast.error(err.message || "Failed to delete profile");
    }
  };

  const approveProfile = async (id) => {
    try {
      const res = await fetch(`${SERVER_URL}/api/leadership/approve/${id}`, {
        method: "PUT",
        headers: { Authorization: token ? `Bearer ${token}` : undefined },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Approve failed");
      toast.success("Profile approved");
      fetchProfiles();
    } catch (err) {
      toast.error(err.message || "Failed to approve");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const fd = new FormData();
      fd.append("name", form.name);
      fd.append("title", form.title);
      fd.append("bio", form.bio);
      // image support (optional) - look for file input with id 'image'
      const fileInput = document.getElementById("leader-image");
      if (fileInput && fileInput.files[0])
        fd.append("image", fileInput.files[0]);

      const url = editing
        ? `${SERVER_URL}/api/leadership/${editing._id}`
        : `${SERVER_URL}/api/leadership`;
      const method = editing ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { Authorization: token ? `Bearer ${token}` : undefined },
        body: fd,
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Save failed");
      toast.success(editing ? "Profile updated" : "Profile created");
      setShowForm(false);
      fetchProfiles();
    } catch (err) {
      toast.error(err.message || "Failed to save profile");
    }
  };

  if (loading) return <AdminLoader message="Loading leadership profiles..." />;

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold">Manage Leadership Profiles</h2>
        <div className="flex gap-2">
          <button
            onClick={createProfile}
            className="px-4 py-2 bg-green-600 text-white rounded"
          >
            New Profile
          </button>
        </div>
      </div>

      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="mb-6 p-4 bg-white rounded shadow"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <input
              required
              placeholder="Full name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="p-2 border rounded"
            />
            <input
              required
              placeholder="Title"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="p-2 border rounded"
            />
            <input
              id="leader-image"
              type="file"
              accept="image/*"
              className="p-2"
            />
            <textarea
              placeholder="Bio"
              value={form.bio}
              onChange={(e) => setForm({ ...form, bio: e.target.value })}
              className="p-2 border rounded md:col-span-2"
            />
          </div>
          <div className="mt-3">
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded"
            >
              Save
            </button>
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="ml-2 px-4 py-2 bg-gray-200 rounded"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {profiles.length === 0 ? (
        <div className="p-6 bg-white rounded shadow">No profiles found.</div>
      ) : (
        <ul className="space-y-3">
          {profiles.map((p) => (
            <li key={p._id} className="p-4 bg-white rounded shadow">
              <div className="flex justify-between items-start">
                <div>
                  <div className="font-semibold">
                    {p.name}{" "}
                    <span className="text-sm text-gray-500">• {p.title}</span>
                  </div>
                  <p className="mt-2 text-sm">{p.bio}</p>
                </div>
                <div className="flex flex-col gap-2">
                  {!p.approved && (
                    <button
                      onClick={() => approveProfile(p._id)}
                      className="text-green-600"
                    >
                      Approve
                    </button>
                  )}
                  <div className="flex gap-2">
                    <button
                      onClick={() => editProfile(p)}
                      className="text-blue-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteProfile(p._id)}
                      className="text-red-600"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ManageProfiles;
