import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import AdminLoader from "./components/AdminLoader";

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

function ManageRegistration() {
  const [loading, setLoading] = useState(true);
  const [registrations, setRegistrations] = useState([]);
  const [type, setType] = useState("clubs");

  const token = localStorage.getItem("adminToken");

  useEffect(() => {
    const fetchRegs = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${SERVER_URL}/api/registrations/${type}`, {
          headers: { Authorization: token ? `Bearer ${token}` : undefined },
        });
        const data = await res.json();
        if (!res.ok)
          throw new Error(data.message || "Failed to load registrations");
        setRegistrations(data.data || []);
      } catch (err) {
        toast.error(err.message || "Could not load registrations");
      } finally {
        setLoading(false);
      }
    };

    fetchRegs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type]);

  const handleExport = () =>
    toast("Export registrations - not implemented", { icon: "📤" });

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
    } catch (err) {
      toast.error(err.message || "Failed to remove");
    }
  };

  if (loading) return <AdminLoader message="Loading registrations..." />;

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold">Manage Registrations</h2>
        <div className="flex gap-2 items-center">
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="p-2 border rounded"
          >
            <option value="clubs">Clubs</option>
            <option value="volunteers">Volunteers</option>
            <option value="ambassadors">Ambassadors</option>
            <option value="partners">Partners</option>
          </select>
          <button
            onClick={handleExport}
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            Export
          </button>
        </div>
      </div>

      {registrations.length === 0 ? (
        <div className="p-6 bg-white rounded shadow">
          No registrations available.
        </div>
      ) : (
        <ul className="space-y-3">
          {registrations.map((r) => (
            <li
              key={r._id || r.id}
              className="p-4 bg-white rounded shadow flex justify-between items-center"
            >
              <div>
                <div className="font-semibold">
                  {r.name || r.clubName || r.organization}
                </div>
                <div className="text-sm text-gray-500">
                  {r.email || r.contact || r.phone}
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleDelete(r._id || r.id)}
                  className="text-red-600"
                >
                  Remove
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ManageRegistration;
