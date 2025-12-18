// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";

// /* --------------------------------------------------
//    EXPANDED SAMPLE POSTS
// --------------------------------------------------- */
// const posts = [
//   /* NEWS */
//   {
//     id: "1",
//     title: "Latest Pathfinder Environmental Report Released",
//     date: "Dec 12, 2025",
//     snippet:
//       "A detailed overview of our nationwide conservation, youth involvement, and community impact...",
//     link: "#",
//     img: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=600&q=80",
//     category: "News",
//   },
//   {
//     id: "2",
//     title: "Diaspora Team Plants 500 Trees in Canada",
//     date: "Nov 28, 2025",
//     snippet:
//       "Kenyan Pathfinder diaspora conducted a large-scale planting event with international partners...",
//     link: "#",
//     img: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&w=600&q=80",
//     category: "News",
//   },
//   /* REPORTS */
//   {
//     id: "3",
//     title: "Environmental Awareness Workshop Report",
//     date: "Oct 20, 2025",
//     snippet:
//       "We held an interactive workshop with local youth to educate about climate change, recycling, and eco-friendly practices...",
//     link: "#",
//     img: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=600&q=80",
//     category: "Reports",
//   },
//   /* EVENTS */
//   {
//     id: "4",
//     title: "Community Tree Planting Initiative",
//     date: "Nov 5, 2025",
//     snippet:
//       "Our volunteers gathered to plant over 200 trees in local schools and parks, promoting sustainability and green awareness...",
//     link: "#",
//     img: "https://images.unsplash.com/photo-1482192596544-9eb780fc7f66?auto=format&fit=crop&w=400&q=80",
//     category: "Events",
//   },
//   /* SPORT */
//   {
//     id: "5",
//     title: "National Pathfinder Games – Finals Recap",
//     date: "Sept 15, 2025",
//     snippet:
//       "Clubs battled it out in obstacle courses, relays, and precision drills. Here are the highlights...",
//     link: "#",
//     img: "https://images.unsplash.com/photo-1521412644187-c49fa049e84d?auto=format&fit=crop&w=600&q=80",
//     category: "Sport",
//   },
//   /* EDITORIAL */
//   {
//     id: "6",
//     title: "Why Youth Environmental Leadership Matters",
//     date: "Jul 18, 2025",
//     snippet:
//       "A thoughtful article from the South Rift Pathfinder Director about empowering young leaders...",
//     link: "#",
//     img: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=600&q=80",
//     category: "Editorial",
//   },
// ];

// const categories = ["All", "News", "Reports", "Events", "Sport", "Editorial"];

// /* -------------------------- PAGINATION CONFIG -------------------------- */
// const POSTS_PER_PAGE = 3;

// const NewUpdates = () => {
//   const [activeCategory, setActiveCategory] = useState("All");
//   const [search, setSearch] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);
//   const navigate = useNavigate();

//   /* Filter by category + search query */
//   const filteredPosts = posts.filter((post) => {
//     const matchCategory =
//       activeCategory === "All" || post.category === activeCategory;
//     const matchSearch =
//       post.title.toLowerCase().includes(search.toLowerCase()) ||
//       post.snippet.toLowerCase().includes(search.toLowerCase());
//     return matchCategory && matchSearch;
//   });

//   /* Pagination calculations */
//   const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);
//   const startIdx = (currentPage - 1) * POSTS_PER_PAGE;
//   const paginatedPosts = filteredPosts.slice(
//     startIdx,
//     startIdx + POSTS_PER_PAGE
//   );

//   return (
//     <div className="bg-green-50 py-16 min-h-screen mt-[-2rem] mb-[-4rem]">
//       {/* HEADER */}
//       <div className="text-center mb-12">
//         <h1 className="text-4xl md:text-5xl font-extrabold text-green-900 mb-3">
//           News & Updates
//         </h1>
//         <p className="text-green-700 text-lg md:text-xl max-w-2xl mx-auto">
//           Latest Pathfinder stories, sports highlights, leadership opinion
//           pieces, and official announcements.
//         </p>
//       </div>

//       {/* SEARCH BAR */}
//       <div className="flex justify-center mb-6">
//         <input
//           type="text"
//           placeholder="Search posts..."
//           value={search}
//           onChange={(e) => {
//             setSearch(e.target.value);
//             setCurrentPage(1); // reset to first page
//           }}
//           className="w-full max-w-md p-3 rounded-full border border-green-300 shadow-sm outline-none focus:ring-2 focus:ring-amber-400"
//         />
//       </div>

//       {/* CATEGORY TABS */}
//       <div className="flex justify-center gap-4 flex-wrap mb-12">
//         {categories.map((cat) => (
//           <button
//             key={cat}
//             onClick={() => {
//               setActiveCategory(cat);
//               setCurrentPage(1); // reset to first page
//             }}
//             className={`px-5 py-2 rounded-full font-semibold transition-all shadow-sm
//               ${
//                 activeCategory === cat
//                   ? "bg-amber-500 text-white shadow-lg scale-105"
//                   : "bg-green-100 text-green-900 hover:bg-green-200"
//               }`}
//           >
//             {cat}
//           </button>
//         ))}
//       </div>

//       {/* POSTS GRID */}
//       <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//         {paginatedPosts.map((post, idx) => (
//           <div
//             key={idx}
//             className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
//           >
//             <div className="h-48 w-full overflow-hidden">
//               <img
//                 src={post.img}
//                 alt={post.title}
//                 className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
//               />
//             </div>
//             <div className="p-6">
//               <h2 className="text-xl font-bold text-green-900 mb-1">
//                 {post.title}
//               </h2>
//               <p className="text-green-600 text-sm mb-3">{post.date}</p>
//               <p className="text-green-800 mb-4 leading-relaxed">
//                 {post.snippet}
//               </p>
              
//               <button
//                   onClick={() => navigate(`/view-more/${post.id}`)}
//                   className="text-amber-600 font-semibold hover:text-amber-500 transition"
//                 >
//                   Read more →
//                 </button>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* NO POSTS */}
//       {paginatedPosts.length === 0 && (
//         <p className="text-center text-green-700 text-xl mt-10">
//           No posts found.
//         </p>
//       )}

//       {/* PAGINATION CONTROLS */}
//       {totalPages > 1 && (
//         <div className="flex justify-center gap-3 mt-12">
//           <button
//             onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
//             className="px-4 py-2 bg-green-100 text-green-900 rounded-full font-semibold hover:bg-green-200 transition"
//           >
//             Prev
//           </button>

//           {[...Array(totalPages)].map((_, idx) => (
//             <button
//               key={idx}
//               onClick={() => setCurrentPage(idx + 1)}
//               className={`px-4 py-2 rounded-full font-semibold transition
//                 ${
//                   currentPage === idx + 1
//                     ? "bg-amber-500 text-white shadow-lg"
//                     : "bg-green-100 text-green-900 hover:bg-green-200"
//                 }`}
//             >
//               {idx + 1}
//             </button>
//           ))}

//           <button
//             onClick={() =>
//               setCurrentPage((prev) => Math.min(prev + 1, totalPages))
//             }
//             className="px-4 py-2 bg-green-100 text-green-900 rounded-full font-semibold hover:bg-green-200 transition"
//           >
//             Next
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default NewUpdates;

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Loader2, AlertCircle } from "lucide-react"; // Added for better UX

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

const categories = ["All", "News", "Reports", "Events", "Sport", "Editorial"];
const POSTS_PER_PAGE = 3;

const NewUpdates = () => {
  const [posts, setPosts] = useState([]); // State for posts
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();

  // Fetch Posts from Backend
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(`${SERVER_URL}/api/posts`);
        if (!response.ok) throw new Error("Failed to load news");
        const data = await response.json();
        setPosts(data);
      } catch (err) {
        console.error(err);
        setError("Could not load updates. Please check your connection.");
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  /* Filter by category + search query */
  const filteredPosts = posts.filter((post) => {
    const matchCategory =
      activeCategory === "All" || post.category === activeCategory;
    const matchSearch =
      (post.title?.toLowerCase() || "").includes(search.toLowerCase()) ||
      (post.snippet?.toLowerCase() || "").includes(search.toLowerCase());
    return matchCategory && matchSearch;
  });

  /* Pagination calculations */
  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);
  const startIdx = (currentPage - 1) * POSTS_PER_PAGE;
  const paginatedPosts = filteredPosts.slice(
    startIdx,
    startIdx + POSTS_PER_PAGE
  );

  // Helper to format Date
  const formatDate = (dateString) => {
    if (!dateString) return "";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="bg-green-50 min-h-screen flex flex-col justify-center items-center mt-[-2rem] mb-[-4rem]">
        <Loader2 className="w-12 h-12 text-amber-500 animate-spin mb-4" />
        <p className="text-green-800 font-semibold text-lg">Loading News...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-green-50 min-h-screen flex flex-col justify-center items-center mt-[-2rem] mb-[-4rem]">
        <AlertCircle className="w-12 h-12 text-red-500 mb-4" />
        <p className="text-red-600 font-semibold text-lg">{error}</p>
      </div>
    );
  }

  return (
    <div className="bg-green-50 py-16 min-h-screen mt-[-2rem] mb-[-4rem]">
      {/* HEADER */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold text-green-900 mb-3">
          News & Updates
        </h1>
        <p className="text-green-700 text-lg md:text-xl max-w-2xl mx-auto">
          Latest Pathfinder stories, sports highlights, leadership opinion
          pieces, and official announcements.
        </p>
      </div>

      {/* SEARCH BAR */}
      <div className="flex justify-center mb-6">
        <input
          type="text"
          placeholder="Search posts..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
          className="w-full max-w-md p-3 rounded-full border border-green-300 shadow-sm outline-none focus:ring-2 focus:ring-amber-400"
        />
      </div>

      {/* CATEGORY TABS */}
      <div className="flex justify-center gap-4 flex-wrap mb-12">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => {
              setActiveCategory(cat);
              setCurrentPage(1);
            }}
            className={`px-5 py-2 rounded-full font-semibold transition-all shadow-sm
              ${
                activeCategory === cat
                  ? "bg-amber-500 text-white shadow-lg scale-105"
                  : "bg-green-100 text-green-900 hover:bg-green-200"
              }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* POSTS GRID */}
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {paginatedPosts.map((post, idx) => (
          <div
            key={post._id || idx}
            className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
          >
            <div className="h-48 w-full overflow-hidden bg-gray-200">
              <img
                src={post.image || "https://via.placeholder.com/600x400?text=No+Image"} // Mapped to backend 'image'
                alt={post.title}
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
              />
            </div>
            <div className="p-6">
              <span className="inline-block px-3 py-1 text-xs font-semibold text-amber-600 bg-amber-100 rounded-full mb-2">
                {post.category}
              </span>
              <h2 className="text-xl font-bold text-green-900 mb-1 line-clamp-2">
                {post.title}
              </h2>
              <p className="text-green-600 text-sm mb-3">{formatDate(post.date)}</p>
              <p className="text-green-800 mb-4 leading-relaxed line-clamp-3">
                {post.snippet}
              </p>
              
              <button
                  onClick={() => navigate(`/view-more/${post._id}`)}
                  className="text-amber-600 font-semibold hover:text-amber-500 transition"
                >
                  Read more →
                </button>
            </div>
          </div>
        ))}
      </div>

      {/* NO POSTS */}
      {paginatedPosts.length === 0 && (
        <p className="text-center text-green-700 text-xl mt-10">
          No posts found.
        </p>
      )}

      {/* PAGINATION CONTROLS */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-3 mt-12">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            className="px-4 py-2 bg-green-100 text-green-900 rounded-full font-semibold hover:bg-green-200 transition"
          >
            Prev
          </button>

          {[...Array(totalPages)].map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentPage(idx + 1)}
              className={`px-4 py-2 rounded-full font-semibold transition
                ${
                  currentPage === idx + 1
                    ? "bg-amber-500 text-white shadow-lg"
                    : "bg-green-100 text-green-900 hover:bg-green-200"
                }`}
            >
              {idx + 1}
            </button>
          ))}

          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            className="px-4 py-2 bg-green-100 text-green-900 rounded-full font-semibold hover:bg-green-200 transition"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default NewUpdates;