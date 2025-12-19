import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import AdminLoader from "./components/AdminLoader";

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

function ManageTracker() {
  const [loading, setLoading] = useState(true);
  const [tracker, setTracker] = useState({ totalTrees: 0, conferences: [] });
  const [showConfForm, setShowConfForm] = useState(false);
  const [confForm, setConfForm] = useState({ name: "", regionType: "" });
  const [editingConf, setEditingConf] = useState(null);
  const [stationForm, setStationForm] = useState({
    name: "",
    treesPlanted: 0,
    conference: "",
  });
  const [showStationForm, setShowStationForm] = useState(false);
  const token = localStorage.getItem("adminToken");

  const fetchTracker = async () => {
    try {
      setLoading(true);
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
      setShowConfForm(false);
      setEditingConf(null);
      setConfForm({ name: "", regionType: "" });
      fetchTracker();
    } catch (err) {
      toast.error(err.message || "Save failed");
    }
  };

  const handleConfDelete = async (id) => {
    if (!window.confirm("Delete this conference?")) return;
    try {
      const res = await fetch(`${SERVER_URL}/api/tracker/conference/${id}`, {
        method: "DELETE",
        headers: { Authorization: token ? `Bearer ${token}` : undefined },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Delete failed");
      toast.success("Conference deleted");
      fetchTracker();
    } catch (err) {
      toast.error(err.message || "Failed to delete conference");
    }
  };

  const openEditConf = (c) => {
    setEditingConf(c);
    setConfForm({ name: c.name, regionType: c.regionType || "" });
    setShowConfForm(true);
  };

  const handleStationSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${SERVER_URL}/api/tracker/station`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? `Bearer ${token}` : undefined,
        },
        body: JSON.stringify(stationForm),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to create station");
      toast.success("Station created");
      setShowStationForm(false);
      setStationForm({ name: "", treesPlanted: 0, conference: "" });
      fetchTracker();
    } catch (err) {
      toast.error(err.message || "Failed to create station");
    }
  };

  const handleStationDelete = async (id) => {
    if (!window.confirm("Delete this station?")) return;
    try {
      const res = await fetch(`${SERVER_URL}/api/tracker/station/${id}`, {
        method: "DELETE",
        headers: { Authorization: token ? `Bearer ${token}` : undefined },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Delete failed");
      toast.success("Station deleted");
      fetchTracker();
    } catch (err) {
      toast.error(err.message || "Failed to delete station");
    }
  };

  if (loading) return <AdminLoader message="Loading tracker entries..." />;

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">Manage Tracker</h2>
        <div className="flex gap-2">
          <button
            onClick={() => {
              setEditingConf(null);
              setConfForm({ name: "", regionType: "" });
              setShowConfForm(true);
            }}
            className="px-4 py-2 bg-green-600 text-white rounded"
          >
            New Conference
          </button>
          <button
            onClick={() => setShowStationForm((s) => !s)}
            className="px-4 py-2 bg-amber-500 text-white rounded"
          >
            Add Station
          </button>
        </div>
      </div>

      {/* Conference form */}
      {showConfForm && (
        <form
          onSubmit={handleConfSubmit}
          className="mb-4 p-4 bg-white rounded shadow"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <input
              required
              placeholder="Conference name"
              value={confForm.name}
              onChange={(e) =>
                setConfForm({ ...confForm, name: e.target.value })
              }
              className="p-2 border rounded"
            />
            <input
              placeholder="Region type"
              value={confForm.regionType}
              onChange={(e) =>
                setConfForm({ ...confForm, regionType: e.target.value })
              }
              className="p-2 border rounded"
            />
          </div>
          <div className="mt-2">
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded"
            >
              Save
            </button>
            <button
              type="button"
              onClick={() => {
                setShowConfForm(false);
                setEditingConf(null);
              }}
              className="ml-2 px-4 py-2 bg-gray-200 rounded"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {/* Station form */}
      {showStationForm && (
        <form
          onSubmit={handleStationSubmit}
          className="mb-4 p-4 bg-white rounded shadow"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
            <input
              required
              placeholder="Station name"
              value={stationForm.name}
              onChange={(e) =>
                setStationForm({ ...stationForm, name: e.target.value })
              }
              className="p-2 border rounded"
            />
            <input
              type="number"
              placeholder="Trees planted"
              value={stationForm.treesPlanted}
              onChange={(e) =>
                setStationForm({
                  ...stationForm,
                  treesPlanted: Number(e.target.value),
                })
              }
              className="p-2 border rounded"
            />
            <select
              value={stationForm.conference}
              onChange={(e) =>
                setStationForm({ ...stationForm, conference: e.target.value })
              }
              className="p-2 border rounded"
            >
              <option value="">Select conference</option>
              {tracker.conferences.map((c) => (
                <option key={c._id} value={c._id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
          <div className="mt-2">
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded"
            >
              Create Station
            </button>
            <button
              type="button"
              onClick={() => setShowStationForm(false)}
              className="ml-2 px-4 py-2 bg-gray-200 rounded"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      <div className="grid gap-4">
        {tracker.conferences.length === 0 ? (
          <div className="p-6 bg-white rounded shadow">No conferences yet.</div>
        ) : (
          tracker.conferences.map((conf) => (
            <div key={conf._id} className="p-4 bg-white rounded shadow">
              <div className="flex justify-between items-center">
                <div>
                  <div className="font-semibold">{conf.name}</div>
                  <div className="text-sm text-gray-500">
                    Trees: {conf.trees || 0}
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => openEditConf(conf)}
                    className="text-blue-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleConfDelete(conf._id)}
                    className="text-red-600"
                  >
                    Delete
                  </button>
                </div>
              </div>

              <div className="mt-4 grid gap-2">
                {conf.stations && conf.stations.length > 0 ? (
                  conf.stations.map((st) => (
                    <div
                      key={st._id}
                      className="flex justify-between items-center border-t pt-2"
                    >
                      <div>
                        <div className="font-medium">{st.name}</div>
                        <div className="text-sm text-gray-500">
                          Trees planted: {st.treesPlanted}
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => {
                            setStationForm({
                              name: st.name,
                              treesPlanted: st.treesPlanted,
                              conference: conf._id,
                            });
                            setShowStationForm(true);
                          }}
                          className="text-blue-600"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleStationDelete(st._id)}
                          className="text-red-600"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-sm text-gray-500">
                    No stations yet for this conference.
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default ManageTracker;
