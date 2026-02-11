import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import {
  Users,
  RefreshCcw,
  LogOut,
  TrendingUp,
  BarChart3,
  Activity,
} from "lucide-react";
import toast from "react-hot-toast";
import AdminLoader from "./components/AdminLoader";

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

const UsersDetails = () => {
  const [visitorCount, setVisitorCount] = useState(0);
  const [weeklyData, setWeeklyData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const navigate = useNavigate();

  const fetchData = useCallback(
    async (silent = false) => {
      try {
        if (!silent) setLoading(true);
        else setIsRefreshing(true);

        const token = localStorage.getItem("adminToken");
        if (!token) {
          toast.error("Session expired. Please log in.");
          navigate("/admin");
          return;
        }

        // Fetch Data
        const [visitorRes, weeklyRes] = await Promise.all([
          fetch(`${SERVER_URL}/api/visitors/visitor-count`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          fetch(`${SERVER_URL}/api/visitors/weekly-stats`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        if (!visitorRes.ok || !weeklyRes.ok)
          throw new Error("Could not sync with server.");

        const visitorData = await visitorRes.json();
        const weekly = await weeklyRes.json();

        setVisitorCount(visitorData.visitorCount || 0);
        setWeeklyData(weekly || []);
        if (silent) toast.success("Data synced");
      } catch (err) {
        toast.error(err.message);
      } finally {
        setLoading(false);
        setIsRefreshing(false);
      }
    },
    [navigate],
  );

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    toast.success("Logged out successfully.");
    navigate("/admin");
  };

  if (loading)
    return <AdminLoader message="Initializing secure analytics..." />;

  const maxVisitors = Math.max(...weeklyData.map((d) => d.visitors || 0)) || 1;

  return (
    <div className="min-h-screen bg-slate-50/50 pb-20">
      {/* Top Navbar Area */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-10 px-6 py-4 mb-8">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-600 rounded-lg">
              <Activity className="text-white" size={20} />
            </div>
            <h1 className="text-xl font-bold text-slate-800">
              Analytics Console
            </h1>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => fetchData(true)}
              className="p-2 text-slate-500 hover:bg-slate-100 rounded-lg transition"
              title="Refresh Stats"
            >
              <RefreshCcw
                size={20}
                className={isRefreshing ? "animate-spin" : ""}
              />
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition border border-transparent hover:border-red-100"
            >
              <LogOut size={18} />
              Sign Out
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Main Stat Card */}
          <div className="md:col-span-1 bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
            <div className="flex flex-col h-full justify-between">
              <div>
                <p className="text-slate-500 text-sm font-medium uppercase tracking-wider mb-1">
                  Lifetime Reach
                </p>
                <h3 className="text-4xl font-black text-slate-900 leading-none">
                  {visitorCount.toLocaleString()}
                </h3>
                <div className="mt-4 inline-flex items-center gap-1.5 px-2 py-1 bg-emerald-50 text-emerald-600 rounded-md text-xs font-bold">
                  <TrendingUp size={14} />
                  Active Users
                </div>
              </div>
              <div className="mt-8 flex items-center justify-center p-4 bg-blue-50 rounded-xl">
                <Users className="w-12 h-12 text-blue-600" />
              </div>
            </div>
          </div>

          {/* Traffic Overview Card */}
          <div className="md:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                <BarChart3 size={20} className="text-blue-600" />
                Traffic Overview
              </h2>
              <span className="text-xs text-slate-400 font-medium bg-slate-100 px-2 py-1 rounded">
                Past 7 Days
              </span>
            </div>

            {weeklyData.length > 0 ? (
              <div className="flex items-end justify-between h-48 gap-2 px-2">
                {weeklyData.map((day, i) => {
                  const height = (day.visitors / maxVisitors) * 100;
                  return (
                    <div
                      key={i}
                      className="group relative flex flex-col items-center flex-1"
                    >
                      {/* Tooltip */}
                      <div className="absolute -top-8 opacity-0 group-hover:opacity-100 transition-opacity bg-slate-800 text-white text-[10px] py-1 px-2 rounded mb-2">
                        {day.visitors}
                      </div>
                      {/* Bar */}
                      <div
                        className="w-full max-w-[32px] bg-blue-100 group-hover:bg-blue-600 rounded-t-md transition-all duration-500 ease-out relative"
                        style={{ height: `${Math.max(height, 5)}%` }}
                      >
                        {/* Highlight top of bar */}
                        <div className="absolute top-0 left-0 w-full h-1 bg-blue-400 rounded-t-md group-hover:bg-blue-300 opacity-50" />
                      </div>
                      <span className="mt-3 text-[10px] font-bold text-slate-400 group-hover:text-slate-900 uppercase tracking-tighter">
                        {day.name.slice(0, 3)}
                      </span>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="h-48 flex items-center justify-center border-2 border-dashed border-slate-100 rounded-xl">
                <p className="text-slate-400 text-sm italic">
                  No data synced yet...
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Action Footnote */}
        <div className="bg-blue-600 rounded-2xl p-8 text-white relative overflow-hidden shadow-xl shadow-blue-200">
          <div className="relative z-10">
            <h3 className="text-xl font-bold mb-2">Ready to take action?</h3>
            <p className="text-blue-100 text-sm max-w-md">
              These insights help you understand when your users are most
              active. Use this data to schedule updates or major announcements.
            </p>
          </div>
          {/* Decorative circles */}
          <div className="absolute top-[-20%] right-[-5%] w-64 h-64 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute bottom-[-20%] right-[10%] w-32 h-32 bg-blue-400/20 rounded-full blur-2xl" />
        </div>
      </div>
    </div>
  );
};

export default UsersDetails;
