import React, { useState } from "react";
import {
  Facebook,
  Instagram,
  Youtube,
  Twitter,
  Mail,
  Phone,
  MapPin,
  Heart,
  Users,
  Leaf,
  ArrowRight,
  Loader2,
  CheckCircle2,
} from "lucide-react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

const Footer = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [subscribed, setSubscribed] = useState(false);
  const year = new Date().getFullYear();

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email) {
      toast.error("Please enter your email address.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${SERVER_URL}/api/subscribe`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (res.ok) {
        setSubscribed(true);
        toast.success("Successfully subscribed to our newsletter!");
        setEmail("");
      } else {
        toast.error(data.message || "Subscription failed. Please try again.");
      }
    } catch (error) {
      console.error("Subscription error:", error);
      toast.error("Network error. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const socialLinks = [
    {
      href: "https://facebook.com/teensvoiceafrica",
      icon: <Facebook size={20} />,
      label: "Facebook",
    },
    {
      href: "https://twitter.com/teensvoiceafrica",
      icon: <Twitter size={20} />,
      label: "Twitter",
    },
    {
      href: "https://instagram.com/teensvoiceafrica",
      icon: <Instagram size={20} />,
      label: "Instagram",
    },
    {
      href: "https://youtube.com/teensvoiceafrica",
      icon: <Youtube size={20} />,
      label: "YouTube",
    },
  ];

  return (
    <footer className="relative bg-slate-900 text-slate-300 overflow-hidden font-sans">
      {/* 🌌 Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-50"></div>
        <div className="absolute -top-20 -right-20 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[100px]"></div>
        <div className="absolute -bottom-20 -left-20 w-[500px] h-[500px] bg-pink-600/10 rounded-full blur-[100px]"></div>
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-20 pb-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">
          {/* 1. Brand & Info (Left Column) */}
          <div className="lg:col-span-4 space-y-6">
            <Link to="/" className="flex items-center gap-3 group w-fit">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-pink-500 rounded-full blur opacity-50 group-hover:opacity-100 transition duration-500"></div>
                <img
                  src="/TVA_logo.jpeg"
                  alt="TVA Logo"
                  className="w-12 h-12 rounded-full relative z-10 border-2 border-slate-800"
                />
              </div>
              <div>
                <h2 className="text-2xl font-black text-white tracking-tight leading-none">
                  Teens Voice <span className="text-pink-500">Africa</span>
                </h2>
                <p className="text-[10px] text-blue-400 font-bold uppercase tracking-widest mt-1">
                  #MyVoiceMyAnswer
                </p>
              </div>
            </Link>

            <p className="text-slate-400 leading-relaxed text-sm">
              Empowering young people to promote peace, environmental
              sustainability, and positive social transformation through
              school-based programs and community action.
            </p>

            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-3 text-sm group">
                <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-pink-500 group-hover:bg-pink-500 group-hover:text-white transition-colors">
                  <MapPin size={16} />
                </div>
                <span>P.O. Box 15643-00400, Nairobi, Kenya</span>
              </div>
              <div className="flex items-center gap-3 text-sm group">
                <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-blue-500 group-hover:bg-blue-500 group-hover:text-white transition-colors">
                  <Mail size={16} />
                </div>
                <a
                  href="mailto:info@teensvoiceafrica.org"
                  className="hover:text-white transition-colors"
                >
                  info@teensvoiceafrica.org
                </a>
              </div>
              <div className="flex items-center gap-3 text-sm group">
                <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-purple-500 group-hover:bg-purple-500 group-hover:text-white transition-colors">
                  <Phone size={16} />
                </div>
                <span>+254 7XX XXX XXX</span>
              </div>
            </div>
          </div>

          {/* 2. Links Grid (Middle Columns) */}
          <div className="lg:col-span-5 grid grid-cols-2 sm:grid-cols-3 gap-8">
            {/* Column 1: Programs */}
            <div>
              <h3 className="text-white font-bold mb-6 flex items-center gap-2 text-sm uppercase tracking-wider">
                <Leaf size={16} className="text-green-500" /> Programs
              </h3>
              <ul className="space-y-3 text-sm">
                {[
                  "School Awards",
                  "Exchange Program",
                  "Green Schools",
                  "Peace Programs",
                ].map((item) => (
                  <li key={item}>
                    <Link
                      to="/programs"
                      className="text-slate-400 hover:text-white hover:pl-1 transition-all flex items-center gap-2"
                    >
                      <span className="w-1 h-1 bg-slate-600 rounded-full"></span>{" "}
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 2: Resources */}
            <div>
              <h3 className="text-white font-bold mb-6 flex items-center gap-2 text-sm uppercase tracking-wider">
                <Users size={16} className="text-blue-500" /> Connect
              </h3>
              <ul className="space-y-3 text-sm">
                {[
                  { label: "Media Gallery", to: "/media" },
                  { label: "Documents", to: "/document-center" },
                  { label: "Our Team", to: "/profiles" },
                  { label: "Policies", to: "/policies" },
                ].map((item) => (
                  <li key={item.label}>
                    <Link
                      to={item.to}
                      className="text-slate-400 hover:text-white hover:pl-1 transition-all flex items-center gap-2"
                    >
                      <span className="w-1 h-1 bg-slate-600 rounded-full"></span>{" "}
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: Get Involved */}
            <div>
              <h3 className="text-white font-bold mb-6 flex items-center gap-2 text-sm uppercase tracking-wider">
                <Heart size={16} className="text-pink-500" /> Action
              </h3>
              <ul className="space-y-3 text-sm">
                {[
                  { label: "Volunteer", to: "/get-involved" },
                  { label: "Donate", to: "/donate" },
                  { label: "Partner", to: "/get-involved" },
                  { label: "Contact", to: "/contact" },
                  { label: "Share", to: "/testimonials" },
                ].map((item) => (
                  <li key={item.label}>
                    <Link
                      to={item.to}
                      className="text-slate-400 hover:text-white hover:pl-1 transition-all flex items-center gap-2"
                    >
                      <span className="w-1 h-1 bg-slate-600 rounded-full"></span>{" "}
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* 3. Newsletter (Right Column) */}
          <div className="lg:col-span-3">
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-3xl p-6 border border-slate-700/50">
              <h3 className="text-white font-bold text-lg mb-2">
                Stay Updated
              </h3>
              <p className="text-slate-400 text-sm mb-4">
                Subscribe to our newsletter for the latest youth stories and
                updates.
              </p>

              {subscribed ? (
                <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-4 flex items-center gap-3 text-green-400 animate-fade-in-up">
                  <CheckCircle2 size={20} />
                  <span className="text-sm font-bold">
                    Thanks for subscribing!
                  </span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="space-y-3">
                  <div className="relative">
                    <Mail
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
                      size={18}
                    />
                    <input
                      type="email"
                      placeholder="Enter your email"
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl py-3 pl-10 pr-4 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      disabled={loading}
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-blue-600 to-pink-600 hover:from-blue-500 hover:to-pink-500 text-white font-bold py-3 rounded-xl transition-all shadow-lg hover:shadow-blue-500/20 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <Loader2 size={18} className="animate-spin" />
                    ) : (
                      <>
                        Subscribe <ArrowRight size={18} />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>

            <div className="mt-6">
              <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">
                Connect With Us
              </p>
              <div className="flex gap-2">
                {socialLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-white hover:text-slate-900 transition-all duration-300"
                    aria-label={link.label}
                  >
                    {link.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-slate-800 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500">
          <p>© {year} Teens Voice Africa. All rights reserved.</p>
          <div className="flex gap-6">
            <Link to="/policies" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link to="/policies" className="hover:text-white transition-colors">
              Terms of Service
            </Link>
            <Link to="/sitemap" className="hover:text-white transition-colors">
              Sitemap
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
