import React, { useEffect, useState } from "react";
import {
  Leaf,
  Sprout,
  TreePine,
  HeartHandshake,
  CalendarDays,
} from "lucide-react";

const About = () => {
  const [offsetY, setOffsetY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setOffsetY(window.pageYOffset);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="bg-gradient-to-b from-green-50 via-green-100 to-amber-50 text-green-900 overflow-x-hidden mt-[-2rem] mb-[-4rem]">
      {/* 🌿 Hero Section */}
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
            Celebrating 75 years of faith, service, and environmental
            stewardship. Learn how this initiative empowers communities to plant
            trees and nurture our planet.
          </p>
        </div>
      </section>

      {/* 🌿 Background + Objectives */}
      <section className="py-20 px-6 md:px-12 lg:px-20 max-w-6xl mx-auto grid md:grid-cols-2 gap-12 relative">
        {/* Background */}
        <div className="bg-white p-8 rounded-2xl shadow-lg border border-green-200 relative overflow-hidden">
          <img
            src="https://img.freepik.com/free-vector/nature-landscape-beautiful-tree-background_1035-27115.jpg"
            alt="Background"
            className="absolute inset-0 w-full h-full object-cover opacity-10"
            style={{ transform: `translateY(${offsetY * 0.2}px)` }}
          />
          <h2 className="text-3xl font-bold text-green-900 mb-4 flex items-center gap-2 relative z-10">
            <Leaf className="text-amber-400" /> Background
          </h2>
          <p className="text-green-800 leading-relaxed relative z-10">
            The Pathfinder @75 Tree Planting Initiative builds on decades of
            youth empowerment and environmental awareness within the church
            community. Our aim is to engage young leaders and clubs across the
            region in planting trees that symbolize growth, faith, and
            stewardship.
          </p>
        </div>

        {/* Objectives */}
        <div className="bg-white p-8 rounded-2xl shadow-lg border border-green-200 relative overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1501004318641-b39e6451bec6"
            alt="Objectives"
            className="absolute inset-0 w-full h-full object-cover opacity-10"
            style={{ transform: `translateY(${offsetY * 0.2}px)` }}
          />
          <h2 className="text-3xl font-bold text-green-900 mb-4 flex items-center gap-2 relative z-10">
            <Sprout className="text-amber-400" /> Objectives
          </h2>
          <p className="text-green-800 leading-relaxed relative z-10">
            By 2030, every Pathfinder will have their own garden of trees
            through this initiative. <br />
            <br />
            Our key objectives include: <br />
            - Plant millions of trees across all regions and clubs. <br />
            - Train youth in sustainable environmental practices. <br />
            - Encourage community engagement and faith-based service. <br />
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
          The initiative is deeply rooted in our church's mission of nurturing
          young leaders through service, discipline, outdoor skills, and faith.
          It strengthens teamwork and empowers Pathfinders to take meaningful
          environmental action.
        </p>
      </section>

      {/* 📅 NEW — Honor Themes Section */}
      <section className="py-20 px-6 md:px-12 lg:px-20 max-w-5xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-green-900 mb-6 text-center flex justify-center items-center gap-2">
          <CalendarDays className="text-amber-500" />
          Weekly Pathfinder Honor Themes
        </h2>
        <p className="text-center text-green-800 max-w-3xl mx-auto mb-12">
          With over <strong>600 Pathfinder honors</strong>, we focus on one
          theme per day. Each day highlights achievements, activities, and
          stories in that category.
        </p>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
          {[
            { day: "Monday", theme: "Arts / Crafts / Money", icon: "🎨" },
            { day: "Tuesday", theme: "Hobbies", icon: "⚽" },
            { day: "Wednesday", theme: "Health", icon: "💚" },
            { day: "Thursday", theme: "Science", icon: "🔬" },
            { day: "Friday", theme: "Nature", icon: "🌿" },
            {
              day: "Saturday",
              theme: "Outdoor Industries / Vocational",
              icon: "🛠️",
            },
            { day: "Sunday", theme: "Recreation", icon: "🎾" },
          ].map((item, i) => (
            <div
              key={i}
              className="relative bg-white p-6 rounded-3xl shadow-md border border-green-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group overflow-hidden"
            >
              {/* Background gradient effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-green-100 via-amber-50 to-white opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative z-10 flex flex-col items-center text-center">
                <div className="text-4xl mb-3 group-hover:scale-125 transition-transform duration-300">
                  {item.icon}
                </div>
                <h3 className="text-xl font-extrabold text-green-900">
                  {item.day}
                </h3>
                <p className="text-green-700 mt-2 text-sm">{item.theme}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 🌱 Expected Outcomes */}
      <section className="py-20 px-6 md:px-12 lg:px-20 max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-green-900 mb-12 text-center">
          Expected Outcomes
        </h2>

        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8">
          {[
            {
              icon: <TreePine size={36} />,
              title: "Tree Growth",
              desc: "Millions of trees planted and nurtured.",
            },
            {
              icon: <Sprout size={36} />,
              title: "Youth Engagement",
              desc: "Active involvement of clubs and leaders.",
            },
            {
              icon: <Leaf size={36} />,
              title: "Environmental Awareness",
              desc: "Training in sustainable practices.",
            },
            {
              icon: <HeartHandshake size={36} />,
              title: "Community Impact",
              desc: "Stronger community bonds through service.",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="bg-white p-6 rounded-2xl shadow-md border border-green-200 hover:shadow-lg transition-all"
            >
              <div className="flex justify-center text-amber-400 mb-4">
                {item.icon}
              </div>
              <h4 className="text-xl font-semibold mb-2 text-green-900">
                {item.title}
              </h4>
              <p className="text-green-800 text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default About;
