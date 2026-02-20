import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Leaf,
  Heart,
  Users,
  Calendar,
  ArrowRight,
  Loader2,
  TrendingUp,
  Target,
  ShieldCheck,
  Zap,
  MapPin,
  Trees,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

// Ensure you have configured your environment variable
const SERVER_URL = process.env.REACT_APP_SERVER_URL || "http://localhost:5000";

const Home = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch(`${SERVER_URL}/api/posts?category=Events`);
        if (!response.ok) throw new Error("Failed to fetch events");
        const data = await response.json();
        setEvents(data.slice(0, 3));
      } catch (error) {
        console.error("Error loading events:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const corePillars = [
    {
      icon: <Leaf className="w-8 h-8" />,
      title: "Environmental Action",
      desc: "Leading the charge with 'Teens for Trees' to achieve 2 billion trees planted.",
      color: "text-green-500",
      bg: "bg-green-50",
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: "Peace & Unity",
      desc: "Healing our nation through the 'Messenger of Peace Caravan' across 47 counties.",
      color: "text-pink-500",
      bg: "bg-pink-50",
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: "Economic Empowerment",
      desc: "Building future entrepreneurs via the 'Teens Trade Fair' and skills training.",
      color: "text-blue-500",
      bg: "bg-blue-50",
    },
    {
      icon: <ShieldCheck className="w-8 h-8" />,
      title: "Social Responsibility",
      desc: "Cultivating integrity and respect to bridge the gap between teens and society.",
      color: "text-purple-500",
      bg: "bg-purple-50",
    },
  ];

  const orientationPoints = [
    {
      title: "The Bridge",
      desc: "We communicate teen concerns and challenges to the wider society.",
      icon: <Users size={24} className="text-white" />,
      gradient: "from-blue-500 to-blue-700",
    },
    {
      title: "The Innovators",
      desc: "We innovate by combining services to solve group and individual problems.",
      icon: <Zap size={24} className="text-white" />,
      gradient: "from-pink-500 to-pink-700",
    },
    {
      title: "The Future",
      desc: "Ensuring every teen leads a productive life and is accountable for their actions.",
      icon: <Target size={24} className="text-white" />,
      gradient: "from-purple-500 to-purple-700",
    },
  ];

  return (
    <div className="bg-white overflow-x-hidden font-sans mt-[-80px] md:mt-[-80px]">
      {/* 🌟 HERO SECTION - POLISHED & UNIQUE */}
      <section className="relative min-h-[90vh] md:min-h-screen flex items-center pt-24 md:pt-20 overflow-hidden">
        {/* Animated Background Gradients */}
        <div className="absolute inset-0 z-0 bg-white">
          <div className="absolute top-[-10%] right-[-10%] md:top-[-20%] w-[600px] md:w-[800px] h-[600px] md:h-[800px] bg-gradient-to-br from-blue-100/60 to-transparent rounded-full blur-3xl animate-pulse-slow"></div>
          <div className="absolute bottom-[-10%] left-[-10%] md:bottom-[-20%] w-[500px] md:w-[600px] h-[500px] md:h-[600px] bg-gradient-to-tr from-pink-100/60 to-transparent rounded-full blur-3xl animate-pulse-slow delay-1000"></div>
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-multiply pointer-events-none"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 lg:gap-20 items-center w-full">
          {/* LEFT: Text Content */}
          <div className="text-center lg:text-left space-y-6 md:space-y-8 animate-fade-in-up mt-8 lg:mt-0">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 backdrop-blur-sm border border-slate-200 shadow-sm mx-auto lg:mx-0 hover:scale-105 transition-transform cursor-default">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-pink-500"></span>
              </span>
              <span className="text-slate-500 text-[10px] md:text-xs font-bold tracking-widest uppercase">
                Registered NGO in Kenya
              </span>
            </div>

            {/* Headline */}
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-slate-900 leading-[1.1] tracking-tight">
              Our Voice, <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500">
                Our Future.
              </span>
            </h1>

            {/* Subtext */}
            <p className="text-base sm:text-lg md:text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto lg:mx-0 font-medium">
              We act as a bridge between teens and society, helping youth
              overcome challenges through{" "}
              <span className="text-blue-600 font-bold">
                Environmental Action
              </span>
              , <span className="text-pink-600 font-bold">Peace Building</span>,
              and <span className="text-purple-600 font-bold">Innovation</span>.
            </p>

            {/* Tagline */}
            <div className="flex items-center justify-center lg:justify-start gap-3">
              <div className="h-[1px] w-8 md:w-12 bg-pink-300"></div>
              <p className="text-base md:text-lg font-bold italic text-slate-400">
                #MyVoiceMyAnswer
              </p>
              <div className="h-[1px] w-8 md:w-12 bg-pink-300 lg:hidden"></div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2 md:pt-4">
              <Link
                to="/get-involved"
                className="group relative w-full sm:w-auto px-8 py-4 bg-slate-900 text-white font-bold rounded-full overflow-hidden shadow-xl hover:shadow-blue-500/20 transition-all hover:-translate-y-1"
              >
                <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-blue-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <span className="relative flex items-center justify-center gap-2">
                  Join The Movement{" "}
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
              <Link
                to="/programs"
                className="w-full sm:w-auto px-8 py-4 bg-white/80 backdrop-blur-sm text-slate-700 font-bold border border-slate-200 rounded-full hover:border-pink-300 hover:text-pink-600 hover:shadow-lg transition-all text-center"
              >
                Explore Programs
              </Link>
            </div>

            {/* 📱 MOBILE-ONLY SHOWCASE (Stacked Floating Collage) */}
            <div className="lg:hidden mt-12 relative w-full h-[400px] max-w-sm mx-auto pb-8">
              {/* Mobile Background Glow */}
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-400/20 to-pink-400/20 rounded-full blur-2xl animate-pulse-slow"></div>

              {/* Back Image (Peace Campaign) */}
              <div
                className="absolute top-0 left-0 w-[65%] h-56 rounded-[2rem] overflow-hidden shadow-lg border-4 border-white transform -rotate-6 animate-float z-10 cursor-pointer"
                onClick={() => navigate("/media")}
              >
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNb5w27AJLybLs1Nv9s4TxNAQuiCQJ5HHExg&s"
                  alt="Peace Campaign"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent flex items-end p-4">
                  <span className="text-white font-bold text-sm">
                    Peace Caravan
                  </span>
                </div>
              </div>

              {/* Front Image (Tree Planting) */}
              <div
                className="absolute bottom-8 right-0 w-[70%] h-64 rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-white transform rotate-3 animate-float delay-500 z-20 curser-pointer"
                onClick={() => navigate("/media")}
              >
                <img
                  src="https://themountainjournal.co.ke/wp-content/uploads/2025/10/tree-planting.jpeg"
                  alt="Teens Planting Trees"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 to-transparent flex flex-col justify-end p-5">
                  <span className="w-fit px-2 py-1 bg-green-500 text-white text-[9px] font-bold uppercase tracking-wider rounded-md mb-1">
                    Environment
                  </span>
                  <p className="text-white font-bold text-base leading-tight">
                    2 Billion Trees
                  </p>
                </div>
              </div>

              {/* Mobile Floating Stat - Center Overlap */}
              <div className="absolute top-3/4  -translate-x-1/4 -translate-y-1/2 bg-white/95 backdrop-blur-xl p-3 rounded-2xl shadow-2xl border border-white z-30 flex items-center gap-3 animate-bounce-slow ml-2">
                <div className="bg-blue-100 p-2 rounded-full text-blue-600">
                  <MapPin size={18} />
                </div>
                <div className="text-left pr-2">
                  <p className="text-xl font-black text-slate-800 leading-none">
                    47
                  </p>
                  <p className="text-[9px] font-bold text-slate-500 uppercase tracking-wide">
                    Counties
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: Desktop Floating Collage (Maintained) */}
          <div className="relative hidden lg:block h-[650px] w-full perspective-1000">
            {/* Main Card (Trees) */}
            <div
              className="absolute top-10 right-0 w-80 h-[450px] rounded-[2.5rem] overflow-hidden shadow-2xl border-[6px] border-white transform rotate-3 hover:rotate-0 hover:scale-105 transition-all duration-700 z-20 group cursor-pointer"
              onClick={() => navigate("/media")}
            >
              <img
                src="https://themountainjournal.co.ke/wp-content/uploads/2025/10/tree-planting.jpeg"
                alt="Teens Planting Trees"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute bottom-0 inset-x-0 h-1/3 bg-gradient-to-t from-black/80 to-transparent p-6 flex flex-col justify-end">
                <span className="text-green-400 text-xs font-bold uppercase tracking-wider mb-1">
                  Environment
                </span>
                <p className="text-white font-bold text-lg leading-tight">
                  2 Billion Trees Initiative
                </p>
              </div>
            </div>

            {/* Secondary Card (Peace) */}
            <div
              className="absolute bottom-20 left-10 w-72 h-80 rounded-[2rem] overflow-hidden shadow-2xl border-[6px] border-white transform -rotate-6 hover:-rotate-0 hover:scale-105 transition-all duration-700 z-10 group delay-100 cursor-pointer"
              onClick={() => navigate("/media")}
            >
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNb5w27AJLybLs1Nv9s4TxNAQuiCQJ5HHExg&s"
                alt="Peace Campaign"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute bottom-0 inset-x-0 h-1/3 bg-gradient-to-t from-black/80 to-transparent p-6 flex flex-col justify-end">
                <span className="text-pink-400 text-xs font-bold uppercase tracking-wider mb-1">
                  Unity
                </span>
                <p className="text-white font-bold text-lg leading-tight">
                  Peace Caravan
                </p>
              </div>
            </div>

            {/* Floating Glass Stats Card 1 */}
            <div className="absolute top-32 left-0 bg-white/80 backdrop-blur-md p-4 pr-8 rounded-2xl shadow-xl border border-white animate-bounce-slow z-30 flex items-center gap-4">
              <div className="bg-blue-100 p-3 rounded-full text-blue-600">
                <MapPin size={24} />
              </div>
              <div>
                <p className="text-2xl font-black text-slate-800">47</p>
                <p className="text-xs font-bold text-slate-500 uppercase tracking-wide">
                  Counties
                </p>
              </div>
            </div>

            {/* Floating Glass Stats Card 2 */}
            <div className="absolute bottom-40 right-[-20px] bg-white/80 backdrop-blur-md p-4 pr-8 rounded-2xl shadow-xl border border-white animate-bounce-slow delay-1000 z-30 flex items-center gap-4 pt-2">
              <div className="bg-green-100 p-3 rounded-full text-green-600">
                <Trees size={24} />
              </div>
              <div>
                <p className="text-2xl font-black text-slate-800">10k+</p>
                <p className="text-xs font-bold text-slate-500 uppercase tracking-wide">
                  Trees Planted
                </p>
              </div>
            </div>

            {/* Background Blob */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-r from-blue-200 to-pink-200 rounded-full blur-3xl opacity-30 -z-10 animate-pulse-slow"></div>
          </div>
        </div>
      </section>

      {/* 🧭 TVA ORIENTATION SECTION (Full Width Wave) */}
      <section className="py-24 px-6 relative bg-slate-50">
        {/* Curve Separator */}
        <div className="absolute top-0 left-0 w-full overflow-hidden leading-[0]">
          <svg
            data-name="Layer 1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
            className="relative block w-[calc(100%+1.3px)] h-[50px] fill-white"
          >
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"></path>
          </svg>
        </div>

        <div className="max-w-7xl mx-auto mt-8">
          <div className="text-center mb-16">
            <span className="text-pink-500 font-bold tracking-widest uppercase text-sm">
              Who We Are
            </span>
            <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 mt-2">
              The TVA{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-pink-600">
                Orientation
              </span>
            </h2>
            <p className="mt-4 text-lg md:text-xl text-slate-600 max-w-2xl mx-auto">
              A fully-fledged organization ensuring every teen leads a
              productive life.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {orientationPoints.map((point, index) => (
              <div
                key={index}
                className="group relative bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100 hover:shadow-xl hover:border-blue-100 transition-all duration-300 hover:-translate-y-2 overflow-hidden"
              >
                <div
                  className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${point.gradient} opacity-5 rounded-bl-[4rem] transition-all group-hover:scale-150 group-hover:opacity-10`}
                ></div>

                <div
                  className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${point.gradient} flex items-center justify-center shadow-lg mb-6 group-hover:rotate-6 transition-transform text-white`}
                >
                  {point.icon}
                </div>

                <h3 className="text-xl font-bold text-slate-800 mb-3">
                  {point.title}
                </h3>
                <p className="text-slate-600 leading-relaxed mb-6 text-sm">
                  {point.desc}
                </p>

                <div
                  className={`h-1.5 w-12 bg-gradient-to-r ${point.gradient} rounded-full group-hover:w-full transition-all duration-500`}
                ></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 🌿 CORE PILLARS SECTION */}
      <section className="py-20 px-6 bg-white relative">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left: Pillars Grid */}
          <div className="grid sm:grid-cols-2 gap-6 order-2 lg:order-1">
            {corePillars.map((pillar, idx) => (
              <div
                key={idx}
                className={`${pillar.bg} p-6 rounded-3xl border border-transparent hover:border-slate-200 transition-all hover:shadow-md cursor-default`}
              >
                <div
                  className={`${pillar.color} mb-4 bg-white w-fit p-3 rounded-xl shadow-sm`}
                >
                  {pillar.icon}
                </div>
                <h4 className="text-lg font-bold text-slate-900 mb-2">
                  {pillar.title}
                </h4>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {pillar.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Right: Text Content */}
          <div className="space-y-8 order-1 lg:order-2 text-center lg:text-left">
            <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900">
              Reshaping the Future, <br />
              <span className="text-blue-600">One Teen at a Time.</span>
            </h2>
            <p className="text-lg text-slate-600 leading-relaxed">
              We understand that teens face challenges in career, family, and
              life skills. Our specialists are committed to equipping the future
              generation.
            </p>

            {/* Stats Row */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-8 pt-6 border-t border-slate-100">
              <div className="text-center lg:text-left">
                <p className="text-4xl font-black text-slate-900">47</p>
                <p className="text-xs uppercase font-bold text-slate-400 tracking-wider">
                  Counties Target
                </p>
              </div>
              <div className="w-[1px] h-12 bg-slate-200 hidden sm:block"></div>
              <div className="text-center lg:text-left">
                <p className="text-4xl font-black text-slate-900">2030</p>
                <p className="text-xs uppercase font-bold text-slate-400 tracking-wider">
                  Vision Year
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 📅 UPCOMING EVENTS (Dark Mode Section) */}
      <section className="py-20 bg-slate-900 text-white relative overflow-hidden">
        {/* Glows */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-pink-600/20 rounded-full blur-[120px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div className="text-center md:text-left w-full md:w-auto">
              <h2 className="text-3xl md:text-5xl font-bold">
                Upcoming Events
              </h2>
              <p className="text-slate-400 mt-2">
                Join us in our journey to empower youth.
              </p>
            </div>
            <Link
              to="/news-updates"
              className="hidden md:flex items-center gap-2 text-pink-400 hover:text-white transition-colors font-semibold"
            >
              View All Events <ArrowRight size={20} />
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {loading ? (
              <div className="col-span-3 flex justify-center py-20">
                <Loader2 className="w-10 h-10 text-pink-500 animate-spin" />
              </div>
            ) : events.length > 0 ? (
              events.map((event, index) => (
                <div
                  key={index}
                  className="group bg-white/5 border border-white/10 p-6 rounded-3xl hover:bg-white/10 transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="flex items-start justify-between mb-6">
                    <div className="bg-gradient-to-br from-pink-500 to-purple-600 p-3 rounded-2xl shadow-lg">
                      <Calendar className="text-white" size={24} />
                    </div>
                    <span className="text-[10px] font-bold bg-white/10 px-3 py-1 rounded-full text-blue-300 uppercase tracking-wide">
                      {event.category || "Event"}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold mb-2 group-hover:text-pink-300 transition-colors line-clamp-2">
                    {event.title}
                  </h3>
                  <p className="text-slate-400 text-sm mb-4">
                    {formatDate(event.date)}
                  </p>
                  <Link
                    to={`/view-more/${event._id}`}
                    className="text-sm font-bold text-white flex items-center gap-2 group-hover:gap-3 transition-all"
                  >
                    Read More <ArrowRight size={16} />
                  </Link>
                </div>
              ))
            ) : (
              <div className="col-span-3 text-center py-12 border border-dashed border-white/20 rounded-3xl">
                <p className="text-slate-500">
                  No upcoming events scheduled at the moment.
                </p>
              </div>
            )}
          </div>

          <div className="mt-8 text-center md:hidden">
            <Link
              to="/news-updates"
              className="inline-flex items-center gap-2 text-pink-400 hover:text-white transition-colors font-semibold"
            >
              View All Events <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>

      {/* 🚀 FOOTER CTA */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto bg-gradient-to-r from-blue-600 to-pink-600 rounded-[2.5rem] p-10 md:p-20 text-center text-white relative overflow-hidden shadow-2xl">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay"></div>
          <div className="relative z-10">
            <h2 className="text-3xl md:text-5xl font-black mb-6 tracking-tight">
              Ready to Impact the Future?
            </h2>
            <p className="text-lg md:text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
              Whether you're a student, volunteer, or partner — your voice
              matters. Join our mission today.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                to="/get-involved"
                className="bg-white text-blue-600 font-bold px-10 py-4 rounded-full shadow-lg hover:scale-105 transition-transform"
              >
                Get Involved
              </Link>
              <Link
                to="/donate"
                className="bg-blue-800/40 backdrop-blur-md border border-white/30 text-white font-bold px-10 py-4 rounded-full hover:bg-blue-800/60 transition-all"
              >
                Donate
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
