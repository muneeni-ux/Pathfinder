import React from "react";
import { useParams, Link } from "react-router-dom";

// Reuse the same posts array
const posts = [
  /* same posts array with id, title, content, img, etc. */
];

const ViewMore = () => {
  const { id } = useParams();
  const post = posts.find((p) => p.id === id);

  if (!post) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center bg-green-50">
        <h2 className="text-3xl font-bold text-green-900">Post not found</h2>
        <Link
          to="/news-updates"
          className="mt-6 px-6 py-3 bg-amber-500 text-white rounded-full font-semibold hover:bg-amber-400 transition"
        >
          Back to News & Updates
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-green-50 min-h-screen py-16 px-6 md:px-16">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
        <img src={post.img} alt={post.title} className="w-full h-64 object-cover" />
        <div className="p-8">
          <h1 className="text-4xl font-bold text-green-900 mb-3">{post.title}</h1>
          <p className="text-green-600 mb-4">{post.date}</p>
          <div className="text-green-800 leading-relaxed space-y-4">
            {post.content.split("\n").map((line, idx) => (
              <p key={idx}>{line}</p>
            ))}
          </div>
          <div className="mt-8 flex justify-start">
            <Link
              to="/news-updates"
              className="px-6 py-3 bg-amber-500 text-white rounded-full font-semibold hover:bg-amber-400 transition"
            >
              Back to News & Updates
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewMore;
