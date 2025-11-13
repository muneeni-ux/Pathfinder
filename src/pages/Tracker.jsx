import React, { useState, useEffect } from "react";
import { TreePine, Users } from "lucide-react";

const Tracker = () => {
  // Mock data for demo
  const [data] = useState({
    totalTrees: 120000,
    regions: [
      { name: "North Region", trees: 35000 },
      { name: "East Region", trees: 28000 },
      { name: "South Region", trees: 30000 },
      { name: "West Region", trees: 27000 },
    ],
    clubs: [
      { name: "Green Warriors Club", trees: 15000 },
      { name: "Eco Leaders Club", trees: 12000 },
      { name: "Nature Guardians Club", trees: 18000 },
    ],
  });

  // Optional: Animate total tree count
  const [animatedCount, setAnimatedCount] = useState(0);
  useEffect(() => {
    let start = 0;
    const end = data.totalTrees;
    const duration = 2000;
    const increment = Math.ceil(end / (duration / 50));
    const counter = setInterval(() => {
      start += increment;
      if (start >= end) {
        start = end;
        clearInterval(counter);
      }
      setAnimatedCount(start);
    }, 50);
    return () => clearInterval(counter);
  }, [data.totalTrees]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 via-green-100 to-amber-50 mt-[-2rem] mb-[-4rem] px-6 md:px-12 lg:px-20 py-12">
      {/* Header */}
      <section className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold text-green-900 mb-4">
          Tree Planting Tracker 🌳
        </h1>
        <p className="text-green-800 max-w-2xl mx-auto">
          Track our collective impact across regions, conferences, and clubs.
          Every tree counts!
        </p>
      </section>

      {/* Total Trees Counter */}
      <section className="text-center mb-12">
        <div className="inline-flex items-center gap-3 bg-amber-200/50 px-8 py-6 rounded-3xl shadow-lg border border-green-200">
          <TreePine size={36} className="text-green-900" />
          <div>
            <p className="text-3xl font-bold text-green-950">
              {animatedCount.toLocaleString()}
            </p>
            <p className="text-green-800 font-medium">Trees Planted</p>
          </div>
        </div>
      </section>

      {/* Regional Progress */}
      <section className="mb-12 max-w-4xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-green-900 mb-6 text-center">
          Trees Planted by Region
        </h2>
        <div className="space-y-4">
          {data.regions.map((region, idx) => {
            const percentage = Math.min(
              (region.trees / data.totalTrees) * 100,
              100
            );
            return (
              <div key={idx}>
                <div className="flex justify-between mb-1 font-semibold text-green-800">
                  <span>{region.name}</span>
                  <span>{region.trees.toLocaleString()}</span>
                </div>
                <div className="w-full bg-green-200/40 rounded-full h-5">
                  <div
                    className="bg-amber-400 h-5 rounded-full transition-all duration-500"
                    style={{ width: `${percentage}%` }}
                  ></div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Clubs Impact */}
      <section className="mb-12 max-w-4xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-green-900 mb-6 text-center">
          Top Clubs Contribution
        </h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          {data.clubs.map((club, idx) => (
            <div
              key={idx}
              className="bg-white p-6 rounded-2xl shadow-lg border border-green-200 hover:shadow-2xl transition"
            >
              <div className="flex items-center gap-3 mb-4">
                <Users className="text-amber-400 w-6 h-6" />
                <h3 className="font-semibold text-green-900">{club.name}</h3>
              </div>
              <p className="text-green-800 font-bold text-xl">
                {club.trees.toLocaleString()} Trees
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Map Placeholder */}
      <section className="mb-12 text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-green-900 mb-6">
          Map of Planted Areas
        </h2>
        <div className="w-full h-96 bg-green-200 rounded-2xl shadow-lg flex items-center justify-center text-green-900 font-bold">
          {/* In real implementation, integrate Leaflet.js or Google Maps */}
          Interactive Map Coming Soon 🌍
        </div>
      </section>
    </div>
  );
};

export default Tracker;
