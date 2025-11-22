import React, { useState } from "react";

// Sample posts with categories
const posts = [
  {
    title: "Community Tree Planting Initiative",
    date: "Nov 5, 2025",
    snippet: "Our volunteers gathered to plant over 200 trees in local schools and parks, promoting sustainability and green awareness...",
    link: "#",
    img: "https://images.unsplash.com/photo-1482192596544-9eb780fc7f66?auto=format&fit=crop&w=400&q=80",
    category: "Events",
  },
  {
    title: "Environmental Awareness Workshop",
    date: "Oct 20, 2025",
    snippet: "We held an interactive workshop with local youth to educate about climate change, recycling, and eco-friendly practices...",
    link: "#",
    img: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=600&q=80",
    category: "Reports",
  },
  {
    title: "Local Park Cleanup",
    date: "Aug 10, 2025",
    snippet: "Community members joined hands to clean up local parks and promote environmental responsibility...",
    link: "#",
    img: "https://images.unsplash.com/photo-1593642634315-48f5414c3ad9?auto=format&fit=crop&w=600&q=80",
    category: "Events",
  },
];

const categories = ["All", "Events", "Reports"];

const NewUpdates = () => {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredPosts =
    activeCategory === "All"
      ? posts
      : posts.filter((post) => post.category === activeCategory);

  return (
    <div className="bg-green-50 py-16 min-h-screen mt-[-2rem] mb-[-4rem]">
      {/* Section Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold text-green-900 mb-2">
          News & Updates
        </h1>
        <p className="text-green-700 text-lg md:text-xl">
          Stay updated with our latest events, projects, and success stories 🌿
        </p>
      </div>

      {/* Category Tabs */}
      <div className="flex justify-center mb-12 space-x-4 flex-wrap">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-full font-semibold transition 
              ${
                activeCategory === cat
                  ? "bg-amber-500 text-white"
                  : "bg-green-100 text-green-900 hover:bg-green-200"
              }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Posts Grid */}
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredPosts.map((post, idx) => (
          <div
            key={idx}
            className="bg-white rounded-xl shadow-lg overflow-hidden transition-transform transform hover:scale-105"
          >
            {/* Thumbnail Image */}
            <div className="h-48 w-full overflow-hidden rounded-t-xl">
              <img
                src={post.img}
                alt={post.title}
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
              />
            </div>

            {/* Card Content */}
            <div className="p-6">
              <h2 className="text-2xl font-bold text-green-900 mb-2">{post.title}</h2>
              <p className="text-green-600 text-sm mb-4">{post.date}</p>
              <p className="text-green-800 mb-4">{post.snippet}</p>
              <a
                href={post.link}
                className="inline-block text-amber-500 font-semibold hover:text-amber-400 transition"
              >
                Read More →
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewUpdates;
