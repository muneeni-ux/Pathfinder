import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import AdminLoader from "./components/AdminLoader";

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

function ManageDonations() {
  const [loading, setLoading] = useState(true);
  const [donations, setDonations] = useState([]);
  const token = localStorage.getItem("adminToken");

  const fetchDonations = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${SERVER_URL}/api/donate/transactions`, {
        headers: { Authorization: token ? `Bearer ${token}` : undefined },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to load donations");
      setDonations(data || data.data || []);
    } catch (err) {
      toast.error(err.message || "Could not load donations");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDonations();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const refund = (id) =>
    toast("Refund action - not implemented", { icon: "💸" });

  const remove = async (id) => {
    if (!window.confirm("Remove this donation record?")) return;
    try {
      const res = await fetch(`${SERVER_URL}/api/donate/transactions/${id}`, {
        method: "DELETE",
        headers: { Authorization: token ? `Bearer ${token}` : undefined },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Delete failed");
      toast.success("Removed");
      fetchDonations();
    } catch (err) {
      toast.error(err.message || "Failed to remove donation");
    }
  };

  if (loading) return <AdminLoader message="Loading donations..." />;

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold">Manage Donations</h2>
      </div>

      {donations.length === 0 ? (
        <div className="p-6 bg-white rounded shadow">No donations yet.</div>
      ) : (
        <ul className="space-y-3">
          {donations.map((d) => (
            <li
              key={d.id}
              className="p-4 bg-white rounded shadow flex justify-between"
            >
              <div>
                {d.name} — {d.amount}
              </div>
              <div className="flex gap-2">
                <button onClick={() => refund(d.id)} className="text-blue-600">
                  Refund
                </button>
                <button onClick={() => remove(d.id)} className="text-red-600">
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

export default ManageDonations;
