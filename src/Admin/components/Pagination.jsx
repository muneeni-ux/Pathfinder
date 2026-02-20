import React from "react";

const Pagination = ({ page, setPage, totalPages }) => {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="mt-6 flex items-center justify-center gap-2">
      <button
        onClick={() => setPage((p) => Math.max(1, p - 1))}
        className="px-3 py-1 rounded bg-gray-100 hover:bg-gray-200"
        disabled={page === 1}
      >
        Prev
      </button>

      {pages.map((p) => (
        <button
          key={p}
          onClick={() => setPage(p)}
          className={`px-3 py-1 rounded transition-colors ${
            p === page
              ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-sm"
              : "bg-slate-100 hover:bg-slate-200 text-slate-700"
          }`}
        >
          {p}
        </button>
      ))}

      <button
        onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
        className="px-3 py-1 rounded bg-gray-100 hover:bg-gray-200"
        disabled={page === totalPages}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
