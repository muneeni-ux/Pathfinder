import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Menu,
  X,
  Leaf,
  Home as HomeIcon,
  Info,
  Phone,
  TreePine,
  HeartHandshake,
  Sprout,
} from "lucide-react";

const Navbar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { to: "/", label: "Home", icon: <HomeIcon size={18} /> },
    { to: "/about", label: "About", icon: <Info size={18} /> },
    { to: "/tracker", label: "Tracker", icon: <TreePine size={18} /> },
    { to: "/donate", label: "Donate", icon: <HeartHandshake size={18} /> },
    { to: "/contact", label: "Contact", icon: <Phone size={18} /> },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 shadow-md bg-white backdrop-blur-md border-b border-green-200">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between relative">

        {/* 🌿 Logo */}
        <Link to="/" className="flex items-center gap-2 group relative z-20">
          <img
            src="/path-logo.jpg"
            alt="Green World"
            className="w-10 h-10 group-hover:rotate-12 group-hover:scale-110 transition-transform duration-500 rounded-full"
          />
          <span className="text-2xl font-extrabold text-green-900 tracking-wide group-hover:animate-bounce">
            Pathfinders <span className="text-amber-500">@75</span>
          </span>
          <Leaf className="absolute -top-2 -right-3 text-green-500 w-5 h-5 animate-leafFloat1" />
        </Link>

        {/* 🌍 Centered Desktop Menu */}
        <div className="hidden md:flex flex-1 justify-center gap-8 items-center z-10">
          {navLinks.map(({ to, label, icon }) => {
            const active = location.pathname === to;
            return (
              <Link
                key={to}
                to={to}
                className={`relative flex items-center gap-2 text-base font-medium tracking-wide transition-all duration-300
                  ${active ? "text-amber-500" : "text-green-900 hover:text-amber-600 hover:scale-110"}
                  group`}
              >
                <span className="transition-transform duration-300 group-hover:rotate-12">{icon}</span>
                {label}
                <span
                  className={`absolute bottom-[-6px] left-0 w-0 h-[2px] bg-amber-500 rounded-full transition-all duration-300 group-hover:w-full ${
                    active ? "w-full" : ""
                  }`}
                ></span>
              </Link>
            );
          })}
        </div>

        {/* 🌟 "Get Involved" Button on far right */}
        <div className="hidden md:flex items-center">
          <Link
            to="/get-involved"
            className="bg-amber-400 hover:bg-amber-500 text-green-950 font-semibold px-6 py-3 rounded-full transition-all shadow-md hover:shadow-lg"
          >
            Get Involved
          </Link>
        </div>

        {/* 📱 Mobile Menu Button */}
        <button
          onClick={() => setIsSidebarOpen(true)}
          className="md:hidden text-green-900 hover:text-amber-500 transition z-20"
        >
          <Menu size={28} />
        </button>
      </div>

      {/* 📲 Mobile Sidebar */}
      <div
        className={`fixed inset-0 z-50 transition-all duration-300 ${
          isSidebarOpen ? "visible" : "invisible"
        }`}
      >
        <div
          onClick={() => setIsSidebarOpen(false)}
          className={`fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${
            isSidebarOpen ? "opacity-100" : "opacity-0"
          }`}
        ></div>

        <div
          className={`fixed top-0 left-0 h-full w-64 bg-white border-r-4 border-amber-500 shadow-2xl transform transition-transform duration-500 ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="bg-green-50 py-4 rounded-b-2xl relative">
            <div className="flex items-center justify-between px-6 py-5 border-b border-green-300">
              <div className="flex items-center gap-2">
                <Leaf className="text-amber-500 w-6 h-6 animate-leafFloat2" />
                <h1 className="text-xl font-extrabold text-green-900">Pathfinders</h1>
              </div>
              <button
                onClick={() => setIsSidebarOpen(false)}
                className="text-green-700 hover:text-amber-500 transition p-1 rounded-full hover:bg-green-100"
              >
                <X size={24} />
              </button>
            </div>

            <div className="flex flex-col mt-8 space-y-3 px-4">
              {[...navLinks, { to: "/get-involved", label: "Get Involved", icon: <Sprout size={18} /> }].map((link, i) => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setIsSidebarOpen(false)}
                  className={`flex items-center gap-4 px-4 py-3 rounded-xl text-lg font-semibold transition-all duration-300
                    ${location.pathname === link.to
                      ? "text-white bg-amber-500 shadow-md"
                      : "text-green-800 hover:bg-green-100 hover:text-amber-600 transform hover:scale-105"}
                    animate-slideIn`}
                  style={{ animationDelay: `${i * 0.08}s` }}
                >
                  <span className={`${location.pathname === link.to ? "text-white" : "text-green-600"}`}>{link.icon}</span>
                  {link.label}
                </Link>
              ))}
            </div>

            <div className="px-6 py-6 border-t border-amber-600/20 text-sm text-amber-600">
              © 2025 Pathfinders. All rights reserved.
            </div>
          </div>
        </div>
      </div>

      {/* Animations */}
      <style>{`
        @keyframes leafFloat1 {
          0% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(15deg); }
          100% { transform: translateY(0) rotate(0deg); }
        }
        @keyframes leafFloat2 {
          0% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(-10deg); }
          100% { transform: translateY(0) rotate(0deg); }
        }
        .animate-leafFloat1 { animation: leafFloat1 6s ease-in-out infinite; }
        .animate-leafFloat2 { animation: leafFloat2 5s ease-in-out infinite; }

        @keyframes slideIn {
          0% { transform: translateX(-30px); opacity: 0; }
          100% { transform: translateX(0); opacity: 1; }
        }
        .animate-slideIn { animation: slideIn 0.5s ease forwards; }
      `}</style>
    </nav>
  );
};

export default Navbar;
