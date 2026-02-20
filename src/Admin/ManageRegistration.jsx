import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import AdminLoader from "./components/AdminLoader";
import {
  CheckCircle,
  Trash2,
  ChevronLeft,
  ChevronRight,
  Pencil,
  X,
  Download,
  TreePine,
} from "lucide-react";

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

function ManageRegistration() {
  const [loading, setLoading] = useState(true);
  const [registrations, setRegistrations] = useState([]);
  const [type, setType] = useState("clubs");

  // --- PAGINATION STATE ---
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // --- EDIT MODAL STATE ---
  const [editingItem, setEditingItem] = useState(null);
  const [editFormData, setEditFormData] = useState({});

  const token = localStorage.getItem("adminToken");

  // 1. Fetch Data
  useEffect(() => {
    const fetchRegs = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          `${SERVER_URL}/api/registrations/${type}?admin=true`,
          {
            headers: { Authorization: token ? `Bearer ${token}` : undefined },
          },
        );
        const data = await res.json();

        if (!res.ok)
          throw new Error(data.message || "Failed to load registrations");

        setRegistrations(Array.isArray(data) ? data : data.data || []);
      } catch (err) {
        toast.error(err.message || "Could not load registrations");
      } finally {
        setLoading(false);
      }
    };

    fetchRegs();
    setCurrentPage(1);
  }, [type, token]);

  // --- PAGINATION LOGIC ---
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = registrations.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(registrations.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // --- EXPORT FUNCTIONALITY ---
  const handleExport = () => {
    if (registrations.length === 0) {
      toast.error("No data to export!");
      return;
    }

    try {
      // 1. Define Headers
      const headers = [
        "ID",
        "Name/Org",
        "Leader/Contact",
        "Email",
        "Phone",
        "Region",
        "Station",
        "Members",
        "Trees",
        "Founded",
        "Approved",
        "Activities",
      ];

      // 2. Format Rows
      const rows = registrations.map((r) => [
        r._id || r.id,
        `"${(r.name || r.clubName || r.organization || "").replace(/"/g, '""')}"`,
        `"${(r.leader || r.contactPerson || "").replace(/"/g, '""')}"`,
        r.email || "",
        `"${(r.phone || r.contact || "").replace(/"/g, '""')}"`,
        `"${(r.region || "").replace(/"/g, '""')}"`,
        `"${(r.station || "").replace(/"/g, '""')}"`,
        r.members || 0,
        r.trees || 0,
        r.founded || "",
        r.approved ? "Yes" : "No",
        `"${(r.activities || "").replace(/"/g, '""')}"`,
      ]);

      const csvContent = [
        headers.join(","),
        ...rows.map((row) => row.join(",")),
      ].join("\n");

      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute(
        "download",
        `${type}_export_${new Date().toISOString().split("T")[0]}.csv`,
      );
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      toast.success("Export downloaded successfully! 📥");
    } catch (error) {
      console.error(error);
      toast.error("Failed to export data");
    }
  };

  // --- EDIT HANDLERS ---
  const openEditModal = (item) => {
    setEditingItem(item);
    setEditFormData({ ...item });
  };

  const closeEditModal = () => {
    setEditingItem(null);
    setEditFormData({});
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    if (!editingItem) return;

    try {
      const res = await fetch(
        `${SERVER_URL}/api/registrations/${type}/${editingItem._id || editingItem.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: token ? `Bearer ${token}` : undefined,
          },
          body: JSON.stringify({ data: editFormData }),
        },
      );

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Update failed");

      toast.success("Updated Successfully! ✏️");

      setRegistrations((prev) =>
        prev.map((r) =>
          r._id === editingItem._id || r.id === editingItem.id
            ? { ...r, ...editFormData }
            : r,
        ),
      );

      closeEditModal();
    } catch (err) {
      toast.error(err.message || "Failed to update");
    }
  };

  // --- EXISTING HANDLERS ---
  const handleApprove = async (id) => {
    try {
      const res = await fetch(`${SERVER_URL}/api/registrations/${type}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? `Bearer ${token}` : undefined,
        },
        body: JSON.stringify({ data: { approved: true } }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Approval failed");

      toast.success("Club Approved Successfully! 🌱");

      setRegistrations((prev) =>
        prev.map((r) =>
          r._id === id || r.id === id ? { ...r, approved: true } : r,
        ),
      );
    } catch (err) {
      toast.error(err.message || "Failed to approve");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Remove this registration?")) return;
    try {
      const res = await fetch(`${SERVER_URL}/api/registrations/${type}/${id}`, {
        method: "DELETE",
        headers: { Authorization: token ? `Bearer ${token}` : undefined },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Delete failed");

      toast.success("Registration removed");

      setRegistrations((s) => s.filter((r) => r._id !== id && r.id !== id));

      if (currentItems.length === 1 && currentPage > 1) {
        setCurrentPage((prev) => prev - 1);
      }
    } catch (err) {
      toast.error(err.message || "Failed to remove");
    }
  };

  if (loading) return <AdminLoader message="Loading registrations..." />;

  return (
    <div className="p-6 relative">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row items-center justify-between mb-6 gap-4">
        <h2 className="text-2xl font-semibold text-gray-800">
          Manage Registrations
        </h2>
        <div className="flex gap-2 items-center w-full md:w-auto">
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="p-2 border border-slate-300 rounded focus:ring-2 focus:ring-blue-500 outline-none"
          >
            <option value="clubs">Clubs</option>
            <option value="volunteers">Volunteers</option>
            <option value="ambassadors">Ambassadors</option>
            <option value="partners">Partners</option>
          </select>

          <button
            onClick={handleExport}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-md text-white rounded transition-colors"
          >
            <Download size={18} /> Export CSV
          </button>
        </div>
      </div>

      {/* List Section */}
      {registrations.length === 0 ? (
        <div className="p-8 text-center bg-white rounded-lg shadow border border-dashed border-gray-300 text-gray-500">
          No registrations found for {type}.
        </div>
      ) : (
        <>
          <ul className="space-y-3 min-h-[400px]">
            {currentItems.map((r) => {
              const id = r._id || r.id;
              const isPendingClub = type === "clubs" && !r.approved;

              return (
                <li
                  key={id}
                  className={`p-4 bg-white rounded-xl shadow-sm border flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 transition-all hover:shadow-md ${
                    isPendingClub
                      ? "border-l-4 border-l-pink-500 border-slate-100"
                      : "border-l-4 border-l-blue-500 border-slate-100"
                  }`}
                >
                  <div className="flex-1 overflow-hidden pr-4 w-full">
                    <div className="font-bold text-gray-800 text-lg">
                      {r.name || r.clubName || r.organization}
                      {type === "clubs" && (
                        <span
                          className={`ml-3 text-xs px-2 py-1 rounded-full ${r.approved ? "bg-blue-100 text-blue-700" : "bg-pink-100 text-pink-700"}`}
                        >
                          {r.approved ? "Approved" : "Pending"}
                        </span>
                      )}
                    </div>
                    <div className="text-sm text-gray-500 mb-3">
                      {[r.email, r.phone || r.contact]
                        .filter(Boolean)
                        .join(" • ")}
                    </div>

                    {/* Expanded Details */}
                    <div className="text-sm text-gray-600 grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1 bg-slate-50 p-3 rounded-lg border border-slate-100 mb-4 sm:mb-0">
                      {type === "clubs" && (
                        <>
                          {r.leader && (
                            <div className="truncate" title={r.leader}>
                              <span className="font-medium text-slate-700">
                                Leader:
                              </span>{" "}
                              {r.leader}
                            </div>
                          )}
                          {r.region && (
                            <div className="truncate" title={r.region}>
                              <span className="font-medium text-slate-700">
                                Region:
                              </span>{" "}
                              {r.region}
                            </div>
                          )}
                          {r.station && (
                            <div className="truncate" title={r.station}>
                              <span className="font-medium text-slate-700">
                                Station:
                              </span>{" "}
                              {r.station}
                            </div>
                          )}
                          {r.founded && (
                            <div className="truncate" title={r.founded}>
                              <span className="font-medium text-slate-700">
                                Founded:
                              </span>{" "}
                              {r.founded}
                            </div>
                          )}
                          {r.members !== undefined && (
                            <div className="truncate" title={r.members}>
                              <span className="font-medium text-slate-700">
                                Members:
                              </span>{" "}
                              {r.members}
                            </div>
                          )}
                          {r.trees !== undefined && (
                            <div className="flex items-center gap-1 text-green-700 truncate">
                              <TreePine size={14} />{" "}
                              <span className="font-medium">Trees:</span>{" "}
                              {r.trees}
                            </div>
                          )}
                          {r.activities && (
                            <div className="sm:col-span-2 mt-1 whitespace-pre-line">
                              <span className="font-medium text-slate-700">
                                Activities:
                              </span>{" "}
                              {r.activities}
                            </div>
                          )}
                        </>
                      )}
                      {type === "volunteers" && (
                        <>
                          {r.region && (
                            <div className="truncate" title={r.region}>
                              <span className="font-medium text-slate-700">
                                Region:
                              </span>{" "}
                              {r.region}
                            </div>
                          )}
                        </>
                      )}
                      {type === "ambassadors" && (
                        <>
                          {r.organization && (
                            <div className="truncate" title={r.organization}>
                              <span className="font-medium text-slate-700">
                                Organization:
                              </span>{" "}
                              {r.organization}
                            </div>
                          )}
                        </>
                      )}
                      {type === "partners" && (
                        <>
                          {r.contactPerson && (
                            <div className="truncate" title={r.contactPerson}>
                              <span className="font-medium text-slate-700">
                                Contact:
                              </span>{" "}
                              {r.contactPerson}
                            </div>
                          )}
                        </>
                      )}
                    </div>
                  </div>

                  <div className="flex gap-3 w-full sm:w-auto self-start mt-2 sm:mt-0">
                    <button
                      onClick={() => openEditModal(r)}
                      className="flex-1 sm:flex-none flex items-center justify-center gap-1 px-3 py-2 bg-blue-50 text-blue-600 border border-blue-100 text-sm rounded hover:bg-blue-100 transition-colors"
                    >
                      <Pencil size={16} /> Edit
                    </button>

                    {isPendingClub && (
                      <button
                        onClick={() => handleApprove(id)}
                        className="flex-1 sm:flex-none flex items-center justify-center gap-1 px-3 py-2 bg-gradient-to-r from-blue-500 to-indigo-500 text-white text-sm rounded hover:from-blue-600 hover:to-indigo-600 transition-colors shadow-sm"
                      >
                        <CheckCircle size={16} /> Approve
                      </button>
                    )}

                    <button
                      onClick={() => handleDelete(id)}
                      className="flex-1 sm:flex-none flex items-center justify-center gap-1 px-3 py-2 bg-red-50 text-red-600 border border-red-100 text-sm rounded hover:bg-red-100 transition-colors"
                    >
                      <Trash2 size={16} /> Remove
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center mt-8 gap-2">
              <button
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
                className="p-2 border rounded-lg hover:bg-slate-100 disabled:opacity-50 disabled:cursor-not-allowed text-slate-600 transition-colors"
              >
                <ChevronLeft size={20} />
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (number) => (
                  <button
                    key={number}
                    onClick={() => paginate(number)}
                    className={`px-4 py-2 rounded border transition-colors ${
                      currentPage === number
                        ? "bg-gradient-to-r from-blue-600 to-pink-600 text-white border-transparent"
                        : "bg-white text-gray-700 border-gray-300 hover:bg-slate-50"
                    }`}
                  >
                    {number}
                  </button>
                ),
              )}

              <button
                onClick={() => paginate(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="p-2 border rounded-lg hover:bg-slate-100 disabled:opacity-50 disabled:cursor-not-allowed text-slate-600 transition-colors"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          )}
        </>
      )}

      {/* --- EDIT MODAL OVERLAY --- */}
      {editingItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="flex justify-between items-center p-4 border-b bg-slate-50 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-pink-500"></div>
              <h3 className="text-xl font-semibold text-gray-800">
                Edit Registration
              </h3>
              <button
                onClick={closeEditModal}
                className="text-gray-500 hover:text-red-500 transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            <form
              onSubmit={handleEditSubmit}
              className="p-6 flex flex-col gap-4 max-h-[70vh] overflow-y-auto"
            >
              {type === "clubs" && (
                <>
                  <div className="flex flex-col gap-1">
                    <label className="text-sm font-medium text-gray-700">
                      School Club Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={editFormData.name || editFormData.clubName || ""}
                      onChange={handleEditChange}
                      className="p-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-sm font-medium text-gray-700">
                      Leader / Patron
                    </label>
                    <input
                      type="text"
                      name="leader"
                      value={editFormData.leader || ""}
                      onChange={handleEditChange}
                      className="p-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-sm font-medium text-gray-700">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={editFormData.email || ""}
                      onChange={handleEditChange}
                      className="p-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-sm font-medium text-gray-700">
                      Phone
                    </label>
                    <input
                      type="text"
                      name="phone"
                      value={editFormData.phone || editFormData.contact || ""}
                      onChange={handleEditChange}
                      className="p-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-sm font-medium text-gray-700">
                      Region
                    </label>
                    <input
                      type="text"
                      name="region"
                      value={editFormData.region || ""}
                      onChange={handleEditChange}
                      className="p-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-sm font-medium text-gray-700">
                      Station / Location
                    </label>
                    <input
                      type="text"
                      name="station"
                      value={editFormData.station || ""}
                      onChange={handleEditChange}
                      className="p-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-sm font-medium text-gray-700">
                      Members Count
                    </label>
                    <input
                      type="number"
                      name="members"
                      value={editFormData.members || 0}
                      onChange={handleEditChange}
                      className="p-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                      <TreePine size={16} className="text-blue-600" />
                      Trees Planted
                    </label>
                    <input
                      type="number"
                      name="trees"
                      value={editFormData.trees || 0}
                      onChange={handleEditChange}
                      className="p-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none bg-blue-50"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-sm font-medium text-gray-700">
                      Founded Year
                    </label>
                    <input
                      type="number"
                      name="founded"
                      value={editFormData.founded || ""}
                      onChange={handleEditChange}
                      className="p-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-sm font-medium text-gray-700">
                      Activities
                    </label>
                    <textarea
                      name="activities"
                      value={editFormData.activities || ""}
                      onChange={handleEditChange}
                      className="p-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none resize-none h-20"
                    />
                  </div>
                </>
              )}
              {type === "volunteers" && (
                <>
                  <div className="flex flex-col gap-1">
                    <label className="text-sm font-medium text-gray-700">
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={editFormData.name || ""}
                      onChange={handleEditChange}
                      className="p-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-sm font-medium text-gray-700">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={editFormData.email || ""}
                      onChange={handleEditChange}
                      className="p-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-sm font-medium text-gray-700">
                      Phone
                    </label>
                    <input
                      type="text"
                      name="phone"
                      value={editFormData.phone || editFormData.contact || ""}
                      onChange={handleEditChange}
                      className="p-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-sm font-medium text-gray-700">
                      Region
                    </label>
                    <input
                      type="text"
                      name="region"
                      value={editFormData.region || ""}
                      onChange={handleEditChange}
                      className="p-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                  </div>
                </>
              )}
              {type === "ambassadors" && (
                <>
                  <div className="flex flex-col gap-1">
                    <label className="text-sm font-medium text-gray-700">
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={editFormData.name || ""}
                      onChange={handleEditChange}
                      className="p-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-sm font-medium text-gray-700">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={editFormData.email || ""}
                      onChange={handleEditChange}
                      className="p-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-sm font-medium text-gray-700">
                      School / Organization
                    </label>
                    <input
                      type="text"
                      name="organization"
                      value={editFormData.organization || ""}
                      onChange={handleEditChange}
                      className="p-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                  </div>
                </>
              )}
              {type === "partners" && (
                <>
                  <div className="flex flex-col gap-1">
                    <label className="text-sm font-medium text-gray-700">
                      Organization Name
                    </label>
                    <input
                      type="text"
                      name="organization"
                      value={editFormData.organization || ""}
                      onChange={handleEditChange}
                      className="p-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-sm font-medium text-gray-700">
                      Contact Person
                    </label>
                    <input
                      type="text"
                      name="contactPerson"
                      value={editFormData.contactPerson || ""}
                      onChange={handleEditChange}
                      className="p-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-sm font-medium text-gray-700">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={editFormData.email || ""}
                      onChange={handleEditChange}
                      className="p-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-sm font-medium text-gray-700">
                      Phone
                    </label>
                    <input
                      type="text"
                      name="phone"
                      value={editFormData.phone || editFormData.contact || ""}
                      onChange={handleEditChange}
                      className="p-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                  </div>
                </>
              )}

              <div className="pt-4 flex gap-3 justify-end border-t mt-2">
                <button
                  type="button"
                  onClick={closeEditModal}
                  className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-blue-600 text-white font-medium rounded hover:bg-blue-700 transition-colors"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default ManageRegistration;
