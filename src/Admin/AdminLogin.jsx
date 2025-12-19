import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import AdminLoader from "./components/AdminLoader";

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

const AdminLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const response = await axios.post(`${SERVER_URL}/api/admin/login`, {
        username,
        password,
      });

      if (response.data && response.data.token) {
        localStorage.setItem("adminToken", response.data.token);
        toast.success("Welcome back! Redirecting to dashboard...");
        navigate("/admin/dashboard");
      } else {
        setError("Invalid response format. Token missing.");
        toast.error("Login failed: token missing in response");
        console.error("Token missing in response");
      }
    } catch (err) {
      console.error("Login Error:", err.response || err);
      const msg =
        err.response?.data?.message || "Login failed due to server error";
      setError(msg);
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleHome = () => {
    navigate("/");
  };

  return (
    <div
      className="relative flex justify-center items-center h-[100vh] bg-cover bg-center mt-[-5rem] px-4"
      style={{
        backgroundImage: "url('https://picsum.photos/900/400?random=20')",
        backgroundSize: "cover",
      }}
    >
      <Toaster position="top-right" />
      <div className="absolute inset-0 bg-black bg-opacity-40 z-0" />
      <div className="relative z-10 bg-white/95 backdrop-blur-sm p-8 rounded-2xl shadow-2xl w-full max-w-md border border-green-200">
        <h2 className="text-3xl font-bold text-center text-green-700 mb-4">
          PathFinder Admin
        </h2>
        <p className="text-sm text-center text-gray-500 mb-6">
          Enter credentials to access the admin dashboard
        </p>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          {error && <p className="text-red-600 text-sm text-center">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-green-600 text-white font-semibold rounded-xl hover:bg-green-700 transition duration-200 disabled:opacity-60"
          >
            {loading ? "Signing in..." : "Login"}
          </button>
        </form>

        <div className="mt-6 text-center text-gray-400 text-xs flex flex-col items-center gap-2">
          <span>© 2025 PathFinder@75. Admin Access Only.</span>
          <button onClick={handleHome} className="text-blue-500 underline">
            Back to Home
          </button>
        </div>
      </div>

      {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/30 z-30">
          <div className="bg-white/90 p-6 rounded-xl shadow-lg">
            <AdminLoader message="Signing in..." />
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminLogin;
