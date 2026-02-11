import React, { useState, useEffect } from "react";
import {
  MessageCircle,
  PlusCircle,
  X,
  Heart,
  Loader2,
  Quote,
  Sparkles,
  Send,
} from "lucide-react";
import toast from "react-hot-toast";

const SERVER_URL = process.env.REACT_APP_SERVER_URL;
const categories = ["All", "Student", "Parent", "Leader"];
const MAX_CHARS = 220;

const Testimonials = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [testimonials, setTestimonials] = useState([]);
  const [likedIndex, setLikedIndex] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    role: "Student",
    story: "",
  });
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Fetch approved testimonials from backend
  const fetchTestimonials = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${SERVER_URL}/api/testimonials`);
      const data = await res.json();
      if (data.success) {
        setTestimonials(data.data);
      } else {
        // Fallback data for UI visualization
        setTestimonials([
          {
            _id: 1,
            name: "Sarah K.",
            role: "Student",
            story:
              "Joining the Green Club changed my perspective on conservation. I planted my first tree and felt so proud!",
            date: new Date(),
            likes: 12,
          },
          {
            _id: 2,
            name: "Mr. Omondi",
            role: "Parent",
            story:
              "My son has become so responsible since joining the Scouts program. TVA is doing great work.",
            date: new Date(),
            likes: 34,
          },
          {
            _id: 3,
            name: "Jane D.",
            role: "Leader",
            story:
              "Leading the Peace Caravan was an honor. Seeing communities come together was magical.",
            date: new Date(),
            likes: 56,
          },
        ]);
      }
    } catch (err) {
      console.error(err);
      toast.error("Error fetching testimonials");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const filteredTestimonials =
    activeCategory === "All"
      ? testimonials
      : testimonials.filter((t) => t.role === activeCategory);

  // HANDLE LIKE
  const handleLike = async (testimonialId, idx) => {
    try {
      const updated = [...testimonials];
      updated[idx].likes = (updated[idx].likes || 0) + 1;
      setLikedIndex(idx);
      setTestimonials(updated);

      setTimeout(() => setLikedIndex(null), 1000);

      await fetch(`${SERVER_URL}/api/testimonials/like/${testimonialId}`, {
        method: "PUT",
      });
    } catch (err) {
      console.error(err);
      toast.error("Error liking testimonial");
    }
  };

  // HANDLE FORM SUBMIT
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.role || !formData.story) {
      return toast.error("Please fill all fields");
    }

    setSubmitting(true);
    try {
      const res = await fetch(`${SERVER_URL}/api/testimonials`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success) {
        toast.success("Story submitted for admin approval");
        setFormData({ name: "", role: "Student", story: "" });
        setShowForm(false);
        fetchTestimonials();
      } else {
        toast.error(data.message || "Failed to submit story");
      }
    } catch (err) {
      console.error(err);
      toast.error("Error submitting testimonial");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-slate-50 overflow-x-hidden min-h-screen font-sans selection:bg-pink-200">
      {/* 🌟 HERO SECTION (Fixed Visibility) */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden bg-slate-900 pt-20">
        {/* Background Images Layer */}
        {/* Adjusted Opacity: Images are now brighter (opacity-90) and larger */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-10 left-[-20px] md:left-10 w-28 h-28 rounded-full overflow-hidden border-4 border-white/20 opacity-90 animate-float">
            <img
              src="https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=200&q=80"
              alt="User"
              className="w-full h-full object-cover"
            />
          </div>
          <div
            className="absolute top-20 right-[-20px] md:right-20 w-36 h-36 rounded-full overflow-hidden border-4 border-white/20 opacity-90 animate-float"
            style={{ animationDelay: "1s" }}
          >
            <img
              src="https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&w=200&q=80"
              alt="User"
              className="w-full h-full object-cover"
            />
          </div>
          <div
            className="absolute bottom-10 left-10 md:left-1/4 w-24 h-24 rounded-full overflow-hidden border-4 border-white/20 opacity-90 animate-float"
            style={{ animationDelay: "2s" }}
          >
            <img
              src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80"
              alt="User"
              className="w-full h-full object-cover"
            />
          </div>
          <div
            className="absolute bottom-32 right-10 md:right-1/3 w-20 h-20 rounded-full overflow-hidden border-4 border-white/20 opacity-60 animate-float"
            style={{ animationDelay: "3s" }}
          >
            <img
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80"
              alt="User"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Gradient Overlay - Lighter for visibility */}
        {/* Changed opacity from 80 to 60/40 to let images shine through */}
        <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-[1px] z-0"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-slate-900/40 z-0"></div>

        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center animate-fade-in-up pb-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-pink-300 text-xs font-bold uppercase tracking-widest mb-6 shadow-xl">
            <MessageCircle size={14} /> Community Voices
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-white mb-6 drop-shadow-2xl tracking-tight leading-tight">
            Stories of{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-500">
              Impact
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-200 max-w-2xl mx-auto leading-relaxed font-light mb-10 text-shadow-sm">
            Real experiences from young changemakers, parents, and leaders whose
            lives have been transformed by our programs.
          </p>

          <button
            onClick={() => setShowForm(true)}
            className="group relative inline-flex items-center justify-center gap-2 px-8 py-4 font-bold text-white transition-all duration-300 bg-gradient-to-r from-blue-600 to-pink-600 rounded-full hover:scale-105 shadow-[0_0_20px_rgba(236,72,153,0.5)] hover:shadow-[0_0_30px_rgba(37,99,235,0.6)]"
          >
            <PlusCircle className="w-5 h-5 group-hover:rotate-90 transition-transform" />
            Share Your Story
          </button>
        </div>
      </section>

      {/* 📂 CATEGORY FILTERS */}
      <section className="sticky top-0 z-30 bg-white/90 backdrop-blur-xl border-b border-slate-200 shadow-sm transition-all">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-center gap-3 overflow-x-auto no-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-6 py-2.5 rounded-full font-bold text-sm transition-all whitespace-nowrap ${
                  activeCategory === cat
                    ? "bg-slate-900 text-white shadow-md transform scale-105"
                    : "bg-slate-100 text-slate-500 hover:bg-white hover:text-pink-600 border border-transparent hover:border-pink-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 💬 TESTIMONIAL CARDS */}
      <section className="py-8 px-6 md:px-12 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          {loading ? (
            <div className="flex flex-col items-center py-32">
              <Loader2 className="w-12 h-12 text-pink-500 animate-spin mb-4" />
              <p className="text-slate-500 font-medium animate-pulse">
                Gathering stories...
              </p>
            </div>
          ) : filteredTestimonials.length === 0 ? (
            <div className="text-center py-24 bg-white rounded-[3rem] border border-dashed border-slate-300 max-w-3xl mx-auto">
              <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-300">
                <MessageCircle size={40} />
              </div>
              <h3 className="text-2xl font-bold text-slate-800 mb-2">
                No stories found yet
              </h3>
              <p className="text-slate-500 mb-8">
                Be the first to inspire the community!
              </p>
              <button
                onClick={() => setShowForm(true)}
                className="text-pink-600 font-bold hover:underline"
              >
                Share your experience &rarr;
              </button>
            </div>
          ) : (
            <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
              {filteredTestimonials.map((t, idx) => (
                <div
                  key={t._id || idx}
                  className="break-inside-avoid relative bg-white p-8 rounded-[2rem] shadow-sm hover:shadow-2xl transition-all duration-300 border border-slate-100 group hover:-translate-y-2 overflow-hidden"
                >
                  <div className="absolute top-6 right-8 text-slate-100 group-hover:text-pink-50 transition-colors">
                    <Quote size={60} fill="currentColor" />
                  </div>

                  <div className="relative z-10 flex items-center gap-4 mb-6">
                    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-100 to-pink-100 flex items-center justify-center text-slate-700 font-bold text-xl border-2 border-white shadow-sm">
                      {t.name.charAt(0)}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-slate-900 leading-tight">
                        {t.name}
                      </h3>
                      <span
                        className={`inline-block text-xs font-bold uppercase tracking-wider mt-1 ${
                          t.role === "Student"
                            ? "text-blue-500"
                            : t.role === "Leader"
                              ? "text-purple-500"
                              : "text-pink-500"
                        }`}
                      >
                        {t.role}
                      </span>
                    </div>
                  </div>

                  <p className="relative z-10 text-slate-600 leading-relaxed mb-6 font-medium">
                    "{t.story}"
                  </p>

                  <div className="relative z-10 pt-6 border-t border-slate-50 flex justify-between items-center">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                      {t.date
                        ? new Date(t.date).toLocaleDateString(undefined, {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })
                        : "Recently"}
                    </span>

                    <button
                      onClick={() => handleLike(t._id, idx)}
                      className="flex items-center gap-2 group/btn"
                    >
                      <div
                        className={`p-2 rounded-full transition-colors ${likedIndex === idx ? "bg-pink-100 text-pink-600" : "bg-slate-50 text-slate-400 group-hover/btn:bg-pink-50 group-hover/btn:text-pink-500"}`}
                      >
                        <Heart
                          size={18}
                          className={`transition-transform ${likedIndex === idx ? "fill-current scale-125" : ""}`}
                        />
                      </div>
                      <span
                        className={`text-sm font-bold ${likedIndex === idx ? "text-pink-600" : "text-slate-400 group-hover/btn:text-pink-500"}`}
                      >
                        {t.likes || 0}
                      </span>
                    </button>
                  </div>

                  {likedIndex === idx && (
                    <div className="absolute bottom-8 right-8 pointer-events-none">
                      <Heart
                        className="text-pink-500 fill-current animate-heart-burst"
                        size={24}
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* 📝 MODAL FORM (Fixed Height & Overlap) */}
      {showForm && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-slate-900/70 backdrop-blur-sm"
            onClick={() => setShowForm(false)}
          ></div>

          {/* Modal Container - Added max-h and flex-col for correct scrolling */}
          <div className="bg-white rounded-[2rem] shadow-2xl w-full max-w-lg relative animate-scale-in z-10 flex flex-col max-h-[85vh]">
            {/* Header (Sticky at top of modal) */}
            <div className="p-6 md:p-8 border-b border-slate-100 flex justify-between items-center bg-white rounded-t-[2rem] shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-pink-50 rounded-full flex items-center justify-center text-pink-500">
                  <Sparkles size={20} />
                </div>
                <h2 className="text-xl md:text-2xl font-black text-slate-900">
                  Share Story
                </h2>
              </div>
              <button
                onClick={() => setShowForm(false)}
                className="p-2 bg-slate-50 hover:bg-red-50 hover:text-red-500 text-slate-400 rounded-full transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Scrollable Body */}
            <div className="p-6 md:p-8 overflow-y-auto custom-scrollbar">
              <p className="text-slate-500 mb-6 text-sm">
                Your voice matters. Share how Teens Voice Africa has impacted
                you or your community.
              </p>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">
                    Full Name
                  </label>
                  <input
                    required
                    type="text"
                    placeholder="e.g., Jane Doe"
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all font-medium"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">
                    Your Role
                  </label>
                  <div className="relative">
                    <select
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all font-medium appearance-none"
                      value={formData.role}
                      onChange={(e) =>
                        setFormData({ ...formData, role: e.target.value })
                      }
                    >
                      <option>Student</option>
                      <option>Parent</option>
                      <option>Leader</option>
                    </select>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                      ▼
                    </div>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">
                    Your Story
                  </label>
                  <textarea
                    required
                    maxLength={MAX_CHARS}
                    placeholder="Share your experience..."
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-pink-500 focus:ring-4 focus:ring-pink-500/10 outline-none transition-all font-medium h-32 resize-none"
                    value={formData.story}
                    onChange={(e) =>
                      setFormData({ ...formData, story: e.target.value })
                    }
                  ></textarea>
                  <div className="text-right text-xs text-slate-400 font-bold">
                    {formData.story.length}/{MAX_CHARS}
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-4 bg-slate-900 text-white font-bold rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center gap-2"
                >
                  {submitting ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <>
                      Submit Story <Send size={18} />
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* 🎨 Custom Animations CSS */}
      <style>{`
        @keyframes heartBurst {
          0% { transform: scale(0) translateY(0); opacity: 0; }
          50% { transform: scale(1.2) translateY(-20px); opacity: 1; }
          100% { transform: scale(1) translateY(-40px); opacity: 0; }
        }
        .animate-heart-burst {
          animation: heartBurst 0.8s ease-out forwards;
        }
        @keyframes scaleIn {
          from { transform: scale(0.9); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        .animate-scale-in {
          animation: scaleIn 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }
        /* Custom scrollbar for modal */
        .custom-scrollbar::-webkit-scrollbar {
            width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
            background: #f1f5f9;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
            background: #cbd5e1;
            border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
            background: #94a3b8;
        }
      `}</style>
    </div>
  );
};

export default Testimonials;
