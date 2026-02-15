import React, { useState, useEffect } from "react";
import {
  X,
  PlayCircle,
  Image as ImageIcon,
  Video,
  Loader2,
  Trees,
  Tent,
  CalendarDays,
  Search,
  Filter,
  Layers,
} from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

const Media = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [lightbox, setLightbox] = useState({
    isOpen: false,
    src: "",
    type: "image",
    title: "",
  });
  const [mediaItems, setMediaItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Lightbox handlers
  const openLightbox = (src, type = "image", title = "") => {
    setLightbox({ isOpen: true, src, type, title });
    document.body.style.overflow = "hidden"; // Prevent background scrolling
  };

  const closeLightbox = () => {
    setLightbox({ isOpen: false, src: "", type: "image", title: "" });
    document.body.style.overflow = "auto";
  };

  // 🔄 FETCH MEDIA FROM BACKEND
  useEffect(() => {
    const fetchMedia = async () => {
      setLoading(true);
      try {
        // Construct query parameters based on activeTab
        let params = {};

        if (activeTab === "videos") {
          params.type = "video";
        } else if (activeTab !== "all") {
          // For specific image categories (tree-planting, events, scouts)
          params.type = "image";
          params.category = activeTab;
        }
        // If 'all', we might fetch everything or just images depending on backend logic.
        // Assuming backend returns all mixed media or latest items if no params.

        const response = await axios.get(`${SERVER_URL}/api/gallery`, {
          params,
        });

        // Ensure we handle the response structure correctly (adjust based on your actual API)
        const data = response.data.data || response.data || [];
        setMediaItems(data);
      } catch (error) {
        console.error("Error fetching media:", error);
        toast.error("Could not load gallery items.");
      } finally {
        setLoading(false);
      }
    };

    fetchMedia();
  }, [activeTab]);

  // Tab Definitions based on Documentation
  const tabs = [
    { id: "all", label: "All Gallery", icon: <Layers size={16} /> },
    { id: "tree-planting", label: "Tree Planting", icon: <Trees size={16} /> },
    { id: "events", label: "Events", icon: <CalendarDays size={16} /> },
    { id: "scouts", label: "Scouts & Brigade", icon: <Tent size={16} /> },
    { id: "videos", label: "Video Stories", icon: <Video size={16} /> },
  ];

  // Client-side search filtering
  const filteredItems = mediaItems.filter((item) =>
    item.title?.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="bg-slate-50 overflow-x-hidden min-h-screen font-sans selection:bg-pink-200">
      {/* 🌟 HERO SECTION */}
      <section className="relative h-[45vh] min-h-[350px] flex items-center justify-center overflow-hidden bg-slate-900">
        {/* Dynamic Background Image */}
        <div className="absolute inset-0 opacity-40">
          <img
            src="https://images.unsplash.com/photo-1518398046578-8cca57782e17?auto=format&fit=crop&q=80"
            alt="TVA Events"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-slate-900/30"></div>

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center pt-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-blue-200 text-xs font-bold uppercase tracking-widest mb-4">
            <ImageIcon size={14} /> Official TVA Gallery
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-white mb-4 tracking-tight">
            Our Journey in{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-pink-500">
              Action
            </span>
          </h1>
          <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed font-light">
            Explore the visual stories of young changemakers across Kenya from
            Nyambene to Nairobi.
          </p>
        </div>
      </section>

      {/* 🔍 STICKY FILTER BAR (Perfect Mobile View) */}
      <div className="sticky top-0 z-40 bg-slate-50/95 backdrop-blur-md border-b border-slate-200 shadow-sm transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Mobile Search - Visible on top for easy access */}
            <div className="relative w-full md:w-64 md:order-2">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search moments..."
                className="w-full pl-10 pr-4 py-2.5 rounded-full bg-white border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none text-sm font-medium text-slate-700 shadow-sm transition-all"
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Scrollable Tabs */}
            <div className="w-full md:w-auto overflow-x-auto no-scrollbar md:order-1">
              <div className="flex items-center gap-2 pb-1 md:pb-0">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 px-5 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-all duration-300 transform active:scale-95 ${
                      activeTab === tab.id
                        ? "bg-slate-900 text-white shadow-md ring-2 ring-slate-900 ring-offset-2 ring-offset-slate-50"
                        : "bg-white text-slate-600 border border-slate-200 hover:border-pink-300 hover:text-pink-600"
                    }`}
                  >
                    {tab.icon} {tab.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 🖼️ MASONRY GALLERY GRID */}
      <section className="px-4 md:px-8 py-12 min-h-[50vh]">
        <div className="max-w-7xl mx-auto">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20">
              <Loader2 className="w-10 h-10 text-pink-500 animate-spin mb-4" />
              <p className="text-slate-500 font-medium animate-pulse">
                Fetching memories...
              </p>
            </div>
          ) : filteredItems.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-slate-300 mx-auto max-w-2xl">
              <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-400">
                <Filter size={32} />
              </div>
              <h3 className="text-lg font-bold text-slate-700">
                No media found
              </h3>
              <p className="text-slate-500 mt-2">
                Try adjusting your search or category filter.
              </p>
            </div>
          ) : (
            /* CSS Columns for Masonry Layout */
            <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
              {filteredItems.map((item) => (
                <div
                  key={item._id}
                  className="group relative break-inside-avoid bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 cursor-zoom-in border border-slate-100 hover:border-pink-100"
                  onClick={() => openLightbox(item.url, item.type, item.title)}
                >
                  {/* Thumbnail */}
                  <div className="relative overflow-hidden">
                    {item.type === "video" ? (
                      <div className="relative aspect-video bg-slate-900">
                        <video
                          src={item.url}
                          className="w-full h-full object-cover opacity-80"
                          muted
                        />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                            <PlayCircle className="w-8 h-8 text-white fill-current" />
                          </div>
                        </div>
                        <span className="absolute top-2 right-2 bg-black/60 text-white text-[10px] px-2 py-1 rounded font-bold uppercase tracking-wider">
                          Video
                        </span>
                      </div>
                    ) : (
                      <img
                        src={item.url}
                        alt={item.title}
                        className="w-full h-auto object-cover transform transition-transform duration-700 group-hover:scale-110"
                        loading="lazy"
                      />
                    )}

                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>

                  {/* Caption */}
                  <div className="absolute bottom-0 left-0 w-full p-5 translate-y-4 group-hover:translate-y-0 transition-transform duration-300 opacity-0 group-hover:opacity-100">
                    <span className="inline-block px-2 py-0.5 bg-pink-500/90 backdrop-blur-sm text-white text-[10px] font-bold uppercase tracking-wider rounded-md mb-2">
                      {item.category || "Gallery"}
                    </span>
                    <h3 className="text-white font-bold text-sm leading-snug shadow-black drop-shadow-md">
                      {item.title}
                    </h3>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* 🎥 LIGHTBOX */}
      {lightbox.isOpen && (
        <div
          className="fixed inset-0 z-[100] bg-slate-950/95 backdrop-blur-xl flex items-center justify-center p-4 animate-in fade-in duration-300"
          onClick={closeLightbox}
        >
          <button
            className="absolute top-4 right-4 p-2 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors z-50"
            onClick={closeLightbox}
          >
            <X size={28} />
          </button>

          <div
            className="relative w-full max-w-5xl flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            {lightbox.type === "image" ? (
              <img
                src={lightbox.src}
                alt={lightbox.title}
                className="max-h-[85vh] w-auto rounded-lg shadow-2xl object-contain"
              />
            ) : (
              <div className="w-full aspect-video max-h-[85vh]">
                <video
                  src={lightbox.src}
                  controls
                  autoPlay
                  className="w-full h-full rounded-lg shadow-2xl"
                />
              </div>
            )}

            <div className="mt-4 text-center">
              <h3 className="text-lg font-bold text-white tracking-wide">
                {lightbox.title}
              </h3>
            </div>
          </div>
        </div>
      )}

      {/* 🚀 FOOTER CTA */}
      <section className="py-20 bg-white border-t border-slate-100 text-center">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-3xl font-black text-slate-900 mb-4">
            Follow Our Story
          </h2>
          <p className="text-slate-500 mb-8">
            Stay updated with our latest campaigns, tree planting activities,
            and youth events on our social platforms.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noreferrer"
              className="px-6 py-3 bg-[#1877F2] text-white font-bold rounded-full hover:shadow-lg hover:-translate-y-1 transition-all"
            >
              Facebook
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noreferrer"
              className="px-6 py-3 bg-black text-white font-bold rounded-full hover:shadow-lg hover:-translate-y-1 transition-all"
            >
              X (Twitter)
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-full hover:shadow-lg hover:-translate-y-1 transition-all"
            >
              Instagram
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Media;
