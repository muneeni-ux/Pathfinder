import React, { useEffect, useState } from "react";
import { Leaf, Sprout, TreePine, HeartHandshake } from "lucide-react";

const About = () => {
  const [offsetY, setOffsetY] = useState(0);

  // Track scroll position
  useEffect(() => {
    const handleScroll = () => setOffsetY(window.pageYOffset);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="bg-gradient-to-b from-green-50 via-green-100 to-amber-50 text-green-900 overflow-x-hidden mt-[-2rem] mb-[-4rem]">
      {/* 🌿 Hero Section with Parallax */}
      <section className="relative h-[60vh] flex items-center justify-center text-center px-6 overflow-hidden">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQd2hf8zDWGJ9bh3EQJ6SCibELPkM3V2wIvA&s"
          alt="Trees"
          className="absolute inset-0 w-full h-full object-cover opacity-30"
          style={{ transform: `translateY(${offsetY * 0.3}px)` }}
        />
        <div className="relative z-10 max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-green-800 drop-shadow-lg">
            About Pathfinder @75 Tree Planting Initiative 🌳
          </h1>
          <p className="text-lg md:text-xl text-green-700">
            Celebrating 75 years of faith, service, and environmental stewardship. Learn how this initiative empowers communities to plant trees and nurture our planet.
          </p>
        </div>
      </section>

      {/* 🏛 Background & Objectives with subtle parallax images */}
      <section className="py-20 px-6 md:px-12 lg:px-20 max-w-6xl mx-auto grid md:grid-cols-2 gap-12 relative">
        {/* Background Card */}
        <div className="bg-white p-8 rounded-2xl shadow-lg border border-green-200 relative overflow-hidden">
          <img
            src="https://img.freepik.com/free-vector/nature-landscape-beautiful-tree-background_1035-27115.jpg?semt=ais_hybrid&w=740&q=80"
            alt="Background"
            className="absolute inset-0 w-full h-full object-cover opacity-10"
            style={{ transform: `translateY(${offsetY * 0.2}px)` }}
          />
          <h2 className="text-3xl font-bold text-green-900 mb-4 flex items-center gap-2 relative z-10">
            <Leaf className="text-amber-400" /> Background
          </h2>
          <p className="text-green-800 leading-relaxed relative z-10">
            The Pathfinder @75 Tree Planting Initiative builds on decades of youth empowerment and environmental awareness within the church community. Our aim is to engage young leaders and clubs across the region in planting trees that symbolize growth, faith, and stewardship.
          </p>
        </div>

        {/* Objectives Card */}
        <div className="bg-white p-8 rounded-2xl shadow-lg border border-green-200 relative overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=800&q=60"
            alt="Objectives"
            className="absolute inset-0 w-full h-full object-cover opacity-10"
            style={{ transform: `translateY(${offsetY * 0.2}px)` }}
          />
          <h2 className="text-3xl font-bold text-green-900 mb-4 flex items-center gap-2 relative z-10">
            <Sprout className="text-amber-400" /> Objectives
          </h2>
          <p className="text-green-800 leading-relaxed relative z-10">
            - Plant millions of trees across all conferences, clubs, and communities. <br />
            - Train youth in environmental stewardship and sustainable practices. <br />
            - Encourage community engagement, faith in action, and social responsibility.
          </p>
        </div>
      </section>

      {/* ⛪ Church Connection */}
      <section className="py-20 px-6 md:px-12 lg:px-20 text-center bg-green-100 rounded-2xl mx-6 md:mx-12 lg:mx-20 shadow-inner relative overflow-hidden">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmRtodFo1eW8Q1HOdbaTDMS1p3AjN0tsGqQA&s"
          alt="Church"
          className="absolute inset-0 w-full h-full object-cover opacity-10"
          style={{ transform: `translateY(${offsetY * 0.15}px)` }}
        />
        <h2 className="text-3xl md:text-4xl font-bold text-green-900 mb-6 flex items-center justify-center gap-2 relative z-10">
          <HeartHandshake className="text-amber-400" /> Church Connection
        </h2>
        <p className="max-w-3xl mx-auto text-green-800 leading-relaxed text-lg relative z-10">
          The initiative is deeply rooted in our church's mission of nurturing young leaders through service and faith. It empowers clubs and volunteers to take part in meaningful environmental action while connecting communities with spiritual growth and teamwork.
        </p>
      </section>

      {/* 🌱 Expected Outcomes */}
      <section className="py-20 px-6 md:px-12 lg:px-20 max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-green-900 mb-12 text-center">
          Expected Outcomes
        </h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { icon: <TreePine size={36} />, title: "Tree Growth", desc: "Millions of trees planted and nurtured across communities." },
            { icon: <Sprout size={36} />, title: "Youth Engagement", desc: "Active participation of clubs, volunteers, and young leaders." },
            { icon: <Leaf size={36} />, title: "Environmental Awareness", desc: "Education and training on sustainable practices." },
            { icon: <HeartHandshake size={36} />, title: "Community Impact", desc: "Stronger community bonds and faith in action." },
          ].map((item, i) => (
            <div
              key={i}
              className="bg-white p-6 rounded-2xl shadow-md border border-green-200 hover:shadow-lg transition-all"
            >
              <div className="flex justify-center text-amber-400 mb-4">{item.icon}</div>
              <h4 className="text-xl font-semibold mb-2 text-green-900">{item.title}</h4>
              <p className="text-green-800 text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default About;
