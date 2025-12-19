import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Users } from "lucide-react";
import toast from "react-hot-toast";
import AdminLoader from "./components/AdminLoader";
// Using a lightweight inline chart instead of recharts to avoid runtime hook issues

const SERVER_URL = process.env.REACT_APP_SERVER_URL;
// update coponent accordingly.. Make the UI consistent with the rest of the admin dashboard, beautiful and proffessional using theme colours green,brownish yellow, black and white. A good UI/UX for admin display.
const UsersDetails = () => {
  const [visitorCount, setVisitorCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [weeklyData, setWeeklyData] = useState([]);
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      setLoading(true);
      const userToken = localStorage.getItem("adminToken");
      if (!userToken) {
        toast.error("Not authenticated. Please log in.");
        navigate("/admin");
        return;
      }

      // Fetch total visitor count
      const visitorResponse = await fetch(
        `${SERVER_URL}/api/visitors/visitor-count`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userToken}`,
          },
        }
      );

      if (!visitorResponse.ok) {
        const errorMessage = await visitorResponse.text();
        throw new Error(
          `Failed to fetch visitor count: ${errorMessage} (Status: ${visitorResponse.status})`
        );
      }

      const visitorData = await visitorResponse.json();
      setVisitorCount(visitorData.visitorCount || 0);

      // Fetch weekly stats for chart
      const chartResponse = await fetch(
        `${SERVER_URL}/api/visitors/weekly-stats`,
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );

      if (!chartResponse.ok) {
        throw new Error("Failed to fetch weekly stats.");
      }

      const chartData = await chartResponse.json();
      setWeeklyData(chartData);
    } catch (err) {
      const msg = err.message || "An unexpected error occurred.";
      setError(msg);
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []); // Fetch the visitor count data when the component mounts

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    setVisitorCount(0);
    setError("You have been logged out.");
    navigate("/admin");
  };

  if (loading)
    return (
      <div className="h-screen flex items-center justify-center">
        <AdminLoader message="Loading visitors..." />
      </div>
    );

  if (error)
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded shadow-md">
          <strong>Error:</strong> {error}
        </div>
      </div>
    );

  return (
    <div className="p-8 w-full max-w-5xl mx-auto">
      <h1 className="text-4xl font-bold text-gray-800 mb-10 text-center">
        👥 Users Overview
      </h1>

      {/* Total Visitors Card */}
      <div className="bg-white rounded-2xl shadow-xl p-6 flex items-center justify-between transition-transform transform hover:scale-[1.02]">
        <div>
          <h2 className="text-xl font-semibold text-gray-700">
            Total Visitors
          </h2>
          <p className="text-4xl font-bold text-blue-600 mt-2">
            {visitorCount}
          </p>
        </div>
        <div className="bg-blue-100 p-4 rounded-full">
          <Users className="text-blue-500 w-10 h-10" />
        </div>
      </div>

      <div className="mt-4 flex gap-2 justify-end">
        <button onClick={fetchData} className="px-4 py-2 bg-gray-200 rounded">
          Refresh
        </button>
      </div>

      {/* Weekly Visitors - lightweight bar list (fallback) */}
      <div className="mt-10 bg-white p-6 rounded-2xl shadow-lg">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">
          Weekly Visitors
        </h2>
        {weeklyData && weeklyData.length > 0 ? (
          <div className="space-y-3">
            {weeklyData.map((d, i) => (
              <div key={i} className="flex items-center gap-4">
                <div className="w-20 text-sm text-gray-600">{d.name}</div>
                <div className="flex-1 bg-gray-100 rounded overflow-hidden">
                  <div
                    style={{
                      width: `${Math.min(
                        100,
                        ((d.visitors || 0) /
                          (Math.max(
                            ...weeklyData.map((x) => x.visitors || 0)
                          ) || 1)) *
                          100
                      )}%`,
                    }}
                    className="bg-blue-500 text-white px-2 py-1 text-sm"
                  >
                    {d.visitors}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-sm text-gray-500">No weekly data available.</div>
        )}
      </div>

      {/* Logout */}
      <div className="mt-10 text-center">
        <button
          onClick={handleLogout}
          className="bg-gradient-to-r from-red-500 to-red-600 text-white px-6 py-3 rounded-full text-lg shadow-md hover:shadow-lg transition-transform hover:scale-105"
        >
          🚪 Logout
        </button>
      </div>
    </div>
  );
};

export default UsersDetails;
