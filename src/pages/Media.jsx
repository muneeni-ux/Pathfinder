// import React, { useState } from "react";
// import { X, PlayCircle } from "lucide-react";

// // Sample images and videos
// const galleryImages = [
//   { src: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80", alt: "Tree 1" },
//   { src: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=400&q=80", alt: "Forest" },
//   { src: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=400&q=80", alt: "Plant" },
//   { src: "https://images.unsplash.com/photo-1482192596544-9eb780fc7f66?auto=format&fit=crop&w=400&q=80", alt: "Environment" },
//   { src: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=400&q=80", alt: "Greenery" },
//   { src: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=400&q=80", alt: "Sustainability" },
//   { src: "https://images.unsplash.com/photo-1482192596544-9eb780fc7f66?auto=format&fit=crop&w=400&q=80", alt: "Earth" },
//   { src: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80", alt: "Community" },
// ];


// const galleryVideos = [
//   { src: "https://www.w3schools.com/html/mov_bbb.mp4", alt: "Sample Video 1" },
//   { src: "https://www.w3schools.com/html/movie.mp4", alt: "Sample Video 2" },
// ];

// const Media = () => {
//   const [activeTab, setActiveTab] = useState("images");
//   const [lightbox, setLightbox] = useState({ isOpen: false, src: "", type: "image" });

//   const openLightbox = (src, type = "image") => setLightbox({ isOpen: true, src, type });
//   const closeLightbox = () => setLightbox({ isOpen: false, src: "", type: "image" });

//   return (
//     <div className="bg-green-50 min-h-screen py-16 mt-[-2rem] mb-[-4rem]">
//       {/* Page Header */}
//       <div className="text-center mb-12">
//         <h1 className="text-4xl md:text-5xl font-extrabold text-green-900 mb-2">
//           Media & Gallery
//         </h1>
//         <p className="text-green-700 text-lg md:text-xl">
//           Explore our events, activities, and the impact we are making 🌿
//         </p>
//       </div>

//       {/* Tabs */}
//       <div className="flex justify-center gap-6 mb-12">
//         <button
//           className={`px-6 py-2 font-semibold rounded-full transition ${
//             activeTab === "images"
//               ? "bg-green-900 text-amber-400"
//               : "bg-green-200 text-green-900 hover:bg-green-300"
//           }`}
//           onClick={() => setActiveTab("images")}
//         >
//           Images
//         </button>
//         <button
//           className={`px-6 py-2 font-semibold rounded-full transition ${
//             activeTab === "videos"
//               ? "bg-green-900 text-amber-400"
//               : "bg-green-200 text-green-900 hover:bg-green-300"
//           }`}
//           onClick={() => setActiveTab("videos")}
//         >
//           Videos
//         </button>
//       </div>

//       {/* Gallery Grid */}
//       <div className="max-w-7xl mx-auto px-6">
//         {activeTab === "images" && (
//           <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4">
//             {galleryImages.map((img, idx) => (
//               <div
//                 key={idx}
//                 className="mb-4 break-inside-avoid relative group cursor-pointer rounded-xl overflow-hidden shadow-lg"
//                 onClick={() => openLightbox(img.src, "image")}
//               >
//                 <img
//                   src={img.src}
//                   alt={img.alt}
//                   className="w-full object-cover transition-transform duration-500 group-hover:scale-105 rounded-xl"
//                 />
//                 <div className="absolute bottom-0 left-0 w-full bg-black/30 text-white text-sm px-2 py-1">
//                   {img.alt}
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}

//         {activeTab === "videos" && (
//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//             {galleryVideos.map((vid, idx) => (
//               <div
//                 key={idx}
//                 className="relative group rounded-xl overflow-hidden shadow-lg cursor-pointer"
//                 onClick={() => openLightbox(vid.src, "video")}
//               >
//                 <video
//                   src={vid.src}
//                   className="w-full h-64 object-cover rounded-xl"
//                   muted
//                   loop
//                   autoPlay
//                 />
//                 <div className="absolute inset-0 flex items-center justify-center bg-black/30">
//                   <PlayCircle size={48} className="text-amber-400" />
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>

//       {/* Lightbox */}
//       {lightbox.isOpen && (
//         <div
//           className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
//           onClick={closeLightbox}
//         >
//           <button
//             className="absolute top-4 right-4 text-amber-400 hover:text-white"
//             onClick={closeLightbox}
//           >
//             <X size={28} />
//           </button>
//           {lightbox.type === "image" ? (
//             <img
//               src={lightbox.src}
//               alt="Lightbox"
//               className="max-h-full max-w-full rounded-lg shadow-2xl"
//             />
//           ) : (
//             <video
//               src={lightbox.src}
//               controls
//               autoPlay
//               className="max-h-full max-w-full rounded-lg shadow-2xl"
//             />
//           )}
//         </div>
//       )}

//       {/* Optional CTA */}
//       <div className="text-center mt-12">
//         <p className="text-green-900 font-medium text-lg">
//           Want to see more? Follow us on our social media platforms 🌱
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Media;

import React, { useState } from "react";
import { X, PlayCircle } from "lucide-react";

// Sample galleries
const galleryImages = [
  { src: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80", alt: "Tree 1" },
  { src: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=400&q=80", alt: "Forest" },
  { src: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=400&q=80", alt: "Plant" },
  { src: "https://images.unsplash.com/photo-1482192596544-9eb780fc7f66?auto=format&fit=crop&w=400&q=80", alt: "Environment" },
];

const galleryVideos = [
  { src: "https://www.w3schools.com/html/mov_bbb.mp4", alt: "Sample Video 1" },
  { src: "https://www.w3schools.com/html/movie.mp4", alt: "Sample Video 2" },
];

const entertainmentItems = [
  { title: "Pathfinder Music Showcase", type: "video", src: "https://www.w3schools.com/html/mov_bbb.mp4" },
  { title: "Drama Performance", type: "image", src: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=400&q=80" },
];

const Media = () => {
  const [activeTab, setActiveTab] = useState("images");
  const [lightbox, setLightbox] = useState({ isOpen: false, src: "", type: "image" });

  const openLightbox = (src, type = "image") => setLightbox({ isOpen: true, src, type });
  const closeLightbox = () => setLightbox({ isOpen: false, src: "", type: "image" });

  return (
    <div className="bg-green-50 min-h-screen py-16 mt-[-2rem] mb-[-4rem]">
      {/* Page Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold text-green-900 mb-2">
          Media & Gallery
        </h1>
        <p className="text-green-700 text-lg md:text-xl max-w-2xl mx-auto">
          Explore our events, talent showcases, and Pathfinder legacy 🌿
        </p>
      </div>

      {/* Tabs */}
      <div className="flex justify-center gap-6 mb-12 flex-wrap">
        {["Images", "Videos", "Entertainment" ].map((tab) => (
          <button
            key={tab}
            className={`px-6 py-2 font-semibold rounded-full transition ${
              activeTab.toLowerCase() === tab.toLowerCase()
                ? "bg-green-900 text-amber-400"
                : "bg-green-200 text-green-900 hover:bg-green-300"
            }`}
            onClick={() => setActiveTab(tab.toLowerCase())}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Gallery Grid */}
      <div className="max-w-7xl mx-auto px-6">
        {/* Images */}
        {activeTab === "images" && (
          <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4">
            {galleryImages.map((img, idx) => (
              <div
                key={idx}
                className="mb-4 break-inside-avoid relative group cursor-pointer rounded-xl overflow-hidden shadow-lg"
                onClick={() => openLightbox(img.src, "image")}
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-full object-cover transition-transform duration-500 group-hover:scale-105 rounded-xl"
                />
                <div className="absolute bottom-0 left-0 w-full bg-black/30 text-white text-sm px-2 py-1">
                  {img.alt}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Videos */}
        {activeTab === "videos" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {galleryVideos.map((vid, idx) => (
              <div
                key={idx}
                className="relative group rounded-xl overflow-hidden shadow-lg cursor-pointer"
                onClick={() => openLightbox(vid.src, "video")}
              >
                <video
                  src={vid.src}
                  className="w-full h-64 object-cover rounded-xl"
                  muted
                  loop
                  autoPlay
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                  <PlayCircle size={48} className="text-amber-400" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Entertainment */}
        {activeTab === "entertainment" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {entertainmentItems.map((item, idx) => (
              <div
                key={idx}
                className="relative group rounded-xl overflow-hidden shadow-lg cursor-pointer"
                onClick={() => openLightbox(item.src, item.type)}
              >
                {item.type === "image" ? (
                  <img
                    src={item.src}
                    alt={item.title}
                    className="w-full h-64 object-cover rounded-xl"
                  />
                ) : (
                  <video
                    src={item.src}
                    className="w-full h-64 object-cover rounded-xl"
                    muted
                    loop
                    autoPlay
                  />
                )}
                <div className="absolute bottom-0 left-0 w-full bg-black/40 text-white text-sm px-2 py-1">
                  {item.title}
                </div>
              </div>
            ))}
          </div>
        )}

      </div>

      {/* Lightbox */}
      {lightbox.isOpen && (
        <div
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
          onClick={closeLightbox}
        >
          <button
            className="absolute top-4 right-4 text-amber-400 hover:text-white"
            onClick={closeLightbox}
          >
            <X size={28} />
          </button>
          {lightbox.type === "image" ? (
            <img
              src={lightbox.src}
              alt="Lightbox"
              className="max-h-full max-w-full rounded-lg shadow-2xl"
            />
          ) : (
            <video
              src={lightbox.src}
              controls
              autoPlay
              className="max-h-full max-w-full rounded-lg shadow-2xl"
            />
          )}
        </div>
      )}

      {/* CTA */}
      <div className="text-center mt-12">
        <p className="text-green-900 font-medium text-lg">
          Want to see more? Follow us on our social media platforms 🌱
        </p>
      </div>
    </div>
  );
};

export default Media;
