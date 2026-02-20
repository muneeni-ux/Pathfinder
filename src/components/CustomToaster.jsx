import React from "react";
import { Toaster } from "react-hot-toast";

const toastStyle = {
  duration: 4500,
  style: {
    background: "rgba(15, 23, 42, 0.85)", // sleek slate-900 with transparency
    backdropFilter: "blur(12px)",
    color: "#f8fafc",
    fontSize: "14px",
    fontWeight: 600,
    padding: "16px 24px",
    borderRadius: "16px",
    boxShadow:
      "0 20px 40px -10px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.1)",
    border: "1px solid rgba(255, 255, 255, 0.08)",
    fontFamily: "system-ui, -apple-system, sans-serif",
    letterSpacing: "0.3px",
  },
};

export default function CustomToaster() {
  return (
    <Toaster
      position="top-right"
      reverseOrder={false}
      gutter={12}
      toastOptions={{
        ...toastStyle,
        success: {
          duration: 4000,
          iconTheme: { primary: "#ffffff", secondary: "#10B981" },
          style: {
            background:
              "linear-gradient(135deg, rgba(6, 78, 59, 0.95), rgba(16, 185, 129, 0.85))",
            backdropFilter: "blur(12px)",
            color: "#ffffff",
            border: "1px solid rgba(16, 185, 129, 0.4)",
            boxShadow: "0 10px 30px -5px rgba(16, 185, 129, 0.3)",
          },
        },
        error: {
          duration: 5000,
          iconTheme: { primary: "#ffffff", secondary: "#E11D48" },
          style: {
            background:
              "linear-gradient(135deg, rgba(127, 29, 29, 0.95), rgba(225, 29, 72, 0.85))",
            backdropFilter: "blur(12px)",
            color: "#ffffff",
            border: "1px solid rgba(225, 29, 72, 0.4)",
            boxShadow: "0 10px 30px -5px rgba(225, 29, 72, 0.3)",
          },
        },
        loading: {
          duration: Infinity,
          iconTheme: { primary: "#ffffff", secondary: "#3B82F6" },
          style: {
            background:
              "linear-gradient(135deg, rgba(30, 58, 138, 0.95), rgba(59, 130, 246, 0.85))",
            backdropFilter: "blur(12px)",
            color: "#ffffff",
            border: "1px solid rgba(59, 130, 246, 0.4)",
            boxShadow: "0 10px 30px -5px rgba(59, 130, 246, 0.3)",
          },
        },
        custom: { duration: 5000 },
      }}
    />
  );
}
