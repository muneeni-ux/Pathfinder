import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Menu,
  X,
  Leaf,
  Home as HomeIcon,
  Info,
  Phone,
  Sprout,
  TreePine,
  HeartHandshake,
} from "lucide-react";

const Navbar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { to: "/", label: "Home", icon: <HomeIcon size={18} /> },
    { to: "/about", label: "About", icon: <Info size={18} /> },
    { to: "/get-involved", label: "Get Involved", icon: <Sprout size={18} /> },
    { to: "/tracker", label: "Tracker", icon: <TreePine size={18} /> },
    { to: "/donate", label: "Donate", icon: <HeartHandshake size={18} /> },
    { to: "/contact", label: "Contact", icon: <Phone size={18} /> },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 shadow-md bg-white backdrop-blur-md border-b border-green-200">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* 🌿 Logo + Title */}
        <Link to="/" className="flex items-center gap-2 group">
          <img
            src="/path-logo.jpg"
            alt="Green World"
            className="w-8 h-8 group-hover:rotate-12 transition-transform rounded-full"
          />
          <span className="text-2xl font-extrabold text-green-900 tracking-wide">
            Pathfinders <span className="text-amber-500">@75</span>
          </span>
        </Link>

        {/* 🌍 Desktop Menu */}
        <div className="hidden md:flex gap-6 items-center">
          {navLinks.map(({ to, label, icon }) => {
            const active = location.pathname === to;
            return (
              <Link
                key={to}
                to={to}
                className={`relative flex items-center gap-2 text-base font-medium tracking-wide transition-all duration-300 
                  ${
                    active
                      ? "text-amber-500"
                      : "text-green-900 hover:text-amber-600"
                  }`}
              >
                <span className="transition-transform group-hover:scale-110">
                  {icon}
                </span>
                {label}
                {active && (
                  <span className="absolute bottom-[-6px] left-0 w-full h-[2px] bg-amber-500 rounded-full"></span>
                )}
              </Link>
            );
          })}
        </div>

        {/* 📱 Mobile Menu Button */}
        <button
          onClick={() => setIsSidebarOpen(true)}
          className="md:hidden text-green-900"
        >
          <Menu size={28} />
        </button>
      </div>

      {/* 📲 Sidebar (Mobile) */}
      <div
        className={`fixed inset-0 z-50 transition-all duration-300 ${
          isSidebarOpen ? "visible" : "invisible"
        }`}
      >
        {/* Overlay */}
        <div
          onClick={() => setIsSidebarOpen(false)}
          className={`fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${
            isSidebarOpen ? "opacity-100" : "opacity-0"
          }`}
        ></div>

        {/* Sidebar Panel - **UPDATED STYLES HERE** */}
        <div
          className={`fixed top-0 left-0 h-full w-64 bg-white border-r-4 border-amber-500 shadow-2xl transform transition-transform duration-500 ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          {/* Header Area: Clean, subtle color block */}
          <div className="bg-green-50 py-4 rounded-b-2xl"> 
            <div className="flex items-center justify-between px-6 py-5 border-b border-green-300">
              <div className="flex items-center gap-2">
                <Leaf className="text-amber-500 w-6 h-6" />
                <h1 className="text-xl font-extrabold text-green-900">
                  Pathfinders 
                </h1>
              </div>
              <button
                onClick={() => setIsSidebarOpen(false)}
                className="text-green-700 hover:text-amber-500 transition p-1 rounded-full hover:bg-green-100"
              >
                <X size={24} />
              </button>
            </div>

            {/* Navigation Links Area */}
            <div className="flex flex-col mt-8 space-y-2 px-4"> 
              {navLinks.map(({ to, label, icon }) => (
                <Link
                  key={to}
                  to={to}
                  onClick={() => setIsSidebarOpen(false)}
                  className={`flex items-center gap-4 px-4 py-3 rounded-xl text-lg font-semibold transition-all duration-200 
                    ${
                      location.pathname === to
                        ? "text-white bg-amber-500 shadow-md" // Highlight active link professionally
                        : "text-green-800 hover:bg-green-100 hover:text-amber-600"
                    }`}
                >
                  <span className={`${location.pathname === to ? 'text-white' : 'text-green-600'}`}> 
                    {icon}
                  </span>
                  {label}
                </Link>
              ))}
            </div>
            <div className="px-6 py-6 border-t border-amber-600/20 text-sm text-amber-600">
              © 2025 Pathfinders. All rights reserved.
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;