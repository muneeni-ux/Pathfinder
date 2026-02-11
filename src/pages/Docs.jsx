import React, { useState, useEffect } from "react";
import {
  FileText,
  Download,
  Video,
  BookOpen,
  ChevronRight,
  PlayCircle,
  Loader2,
  AlertCircle,
  FolderOpen,
  FileCheck,
  Search
} from "lucide-react";

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

const Docs = () => {
  const [documents, setDocuments] = useState([]);
  const [videos, setVideos] = useState([]);
  const [forms, setForms] = useState([]);
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchResources = async () => {
      try {
        const response = await fetch(`${SERVER_URL}/api/resources`);
        if (!response.ok) {
          throw new Error("Failed to fetch resources");
        }
        const data = await response.json();

        setDocuments(data.filter((item) => item.category === "document"));
        setVideos(data.filter((item) => item.category === "video"));
        setForms(data.filter((item) => item.category === "form"));
      } catch (err) {
        console.error(err);
        setError("Unable to load resources. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchResources();
  }, []);

  const getIcon = (type) => {
    const safeType = (type || "").toLowerCase();
    if (safeType.includes("policy") || safeType.includes("report")) {
      return <FileText className="w-6 h-6 text-pink-500" />;
    } else if (safeType.includes("manual") || safeType.includes("guideline")) {
      return <BookOpen className="w-6 h-6 text-blue-500" />;
    } else {
      return <FileText className="w-6 h-6 text-purple-500" />;
    }
  };

  if (loading) {
    return (
      <div className="bg-slate-50 min-h-screen flex flex-col justify-center items-center">
        <Loader2 className="w-12 h-12 text-blue-500 animate-spin mb-4" />
        <p className="text-slate-500 font-semibold text-lg animate-pulse">Accessing Knowledge Hub...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-slate-50 min-h-screen flex flex-col justify-center items-center px-6 text-center">
        <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mb-6">
            <AlertCircle className="w-10 h-10 text-red-500" />
        </div>
        <p className="text-red-500 font-semibold text-lg">{error}</p>
        <button onClick={() => window.location.reload()} className="mt-6 px-6 py-3 bg-slate-900 text-white rounded-full font-bold">Try Again</button>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 overflow-x-hidden min-h-screen font-sans selection:bg-pink-200">
      
      {/* 🌟 HERO SECTION (Digital Library Theme) */}
      <section className="relative min-h-[50vh] flex items-center justify-center overflow-hidden bg-slate-900 pt-20 pb-20 rounded-b-[3rem]">
        {/* Animated Background */}
        <div className="absolute inset-0">
            <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-blue-600/20 rounded-full blur-[100px] animate-pulse-slow"></div>
            <div className="absolute bottom-[-20%] left-[-10%] w-[600px] h-[600px] bg-pink-600/20 rounded-full blur-[100px] animate-pulse-slow delay-1000"></div>
            {/* Grid Pattern */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        </div>
        
        {/* Floating Icons */}
        <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-20 left-[15%] animate-float opacity-30">
                <FolderOpen className="text-blue-300 w-16 h-16" />
            </div>
            <div className="absolute bottom-20 right-[15%] animate-float opacity-30" style={{ animationDelay: '1.5s' }}>
                <BookOpen className="text-pink-300 w-12 h-12" />
            </div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center animate-fade-in-up">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-blue-200 text-xs font-bold uppercase tracking-widest mb-6">
             <Search size={14} /> Knowledge Base
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-white mb-6 drop-shadow-2xl tracking-tight">
             Resources <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-pink-500">Hub</span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-300 max-w-2xl mx-auto leading-relaxed font-light">
             Access official handbooks, training videos, and essential documents to empower your journey with TVA.
          </p>
        </div>
      </section>

      {/* 📘 HANDBOOKS & GUIDES */}
      <section className="py-20 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-4 mb-10">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600">
              <BookOpen className="w-6 h-6" />
            </div>
            <h2 className="text-3xl font-extrabold text-slate-900">
              Handbooks & Guides
            </h2>
          </div>
          
          {documents.length === 0 ? (
            <div className="bg-white p-8 rounded-3xl border border-dashed border-slate-200 text-center text-slate-500">
                No documents available at the moment.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {documents.map((doc, idx) => (
                <div
                  key={doc._id || idx}
                  className="group relative bg-white p-6 rounded-[2rem] border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col h-full"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="bg-slate-50 p-3 rounded-2xl group-hover:bg-blue-50 transition-colors">
                        {getIcon(doc.type)}
                    </div>
                    <span className="text-[10px] font-bold uppercase text-slate-400 bg-slate-100 px-2 py-1 rounded-md">
                      {doc.type}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 mb-2 line-clamp-2 leading-tight group-hover:text-blue-600 transition-colors">
                    {doc.title}
                  </h3>
                  
                  <div className="mt-auto pt-6">
                    <a
                        href={doc.fileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 w-full py-3 bg-slate-900 text-white font-bold rounded-xl hover:bg-blue-600 transition-colors shadow-lg shadow-blue-500/10 group-hover:shadow-blue-500/20"
                    >
                        <Download size={16} /> Download
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* 🎥 TRAINING VIDEOS */}
      <section className="py-20 px-6 md:px-12 bg-white relative">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-4 mb-10">
            <div className="w-12 h-12 rounded-2xl bg-pink-50 flex items-center justify-center text-pink-600">
              <Video className="w-6 h-6" />
            </div>
            <h2 className="text-3xl font-extrabold text-slate-900">
              Training Videos
            </h2>
          </div>
          
          {videos.length === 0 ? (
            <div className="bg-slate-50 p-8 rounded-3xl border border-dashed border-slate-200 text-center text-slate-500">
                No training videos available at the moment.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {videos.map((vid, idx) => (
                <a
                  key={vid._id || idx}
                  href={vid.fileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block bg-slate-50 rounded-[2rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="relative aspect-video bg-slate-200 overflow-hidden">
                    <img
                      src={vid.thumbnailUrl || "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80"}
                      alt={vid.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                      <div className="w-14 h-14 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/40 group-hover:scale-110 transition-transform">
                        <PlayCircle size={32} className="text-white fill-white/20" />
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-lg font-bold text-slate-900 line-clamp-1 mb-2 group-hover:text-pink-600 transition-colors">{vid.title}</h3>
                    <div className="flex items-center text-pink-500 text-sm font-bold gap-1 group-hover:gap-2 transition-all">
                        Watch Now <ChevronRight size={16} />
                    </div>
                  </div>
                </a>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* 📝 FORMS & TEMPLATES */}
      <section className="py-20 px-6 md:px-12 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-4 mb-10">
            <div className="w-12 h-12 rounded-2xl bg-purple-50 flex items-center justify-center text-purple-600">
              <FileCheck className="w-6 h-6" />
            </div>
            <h2 className="text-3xl font-extrabold text-slate-900">
              Official Forms
            </h2>
          </div>
          
          {forms.length === 0 ? (
            <div className="bg-white p-8 rounded-3xl border border-dashed border-slate-200 text-center text-slate-500">
                No forms available at the moment.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {forms.map((doc, idx) => (
                <div
                  key={doc._id || idx}
                  className="bg-white p-6 rounded-3xl border border-slate-100 hover:border-purple-200 hover:shadow-lg transition-all duration-300 flex items-center justify-between group"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-purple-50 rounded-xl flex items-center justify-center text-purple-600 group-hover:scale-110 transition-transform">
                       <FileText size={20} />
                    </div>
                    <div>
                        <h3 className="font-bold text-slate-900 line-clamp-1">{doc.title}</h3>
                        <span className="text-xs text-slate-400">PDF Document</span>
                    </div>
                  </div>

                  <a
                    href={doc.fileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-slate-50 rounded-full text-slate-400 hover:bg-purple-600 hover:text-white transition-all"
                    title="Download"
                  >
                    <Download size={18} />
                  </a>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Docs;