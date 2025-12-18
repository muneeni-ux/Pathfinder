import React, { useEffect, useState } from "react";
import {
  Leaf,
  Sprout,
  TreePine,
  HeartHandshake,
  CalendarDays,
  Loader2,
  AlertTriangle,
} from "lucide-react";
import axios from "axios";

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

const About = () => {
  const [offsetY, setOffsetY] = useState(0);
  const [honorThemes, setHonorThemes] = useState([]);
  const [loadingThemes, setLoadingThemes] = useState(true);
  const [themeError, setThemeError] = useState(null);

  useEffect(() => {
    const handleScroll = () => setOffsetY(window.pageYOffset);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  useEffect(() => {
    const fetchHonorThemes = async () => {
      try {
        setLoadingThemes(true);
        setThemeError(null);

        const res = await axios.get(`${SERVER_URL}/api/honor-themes`);

        setHonorThemes(res.data);
      } catch (error) {
        setThemeError(
          "We couldn’t load the weekly honor themes at the moment. Please try again shortly."
        );
      } finally {
        setLoadingThemes(false);
      }
    };

    fetchHonorThemes();
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
            community. It engages young leaders and clubs across the region in
            planting trees that symbolize growth, faith, and stewardship.
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
            - Train youth in sustainable environmental practices. <br />-
            Encourage community engagement and faith-based service.
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

      {/* 📅 Honor Themes */}
      <section className="py-16 px-6 md:px-12 lg:px-20 max-w-6xl mx-auto">
        {" "}
        {/* Adjusted max-width for more columns */}
        <h2 className="text-3xl md:text-4xl font-bold text-green-900 mb-4 text-center flex justify-center items-center gap-3">
          <CalendarDays className="text-amber-500 w-8 h-8" />
          Weekly Pathfinder Honor Themes
        </h2>
        <p className="text-center text-green-800 max-w-4xl mx-auto mb-10 text-lg">
          {" "}
          {/* Increased text size slightly */}
          With over <strong>600 Pathfinder honors</strong>, we focus on one
          theme per day. Each day highlights achievements, activities, and
          stories in that category.
        </p>
        {/* 🌟 Beautiful & Compact Grid Implementation */}
        {/* 🌟 Beautiful & Compact Grid Implementation */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-3 md:gap-4">
          {/* Loader */}
          {loadingThemes && (
            <div className="col-span-full flex flex-col items-center justify-center py-12">
              <Loader2 className="w-10 h-10 text-amber-500 animate-spin mb-3" />
              <p className="text-green-800 font-medium">
                Loading weekly honor themes…
              </p>
            </div>
          )}

          {/* Error */}
          {!loadingThemes && themeError && (
            <div className="col-span-full flex flex-col items-center justify-center py-12 bg-white rounded-xl border border-red-200 shadow-md">
              <AlertTriangle className="w-10 h-10 text-red-500 mb-3" />
              <p className="text-red-600 font-semibold text-center max-w-md">
                {themeError}
              </p>
            </div>
          )}

          {/* Data */}
          {!loadingThemes &&
            !themeError &&
            honorThemes.map((item, i) => (
              <div
                key={item._id || i}
                className="relative bg-white p-4 rounded-xl shadow-md border border-green-100 hover:shadow-lg transition-all duration-300 group overflow-hidden cursor-pointer h-full"
              >
                {/* Hover Accent */}
                <div className="absolute top-0 left-0 w-full h-1 bg-amber-500 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500" />

                <div className="relative z-10 flex flex-col items-center justify-between h-full">
                  {/* Icon */}
                  <div className="text-3xl mb-2 p-1 rounded-full bg-green-50 group-hover:bg-amber-100 transition-colors duration-300">
                    {item.icon}
                  </div>

                  <div className="text-center mt-2 flex-grow">
                    <h3 className="text-base font-extrabold text-amber-600 uppercase tracking-widest">
                      {item.day}
                    </h3>

                    <p className="text-green-800 mt-1 text-xs font-medium leading-tight">
                      {item.theme}
                    </p>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </section>
      {/* 🌟 Projects & Initiatives */}
      <section className="pb-20 px-6 md:px-12 lg:px-20 max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-green-900 mb-12 text-center">
          Projects & Initiatives
        </h2>
        <p className="text-green-800 mb-8 text-center max-w-3xl mx-auto">
          Pathfinders actively participate in environmental, community, and
          youth empowerment projects. These initiatives provide hands-on
          experience, leadership development, and opportunities to make a real
          impact.
        </p>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
          {[
            {
              icon: <TreePine size={36} className="text-amber-400" />,
              title: "Environmental Projects",
              desc: "Tree planting campaigns, clean-up drives, and sustainability programs to protect our environment.",
            },
            {
              icon: <HeartHandshake size={36} className="text-amber-400" />,
              title: "Community Service",
              desc: "Supporting local communities through outreach programs, charity work, and social initiatives.",
            },
            {
              icon: <Sprout size={36} className="text-amber-400" />,
              title: "Youth Empowerment",
              desc: "Programs and workshops designed to enhance skills, leadership, and personal growth for young Pathfinders.",
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

      {/* 🌱 Expected Outcomes */}
      <section className="pb-20 px-6 md:px-12 lg:px-20 max-w-6xl mx-auto">
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

      {/* 🌟 Lifestyle & Jobs / Opportunities & Pathfinder History */}
      <section className="pb-20 px-6 md:px-12 lg:px-20 max-w-6xl mx-auto space-y-12">
        {/* Lifestyle */}
        <div className="bg-white p-8 rounded-2xl shadow-lg border border-green-200">
          <h3 className="text-2xl font-bold text-green-900 mb-4">Lifestyle</h3>
          <p className="text-green-800 mb-4">
            Pathfinders are encouraged to maintain holistic wellness. This
            includes physical health, mental well-being, and spiritual growth.
            Our lifestyle section provides practical tips:
          </p>
          <ul className="text-green-800 list-disc list-inside space-y-2">
            <li>
              <strong>Health & wellness:</strong> Nutrition guidance, regular
              exercise, mindfulness, and healthy routines.
            </li>
            <li>
              <strong>Travel & outdoor activities:</strong> Camping, hiking,
              nature exploration, and team-building adventures.
            </li>
            <li>
              <strong>Camping Guides:</strong> How to set up tents, plan meals,
              and safely enjoy outdoor expeditions.
            </li>
          </ul>
        </div>

        {/* Jobs / Opportunities */}
        <div className="bg-white p-8 rounded-2xl shadow-lg border border-green-200">
          <h3 className="text-2xl font-bold text-green-900 mb-4">
            Jobs & Opportunities
          </h3>
          <p className="text-green-800 mb-4">
            Pathfinders can grow personally and professionally. We provide
            guidance and access to opportunities that strengthen youth
            development:
          </p>
          <ul className="text-green-800 list-disc list-inside space-y-2">
            <li>
              <strong>Volunteering:</strong> Local and regional projects,
              community service, and leadership roles.
            </li>
            <li>
              <strong>Scholarships & Internships:</strong> Educational grants
              and placements supporting career growth.
            </li>
            <li>
              <strong>Career Guidance:</strong> Workshops and mentorships to
              explore STEM, arts, and vocational pathways.
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
};

export default About;
