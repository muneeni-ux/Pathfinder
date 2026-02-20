import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import AdminLoader from "./components/AdminLoader";
import {
  TreePine,
  Trophy,
  Plus,
  MapPin,
  Edit2,
  Trash2,
  BarChart3,
  X,
} from "lucide-react";

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

function ManageTracker() {
  const [loading, setLoading] = useState(true);
  const [tracker, setTracker] = useState({ totalTrees: 0, conferences: [] });

  // Forms State
  const [isConfModalOpen, setIsConfModalOpen] = useState(false);
  const [isStationModalOpen, setIsStationModalOpen] = useState(false);

  // Data State for Forms
  const [confForm, setConfForm] = useState({ name: "", regionType: "" });
  const [editingConf, setEditingConf] = useState(null);

  const [stationForm, setStationForm] = useState({
    name: "",
    treesPlanted: 0,
    conference: "",
  });
  const [editingStation, setEditingStation] = useState(null);

  const token = localStorage.getItem("adminToken");

  // --- FETCH DATA ---
  const fetchTracker = async () => {
    try {
      // Don't set global loading on refetch to prevent UI flicker
      if (!tracker.conferences.length) setLoading(true);

      const res = await fetch(`${SERVER_URL}/api/tracker`, {
        headers: { Authorization: token ? `Bearer ${token}` : undefined },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to load tracker");
      setTracker(data);
    } catch (err) {
      toast.error(err.message || "Could not load tracker data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTracker();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // --- HANDLERS: CONFERENCE ---
  const handleConfSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = editingConf
        ? `${SERVER_URL}/api/tracker/conference/${editingConf._id}`
        : `${SERVER_URL}/api/tracker/conference`;
      const method = editingConf ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? `Bearer ${token}` : undefined,
        },
        body: JSON.stringify(confForm),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to save conference");

      toast.success(editingConf ? "Conference updated" : "Conference created");
      closeConfModal();
      fetchTracker();
    } catch (err) {
      toast.error(err.message || "Save failed");
    }
  };

  const handleConfDelete = async (id) => {
    if (
      !window.confirm(
        "Delete this conference? All associated stations will be lost.",
      )
    )
      return;
    try {
      const res = await fetch(`${SERVER_URL}/api/tracker/conference/${id}`, {
        method: "DELETE",
        headers: { Authorization: token ? `Bearer ${token}` : undefined },
      });
      if (!res.ok) throw new Error("Delete failed");
      toast.success("Conference deleted");
      fetchTracker();
    } catch (err) {
      toast.error(err.message || "Failed to delete");
    }
  };

  // --- HANDLERS: STATION ---
  const handleStationSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = editingStation
        ? `${SERVER_URL}/api/tracker/station/${editingStation._id}`
        : `${SERVER_URL}/api/tracker/station`;
      const method = editingStation ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? `Bearer ${token}` : undefined,
        },
        body: JSON.stringify(stationForm),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to save station");

      toast.success(editingStation ? "Station updated" : "Station created");
      closeStationModal();
      fetchTracker();
    } catch (err) {
      toast.error(err.message || "Operation failed");
    }
  };

  const handleStationDelete = async (id) => {
    if (!window.confirm("Delete this station?")) return;
    try {
      const res = await fetch(`${SERVER_URL}/api/tracker/station/${id}`, {
        method: "DELETE",
        headers: { Authorization: token ? `Bearer ${token}` : undefined },
      });
      if (!res.ok) throw new Error("Delete failed");
      toast.success("Station deleted");
      fetchTracker();
    } catch (err) {
      toast.error(err.message || "Failed to delete");
    }
  };

  // --- HELPER FUNCTIONS ---
  const openConfModal = (conf = null) => {
    if (conf) {
      setEditingConf(conf);
      setConfForm({ name: conf.name, regionType: conf.regionType || "" });
    } else {
      setEditingConf(null);
      setConfForm({ name: "", regionType: "" });
    }
    setIsConfModalOpen(true);
  };

  const closeConfModal = () => {
    setIsConfModalOpen(false);
    setEditingConf(null);
  };

  const openStationModal = (station = null, preSelectedConfId = "") => {
    if (station) {
      setEditingStation(station);
      setStationForm({
        name: station.name,
        treesPlanted: station.treesPlanted,
        conference: station.conference || preSelectedConfId, // Ensure ID is passed if available
      });
    } else {
      setEditingStation(null);
      setStationForm({
        name: "",
        treesPlanted: 0,
        conference: preSelectedConfId, // Pre-fill conference if clicked from card
      });
    }
    setIsStationModalOpen(true);
  };

  const closeStationModal = () => {
    setIsStationModalOpen(false);
    setEditingStation(null);
  };

  if (loading) return <AdminLoader message="Loading tracker data..." />;

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* --- DASHBOARD HEADER --- */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-3xl font-bold text-slate-800 flex items-center gap-2">
              <BarChart3 className="text-blue-600" /> Impact Tracker
            </h2>
            <p className="text-slate-500 mt-1">
              Manage tree planting progress across all regions.
            </p>
          </div>

          <div className="flex gap-3">
            {/* Global Add Buttons */}
            <button
              onClick={() => openConfModal()}
              className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg shadow-sm hover:bg-gray-50 transition-all font-medium"
            >
              <Plus size={18} /> New Conference
            </button>
            <button
              onClick={() => openStationModal()}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl shadow-md hover:from-blue-700 hover:to-indigo-700 transition-all font-medium"
            >
              <Plus size={18} /> New Station
            </button>
          </div>
        </div>

        {/* --- STATS CARDS --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          <div className="bg-gradient-to-br from-blue-600 to-pink-600 rounded-2xl p-6 text-white shadow-lg">
            <div className="flex items-center gap-3 mb-2">
              <TreePine size={24} className="text-blue-100" />
              <span className="font-medium text-blue-50">
                Total Trees Planted
              </span>
            </div>
            <div className="text-4xl font-bold">
              {tracker.totalTrees.toLocaleString()}
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100">
            <div className="flex items-center gap-3 mb-2">
              <Trophy size={24} className="text-pink-500" />
              <span className="font-medium text-slate-500">Leading Region</span>
            </div>
            <div className="text-2xl font-bold text-slate-800">
              {tracker.conferences[0]?.name || "N/A"}
            </div>
            <div className="text-sm text-blue-600 font-semibold mt-1">
              {tracker.conferences[0]?.trees.toLocaleString() || 0} trees
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100">
            <div className="flex items-center gap-3 mb-2">
              <MapPin size={24} className="text-blue-500" />
              <span className="font-medium text-gray-500">
                Active Conferences
              </span>
            </div>
            <div className="text-4xl font-bold text-gray-800">
              {tracker.conferences.length}
            </div>
          </div>
        </div>
      </div>

      {/* --- CONFERENCE RANKINGS & LIST --- */}
      <div className="space-y-6">
        <h3 className="text-xl font-semibold text-gray-700 ml-1">
          Conference Rankings
        </h3>

        {tracker.conferences.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-xl border border-dashed border-gray-300 text-gray-500">
            No conferences found. Start by creating one!
          </div>
        ) : (
          tracker.conferences.map((conf, index) => (
            <div
              key={conf._id}
              className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
            >
              {/* Card Header */}
              <div className="bg-gray-50/50 p-4 border-b border-gray-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="flex items-center gap-4">
                  {/* Rank Badge */}
                  <div
                    className={`flex items-center justify-center w-10 h-10 rounded-full font-bold text-lg 
                    ${
                      index === 0
                        ? "bg-pink-100 text-pink-600 border border-pink-200"
                        : index === 1
                          ? "bg-slate-200 text-slate-600 border border-slate-300"
                          : index === 2
                            ? "bg-blue-100 text-blue-600 border border-blue-200"
                            : "bg-slate-100 text-slate-500"
                    }`}
                  >
                    #{index + 1}
                  </div>

                  <div>
                    <h4 className="text-lg font-bold text-gray-800">
                      {conf.name}
                    </h4>
                    <div className="flex gap-3 text-xs text-gray-500">
                      <span className="bg-blue-50 text-blue-700 px-2 py-0.5 rounded border border-blue-100">
                        {conf.regionType || "Region"}
                      </span>
                      <span className="flex items-center gap-1">
                        <TreePine size={12} /> Total:{" "}
                        {conf.trees.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => openStationModal(null, conf._id)}
                    className="text-xs font-medium px-3 py-1.5 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 border border-blue-200 transition-colors"
                  >
                    + Add Station
                  </button>
                  <button
                    onClick={() => openConfModal(conf)}
                    className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded"
                  >
                    <Edit2 size={16} />
                  </button>
                  <button
                    onClick={() => handleConfDelete(conf._id)}
                    className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>

              {/* Stations List */}
              <div className="p-4 bg-white">
                {conf.stations && conf.stations.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {conf.stations.map((st) => (
                      <div
                        key={st._id}
                        className="group flex justify-between items-center p-3 rounded-xl border border-slate-100 bg-slate-50/30 hover:bg-blue-50/50 hover:border-blue-200 transition-all"
                      >
                        <div className="flex-1">
                          <div className="font-semibold text-gray-700 text-sm">
                            {st.name}
                          </div>
                          <div className="text-xs text-gray-500 font-mono mt-0.5">
                            {st.treesPlanted.toLocaleString()} trees
                          </div>
                        </div>

                        {/* Quick Action Button */}
                        <div className="flex gap-2">
                          <button
                            onClick={() =>
                              openStationModal({ ...st, conference: conf._id })
                            } // Pass conf ID for update context
                            className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium bg-white border border-slate-200 text-slate-600 rounded-lg shadow-sm hover:border-blue-400 hover:text-blue-700 transition-colors"
                          >
                            Update <Edit2 size={12} className="ml-1" />
                          </button>
                          <button
                            onClick={() => handleStationDelete(st._id)}
                            className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium bg-white border border-gray-200 text-red-600 rounded hover:bg-red-50 transition-colors"
                            title="Delete Station"
                          >
                            Delete <Trash2 size={12} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-sm text-gray-400 italic pl-2">
                    No stations added yet.
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {/* --- MODAL: CONFERENCE --- */}
      {isConfModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="flex justify-between items-center p-4 border-b bg-gray-50">
              <h3 className="font-semibold text-gray-800">
                {editingConf ? "Edit Conference" : "New Conference"}
              </h3>
              <button onClick={closeConfModal}>
                <X size={20} className="text-gray-400 hover:text-red-500" />
              </button>
            </div>
            <form onSubmit={handleConfSubmit} className="p-6 space-y-4">
              <div>
                <label className="text-xs font-bold text-gray-500 uppercase">
                  Conference Name
                </label>
                <input
                  required
                  value={confForm.name}
                  onChange={(e) =>
                    setConfForm({ ...confForm, name: e.target.value })
                  }
                  className="w-full mt-1 p-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none bg-slate-50"
                  placeholder="e.g. Rift Valley Conference"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-gray-500 uppercase">
                  Region / Type
                </label>
                <input
                  value={confForm.regionType}
                  onChange={(e) =>
                    setConfForm({ ...confForm, regionType: e.target.value })
                  }
                  className="w-full mt-1 p-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none bg-slate-50"
                  placeholder="e.g. Highland"
                />
              </div>
              <button
                type="submit"
                className="w-full py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-medium shadow-md hover:from-blue-700 hover:to-indigo-700 transition-all"
              >
                Save Conference
              </button>
            </form>
          </div>
        </div>
      )}

      {/* --- MODAL: STATION (Handles Updates & Creation) --- */}
      {isStationModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="flex justify-between items-center p-4 border-b bg-gray-50">
              <h3 className="font-semibold text-gray-800">
                {editingStation
                  ? `Update: ${editingStation.name}`
                  : "Add New Station"}
              </h3>
              <button onClick={closeStationModal}>
                <X size={20} className="text-gray-400 hover:text-red-500" />
              </button>
            </div>
            <form onSubmit={handleStationSubmit} className="p-6 space-y-4">
              {/* Only show Name/Conference inputs if creating new or full edit, 
                  For quick updates, you might just want the number, but here we show all for flexibility */}
              <div>
                <label className="text-xs font-bold text-gray-500 uppercase">
                  Station Name
                </label>
                <input
                  required
                  value={stationForm.name}
                  onChange={(e) =>
                    setStationForm({ ...stationForm, name: e.target.value })
                  }
                  className="w-full mt-1 p-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none bg-slate-50"
                  placeholder="e.g. Nanyuki Central"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-gray-500 uppercase">
                  Assigned Conference
                </label>
                <select
                  required
                  value={stationForm.conference}
                  onChange={(e) =>
                    setStationForm({
                      ...stationForm,
                      conference: e.target.value,
                    })
                  }
                  className="w-full mt-1 p-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none bg-slate-50"
                >
                  <option value="">Select Conference</option>
                  {tracker.conferences.map((c) => (
                    <option key={c._id} value={c._id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
                <label className="text-xs font-bold text-blue-700 uppercase flex items-center gap-1">
                  <TreePine size={14} /> Trees Planted (Current Count)
                </label>
                <input
                  type="number"
                  min="0"
                  required
                  value={stationForm.treesPlanted}
                  onChange={(e) =>
                    setStationForm({
                      ...stationForm,
                      treesPlanted: Number(e.target.value),
                    })
                  }
                  className="w-full mt-2 p-3 text-xl font-bold text-center border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-blue-800 bg-white"
                />
                <p className="text-xs text-center text-blue-600 mt-2">
                  Update this number to reflect total trees.
                </p>
              </div>

              <button
                type="submit"
                className="w-full py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl shadow-md font-medium hover:from-blue-700 hover:to-indigo-700 transition-all flex items-center justify-center"
              >
                {editingStation ? "Update Station Data" : "Create Station"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default ManageTracker;
