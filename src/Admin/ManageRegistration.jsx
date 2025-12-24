import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import AdminLoader from "./components/AdminLoader";
import { CheckCircle, Trash2, ChevronLeft, ChevronRight, Pencil, X, Download, TreePine } from "lucide-react"; 

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
        const res = await fetch(`${SERVER_URL}/api/registrations/${type}?admin=true`, {
          headers: { Authorization: token ? `Bearer ${token}` : undefined },
        });
        const data = await res.json();
        
        if (!res.ok) throw new Error(data.message || "Failed to load registrations");
        
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
      const headers = ["ID", "Name/Org", "Email", "Contact", "Members", "Trees", "Founded", "Approved"];
      
      // 2. Format Rows
      const rows = registrations.map(r => [
        r._id || r.id,
        `"${(r.name || r.clubName || r.organization || "").replace(/"/g, '""')}"`, 
        r.email || "",
        `"${(r.phone || r.contact || "").replace(/"/g, '""')}"`,
        r.members || 0,
        r.trees || 0, // Export trees count
        r.founded || "",
        r.approved ? "Yes" : "No"
      ]);

      const csvContent = [
        headers.join(","), 
        ...rows.map(row => row.join(","))
      ].join("\n");

      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `${type}_export_${new Date().toISOString().split('T')[0]}.csv`);
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
    setEditFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    if (!editingItem) return;

    try {
      const res = await fetch(`${SERVER_URL}/api/registrations/${type}/${editingItem._id || editingItem.id}`, {
        method: "PUT",
        headers: { 
          "Content-Type": "application/json",
          Authorization: token ? `Bearer ${token}` : undefined 
        },
        body: JSON.stringify({ data: editFormData }) 
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Update failed");

      toast.success("Updated Successfully! ✏️");
      
      setRegistrations(prev => prev.map(r => 
        (r._id === editingItem._id || r.id === editingItem.id) ? { ...r, ...editFormData } : r
      ));
      
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
          Authorization: token ? `Bearer ${token}` : undefined 
        },
        body: JSON.stringify({ data: { approved: true } })
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Approval failed");

      toast.success("Club Approved Successfully! 🌱");

      setRegistrations((prev) => 
        prev.map((r) => (r._id === id || r.id === id ? { ...r, approved: true } : r))
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
        setCurrentPage(prev => prev - 1);
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
        <h2 className="text-2xl font-semibold text-gray-800">Manage Registrations</h2>
        <div className="flex gap-2 items-center w-full md:w-auto">
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="p-2 border border-gray-300 rounded focus:ring-2 focus:ring-green-500 outline-none"
          >
            <option value="clubs">Clubs</option>
            <option value="volunteers">Volunteers</option>
            <option value="ambassadors">Ambassadors</option>
            <option value="partners">Partners</option>
          </select>
          
          <button
            onClick={handleExport}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded transition-colors"
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
                  className={`p-4 bg-white rounded-lg shadow-sm border border-gray-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 transition-all hover:shadow-md ${
                    isPendingClub ? "border-l-4 border-l-amber-400" : "border-l-4 border-l-green-500"
                  }`}
                >
                  <div>
                    <div className="font-bold text-gray-800 text-lg">
                      {r.name || r.clubName || r.organization}
                      {type === "clubs" && (
                        <span className={`ml-3 text-xs px-2 py-1 rounded-full ${r.approved ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"}`}>
                          {r.approved ? "Approved" : "Pending"}
                        </span>
                      )}
                    </div>
                    <div className="text-sm text-gray-500">
                      {r.email || r.contact || r.phone}
                    </div>
                    {/* Show stats snippet if Club */}
                    {type === "clubs" && (
                      <div className="flex gap-3 mt-1 text-xs text-gray-500">
                        <span>Members: {r.members || 0}</span>
                        <span className="flex items-center gap-1"><TreePine size={12}/> Trees: {r.trees || 0}</span>
                      </div>
                    )}
                  </div>

                  <div className="flex gap-3 w-full sm:w-auto">
                      <button
                      onClick={() => openEditModal(r)}
                      className="flex-1 sm:flex-none flex items-center justify-center gap-1 px-3 py-2 bg-blue-50 text-blue-600 border border-blue-100 text-sm rounded hover:bg-blue-100 transition-colors"
                    >
                      <Pencil size={16} /> Edit
                    </button>

                    {isPendingClub && (
                      <button
                        onClick={() => handleApprove(id)}
                        className="flex-1 sm:flex-none flex items-center justify-center gap-1 px-3 py-2 bg-green-600 text-white text-sm rounded hover:bg-green-700 transition-colors"
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
                className="p-2 border rounded hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronLeft size={20} />
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
                <button
                  key={number}
                  onClick={() => paginate(number)}
                  className={`px-4 py-2 rounded border transition-colors ${
                    currentPage === number
                      ? "bg-green-600 text-white border-green-600"
                      : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                  }`}
                >
                  {number}
                </button>
              ))}

              <button
                onClick={() => paginate(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="p-2 border rounded hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          )}
        </>
      )}

      {/* --- EDIT MODAL OVERLAY --- */}
      {editingItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="flex justify-between items-center p-4 border-b bg-gray-50">
              <h3 className="text-xl font-semibold text-gray-800">Edit Registration</h3>
              <button onClick={closeEditModal} className="text-gray-500 hover:text-red-500 transition-colors">
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleEditSubmit} className="p-6 flex flex-col gap-4 max-h-[70vh] overflow-y-auto">
              
              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-gray-700">Name / Org</label>
                <input 
                  type="text" 
                  name={editFormData.clubName !== undefined ? "clubName" : editFormData.organization !== undefined ? "organization" : "name"}
                  value={editFormData.clubName || editFormData.organization || editFormData.name || ""} 
                  onChange={handleEditChange} 
                  className="p-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-gray-700">Email</label>
                <input 
                  type="email" 
                  name="email" 
                  value={editFormData.email || ""} 
                  onChange={handleEditChange} 
                  className="p-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              {(editFormData.phone || editFormData.contact) && (
                <div className="flex flex-col gap-1">
                  <label className="text-sm font-medium text-gray-700">Phone / Contact</label>
                  <input 
                    type="text" 
                    name={editFormData.phone !== undefined ? "phone" : "contact"}
                    value={editFormData.phone || editFormData.contact || ""} 
                    onChange={handleEditChange} 
                    className="p-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
              )}

               {type === "clubs" && (
                <>
                  <div className="flex flex-col gap-1">
                    <label className="text-sm font-medium text-gray-700">Members Count</label>
                    <input 
                      type="number" 
                      name="members" 
                      value={editFormData.members || 0} 
                      onChange={handleEditChange} 
                      className="p-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                  </div>

                  {/* --- NEW: Trees Planted Input --- */}
                  <div className="flex flex-col gap-1">
                    <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                      <TreePine size={16} className="text-green-600"/> 
                      Trees Planted
                    </label>
                    <input 
                      type="number" 
                      name="trees" 
                      value={editFormData.trees || 0} 
                      onChange={handleEditChange} 
                      className="p-2 border rounded focus:ring-2 focus:ring-green-500 outline-none bg-green-50"
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                      <label className="text-sm font-medium text-gray-700">Founded Year</label>
                      <input 
                        type="number" 
                        name="founded" 
                        value={editFormData.founded || ""} 
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