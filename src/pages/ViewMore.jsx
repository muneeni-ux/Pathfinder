import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { 
  ArrowLeft, 
  Calendar, 
  Clock, 
  Share2, 
  AlertCircle, 
  Loader2,
  Tag
} from "lucide-react";
import { toast } from "react-hot-toast";

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

const ViewMore = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;
    const fetchPost = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${SERVER_URL}/api/posts/${id}`);
        const data = await res.json();
        
        if (!res.ok) throw new Error(data.error || data.message || "Post not found");
        
        setPost(data);
      } catch (err) {
        setError(err.message || "Failed to load post");
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  const formatDate = (dateString) => {
    if (!dateString) return "Unknown Date";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success("Link copied to clipboard!");
  };

  // --- LOADING STATE ---
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center bg-green-50">
        <Loader2 className="w-12 h-12 text-amber-500 animate-spin mb-4" />
        <p className="text-green-800 font-semibold animate-pulse">Loading article...</p>
      </div>
    );
  }

  // --- ERROR STATE ---
  if (error || !post) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center bg-green-50 px-6 text-center">
        <AlertCircle className="w-16 h-16 text-red-500 mb-4" />
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          {error || "Article not found"}
        </h2>
        <p className="text-gray-600 mb-8">
          The article you are looking for might have been removed or is temporarily unavailable.
        </p>
        <button
          onClick={() => navigate("/news-updates")}
          className="flex items-center gap-2 px-6 py-3 bg-green-700 text-white rounded-full font-semibold hover:bg-green-800 transition shadow-lg hover:shadow-xl transform hover:-translate-y-1"
        >
          <ArrowLeft size={20} /> Back to News
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-50 mt-[-5px] mb-[-3rem]">
      
      {/* HERO SECTION - IMAGE */}
      <div className="relative w-full h-[50vh] md:h-[60vh] bg-gray-900">
        <img
          src={post.image || "https://via.placeholder.com/1200x600?text=Pathfinder+Update"}
          alt={post.title}
          className="w-full h-full object-cover opacity-90"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
        
        {/* Navigation Button (Floating) */}
        <button 
          onClick={() => navigate("/news-updates")}
          className="absolute top-6 left-6 md:top-10 md:left-10 bg-white/20 backdrop-blur-md hover:bg-white/30 text-white p-3 rounded-full transition-all border border-white/30 group"
        >
          <ArrowLeft size={24} className="group-hover:-translate-x-1 transition-transform" />
        </button>
      </div>

      {/* CONTENT CONTAINER - OVERLAPPING HERO */}
      <div className="max-w-4xl mx-auto px-6 relative -mt-32 md:-mt-40 z-10 pb-20">
        
        {/* Title Card */}
        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-10 border border-gray-100">
          
          {/* Metadata Row */}
          <div className="flex flex-wrap items-center gap-4 mb-6 text-sm md:text-base">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-800 font-semibold uppercase tracking-wide text-xs">
              <Tag size={14} />
              {post.category || "General"}
            </span>
            <span className="flex items-center gap-1.5 text-gray-500">
              <Calendar size={16} />
              {formatDate(post.date)}
            </span>
            <span className="flex items-center gap-1.5 text-gray-500">
              <Clock size={16} />
              3 min read
            </span>
          </div>

          <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 leading-tight mb-6">
            {post.title}
          </h1>

          {/* Divider with Share Button */}
          <div className="flex items-center justify-between border-t border-b border-gray-100 py-4 my-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-700 font-bold">
                P
              </div>
              <div className="text-sm">
                <p className="font-semibold text-gray-800">Pathfinder@75 Team</p>
                <p className="text-gray-500">Author</p>
              </div>
            </div>
            
            <button 
              onClick={handleShare}
              className="flex items-center gap-2 text-gray-500 hover:text-green-600 transition-colors"
              title="Share this article"
            >
              <Share2 size={20} />
              <span className="hidden sm:inline">Share</span>
            </button>
          </div>

          {/* Article Body */}
          <article className="prose prose-lg prose-green max-w-none text-gray-700 leading-relaxed">
            {/* We split by newline to create paragraphs. 
               For a more advanced rich-text experience later, you might use 'dangerouslySetInnerHTML' 
               if your backend saves HTML, but this is safe and clean for plain text.
            */}
            {(post.content || "").split("\n").map((paragraph, idx) => (
              paragraph.trim() !== "" && (
                <p key={idx} className="mb-6 first-letter:text-5xl first-letter:font-bold first-letter:text-green-700 first-letter:mr-3 first-letter:float-left">
                  {paragraph}
                </p>
              )
            ))}
          </article>

        </div>

        {/* Bottom Navigation */}
        <div className="mt-12 text-center">
          <button
            onClick={() => navigate("/news-updates")}
            className="text-green-700 font-semibold hover:text-green-900 transition flex items-center justify-center gap-2 mx-auto"
          >
            <ArrowLeft size={20} /> Return to News Feed
          </button>
        </div>

      </div>
    </div>
  );
};

export default ViewMore;