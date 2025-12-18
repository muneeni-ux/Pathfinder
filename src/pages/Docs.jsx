// import React from "react";
// import {
//   FileText,
//   Download,
//   Video,
//   BookOpen,
//   ChevronRight,
//   PlayCircle,
// } from "lucide-react";

// const SERVER_URL = process.env.REACT_APP_SERVER_URL;

// // Sample documents data
// const documents = [
//   { title: "Environmental Policy", type: "Policy", link: "#" },
//   { title: "Volunteer Guidelines", type: "Guideline", link: "#" },
//   { title: "Annual Report 2025", type: "Report", link: "#" },
//   { title: "Training Manual", type: "Manual", link: "#" },
//   { title: "Project Proposal Template", type: "Proposal", link: "#" },
//   { title: "Certificate Template", type: "Certificate", link: "#" },
// ];

// // Sample training videos
// const videos = [
//   {
//     title: "Tree Planting Basics",
//     link: "#",
//     thumbnail: "https://via.placeholder.com/300x200",
//   },
//   {
//     title: "Outdoor Skills Tutorial",
//     link: "#",
//     thumbnail: "https://via.placeholder.com/300x200",
//   },
//   {
//     title: "First Aid & Safety Review",
//     link: "#",
//     thumbnail: "https://via.placeholder.com/300x200",
//   },
//   {
//     title: "Community Service Planning",
//     link: "#",
//     thumbnail: "https://via.placeholder.com/300x200",
//   },
// ];

// // Sample forms data (used in the third section)
// const forms = [
//   { title: "Participation Certificate", type: "Template", link: "#" },
//   { title: "Event Registration Form", type: "Form", link: "#" },
//   { title: "Club Activity Log", type: "Form", link: "#" },
//   { title: "Volunteer Agreement Form", type: "Form", link: "#" },
// ];

// const Docs = () => {
//   // Helper to determine the icon based on file type
//   const getIcon = (type) => {
//     switch (type.toLowerCase()) {
//       case "policy":
//       case "report":
//         return <FileText className="w-8 h-8 text-amber-500" />;
//       case "manual":
//       case "guideline":
//         return <BookOpen className="w-8 h-8 text-amber-500" />;
//       default:
//         return <FileText className="w-8 h-8 text-amber-500" />;
//     }
//   };

//   return (
//     <div className="bg-green-50 min-h-screen py-16 mt-[-2rem] mb-[-4rem]">
//       {/* Header */}
//       <div className="text-center mb-16 max-w-4xl mx-auto px-6">
//         <h1 className="text-4xl md:text-5xl font-extrabold text-green-900 mb-3">
//           📚 Resources & Learning Hub
//         </h1>
//         <p className="text-green-700 text-lg md:text-xl">
//           Access Pathfinder handbooks, guides, training videos, and official
//           forms to help you **learn, grow, and engage effectively** in
//           activities.
//         </p>
//       </div>

//       {/* --- Handbooks & Guides Section --- */}
//       <section className="max-w-7xl mx-auto px-6 mb-20">
//         <h2 className="text-3xl font-bold text-green-900 mb-8 pb-2 border-b-2 border-amber-500/50 flex items-center gap-3">
//           <FileText className="text-amber-500" /> Essential Handbooks & Guides
//         </h2>
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
//           {" "}
//           {/* Reduced gap for compactness */}
//           {documents.map((doc, idx) => (
//             <div
//               key={idx}
//               className="bg-green-50 p-6 rounded-xl shadow-lg border-l-4 border-amber-500 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
//             >
//               <div className="flex items-start justify-between mb-4">
//                 <div className="flex flex-col">
//                   <span className="text-xs font-semibold uppercase text-green-600 tracking-wider mb-1">
//                     {doc.type}
//                   </span>
//                   <h3 className="text-xl font-extrabold text-green-900">
//                     {doc.title}
//                   </h3>
//                 </div>
//                 {getIcon(doc.type)} {/* Dynamic icon based on type */}
//               </div>

//               <a
//                 href={doc.link}
//                 className="inline-flex items-center gap-2 text-white bg-amber-500 py-2 px-4 rounded-lg font-semibold hover:bg-amber-600 transition shadow-md mt-4"
//               >
//                 <Download size={18} />
//                 Download
//               </a>
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* --- Training Videos Section --- */}
//       <section className="max-w-7xl mx-auto px-6 mb-20">
//         <h2 className="text-3xl font-bold text-green-900 mb-8 pb-2 border-b-2 border-amber-500/50 flex items-center gap-3">
//           <Video className="text-amber-500" /> Training Videos & Tutorials
//         </h2>
//         <p className="text-green-800 mb-8 max-w-3xl">
//           Watch **step-by-step tutorials** to master key Pathfinder skills,
//           including outdoor activities, community service, and environmental
//           projects.
//         </p>
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//           {videos.map((vid, idx) => (
//             <a
//               key={idx}
//               href={vid.link}
//               className="bg-white rounded-xl shadow-lg overflow-hidden transition-transform transform hover:scale-[1.02] hover:shadow-xl group"
//             >
//               <div className="relative">
//                 <img
//                   src={vid.thumbnail}
//                   alt={vid.title}
//                   className="w-full h-40 object-cover group-hover:brightness-75 transition-all duration-300"
//                 />
//                 {/* Play Button Overlay */}
//                 <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
//                   <PlayCircle
//                     size={64}
//                     className="text-amber-500 fill-white/80"
//                   />
//                 </div>
//               </div>
//               <div className="p-4 flex justify-between items-center">
//                 <h3 className="text-green-900 font-semibold">{vid.title}</h3>
//                 <ChevronRight
//                   size={24}
//                   className="text-amber-500 group-hover:translate-x-1 transition"
//                 />
//               </div>
//             </a>
//           ))}
//         </div>
//       </section>

//       {/* --- Forms & Certificates Section --- */}
//       <section className="max-w-7xl mx-auto px-6">
//         <h2 className="text-3xl font-bold text-green-900 mb-8 pb-2 border-b-2 border-amber-500/50 flex items-center gap-3">
//           <BookOpen className="text-amber-500" /> Official Forms & Templates
//         </h2>
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//           {forms.map((doc, idx) => (
//             <div
//               key={idx}
//               className="bg-white p-5 rounded-xl border border-green-200 transition-all duration-300 hover:shadow-md hover:bg-green-50"
//             >
//               <div className="flex items-center justify-between">
//                 <div className="flex items-center gap-3">
//                   <FileText className="w-6 h-6 text-green-700" />
//                   <h3 className="text-lg font-semibold text-green-900">
//                     {doc.title}
//                   </h3>
//                 </div>

//                 <a
//                   href={doc.link}
//                   className="flex items-center gap-1 text-amber-500 font-semibold text-sm hover:text-amber-600 transition p-2 rounded-full hover:bg-white"
//                   title={`Download ${doc.title}`}
//                 >
//                   <Download size={18} />
//                 </a>
//               </div>
//             </div>
//           ))}
//         </div>
//       </section>
//     </div>
//   );
// };

// export default Docs;

import React, { useState, useEffect } from "react";
import {
  FileText,
  Download,
  Video,
  BookOpen,
  ChevronRight,
  PlayCircle,
  Loader2,
  AlertCircle
} from "lucide-react";

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

const Docs = () => {
  // State for resources
  const [documents, setDocuments] = useState([]);
  const [videos, setVideos] = useState([]);
  const [forms, setForms] = useState([]);
  
  // State for UI handling
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch Resources on Mount
  useEffect(() => {
    const fetchResources = async () => {
      try {
        const response = await fetch(`${SERVER_URL}/api/resources`);
        if (!response.ok) {
          throw new Error("Failed to fetch resources");
        }
        const data = await response.json();

        // Filter data into categories based on your Backend Schema
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

  // Helper to determine the icon based on file type
  const getIcon = (type) => {
    const safeType = (type || "").toLowerCase();
    if (safeType.includes("policy") || safeType.includes("report")) {
      return <FileText className="w-8 h-8 text-amber-500" />;
    } else if (safeType.includes("manual") || safeType.includes("guideline")) {
      return <BookOpen className="w-8 h-8 text-amber-500" />;
    } else {
      return <FileText className="w-8 h-8 text-amber-500" />;
    }
  };

  // Loading State
  if (loading) {
    return (
      <div className="bg-green-50 min-h-screen flex flex-col justify-center items-center mt-[-2rem] mb-[-4rem]">
        <Loader2 className="w-12 h-12 text-amber-500 animate-spin mb-4" />
        <p className="text-green-800 font-semibold text-lg">Loading Resources...</p>
      </div>
    );
  }

  // Error State
  if (error) {
    return (
      <div className="bg-green-50 min-h-screen flex flex-col justify-center items-center mt-[-2rem] mb-[-4rem]">
        <AlertCircle className="w-12 h-12 text-red-500 mb-4" />
        <p className="text-red-600 font-semibold text-lg">{error}</p>
      </div>
    );
  }

  return (
    <div className="bg-green-50 min-h-screen py-16 mt-[-2rem] mb-[-4rem]">
      {/* Header */}
      <div className="text-center mb-16 max-w-4xl mx-auto px-6">
        <h1 className="text-4xl md:text-5xl font-extrabold text-green-900 mb-3">
          📚 Resources & Learning Hub
        </h1>
        <p className="text-green-700 text-lg md:text-xl">
          Access Pathfinder handbooks, guides, training videos, and official
          forms to help you **learn, grow, and engage effectively** in
          activities.
        </p>
      </div>

      {/* --- Handbooks & Guides Section --- */}
      <section className="max-w-7xl mx-auto px-6 mb-20">
        <h2 className="text-3xl font-bold text-green-900 mb-8 pb-2 border-b-2 border-amber-500/50 flex items-center gap-3">
          <FileText className="text-amber-500" /> Essential Handbooks & Guides
        </h2>
        
        {documents.length === 0 ? (
          <p className="text-green-600 italic">No documents available at the moment.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {documents.map((doc, idx) => (
              <div
                key={doc._id || idx}
                className="bg-green-50 p-6 rounded-xl shadow-lg border-l-4 border-amber-500 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex flex-col">
                    <span className="text-xs font-semibold uppercase text-green-600 tracking-wider mb-1">
                      {doc.type}
                    </span>
                    <h3 className="text-xl font-extrabold text-green-900 line-clamp-2">
                      {doc.title}
                    </h3>
                  </div>
                  {getIcon(doc.type)}
                </div>

                <a
                  href={doc.fileUrl} // Mapped to backend 'fileUrl'
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-white bg-amber-500 py-2 px-4 rounded-lg font-semibold hover:bg-amber-600 transition shadow-md mt-4"
                >
                  <Download size={18} />
                  Download
                </a>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* --- Training Videos Section --- */}
      <section className="max-w-7xl mx-auto px-6 mb-20">
        <h2 className="text-3xl font-bold text-green-900 mb-8 pb-2 border-b-2 border-amber-500/50 flex items-center gap-3">
          <Video className="text-amber-500" /> Training Videos & Tutorials
        </h2>
        <p className="text-green-800 mb-8 max-w-3xl">
          Watch **step-by-step tutorials** to master key Pathfinder skills,
          including outdoor activities, community service, and environmental
          projects.
        </p>
        
        {videos.length === 0 ? (
           <p className="text-green-600 italic">No training videos available at the moment.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {videos.map((vid, idx) => (
              <a
                key={vid._id || idx}
                href={vid.fileUrl} // Mapped to backend 'fileUrl'
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white rounded-xl shadow-lg overflow-hidden transition-transform transform hover:scale-[1.02] hover:shadow-xl group"
              >
                <div className="relative">
                  <img
                    src={vid.thumbnailUrl || "https://via.placeholder.com/300x200?text=No+Thumbnail"} // Mapped to backend 'thumbnailUrl'
                    alt={vid.title}
                    className="w-full h-40 object-cover group-hover:brightness-75 transition-all duration-300"
                  />
                  {/* Play Button Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <PlayCircle
                      size={64}
                      className="text-amber-500 fill-white/80"
                    />
                  </div>
                </div>
                <div className="p-4 flex justify-between items-center">
                  <h3 className="text-green-900 font-semibold line-clamp-1">{vid.title}</h3>
                  <ChevronRight
                    size={24}
                    className="text-amber-500 group-hover:translate-x-1 transition"
                  />
                </div>
              </a>
            ))}
          </div>
        )}
      </section>

      {/* --- Forms & Certificates Section --- */}
      <section className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-green-900 mb-8 pb-2 border-b-2 border-amber-500/50 flex items-center gap-3">
          <BookOpen className="text-amber-500" /> Official Forms & Templates
        </h2>
        
        {forms.length === 0 ? (
           <p className="text-green-600 italic">No forms available at the moment.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {forms.map((doc, idx) => (
              <div
                key={doc._id || idx}
                className="bg-white p-5 rounded-xl border border-green-200 transition-all duration-300 hover:shadow-md hover:bg-green-50"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <FileText className="w-6 h-6 text-green-700" />
                    <h3 className="text-lg font-semibold text-green-900 line-clamp-1">
                      {doc.title}
                    </h3>
                  </div>

                  <a
                    href={doc.fileUrl} // Mapped to backend 'fileUrl'
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-amber-500 font-semibold text-sm hover:text-amber-600 transition p-2 rounded-full hover:bg-white"
                    title={`Download ${doc.title}`}
                  >
                    <Download size={18} />
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Docs;