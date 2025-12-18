// import React, { useState } from "react";
// import { MessageCircle, PlusCircle, X, Heart } from "lucide-react";
// import toast, { Toaster } from "react-hot-toast";

// const SERVER_URL = process.env.REACT_APP_SERVER_URL;


// // SAMPLE TESTIMONIALS
// const sampleTestimonials = [
//   {
//     name: "John O.",
//     role: "Pathfinder",
//     story:
//       "Joining Pathfinder made me more disciplined and confident. The drills, camping, and teamwork shaped me into who I am today.",
//     date: "Nov 2025",
//     likes: 4,
//   },
//   {
//     name: "Mary A.",
//     role: "Parent",
//     story:
//       "Allowing my daughter to join Pathfinder was the best decision. She became responsible, respectful, and spiritually grounded.",
//     date: "Oct 2025",
//     likes: 7,
//   },
//   {
//     name: "Elder Brian",
//     role: "Leader",
//     story:
//       "Serving in Pathfinder leadership taught me patience and mentorship. Seeing young people grow is a blessing.",
//     date: "Sep 2025",
//     likes: 3,
//   },
// ];

// const categories = ["All", "Pathfinder", "Parent", "Leader"];
// const MAX_CHARS = 220;

// const Testimonials = () => {
//   const [activeCategory, setActiveCategory] = useState("All");
//   const [testimonials, setTestimonials] = useState(sampleTestimonials);

//   const [likedIndex, setLikedIndex] = useState(null);
//   const [showForm, setShowForm] = useState(false);
//   const [formData, setFormData] = useState({
//     name: "",
//     role: "Pathfinder",
//     story: "",
//   });

//   const filteredTestimonials =
//     activeCategory === "All"
//       ? testimonials
//       : testimonials.filter((t) => t.role === activeCategory);

//   // HANDLE LIKE
//   const handleLike = (idx) => {
//     const updated = [...testimonials];
//     updated[idx].likes += 1;
//     setLikedIndex(idx);

//     setTimeout(() => setLikedIndex(null), 800);
//     setTestimonials(updated);
//   };

//   // HANDLE FORM SUBMIT
//   const handleSubmit = (e) => {
//     e.preventDefault();

//     const newStory = {
//       ...formData,
//       date: new Date().toLocaleDateString("en-US", {
//         month: "short",
//         year: "numeric",
//       }),
//       likes: 0,
//     };

//     setTestimonials([newStory, ...testimonials]);
//     setShowForm(false);
//     setFormData({ name: "", role: "Pathfinder", story: "" });
//   };

//   return (
//     <div className="bg-green-50 min-h-screen py-16 px-6 mt-[-2rem] mb-[-4rem]">

//       {/* HEADER */}
//       <div className="text-center mb-12 animate-fadeIn">
//         <h1 className="text-4xl md:text-5xl font-extrabold text-green-900">
//           Pathfinder Stories & Testimonials 🌿
//         </h1>
//         <p className="text-green-700 mt-3 text-lg max-w-2xl mx-auto">
//           Real experiences from Pathfinders, parents, and leaders whose lives
//           have been transformed through the movement.
//         </p>

//         <button
//           onClick={() => setShowForm(true)}
//           className="mt-6 bg-amber-500 text-white px-6 py-3 rounded-full flex gap-2 mx-auto shadow-lg hover:bg-amber-600 transition transform hover:scale-105"
//         >
//           <PlusCircle /> Share Your Story
//         </button>
//       </div>

//       {/* CATEGORY FILTERS */}
//       <div className="flex justify-center gap-3 mb-10 flex-wrap animate-fadeIn">
//         {categories.map((cat) => (
//           <button
//             key={cat}
//             onClick={() => setActiveCategory(cat)}
//             className={`px-4 py-2 rounded-full font-semibold transition ${
//               activeCategory === cat
//                 ? "bg-green-700 text-white"
//                 : "bg-green-100 text-green-900 hover:bg-green-200"
//             }`}
//           >
//             {cat}
//           </button>
//         ))}
//       </div>

//       {/* TESTIMONIAL CARDS */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
//         {filteredTestimonials.map((t, idx) => (
//           <div
//             key={idx}
//             className="relative bg-white p-6 rounded-xl shadow-lg border border-green-200 hover:shadow-xl transition hover:-translate-y-1 animate-pop"
//           >
//             {/* Floating hearts when liked */}
//             {likedIndex === idx && (
//               <div className="absolute -top-2 right-4 animate-heartFloat text-red-500">
//                 ❤️
//               </div>
//             )}

//             <div className="flex items-center gap-3 mb-4">
//               <MessageCircle className="text-green-700" />
//               <div>
//                 <h2 className="text-lg font-bold text-green-900">{t.name}</h2>
//                 <p className="text-green-600 text-sm">{t.role}</p>
//               </div>
//             </div>

//             <p className="text-green-800 mb-4">{t.story}</p>

//             <div className="flex justify-between items-center">
//               <p className="text-xs text-green-500">{t.date}</p>

//               {/* LIKE BUTTON */}
//               <button
//                 onClick={() => handleLike(idx)}
//                 className="flex items-center gap-1 text-red-500 hover:text-red-600 transition"
//               >
//                 <Heart size={18} /> {t.likes}
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* MODAL FORM */}
//       {showForm && (
//         <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50">
//           <div className="bg-white rounded-xl shadow-xl p-8 max-w-lg w-full relative animate-fadeIn">

//             <button
//               onClick={() => setShowForm(false)}
//               className="absolute top-3 right-3 text-green-700 hover:text-green-900"
//             >
//               <X size={24} />
//             </button>

//             <h2 className="text-2xl font-bold text-green-900 mb-4">
//               Share Your Pathfinder Story 🌱
//             </h2>

//             <form onSubmit={handleSubmit} className="space-y-4">

//               <input
//                 required
//                 type="text"
//                 placeholder="Your Full Name"
//                 className="w-full border border-green-300 rounded-lg p-3"
//                 value={formData.name}
//                 onChange={(e) =>
//                   setFormData({ ...formData, name: e.target.value })
//                 }
//               />

//               <select
//                 className="w-full border border-green-300 rounded-lg p-3"
//                 value={formData.role}
//                 onChange={(e) =>
//                   setFormData({ ...formData, role: e.target.value })
//                 }
//               >
//                 <option>Pathfinder</option>
//                 <option>Parent</option>
//                 <option>Leader</option>
//               </select>

//               {/* STORY TEXTAREA + LIMIT */}
//               <div>
//                 <textarea
//                   required
//                   maxLength={MAX_CHARS}
//                   placeholder="Write your story..."
//                   className="w-full border border-green-300 rounded-lg p-3 h-32"
//                   value={formData.story}
//                   onChange={(e) =>
//                     setFormData({ ...formData, story: e.target.value })
//                   }
//                 ></textarea>

//                 <p className="text-xs text-green-600 text-right">
//                   {formData.story.length}/{MAX_CHARS} characters
//                 </p>
//               </div>

//               <button className="w-full bg-green-700 text-white py-3 rounded-lg font-semibold hover:bg-green-800 transition">
//                 Submit Story
//               </button>
//             </form>
//           </div>
//         </div>
//       )}

//       {/* Custom Animations */}
//       <style>{`
//         @keyframes heartFloat {
//           from { opacity: 0; transform: translateY(10px) scale(0.5); }
//           to { opacity: 1; transform: translateY(-20px) scale(1.2); }
//         }
//         .animate-heartFloat {
//           animation: heartFloat 0.8s ease-out forwards;
//         }

//         @keyframes fadeIn {
//           from { opacity: 0; transform: translateY(15px); }
//           to { opacity: 1; transform: translateY(0); }
//         }
//         .animate-fadeIn {
//           animation: fadeIn 0.6s ease-out forwards;
//         }

//         @keyframes pop {
//           0% { transform: scale(0.95); opacity: 0; }
//           100% { transform: scale(1); opacity: 1; }
//         }
//         .animate-pop {
//           animation: pop 0.3s ease-out;
//         }
//       `}</style>
//     </div>
//   );
// };

// export default Testimonials;

import React, { useState, useEffect } from "react";
import { MessageCircle, PlusCircle, X, Heart } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

const SERVER_URL = process.env.REACT_APP_SERVER_URL;
const categories = ["All", "Pathfinder", "Parent", "Leader"];
const MAX_CHARS = 220;

const Testimonials = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [testimonials, setTestimonials] = useState([]);
  const [likedIndex, setLikedIndex] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    role: "Pathfinder",
    story: "",
  });
  const [loading, setLoading] = useState(false);

  // Fetch approved testimonials from backend
  const fetchTestimonials = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${SERVER_URL}/testimonials`);
      const data = await res.json();
      if (data.success) {
        setTestimonials(data.data);
      } else {
        toast.error("Failed to load testimonials");
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
      const res = await fetch(`${SERVER_URL}/testimonials/like/${testimonialId}`, {
        method: "PUT",
      });
      const data = await res.json();
      if (data.success) {
        const updated = [...testimonials];
        updated[idx].likes = data.data.likes;
        setLikedIndex(idx);
        setTestimonials(updated);
        setTimeout(() => setLikedIndex(null), 800);
      } else {
        toast.error("Failed to like testimonial");
      }
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

    try {
      const res = await fetch(`${SERVER_URL}/testimonials`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success) {
        toast.success("Story submitted for admin approval");
        setFormData({ name: "", role: "Pathfinder", story: "" });
        setShowForm(false);
        fetchTestimonials(); // refresh list
      } else {
        toast.error(data.message || "Failed to submit story");
      }
    } catch (err) {
      console.error(err);
      toast.error("Error submitting testimonial");
    }
  };

  return (
    <div className="bg-green-50 min-h-screen py-16 px-6 mt-[-2rem] mb-[-4rem] relative">
      <Toaster position="top-right" reverseOrder={false} />

      {/* HEADER */}
      <div className="text-center mb-12 animate-fadeIn">
        <h1 className="text-4xl md:text-5xl font-extrabold text-green-900">
          Pathfinder Stories & Testimonials 🌿
        </h1>
        <p className="text-green-700 mt-3 text-lg max-w-2xl mx-auto">
          Real experiences from Pathfinders, parents, and leaders whose lives
          have been transformed through the movement.
        </p>

        <button
          onClick={() => setShowForm(true)}
          className="mt-6 bg-amber-500 text-white px-6 py-3 rounded-full flex gap-2 mx-auto shadow-lg hover:bg-amber-600 transition transform hover:scale-105"
        >
          <PlusCircle /> Share Your Story
        </button>
      </div>

      {/* CATEGORY FILTERS */}
      <div className="flex justify-center gap-3 mb-10 flex-wrap animate-fadeIn">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-full font-semibold transition ${
              activeCategory === cat
                ? "bg-green-700 text-white"
                : "bg-green-100 text-green-900 hover:bg-green-200"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* TESTIMONIAL CARDS */}
      {loading ? (
        <p className="text-center text-green-700">Loading testimonials...</p>
      ) : filteredTestimonials.length === 0 ? (
        <p className="text-center text-green-700">No testimonials yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {filteredTestimonials.map((t, idx) => (
            <div
              key={t._id}
              className="relative bg-white p-6 rounded-xl shadow-lg border border-green-200 hover:shadow-xl transition hover:-translate-y-1 animate-pop"
            >
              {likedIndex === idx && (
                <div className="absolute -top-2 right-4 animate-heartFloat text-red-500">
                  ❤️
                </div>
              )}

              <div className="flex items-center gap-3 mb-4">
                <MessageCircle className="text-green-700" />
                <div>
                  <h2 className="text-lg font-bold text-green-900">{t.name}</h2>
                  <p className="text-green-600 text-sm">{t.role}</p>
                </div>
              </div>

              <p className="text-green-800 mb-4">{t.story}</p>

              <div className="flex justify-between items-center">
                <p className="text-xs text-green-500">
                  {new Date(t.date).toLocaleString("en-US", { month: "short", year: "numeric" })}
                </p>

                <button
                  onClick={() => handleLike(t._id, idx)}
                  className="flex items-center gap-1 text-red-500 hover:text-red-600 transition"
                >
                  <Heart size={18} /> {t.likes}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* MODAL FORM */}
      {showForm && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl p-8 max-w-lg w-full relative animate-fadeIn">
            <button
              onClick={() => setShowForm(false)}
              className="absolute top-3 right-3 text-green-700 hover:text-green-900"
            >
              <X size={24} />
            </button>

            <h2 className="text-2xl font-bold text-green-900 mb-4">
              Share Your Pathfinder Story 🌱
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                required
                type="text"
                placeholder="Your Full Name"
                className="w-full border border-green-300 rounded-lg p-3"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />

              <select
                className="w-full border border-green-300 rounded-lg p-3"
                value={formData.role}
                onChange={(e) =>
                  setFormData({ ...formData, role: e.target.value })
                }
              >
                <option>Pathfinder</option>
                <option>Parent</option>
                <option>Leader</option>
              </select>

              <div>
                <textarea
                  required
                  maxLength={MAX_CHARS}
                  placeholder="Write your story..."
                  className="w-full border border-green-300 rounded-lg p-3 h-32"
                  value={formData.story}
                  onChange={(e) =>
                    setFormData({ ...formData, story: e.target.value })
                  }
                ></textarea>

                <p className="text-xs text-green-600 text-right">
                  {formData.story.length}/{MAX_CHARS} characters
                </p>
              </div>

              <button className="w-full bg-green-700 text-white py-3 rounded-lg font-semibold hover:bg-green-800 transition">
                Submit Story
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Custom Animations */}
      <style>{`
        @keyframes heartFloat {
          from { opacity: 0; transform: translateY(10px) scale(0.5); }
          to { opacity: 1; transform: translateY(-20px) scale(1.2); }
        }
        .animate-heartFloat {
          animation: heartFloat 0.8s ease-out forwards;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(15px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.6s ease-out forwards;
        }

        @keyframes pop {
          0% { transform: scale(0.95); opacity: 0; }
          100% { transform: scale(1); opacity: 1; }
        }
        .animate-pop {
          animation: pop 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default Testimonials;
