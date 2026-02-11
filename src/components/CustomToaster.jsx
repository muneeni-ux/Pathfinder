import React from "react";
import { Toaster } from "react-hot-toast";

const toastStyle = {
  duration: 4500,
  style: {
    background: "linear-gradient(90deg,#0f172a, #064e3b)",
    color: "#fff",
    fontSize: "15px",
    fontWeight: 700,
    padding: "14px 20px",
    borderRadius: "14px",
    boxShadow: "0 10px 30px rgba(2,6,23,0.6)",
    border: "1px solid rgba(255,255,255,0.06)",
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
          duration: 3500,
          iconTheme: { primary: "#10B981", secondary: "#065F46" },
          style: {
            background: "linear-gradient(90deg,#10B981,#059669)",
            color: "#063F2B",
            border: "2px solid rgba(16,185,129,0.12)",
            boxShadow: "0 8px 24px rgba(6,95,70,0.25)",
          },
        },
        error: {
          duration: 6000,
          iconTheme: { primary: "#DC2626", secondary: "#fff5f5" },
          style: {
            background: "linear-gradient(90deg,#FEE2E2,#FCA5A5)",
            color: "#7F1D1D",
            border: "2px solid rgba(220,38,38,0.12)",
            boxShadow: "0 8px 24px rgba(124,58,58,0.12)",
          },
        },
        loading: {
          duration: Infinity,
          iconTheme: { primary: "#F59E0B", secondary: "#FFF7ED" },
          style: {
            background: "linear-gradient(90deg,#FFFBEB,#FEF3C7)",
            color: "#78350F",
            border: "1px solid rgba(245,158,11,0.08)",
          },
        },
        custom: { duration: 5000 },
      }}
    />
  );
}
