import React from "react";

const AdminLoader = ({ message = "Loading..." }) => {
  return (
    <div className="flex items-center justify-center gap-4 p-6">
      <div className="w-12 h-12 border-4 border-t-blue-600 border-slate-200 rounded-full animate-spin" />
      <div className="text-slate-700 font-medium">{message}</div>
    </div>
  );
};

export default AdminLoader;
