import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Loader2, AlertCircle, Search, Calendar, Tag, ArrowRight, Newspaper, Tv } from "lucide-react";

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

const categories = ["All", "News", "Reports", "Events", "Sport", "Editorial"];
const POSTS_PER_PAGE = 6;

const NewUpdates = () => {
  const [posts, setPosts] = useState([]);
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
      <div className="bg-slate-50 min-h-screen flex flex-col justify-center items-center">
        <Loader2 className="w-12 h-12 text-pink-500 animate-spin mb-4" />
        <p className="text-slate-600 font-semibold text-lg animate-pulse">Loading Updates...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-slate-50 min-h-screen flex flex-col justify-center items-center px-6 text-center">
        <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mb-6">
            <AlertCircle className="w-10 h-10 text-red-500" />
        </div>
        <h3 className="text-xl font-bold text-slate-900 mb-2">Oops! Something went wrong.</h3>
        <p className="text-slate-500 text-lg mb-6">{error}</p>
        <button onClick={() => window.location.reload()} className="px-6 py-3 bg-slate-900 text-white rounded-full font-bold hover:bg-slate-800 transition-all">Retry Connection</button>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 overflow-x-hidden min-h-screen font-sans selection:bg-pink-200">
      
      {/* 🌟 HERO SECTION (Unique 'Signal' Theme) */}
      {/* 🌟 HERO SECTION (Bright, Modern Newsroom Style) */}
      <section className="relative min-h-[50vh] flex items-center justify-center overflow-hidden bg-slate-50 pt-20">
        
        {/* 🌍 Background Image with Fade & Blend */}
        <div className="absolute inset-0 z-0">
            {/* Abstract Connectivity Map Image */}
            <div 
                className="absolute inset-0 bg-cover bg-center opacity-10"
                style={{ backgroundImage: "url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop')" }} 
            ></div>
            
            {/* White Gradient Overlay to fade image into background */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-50 via-slate-50/80 to-transparent"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-slate-50 via-transparent to-slate-50"></div>
        </div>

        {/* 🎨 Floating "News Category" Orbs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {/* Orb 1: Environment */}
            <div className="absolute top-20 left-[10%] animate-float">
                <div className="w-16 h-16 bg-white/80 backdrop-blur-md rounded-2xl shadow-lg border border-green-100 flex items-center justify-center transform -rotate-12">
                    <span className="text-2xl"><Newspaper className="w-8 h-8 text-green-600" /></span>
                </div>
            </div>
            
            {/* Orb 2: Sports/Activity */}
            <div className="absolute bottom-20 right-[15%] animate-float" style={{ animationDelay: '1.5s' }}>
                <div className="w-14 h-14 bg-white/80 backdrop-blur-md rounded-full shadow-lg border border-orange-100 flex items-center justify-center transform rotate-12">
                    <span className="text-xl"><Tv className="w-6 h-6 text-orange-500" /></span>
                </div>
            </div>

            {/* Orb 3: Tech/Future */}
            <div className="absolute top-32 right-[20%] animate-float" style={{ animationDelay: '0.5s' }}>
                <div className="w-12 h-12 bg-white/80 backdrop-blur-md rounded-xl shadow-lg flex items-center justify-center transform rotate-6 border border-blue-100">
                  <span className="text-sm"><img src="./TVA_logo.jpeg" alt="" /></span>
                </div>
            </div>
        </div>

        {/* 📝 Main Content */}
        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center animate-fade-in-up">
          
          {/* Live Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-slate-200 shadow-sm mb-6 hover:scale-105 transition-transform cursor-default">
             <span className="relative flex h-3 w-3">
               <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-400 opacity-75"></span>
               <span className="relative inline-flex rounded-full h-3 w-3 bg-pink-500"></span>
             </span>
             <span className="text-xs font-bold text-slate-600 uppercase tracking-widest flex items-center gap-2">
                TVA Newsroom
             </span>
          </div>

          {/* Headline */}
          <h1 className="text-5xl md:text-7xl font-black text-slate-900 mb-6 drop-shadow-sm tracking-tight leading-[1.1]">
             Latest <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500">Updates</span>
          </h1>
          
          {/* Description */}
          <p className="text-xl md:text-2xl text-slate-600 max-w-2xl mx-auto leading-relaxed font-light">
             Stay connected with the heartbeat of youth initiatives, environmental action, and peace programs reshaping Africa.
          </p>

          {/* Scroll Down Indicator */}
          <div className="mt-12 opacity-40 animate-bounce">
             <div className="w-6 h-10 border-2 border-slate-400 rounded-full mx-auto flex justify-center p-1">
                <div className="w-1 h-2 bg-slate-600 rounded-full"></div>
             </div>
          </div>
        </div>
      </section>

      {/* 🔍 STICKY FILTER BAR */}
      <div className="sticky top-0 z-40 bg-white/90 backdrop-blur-xl border-b border-slate-200 shadow-sm transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 py-3">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                
                {/* Search */}
                <div className="relative w-full md:w-72 md:order-2">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                    <input 
                        type="text" 
                        placeholder="Search articles..." 
                        value={search}
                        onChange={(e) => {
                            setSearch(e.target.value);
                            setCurrentPage(1);
                        }}
                        className="w-full pl-10 pr-4 py-2.5 rounded-full bg-slate-100 border-none focus:ring-2 focus:ring-pink-500 text-sm font-medium text-slate-700 transition-all"
                    />
                </div>

                {/* Categories */}
                <div className="w-full md:w-auto overflow-x-auto no-scrollbar md:order-1">
                    <div className="flex items-center gap-2 pb-1 md:pb-0">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => {
                                    setActiveCategory(cat);
                                    setCurrentPage(1);
                                }}
                                className={`flex items-center gap-2 px-5 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-all duration-300 ${
                                    activeCategory === cat
                                    ? "bg-slate-900 text-white shadow-lg transform scale-105"
                                    : "bg-white border border-slate-200 text-slate-600 hover:border-pink-300 hover:text-pink-600"
                                }`}
                            >
                                {cat === "All" ? <Tag size={14} /> : null} {cat}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
      </div>

      {/* 📰 POSTS GRID */}
      <section className="py-16 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          
          {paginatedPosts.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-[2rem] border border-dashed border-slate-300 max-w-2xl mx-auto">
              <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
                 <Search className="w-8 h-8 text-slate-400" />
              </div>
              <h3 className="text-xl font-bold text-slate-700">No updates found</h3>
              <p className="text-slate-500 mt-2">Try adjusting your search or category filter.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {paginatedPosts.map((post) => (
                <div
                  key={post._id}
                  className="group bg-white rounded-[2rem] overflow-hidden border border-slate-100 hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-500 hover:-translate-y-2 cursor-pointer flex flex-col h-full"
                  onClick={() => navigate(`/view-more/${post._id}`)}
                >
                  {/* Image Container */}
                  <div className="h-60 w-full overflow-hidden relative">
                    <img
                      src={post.image || "https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&q=80"}
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    {/* Category Badge */}
                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-slate-900 uppercase tracking-wider shadow-sm">
                        {post.category}
                    </div>
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>

                  {/* Content */}
                  <div className="p-8 flex flex-col flex-grow">
                    <div className="flex items-center gap-2 text-xs font-bold text-slate-400 mb-3 uppercase tracking-wider">
                        <Calendar size={12} /> {formatDate(post.date)}
                    </div>
                    
                    <h2 className="text-2xl font-bold text-slate-900 mb-3 leading-tight group-hover:text-blue-600 transition-colors">
                      {post.title}
                    </h2>
                    
                    <p className="text-slate-500 leading-relaxed line-clamp-3 mb-6 flex-grow">
                      {post.snippet}
                    </p>
                    
                    <div className="pt-6 border-t border-slate-100 flex items-center justify-between text-sm font-bold">
                        <span className="text-slate-400 group-hover:text-slate-600 transition-colors">Read Article</span>
                        <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-all">
                            <ArrowRight size={14} />
                        </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* 🔢 PAGINATION (Modern Pills) */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-2 mt-16">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-6 py-3 bg-white border border-slate-200 text-slate-700 rounded-full font-bold hover:bg-slate-50 hover:border-slate-300 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Prev
              </button>

              <div className="flex gap-2 mx-2">
                  {[...Array(totalPages)].map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentPage(idx + 1)}
                      className={`w-10 h-10 rounded-full font-bold transition-all flex items-center justify-center ${
                        currentPage === idx + 1
                          ? "bg-slate-900 text-white shadow-lg scale-110"
                          : "bg-white border border-slate-200 text-slate-500 hover:border-pink-300 hover:text-pink-600"
                      }`}
                    >
                      {idx + 1}
                    </button>
                  ))}
              </div>

              <button
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="px-6 py-3 bg-white border border-slate-200 text-slate-700 rounded-full font-bold hover:bg-slate-50 hover:border-slate-300 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default NewUpdates;