import React from "react";
import { Leaf } from "lucide-react";

function NotFound() {
  return (
    <div className="min-h-screen bg-green-50 flex flex-col items-center justify-center px-6 relative overflow-hidden mt-[-2rem] mb-[-4rem]">

      {/* Falling Leaves Animation Layer */}
      {/* <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {[...Array(10)].map((_, i) => (
          <Leaf
            key={i}
            className={`absolute text-green-${(i % 3) + 6}00 opacity-${(i % 4) + 4}0 
            animate-fall 
            left-[${Math.random() * 100}%]`}
            size={25 + (i % 4) * 5}
            style={{
              animationDelay: `${i * 0.8}s`,
              animationDuration: `${5 + i}s`,
            }}
          />
        ))}
      </div> */}

      {/* Floating Leaves Animation */}
      <div className="absolute top-10 left-10 animate-bounce-slow opacity-50">
        <Leaf size={45} className="text-green-600" />
      </div>
      <div className="absolute top-40 right-20 animate-bounce-slower opacity-40">
        <Leaf size={55} className="text-brown-600" />
      </div>
      <div className="absolute bottom-20 left-1/4 animate-bounce-slow opacity-30">
        <Leaf size={35} className="text-green-700" />
      </div>

      {/* Tree Illustration */}
      <div className="text-center animate-fadeIn">
        <img
          src="https://static.vecteezy.com/system/resources/thumbnails/053/255/686/small/a-cartoon-tree-crying-with-a-sad-face-vector.jpg"
          alt="Sad Tree"
          className="w-40 h-40 mx-auto mb-6 opacity-90 animate-bounce bg-green-100 rounded-full p-4"
        />

        {/* Main Text */}
        <h1 className="text-6xl font-extrabold text-green-900 mb-3">
          404
        </h1>
        <h2 className="text-2xl font-semibold text-brown-700 mb-3">
          Oops! This Tree Hasn't Grown Yet 🌱
        </h2>
        <p className="text-green-800 mb-8 max-w-md mx-auto">
          The page you're looking for doesn’t exist or may have been uprooted.
          Let's take you back to a greener path.
        </p>

        {/* Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 mt-4">
          <a
            href="/"
            className="bg-green-700 hover:bg-green-800 text-white px-6 py-3 rounded-full shadow-lg transition transform hover:scale-105"
          >
            Back to Home
          </a>

          <a
            href="/tracker"
            className="bg-amber-500 hover:bg-amber-600 text-white px-6 py-3 rounded-full shadow-lg transition transform hover:scale-105"
          >
            View Tree Tracker 🌳
          </a>

          <a
            href="/get-involved"
            className="bg-green-800 hover:bg-green-900 text-white px-6 py-3 rounded-full shadow-lg transition transform hover:scale-105"
          >
            Get Involved 🤝
          </a>
        </div>
      </div>

      {/* Custom Animations */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 1.2s ease-out forwards;
        }

        @keyframes bounceSlow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-12px); }
        }
        .animate-bounce-slow {
          animation: bounceSlow 4s ease-in-out infinite;
        }

        @keyframes bounceSlower {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
        .animate-bounce-slower {
          animation: bounceSlower 6s ease-in-out infinite;
        }

        /* Falling Leaves */
        @keyframes fall {
          0% {
            transform: translateY(-10%) rotate(0deg);
          }
          100% {
            transform: translateY(110%) rotate(360deg);
          }
        }
        .animate-fall {
          position: absolute;
          animation-name: fall;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
        }
      `}</style>
    </div>
  );
}

export default NotFound;
