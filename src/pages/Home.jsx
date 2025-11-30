import React from "react";
import { Link } from "react-router-dom";
import {
  Sprout,
  TreePine,
  HeartHandshake,
  Leaf,
  Calendar,
  Megaphone,
  ArrowRight,
  Sparkles,
} from "lucide-react";

const Home = () => {
  return (
    <div className="bg-white text-green-900 overflow-x-hidden mt-[-2rem] mb-[-4rem]">

      {/* 🌿 HERO SECTION */}
      <section className="relative h-[80vh] flex items-center justify-center text-center overflow-hidden rounded-b-3xl">
        
        {/* Background */}
        <div
          className="absolute inset-0 bg-cover bg-center animate-zoomSlow"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=1500&q=80')",
            opacity: 0.28,
          }}
        ></div>

        {/* Floating Leaves */}
        <Leaf className="absolute top-10 left-10 text-green-600 opacity-50 animate-leafFloat1" size={50} />
        <Leaf className="absolute bottom-16 right-20 text-green-700 opacity-40 animate-leafFloat2" size={60} />
        <Leaf className="absolute top-1/2 left-1/4 text-amber-500 opacity-40 animate-leafFloat3" size={45} />

        {/* Main Content */}
        <div className="relative z-10 max-w-3xl px-6 animate-fadeSlideUp">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-4 text-green-900 drop-shadow-xl">
            Pathfinders @75 Tree Planting Initiative 🌳
          </h1>
          <p className="text-lg md:text-xl text-green-800 mb-10">
            Celebrating 75 years of leadership, service, and stewardship — raising
            a generation committed to caring for God’s creation.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/get-involved"
              className="bg-amber-400 hover:bg-amber-500 text-green-950 font-semibold px-8 py-3 rounded-full transition-all shadow-lg hover:scale-105"
            >
              Get Involved
            </Link>
            <Link
              to="/tracker"
              className="border-2 border-amber-400 text-amber-600 hover:bg-amber-400 hover:text-green-950 font-semibold px-8 py-3 rounded-full transition-all shadow-lg hover:scale-105"
            >
              Track Progress
            </Link>
          </div>
        </div>

      </section>

      {/* 🌟 WELCOME MESSAGE FROM LEADERSHIP */}
      <section className="py-16 px-6 md:px-12 lg:px-20 bg-green-50 text-center">
        <h2 className="text-3xl md:text-4xl font-extrabold text-green-900 mb-6 flex justify-center gap-2">
          <Sparkles className="text-amber-500" /> Welcome From Leadership
        </h2>

        <p className="max-w-4xl mx-auto text-green-800 text-lg leading-relaxed">
          “As we celebrate 75 years of Pathfinder ministry, we rededicate
          ourselves to service, community, and environmental stewardship.  
          Every tree planted represents growth, hope, and our commitment to the future.”
        </p>

        <p className="mt-4 font-semibold text-green-900">
          — Pathfinder Leadership Council, 2025
        </p>
      </section>

      {/* 🧭 FEATURED PROJECTS */}
      <section className="py-20 px-6 md:px-12 lg:px-20 text-center bg-white">
        <h2 className="text-3xl md:text-4xl font-bold text-green-900 mb-10">
          Featured Pathfinder Projects
        </h2>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[
            {
              title: "Green Club Challenge",
              desc: "Compete globally by planting and nurturing trees.",
              icon: <Sprout size={38} />,
            },
            {
              title: "Eco-Education Campaign",
              desc: "Teaching kids about sustainability and conservation.",
              icon: <TreePine size={38} />,
            },
            {
              title: "Community Clean-Up",
              desc: "Local clubs unite to restore parks & riverbanks.",
              icon: <HeartHandshake size={38} />,
            },
          ].map((item, index) => (
            <div
              key={index}
              className="bg-green-50 p-8 rounded-2xl border border-green-200 shadow hover:shadow-xl transition-all"
            >
              <div className="flex justify-center text-amber-500 mb-4">
                {item.icon}
              </div>
              <h3 className="text-xl font-semibold text-green-900">{item.title}</h3>
              <p className="text-green-700 mt-2">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 📅 UPCOMING EVENTS */}
      <section className="py-20 px-6 md:px-12 lg:px-20 bg-green-50 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-green-900 mb-10">
          Upcoming Events & Announcements
        </h2>

        <div className="space-y-6 max-w-3xl mx-auto">
          {[
            {
              date: "25 Feb 2025",
              title: "National Pathfinder Sabbath",
            },
            {
              date: "10 March 2025",
              title: "Global Pathfinder Tree Planting Day",
            },
            {
              date: "May 2025",
              title: "Conference-Level Eco Workshops",
            },
          ].map((event, index) => (
            <div
              key={index}
              className="flex justify-between items-center bg-white shadow rounded-xl p-6 border border-green-200 hover:shadow-lg transition"
            >
              <div className="flex items-center gap-3">
                <Calendar className="text-amber-500" />
                <div>
                  <h4 className="text-green-900 font-semibold">{event.title}</h4>
                  <p className="text-green-700 text-sm">{event.date}</p>
                </div>
              </div>
              <Megaphone className="text-green-700" />
            </div>
          ))}
        </div>
      </section>

      {/* ⚡ QUICK LINKS SECTION */}
      <section className="py-16 px-6 md:px-12 lg:px-20 bg-white text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-green-900 mb-10">
          Quick Links
        </h2>

        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {[
            { label: "Latest Reports", to: "/news-updates" },
            { label: "Photo Gallery", to: "/gallery" },
            { label: "Volunteer Programs", to: "/get-involved" },
            { label: "Regional Clubs", to: "/clubs" },
          ].map((link, i) => (
            <Link
              key={i}
              to={link.to}
              className="bg-green-50 border border-green-200 p-6 rounded-2xl shadow hover:shadow-lg hover:scale-105 transition-all flex items-center justify-between text-green-900 font-semibold"
            >
              {link.label}
              <ArrowRight />
            </Link>
          ))}
        </div>
      </section>

      {/* 🌳 CTA */}
      <section className="relative py-24 text-center bg-green-100">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1500&q=80')] bg-cover bg-center opacity-10"></div>

        <div className="relative z-10 max-w-3xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-green-900 mb-4">
            Join the Movement 🌱
          </h2>
          <p className="text-green-800 mb-8">
            Register your club, start planting, and help us reach our global goal!
          </p>
          <Link
            to="/get-involved"
            className="bg-amber-400 hover:bg-amber-500 text-green-950 font-semibold px-8 py-4 rounded-full transition-all text-lg shadow-lg hover:scale-105"
          >
            Register Now
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
