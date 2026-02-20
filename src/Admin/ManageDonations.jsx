import React, { useEffect, useState, useMemo } from "react";
import toast from "react-hot-toast";
import {
  Search,
  Download,
  CreditCard,
  Smartphone,
  CheckCircle,
  Clock,
  XCircle,
} from "lucide-react";
import AdminLoader from "./components/AdminLoader";
import Pagination from "./components/Pagination";

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

function ManageDonations() {
  const [loading, setLoading] = useState(true);
  const [donations, setDonations] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);

  const token = localStorage.getItem("adminToken");

  const fetchDonations = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${SERVER_URL}/api/donate/transactions`, {
        headers: { Authorization: token ? `Bearer ${token}` : undefined },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to load donations");
      setDonations(Array.isArray(data) ? data : data.data || []);
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

  // --- FILTERING ---
  const filteredDonations = useMemo(() => {
    if (!search) return donations;
    const q = search.toLowerCase();
    return donations.filter(
      (d) =>
        (d.donorName || "").toLowerCase().includes(q) ||
        (d.phone || "").toLowerCase().includes(q) ||
        (d.checkoutRequestID || "").toLowerCase().includes(q),
    );
  }, [donations, search]);

  // --- PAGINATION ---
  const totalPages = Math.max(
    1,
    Math.ceil(filteredDonations.length / pageSize),
  );
  const pageItems = filteredDonations.slice(
    (page - 1) * pageSize,
    page * pageSize,
  );

  // --- UTILS ---
  const handleExport = () => {
    if (!donations.length) return toast.error("No data to export");

    const headers = [
      "ID",
      "Donor",
      "Phone",
      "Amount",
      "Method",
      "Purpose",
      "Status",
      "Date",
    ];
    const rows = donations.map((d) => [
      d.checkoutRequestID || d._id,
      `"${d.donorName}"`,
      d.phone || "-",
      d.amount,
      d.paymentMethod,
      d.purpose,
      d.status || "Pending", // Default to Pending if field missing
      new Date(d.createdAt).toLocaleDateString(),
    ]);

    const csvContent = [
      headers.join(","),
      ...rows.map((r) => r.join(",")),
    ].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `donations_export_${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
    toast.success("Exported successfully");
  };

  const handleRefund = (id) => {
    toast("Refund/Reversal feature coming soon", { icon: "🏦" });
  };

  // --- CALCULATE STATS ---
  const totalRaised = donations
    .filter((d) => d.status === "Success") // Only count successful
    .reduce((acc, curr) => acc + (Number(curr.amount) || 0), 0);

  if (loading) return <AdminLoader message="Loading financial records..." />;

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* HEADER & STATS */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Donations</h2>
            <p className="text-gray-500 text-sm">
              Track incoming funds and donor details.
            </p>
          </div>
          <button
            onClick={handleExport}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition shadow-sm"
          >
            <Download size={18} /> Export CSV
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
            <div>
              <p className="text-slate-500 text-sm font-medium uppercase">
                Total Raised
              </p>
              <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-pink-600">
                KES {totalRaised.toLocaleString()}
              </h3>
            </div>
            <div className="bg-pink-50 p-3 rounded-full text-pink-600 shadow-sm border border-pink-100">
              <CreditCard size={24} />
            </div>
          </div>

          <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
            <div>
              <p className="text-slate-500 text-sm font-medium uppercase">
                Total Transactions
              </p>
              <h3 className="text-2xl font-bold text-slate-800">
                {donations.length}
              </h3>
            </div>
            <div className="bg-blue-50 p-3 rounded-full text-blue-600 shadow-sm border border-blue-100">
              <Smartphone size={24} />
            </div>
          </div>
        </div>
      </div>

      {/* TABLE SECTION */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        {/* Table Toolbar */}
        <div className="p-4 border-b border-gray-200 bg-gray-50/50 flex gap-4">
          <div className="relative flex-1 max-w-md">
            <Search
              className="absolute left-3 top-2.5 text-gray-400"
              size={18}
            />
            <input
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              placeholder="Search donor name, phone, or ID..."
              className="pl-10 p-2 w-full border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none bg-slate-50 transition-all"
            />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-100 text-gray-600 text-xs uppercase tracking-wider">
                <th className="p-4 font-semibold">Donor Details</th>
                <th className="p-4 font-semibold">Amount</th>
                <th className="p-4 font-semibold">Method</th>
                <th className="p-4 font-semibold">Status</th>
                <th className="p-4 font-semibold">Date</th>
                <th className="p-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="text-sm divide-y divide-gray-100">
              {pageItems.length === 0 ? (
                <tr>
                  <td
                    colSpan="6"
                    className="p-8 text-center text-gray-500 italic"
                  >
                    No transactions found.
                  </td>
                </tr>
              ) : (
                pageItems.map((d) => (
                  <tr
                    key={d._id || d.checkoutRequestID}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="p-4">
                      <div className="font-medium text-gray-800">
                        {d.donorName}
                      </div>
                      <div className="text-xs text-gray-500">
                        {d.phone || "No Phone"}
                      </div>
                    </td>
                    <td className="p-4 font-bold text-gray-700">
                      KES {Number(d.amount).toLocaleString()}
                    </td>
                    <td className="p-4">
                      <span className="capitalize px-2 py-1 bg-gray-100 rounded text-xs font-medium text-gray-600">
                        {d.paymentMethod}
                      </span>
                    </td>
                    <td className="p-4">
                      {/* Status Logic */}
                      {d.status === "Success" || d.status === "Completed" ? (
                        <span className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-700 border border-blue-200 rounded-full text-xs font-medium">
                          <CheckCircle size={12} /> Success
                        </span>
                      ) : d.status === "Failed" ? (
                        <span className="inline-flex items-center gap-1 px-2 py-1 bg-red-100 text-red-700 border border-red-200 rounded-full text-xs font-medium">
                          <XCircle size={12} /> Failed
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2 py-1 bg-pink-100 text-pink-700 border border-pink-200 rounded-full text-xs font-medium">
                          <Clock size={12} /> Pending
                        </span>
                      )}
                    </td>
                    <td className="p-4 text-gray-500">
                      {new Date(d.createdAt).toLocaleDateString()}
                      <div className="text-xs text-gray-400">
                        {new Date(d.createdAt).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </div>
                    </td>
                    <td className="p-4 text-right">
                      <button
                        onClick={() => handleRefund(d._id)}
                        className="text-blue-600 hover:text-blue-800 hover:bg-blue-50 px-3 py-1.5 rounded transition-colors text-xs font-medium border border-blue-200"
                      >
                        Refund / View
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="p-4 border-t border-gray-200">
          <Pagination page={page} setPage={setPage} totalPages={totalPages} />
        </div>
      </div>
    </div>
  );
}

export default ManageDonations;
