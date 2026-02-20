import React, { useEffect, useState, useRef } from "react";
import toast from "react-hot-toast";
import {
  Plus,
  Edit2,
  Trash2,
  CheckCircle,
  UploadCloud,
  X,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Loader2, // Imported Loader icon
} from "lucide-react";
import AdminLoader from "./components/AdminLoader";

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

function ManageProfiles() {
  const [loading, setLoading] = useState(true);
  const [profiles, setProfiles] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);

  // New State for button loading/disabling
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form State
  const [form, setForm] = useState({
    name: "",
    role: "",
    socials: { facebook: "", twitter: "", instagram: "", linkedin: "" },
  });
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);

  const token = localStorage.getItem("adminToken");

  // --- FETCH PROFILES ---
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

  // --- FORM HANDLERS ---
  const resetForm = () => {
    setEditing(null);
    setForm({
      name: "",
      role: "",
      socials: { facebook: "", twitter: "", instagram: "", linkedin: "" },
    });
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
    setShowForm(false);
    setIsSubmitting(false); // Reset submit state just in case
  };

  const openCreate = () => {
    resetForm();
    setShowForm(true);
  };

  const openEdit = (p) => {
    setEditing(p);
    setForm({
      name: p.name || "",
      role: p.role || "",
      socials: {
        facebook: p.socials?.facebook || "",
        twitter: p.socials?.twitter || "",
        instagram: p.socials?.instagram || "",
        linkedin: p.socials?.linkedin || "",
      },
    });
    setImagePreview(p.imageUrl);
    setShowForm(true);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prevent double submission if already submitting
    if (isSubmitting) return;

    setIsSubmitting(true); // Disable button & show loader
    const toastId = toast.loading(
      editing ? "Updating profile..." : "Creating profile...",
    );

    try {
      const fd = new FormData();
      fd.append("name", form.name);
      fd.append("role", form.role);
      fd.append("socials", JSON.stringify(form.socials));

      const file = fileInputRef.current?.files[0];
      if (file) {
        fd.append("image", file);
      }

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

      toast.success(editing ? "Profile updated" : "Profile created", {
        id: toastId,
      });
      resetForm();
      fetchProfiles();
    } catch (err) {
      toast.error(err.message || "Failed to save profile", { id: toastId });
    } finally {
      setIsSubmitting(false); // Re-enable button
    }
  };

  // --- ACTIONS ---
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this profile permanently?")) return;
    try {
      const res = await fetch(`${SERVER_URL}/api/leadership/${id}`, {
        method: "DELETE",
        headers: { Authorization: token ? `Bearer ${token}` : undefined },
      });
      if (!res.ok) throw new Error("Delete failed");
      toast.success("Profile deleted");
      fetchProfiles();
    } catch (err) {
      toast.error(err.message || "Failed to delete");
    }
  };

  const handleApprove = async (id) => {
    try {
      const res = await fetch(`${SERVER_URL}/api/leadership/approve/${id}`, {
        method: "PUT",
        headers: { Authorization: token ? `Bearer ${token}` : undefined },
      });
      if (!res.ok) throw new Error("Approve failed");
      toast.success("Profile approved active");
      fetchProfiles();
    } catch (err) {
      toast.error(err.message || "Failed to approve");
    }
  };

  if (loading) return <AdminLoader message="Loading leadership profiles..." />;

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Leadership Team</h2>
          <p className="text-gray-500 text-sm">
            Manage profiles displayed on the public "Meet the Team" page.
          </p>
        </div>
        <button
          onClick={openCreate}
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 transition shadow-md font-medium"
        >
          <Plus size={18} /> Add Leader
        </button>
      </div>

      {/* --- FORM MODAL --- */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl animate-in fade-in zoom-in duration-200 my-8">
            <div className="flex justify-between items-center p-5 border-b">
              <h3 className="text-xl font-bold text-gray-800">
                {editing ? "Edit Profile" : "New Team Member"}
              </h3>
              <button
                onClick={resetForm}
                className="text-gray-400 hover:text-red-500"
              >
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Left Col: Image */}
                <div className="md:col-span-1 flex flex-col items-center gap-3">
                  <div
                    onClick={() => fileInputRef.current.click()}
                    className="w-full aspect-square bg-gray-100 rounded-xl border-2 border-dashed border-gray-300 flex items-center justify-center cursor-pointer hover:bg-gray-50 overflow-hidden relative"
                  >
                    {imagePreview ? (
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="text-center p-4">
                        <UploadCloud className="mx-auto text-gray-400 mb-2" />
                        <span className="text-xs text-gray-500">
                          Upload Photo
                        </span>
                      </div>
                    )}
                  </div>
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleImageChange}
                    className="hidden"
                    accept="image/*"
                  />
                  <p className="text-xs text-gray-400 text-center">
                    Click to change image
                  </p>
                </div>

                {/* Right Col: Details */}
                <div className="md:col-span-2 space-y-4">
                  <div>
                    <label className="text-xs font-bold text-gray-500 uppercase">
                      Full Name
                    </label>
                    <input
                      required
                      value={form.name}
                      onChange={(e) =>
                        setForm({ ...form, name: e.target.value })
                      }
                      className="w-full mt-1 p-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none bg-slate-50"
                      placeholder="e.g. John Doe"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-gray-500 uppercase">
                      Role / Title
                    </label>
                    <input
                      required
                      value={form.role}
                      onChange={(e) =>
                        setForm({ ...form, role: e.target.value })
                      }
                      className="w-full mt-1 p-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none bg-slate-50"
                      placeholder="e.g. Regional Director"
                    />
                  </div>

                  <div className="pt-2">
                    <label className="text-xs font-bold text-gray-500 uppercase mb-2 block">
                      Social Links (Optional)
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="flex items-center border rounded px-2 bg-gray-50">
                        <Facebook size={16} className="text-blue-600" />
                        <input
                          value={form.socials.facebook}
                          onChange={(e) =>
                            setForm({
                              ...form,
                              socials: {
                                ...form.socials,
                                facebook: e.target.value,
                              },
                            })
                          }
                          className="w-full p-2 bg-transparent text-sm outline-none"
                          placeholder="Facebook URL"
                        />
                      </div>
                      <div className="flex items-center border rounded px-2 bg-gray-50">
                        <Twitter size={16} className="text-sky-500" />
                        <input
                          value={form.socials.twitter}
                          onChange={(e) =>
                            setForm({
                              ...form,
                              socials: {
                                ...form.socials,
                                twitter: e.target.value,
                              },
                            })
                          }
                          className="w-full p-2 bg-transparent text-sm outline-none"
                          placeholder="Twitter URL"
                        />
                      </div>
                      <div className="flex items-center border rounded px-2 bg-gray-50">
                        <Instagram size={16} className="text-pink-600" />
                        <input
                          value={form.socials.instagram}
                          onChange={(e) =>
                            setForm({
                              ...form,
                              socials: {
                                ...form.socials,
                                instagram: e.target.value,
                              },
                            })
                          }
                          className="w-full p-2 bg-transparent text-sm outline-none"
                          placeholder="Instagram URL"
                        />
                      </div>
                      <div className="flex items-center border rounded px-2 bg-gray-50">
                        <Linkedin size={16} className="text-blue-700" />
                        <input
                          value={form.socials.linkedin}
                          onChange={(e) =>
                            setForm({
                              ...form,
                              socials: {
                                ...form.socials,
                                linkedin: e.target.value,
                              },
                            })
                          }
                          className="w-full p-2 bg-transparent text-sm outline-none"
                          placeholder="LinkedIn URL"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-4 flex justify-end gap-3 border-t">
                <button
                  type="button"
                  onClick={resetForm}
                  disabled={isSubmitting}
                  className="px-5 py-2 text-gray-600 hover:bg-gray-100 rounded-lg disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`px-6 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 shadow-md flex items-center gap-2 ${isSubmitting ? "opacity-70 cursor-not-allowed" : ""}`}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="animate-spin" size={18} /> Saving...
                    </>
                  ) : (
                    "Save Profile"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* --- PROFILES GRID --- */}
      {profiles.length === 0 ? (
        <div className="p-12 text-center bg-white rounded-xl border border-dashed border-gray-300 text-gray-400">
          No leadership profiles found.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {profiles.map((p) => (
            <div
              key={p._id}
              className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow group"
            >
              {/* Image Header */}
              <div className="h-48 w-full bg-gray-100 relative overflow-hidden">
                {p.imageUrl ? (
                  <img
                    src={p.imageUrl}
                    alt={p.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400">
                    No Image
                  </div>
                )}
                {/* Status Badge */}
                <div className="absolute top-2 right-2">
                  <span
                    className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wide shadow-sm ${p.approved ? "bg-blue-100 text-blue-700" : "bg-pink-100 text-pink-700"}`}
                  >
                    {p.approved ? "Active" : "Pending"}
                  </span>
                </div>
              </div>

              {/* Info Body */}
              <div className="p-4 text-center">
                <h3 className="font-bold text-gray-800 text-lg">{p.name}</h3>
                <p className="text-sm text-blue-600 font-medium mb-3">
                  {p.role}
                </p>

                {/* Social Icons Preview */}
                <div className="flex justify-center gap-3 text-gray-400 pb-4 border-b border-gray-100">
                  {p.socials?.facebook && <Facebook size={14} />}
                  {p.socials?.twitter && <Twitter size={14} />}
                  {p.socials?.instagram && <Instagram size={14} />}
                  {p.socials?.linkedin && <Linkedin size={14} />}
                </div>

                {/* Actions */}
                <div className="flex justify-center gap-2 mt-4">
                  {!p.approved && (
                    <button
                      onClick={() => handleApprove(p._id)}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
                      title="Approve"
                    >
                      <CheckCircle size={18} />
                    </button>
                  )}
                  <button
                    onClick={() => openEdit(p)}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
                    title="Edit"
                  >
                    <Edit2 size={18} />
                  </button>
                  <button
                    onClick={() => handleDelete(p._id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-full transition-colors"
                    title="Delete"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ManageProfiles;
