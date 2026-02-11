import React from "react";
import { Link } from "react-router-dom";
import { Leaf, Sprout, Home, Compass, MapPin } from "lucide-react";

function NotFound() {
  return (
    <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center px-6 relative overflow-hidden font-sans selection:bg-pink-200">
      
      {/* 🌌 Animated Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[100px] animate-pulse-slow"></div>
        <div className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] bg-pink-600/10 rounded-full blur-[100px] animate-pulse-slow delay-1000"></div>
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
      </div>

      {/* 🍃 Floating Leaves Animation (Theme Colors) */}
      <div className="absolute top-20 left-10 animate-float-slow opacity-20">
        <Leaf size={45} className="text-blue-400 rotate-12" />
      </div>
      <div className="absolute top-40 right-20 animate-float-medium opacity-20">
        <Sprout size={55} className="text-pink-400 -rotate-12" />
      </div>
      <div className="absolute bottom-20 left-1/4 animate-float-fast opacity-20">
        <Leaf size={35} className="text-green-400 rotate-45" />
      </div>

      {/* 🚧 Main Content */}
      <div className="relative z-10 text-center animate-fade-in-up">
        
        {/* Futuristic 404 Glitch Effect */}
        <div className="relative inline-block mb-4">
           <h1 className="text-9xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 tracking-tighter drop-shadow-2xl">
             404
           </h1>
           <div className="absolute -inset-1 blur-3xl bg-blue-500/20 rounded-full -z-10 animate-pulse"></div>
        </div>

        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight">
          Lost in the <span className="text-green-400">Wilderness?</span>
        </h2>
        
        <p className="text-lg text-slate-400 mb-10 max-w-lg mx-auto leading-relaxed">
          The page you are looking for seems to have been uprooted or doesn't exist. Don't worry, we can help you find your way back.
        </p>

        {/* 🧭 Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/"
            className="w-full sm:w-auto px-8 py-3.5 bg-white text-slate-900 font-bold rounded-full hover:bg-blue-50 transition-all shadow-lg hover:shadow-white/20 hover:-translate-y-1 flex items-center justify-center gap-2"
          >
            <Home size={18} /> Back Home
          </Link>

          <Link
            to="/programs"
            className="w-full sm:w-auto px-8 py-3.5 bg-slate-800/50 border border-slate-700 text-white font-bold rounded-full hover:bg-slate-800 hover:border-pink-500 transition-all backdrop-blur-sm flex items-center justify-center gap-2 group"
          >
            <Compass size={18} className="group-hover:rotate-45 transition-transform" /> Explore Programs
          </Link>
          
          <Link
            to="/contact"
            className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-blue-600 to-pink-600 text-white font-bold rounded-full hover:shadow-lg hover:shadow-pink-500/30 transition-all hover:-translate-y-1 flex items-center justify-center gap-2"
          >
            <MapPin size={18} /> Find Us
          </Link>
        </div>
      </div>

      {/* 👇 Footer Decor */}
      <div className="absolute bottom-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-50"></div>

      {/* 🎨 CSS Animations */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
        .animate-float-slow { animation: float 8s ease-in-out infinite; }
        .animate-float-medium { animation: float 6s ease-in-out infinite; }
        .animate-float-fast { animation: float 4s ease-in-out infinite; }
        
        .animate-fade-in-up {
          animation: fadeInUp 0.8s ease-out forwards;
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}

export default NotFound;