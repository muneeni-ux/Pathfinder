import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Menu,
  X,
  Home as HomeIcon,
  Info,
  Users,
  Image,
  Sparkles,
  HeartHandshake,
  Phone,
  ChevronRight,
} from "lucide-react";

const Navbar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { to: "/", label: "Home", icon: <HomeIcon size={18} /> },
    { to: "/about", label: "About TVA", icon: <Info size={18} /> },
    { to: "/programs", label: "Our Impact", icon: <Users size={18} /> },
    { to: "/media", label: "Gallery", icon: <Image size={18} /> },
    { to: "/contact", label: "Contact", icon: <Phone size={18} /> },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ease-in-out border-b ${
          scrolled
            ? "bg-white/90 backdrop-blur-xl border-slate-200/60 shadow-[0_4px_20px_rgba(0,0,0,0.03)] py-3"
            : "bg-transparent border-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          
          {/* 🌟 LOGO SECTION */}
          <Link to="/" className="flex items-center gap-3 group relative z-20">
            <div className="relative">
              {/* Futuristic Glow behind Logo */}
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-400 to-pink-500 rounded-full blur-md opacity-30 group-hover:opacity-60 transition duration-500 animate-pulse-slow"></div>
              <img
                src="/TVA_logo.jpeg" 
                alt="TVA Logo"
                className="w-12 h-12 rounded-full relative z-10 border-2 border-white shadow-sm group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-xl md:text-2xl font-black tracking-tight text-slate-900 leading-none">
                TEENS VOICE <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-pink-600">AFRICA</span>
              </span>
              <span className="text-[10px] uppercase tracking-[0.25em] text-slate-500 font-semibold group-hover:text-blue-500 transition-colors duration-300">
                #MyVoiceMyAnswer
              </span>
            </div>
          </Link>

          {/* 🌍 DESKTOP NAVIGATION */}
          {/* Using a pill shape with subtle border for blending */}
          <div className={`hidden md:flex items-center gap-1 bg-white/40 border border-white/50 px-2 py-1.5 rounded-full backdrop-blur-md shadow-sm transition-all duration-300 ${scrolled ? 'bg-slate-50/50' : ''}`}>
            {navLinks.map(({ to, label }) => {
              const isActive = location.pathname === to;
              return (
                <Link
                  key={to}
                  to={to}
                  className={`relative px-5 py-2 rounded-full text-sm font-bold tracking-wide transition-all duration-300 ${
                    isActive
                      ? "text-white bg-gradient-to-r from-blue-600 to-pink-500 shadow-md transform scale-105"
                      : "text-slate-600 hover:text-blue-600 hover:bg-white"
                  }`}
                >
                  {label}
                </Link>
              );
            })}
          </div>

          {/* 🔥 CTA & MOBILE TOGGLE */}
          <div className="flex items-center gap-4">
            <Link
              to="/get-involved"
              className="hidden md:flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white text-sm font-bold px-6 py-3 rounded-full transition-all duration-300 shadow-lg hover:shadow-blue-500/20 transform hover:-translate-y-0.5 group"
            >
              <HeartHandshake size={16} className="text-pink-400 group-hover:animate-bounce" />
              <span>Get Involved</span>
            </Link>

            {/* Mobile Hamburger - Adapts color based on scroll */}
            <button
              onClick={() => setIsSidebarOpen(true)}
              className={`md:hidden p-2 transition-colors ${scrolled ? 'text-slate-900 hover:text-pink-500' : 'text-slate-800 hover:text-pink-500'}`}
            >
              <Menu size={28} strokeWidth={2.5} />
            </button>
          </div>
        </div>
      </nav>

      {/* 📱 MOBILE SIDEBAR MENU (White & Clean) */}
      <div
        className={`fixed inset-0 z-[60] flex justify-end transition-opacity duration-300 ${
          isSidebarOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Backdrop */}
        <div
          onClick={() => setIsSidebarOpen(false)}
          className="absolute inset-0 bg-slate-900/20 backdrop-blur-sm"
        />

        {/* Drawer */}
        <div
          className={`relative w-[85%] max-w-sm h-full bg-white/95 backdrop-blur-xl border-l border-white shadow-2xl flex flex-col transform transition-transform duration-500 ${
            isSidebarOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          {/* Mobile Header */}
          <div className="flex items-center justify-between px-6 py-6 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <Sparkles className="text-pink-500 animate-spin-slow" size={20} />
              <span className="text-lg font-bold text-slate-900 tracking-tight">TVA Menu</span>
            </div>
            <button
              onClick={() => setIsSidebarOpen(false)}
              className="w-8 h-8 flex items-center justify-center rounded-full bg-slate-100 text-slate-600 hover:bg-pink-100 hover:text-pink-600 transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          {/* Mobile Links */}
          <div className="flex-1 overflow-y-auto py-6 px-4 space-y-2">
            {[...navLinks, { to: "/get-involved", label: "Get Involved", icon: <HeartHandshake size={18} /> }].map((link, idx) => {
               const isActive = location.pathname === link.to;
               return (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setIsSidebarOpen(false)}
                  className={`group flex items-center justify-between p-4 rounded-2xl border transition-all duration-300 ${
                    isActive 
                      ? "bg-gradient-to-r from-blue-50 to-pink-50 border-blue-100 text-blue-700 shadow-sm" 
                      : "bg-white border-transparent hover:border-pink-100 hover:bg-slate-50 text-slate-600 hover:text-slate-900"
                  }`}
                  style={{ transitionDelay: `${idx * 50}ms` }}
                >
                  <div className="flex items-center gap-4">
                    <span className={`p-2 rounded-full ${isActive ? "bg-white text-pink-500" : "bg-slate-100 text-slate-500 group-hover:text-blue-500 group-hover:bg-white"}`}>
                      {link.icon}
                    </span>
                    <span className="font-bold text-lg">{link.label}</span>
                  </div>
                  <ChevronRight size={18} className={`transform transition-transform ${isActive ? "text-pink-500" : "text-slate-300 group-hover:text-pink-400 group-hover:translate-x-1"}`} />
                </Link>
               )
            })}
          </div>

          {/* Mobile Footer */}
          <div className="p-6 bg-slate-50 border-t border-slate-100">
            <p className="text-slate-400 text-xs uppercase tracking-widest mb-3 font-semibold">Contact Us</p>
            <div className="flex flex-col gap-1">
                <span className="text-sm font-medium text-slate-700">teensvoiceafrica@gmail.com</span>
                <span className="text-sm font-medium text-slate-700">Nairobi, Kenya</span>
            </div>
            <div className="mt-6 flex items-center gap-2">
                <div className="h-1 w-full bg-gradient-to-r from-blue-400 to-pink-400 rounded-full opacity-50"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;