// import React, { useState, useEffect } from "react";
// import { TreePine, ChevronDown, ChevronRight, Crown } from "lucide-react";

// const SERVER_URL = process.env.REACT_APP_SERVER_URL;

// const Tracker = () => {
//   // ---------------------------------------------------------------------
//   // 1. STATIC DATA — ALL CONFERENCES & STATIONS (WITH STATION TREE COUNTS)
//   // ---------------------------------------------------------------------
//   const conferences = [
//     {
//       name: "Central Nyanza Conference",
//       stations: [
//         { name: "Kisumu", trees: 1800 },
//         { name: "Ahero", trees: 1500 },
//         { name: "Thurgam", trees: 1200 },
//         { name: "Olembo", trees: 900 },
//         { name: "Siaya", trees: 1600 },
//         { name: "Bondo", trees: 1700 },
//         { name: "Maliara", trees: 1300 },
//         { name: "Kagwa", trees: 1500 }
//       ]
//     },

//     {
//       name: "Greater Rift Valley",
//       stations: [
//         { name: "Moiben North", trees: 2100 },
//         { name: "Moiben South", trees: 2000 },
//         { name: "Moiben East", trees: 1900 },
//         { name: "Moiben West", trees: 2200 }
//       ]
//     },

//     {
//       name: "Kenya Lake Conference",
//       stations: [
//         { name: "Gendia Central", trees: 2600 },
//         { name: "Gendia East", trees: 2400 },
//         { name: "Gendia West", trees: 2500 },
//         { name: "Olare South", trees: 2600 },
//         { name: "Olare West", trees: 2500 },
//         { name: "Olare East", trees: 2700 }
//       ]
//     },

//     {
//       name: "Ranen Conference",
//       stations: [
//         { name: "Uriri", trees: 1400 },
//         { name: "Awendo", trees: 1600 },
//         { name: "Ranen", trees: 1500 },
//         { name: "Rongo", trees: 1300 },
//         { name: "Ngere", trees: 1100 },
//         { name: "Sare", trees: 1200 },
//         { name: "Kanyimach", trees: 1600 }
//       ]
//     },

//     {
//       name: "Western Kenya Conference",
//       stations: [
//         { name: "Chebwai", trees: 1900 },
//         { name: "Webuye", trees: 1800 },
//         { name: "Busia", trees: 2100 },
//         { name: "Kakamega", trees: 2300 },
//         { name: "Vihiga", trees: 2000 },
//         { name: "Bungoma", trees: 2100 },
//         { name: "Iwandet", trees: 1500 },
//         { name: "Malaba", trees: 1200 }
//       ]
//     },

//     {
//       name: "Lake Victoria Field",
//       stations: [
//         { name: "Homabay", trees: 1500 },
//         { name: "Sori", trees: 1300 },
//         { name: "Obera", trees: 1100 },
//         { name: "Rusinga", trees: 1400 },
//         { name: "Rapedhi", trees: 1200 },
//         { name: "Gwassi", trees: 1500 },
//         { name: "Mfangano", trees: 1300 },
//         { name: "Ruri", trees: 1200 },
//         { name: "Got Kojowi", trees: 1400 }
//       ]
//     },

//     {
//       name: "North Rift Valley Field",
//       stations: [
//         { name: "Turkana", trees: 1200 },
//         { name: "Kapenguria", trees: 1500 },
//         { name: "Kitale", trees: 1600 },
//         { name: "Mt. Elgon", trees: 1400 }
//       ]
//     },

//     {
//       name: "South East Nyanza Field",
//       stations: [{ name: "Stations TBD", trees: 1000 }]
//     },

//     {
//       name: "South West Nyanza Field",
//       stations: [
//         { name: "Migori", trees: 1600 },
//         { name: "Nyamome", trees: 1300 },
//         { name: "Kadika", trees: 1400 },
//         { name: "Nyaduong", trees: 1200 },
//         { name: "Magina", trees: 1300 },
//         { name: "Sota", trees: 1100 },
//         { name: "Nyandago", trees: 1400 }
//       ]
//     },

//     {
//       name: "Southern Kenya Lake Field",
//       stations: [
//         { name: "Wang’a Pala", trees: 1400 },
//         { name: "Dudi", trees: 1200 },
//         { name: "Wire", trees: 1300 },
//         { name: "Oyugis", trees: 1500 },
//         { name: "Kwoyo", trees: 1400 }
//       ]
//     },

//     {
//       name: "West Rift Valley Field",
//       stations: [
//         { name: "Kapsabet", trees: 1500 },
//         { name: "Chepterit", trees: 1300 },
//         { name: "Kaigat", trees: 1200 },
//         { name: "Tinderet", trees: 1400 }
//       ]
//     },

//     {
//       name: "Central Kenya Conference",
//       stations: [
//         { name: "Central Nairobi", trees: 2000 },
//         { name: "Mt. Kenya Central", trees: 1800 },
//         { name: "Mt. Kenya South", trees: 1700 },
//         { name: "North Nairobi", trees: 1600 },
//         { name: "Thika", trees: 1500 },
//         { name: "West Nairobi", trees: 1900 }
//       ]
//     },

//     {
//       name: "Central Rift Valley Conference",
//       stations: [
//         { name: "Baringo South", trees: 1500 },
//         { name: "Laikipia", trees: 1300 },
//         { name: "Molo", trees: 1400 },
//         { name: "Naivasha", trees: 1500 },
//         { name: "Nakuru East", trees: 1600 },
//         { name: "Nakuru West", trees: 1500 },
//         { name: "Narok", trees: 1300 },
//         { name: "Njoro", trees: 1400 },
//         { name: "Nyahururu", trees: 1500 },
//         { name: "Nyandarua", trees: 1300 },
//         { name: "Olenguruone", trees: 1200 },
//         { name: "Rongai", trees: 1300 }
//       ]
//     },

//     {
//       name: "East Nairobi Field",
//       stations: [
//         { name: "Kitui", trees: 1400 },
//         { name: "Lower Nairobi", trees: 1300 },
//         { name: "Machakos", trees: 1500 },
//         { name: "Mbooni", trees: 1200 },
//         { name: "Upper Nairobi", trees: 1400 },
//         { name: "Wote", trees: 1300 }
//       ]
//     },

//     {
//       name: "Kenya Coast Field",
//       stations: [
//         { name: "Galana", trees: 1200 },
//         { name: "Kilifi", trees: 1400 },
//         { name: "Lamu", trees: 1300 },
//         { name: "Malindi", trees: 1500 },
//         { name: "Mombasa", trees: 1600 },
//         { name: "Mombasa West", trees: 1500 },
//         { name: "Mtito Andei", trees: 1400 },
//         { name: "North Eastern", trees: 1300 },
//         { name: "South Coast", trees: 1400 },
//         { name: "Taita Taveta", trees: 1500 }
//       ]
//     },

//     {
//       name: "North East Kenya Field",
//       stations: [
//         { name: "Meru", trees: 1500 },
//         { name: "Mt. Kenya Central", trees: 1400 },
//         { name: "Mt. Kenya East", trees: 1300 },
//         { name: "North West", trees: 1200 },
//         { name: "Nyambene", trees: 1400 },
//         { name: "Tharaka", trees: 1300 }
//       ]
//     },

//     {
//       name: "Nyamira Conference",
//       stations: [
//         { name: "Gesura", trees: 1500 },
//         { name: "Kebirigo", trees: 1300 },
//         { name: "Manga", trees: 1400 },
//         { name: "Matutu", trees: 1300 },
//         { name: "Nyaigwa", trees: 1200 },
//         { name: "Sironga", trees: 1500 },
//         { name: "Tonga", trees: 1400 },
//         { name: "Township", trees: 1500 }
//       ]
//     },

//     {
//       name: "Nyamira West Field",
//       stations: [
//         { name: "Kemera", trees: 1200 },
//         { name: "Keroka", trees: 1400 },
//         { name: "Nyagesenda", trees: 1300 },
//         { name: "Rigoma", trees: 1200 },
//         { name: "Riotero", trees: 1300 }
//       ]
//     },

//     {
//       name: "South East Kenya Field",
//       stations: [
//         { name: "Etago", trees: 1300 },
//         { name: "Gotichaki", trees: 1200 },
//         { name: "Kenyenya", trees: 1300 },
//         { name: "Kilgoris", trees: 1500 },
//         { name: "Lolgorian", trees: 1400 },
//         { name: "Magenche", trees: 1300 },
//         { name: "Mogenda", trees: 1200 },
//         { name: "Nyacheki", trees: 1300 },
//         { name: "Nyamache", trees: 1400 },
//         { name: "Nyamonyo", trees: 1200 },
//         { name: "Ogembo", trees: 1400 },
//         { name: "Omosaria", trees: 1100 },
//         { name: "Shartuka", trees: 1300 }
//       ]
//     },

//     {
//       name: "South Kenya Conference",
//       stations: [
//         { name: "Gesabakwa", trees: 1400 },
//         { name: "Itumbe", trees: 1300 },
//         { name: "Masimba", trees: 1400 },
//         { name: "Nyanchwa", trees: 1500 },
//         { name: "Riana", trees: 1300 },
//         { name: "Riondong’a", trees: 1200 },
//         { name: "Suneka", trees: 1300 }
//       ]
//     },

//     {
//       name: "South Nairobi Kajiado Field",
//       stations: [
//         { name: "Kajiado East", trees: 1300 },
//         { name: "Kajiado North", trees: 1500 },
//         { name: "Southern Nairobi", trees: 1600 }
//       ]
//     },

//     {
//       name: "South Rift Valley Field",
//       stations: [
//         { name: "Bomet", trees: 1500 },
//         { name: "Bureti", trees: 1400 },
//         { name: "Kericho Central", trees: 1300 },
//         { name: "Kericho East", trees: 1300 },
//         { name: "Kericho West", trees: 1400 }
//       ]
//     }
//   ];

//   // -------------------------------------------------
//   // 2. COMPUTED TOTALS
//   // -------------------------------------------------
//   const conferencesWithTotals = conferences.map(conf => ({
//     ...conf,
//     trees: conf.stations.reduce((sum, s) => sum + s.trees, 0)
//   }));

//   const totalTrees = conferencesWithTotals.reduce((sum, c) => sum + c.trees, 0);

//   const topRegion = [...conferencesWithTotals].sort((a, b) => b.trees - a.trees)[0];

//   // Global animated counter
//   const [animatedCount, setAnimatedCount] = useState(0);

//   useEffect(() => {
//     let start = 0;
//     const end = totalTrees;
//     const duration = 2000;
//     const step = Math.ceil(end / (duration / 40));

//     const counter = setInterval(() => {
//       start += step;
//       if (start >= end) {
//         clearInterval(counter);
//         start = end;
//       }
//       setAnimatedCount(start);
//     }, 40);
//   }, [totalTrees]);

//   const [open, setOpen] = useState(null);

//   // -------------------------------------------------
//   // 3. RENDER UI
//   // -------------------------------------------------
//   return (
//     <div className="min-h-screen bg-gradient-to-b from-green-50 via-green-100 to-amber-50 px-6 md:px-14 lg:px-20 py-12 mt-[-2rem] mb-[-4rem]">

//       {/* HEADER */}
//       <section className="text-center mb-14">
//         <h1 className="text-4xl md:text-5xl font-extrabold text-green-900 mb-4">
//           Tree Planting Tracker 🌳
//         </h1>
//         <p className="text-green-800 max-w-2xl mx-auto">
//           Tracking tree planting progress across Kenya — station by station.
//         </p>
//       </section>

//       {/* GLOBAL TREES COUNTER */}
//       <section className="text-center mb-16">
//         <div className="inline-flex items-center gap-3 bg-amber-200/50 px-10 py-7 rounded-3xl shadow-lg border border-green-200">
//           <TreePine size={38} className="text-green-900" />
//           <div>
//             <p className="text-4xl font-extrabold text-green-950 tracking-wide">
//               {animatedCount.toLocaleString()}
//             </p>
//             <p className="text-green-800 font-medium">Total Trees Planted</p>
//           </div>
//         </div>
//       </section>

//       {/* TOP REGION */}
//       <section className="max-w-3xl mx-auto mb-16">
//         <h2 className="text-2xl font-bold text-green-900 mb-4 text-center">Top Performing Region</h2>

//         <div className="bg-white rounded-3xl shadow-xl p-6 border border-green-200 flex sm:flex-row flex-col items-center gap-6">
//           <Crown size={50} className="text-amber-500" />
//           <div className="flex-1">
//             <h3 className="text-2xl font-bold text-green-900">{topRegion.name}</h3>
//             <p className="text-green-700 text-lg font-semibold mt-1">
//               {topRegion.trees.toLocaleString()} Trees Planted
//             </p>
//           </div>
//         </div>
//       </section>

//       {/* CONFERENCES LIST */}
//       <section className="max-w-5xl mx-auto mb-20">
//         <h2 className="text-2xl md:text-3xl font-bold text-green-900 mb-8 text-center">
//           Trees Planted by Conference
//         </h2>

//         <div className="space-y-6">
//           {conferencesWithTotals.map((conf, idx) => (
//             <div key={idx} className="bg-white rounded-2xl shadow-lg border border-green-200 p-6">

//               {/* HEADER ROW */}
//               <div
//                 className="flex justify-between items-center cursor-pointer"
//                 onClick={() => setOpen(open === idx ? null : idx)}
//               >
//                 <div>
//                   <h3 className="text-xl font-bold text-green-900">{conf.name}</h3>
//                   <p className="text-green-700 font-semibold">
//                     {conf.trees.toLocaleString()} Trees Planted
//                   </p>
//                 </div>

//                 {open === idx ? (
//                   <ChevronDown className="text-green-800" />
//                 ) : (
//                   <ChevronRight className="text-green-800" />
//                 )}
//               </div>

//               {/* STATIONS */}
//               {open === idx && (
//                 <ul className="mt-4 grid md:grid-cols-2 lg:grid-cols-3 gap-2">
//                   {conf.stations.map((station, sIdx) => (
//                     <li
//                       key={sIdx}
//                       className="bg-green-50 border border-green-200 rounded-lg px-4 py-2 text-green-900 flex justify-between"
//                     >
//                       🌱 {station.name}
//                       <span className="font-semibold">{station.trees.toLocaleString()}</span>
//                     </li>
//                   ))}
//                 </ul>
//               )}
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* MAP PLACEHOLDER */}
//       <section className="text-center mb-10">
//         <h2 className="text-2xl font-bold text-green-900 mb-6">Interactive Map (Coming Soon)</h2>
//         <div className="w-full h-80 bg-green-200 rounded-2xl shadow-lg flex items-center justify-center text-green-900 font-semibold">
//           Kenya Tree Planting Map 🌍
//         </div>
//       </section>
//     </div>
//   );
// };

// export default Tracker;


import React, { useState, useEffect } from "react";
import { TreePine, ChevronDown, ChevronRight, Crown } from "lucide-react";

  const SERVER_URL = process.env.REACT_APP_SERVER_URL;

const Tracker = () => {
  // -------------------------------------------------
  // STATE
  // -------------------------------------------------
  const [conferences, setConferences] = useState([]);
  const [totalTrees, setTotalTrees] = useState(0);
  const [topRegion, setTopRegion] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [open, setOpen] = useState(null);
  const [animatedCount, setAnimatedCount] = useState(0);

  // -------------------------------------------------
  // FETCH BACKEND DATA
  // -------------------------------------------------
  const fetchTrackerData = async () => {
    try {
      setLoading(true);
      setError(false);

      const res = await fetch(`${SERVER_URL}/api/tracker`);
      if (!res.ok) throw new Error("Failed to fetch");

      const data = await res.json();

      // Normalize backend → UI format
      const normalizedConferences = data.conferences.map(conf => ({
        name: conf.name,
        trees: conf.trees,
        stations: conf.stations.map(st => ({
          name: st.name,
          trees: st.treesPlanted
        }))
      }));

      setConferences(normalizedConferences);
      setTotalTrees(data.totalTrees);
      setTopRegion({
        name: data.topRegion?.name,
        trees: data.topRegion?.trees
      });
    } catch (err) {
      console.error("Tracker load error:", err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTrackerData();
  }, []);

  // -------------------------------------------------
  // ANIMATED COUNTER
  // -------------------------------------------------
  useEffect(() => {
    if (!totalTrees) return;

    let start = 0;
    const end = totalTrees;
    const duration = 2000;
    const step = Math.ceil(end / (duration / 40));

    const counter = setInterval(() => {
      start += step;
      if (start >= end) {
        clearInterval(counter);
        start = end;
      }
      setAnimatedCount(start);
    }, 40);

    return () => clearInterval(counter);
  }, [totalTrees]);

  // -------------------------------------------------
  // LOADING STATE (POLISHED)
  // -------------------------------------------------
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-green-50 via-green-100 to-amber-50">
        <div className="text-center">
          <TreePine className="mx-auto mb-4 animate-pulse text-green-700" size={48} />
          <p className="text-green-800 font-semibold">
            Loading tree planting progress…
          </p>
        </div>
      </div>
    );
  }

  // -------------------------------------------------
  // ERROR STATE (USER-FRIENDLY)
  // -------------------------------------------------
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-green-50 via-green-100 to-amber-50 px-6">
        <div className="bg-white border border-green-200 rounded-2xl shadow-xl p-8 max-w-md text-center">
          <TreePine className="mx-auto mb-4 text-amber-500" size={48} />
          <h2 className="text-xl font-bold text-green-900 mb-2">
            Data Temporarily Unavailable
          </h2>
          <p className="text-green-700 mb-6">
            We’re having trouble loading the tree planting data right now.
            Please check your connection and try again.
          </p>
          <button
            onClick={fetchTrackerData}
            className="bg-green-700 hover:bg-green-800 text-white px-6 py-2 rounded-xl font-semibold transition"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  // -------------------------------------------------
  // UI (UNCHANGED)
  // -------------------------------------------------
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 via-green-100 to-amber-50 px-6 md:px-14 lg:px-20 py-12 mt-[-2rem] mb-[-4rem]">

      {/* HEADER */}
      <section className="text-center mb-14">
        <h1 className="text-4xl md:text-5xl font-extrabold text-green-900 mb-4">
          Tree Planting Tracker 🌳
        </h1>
        <p className="text-green-800 max-w-2xl mx-auto">
          Tracking tree planting progress across Kenya — station by station.
        </p>
      </section>

      {/* GLOBAL COUNTER */}
      <section className="text-center mb-16">
        <div className="inline-flex items-center gap-3 bg-amber-200/50 px-10 py-7 rounded-3xl shadow-lg border border-green-200">
          <TreePine size={38} className="text-green-900" />
          <div>
            <p className="text-4xl font-extrabold text-green-950 tracking-wide">
              {animatedCount.toLocaleString()}
            </p>
            <p className="text-green-800 font-medium">Total Trees Planted</p>
          </div>
        </div>
      </section>

      {/* TOP REGION */}
      {topRegion && (
        <section className="max-w-3xl mx-auto mb-16">
          <h2 className="text-2xl font-bold text-green-900 mb-4 text-center">
            Top Performing Region
          </h2>

          <div className="bg-white rounded-3xl shadow-xl p-6 border border-green-200 flex sm:flex-row flex-col items-center gap-6">
            <Crown size={50} className="text-amber-500" />
            <div className="flex-1">
              <h3 className="text-2xl font-bold text-green-900">
                {topRegion.name}
              </h3>
              <p className="text-green-700 text-lg font-semibold mt-1">
                {topRegion.trees.toLocaleString()} Trees Planted
              </p>
            </div>
          </div>
        </section>
      )}

      {/* CONFERENCES */}
      <section className="max-w-5xl mx-auto mb-20">
        <h2 className="text-2xl md:text-3xl font-bold text-green-900 mb-8 text-center">
          Trees Planted by Conference
        </h2>

        <div className="space-y-6">
          {conferences.map((conf, idx) => (
            <div key={idx} className="bg-white rounded-2xl shadow-lg border border-green-200 p-6">
              <div
                className="flex justify-between items-center cursor-pointer"
                onClick={() => setOpen(open === idx ? null : idx)}
              >
                <div>
                  <h3 className="text-xl font-bold text-green-900">{conf.name}</h3>
                  <p className="text-green-700 font-semibold">
                    {conf.trees.toLocaleString()} Trees Planted
                  </p>
                </div>

                {open === idx ? (
                  <ChevronDown className="text-green-800" />
                ) : (
                  <ChevronRight className="text-green-800" />
                )}
              </div>

              {open === idx && (
                <ul className="mt-4 grid md:grid-cols-2 lg:grid-cols-3 gap-2">
                  {conf.stations.map((station, sIdx) => (
                    <li
                      key={sIdx}
                      className="bg-green-50 border border-green-200 rounded-lg px-4 py-2 text-green-900 flex justify-between"
                    >
                      🌱 {station.name}
                      <span className="font-semibold">
                        {station.trees.toLocaleString()}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* MAP PLACEHOLDER */}
      <section className="text-center mb-10">
        <h2 className="text-2xl font-bold text-green-900 mb-6">
          Interactive Map (Coming Soon)
        </h2>
        <div className="w-full h-80 bg-green-200 rounded-2xl shadow-lg flex items-center justify-center text-green-900 font-semibold">
          Kenya Tree Planting Map 🌍
        </div>
      </section>
    </div>
  );
};

export default Tracker;
