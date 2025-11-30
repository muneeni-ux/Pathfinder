import React, { useState, useEffect } from "react";
import { Search, Users, MapPin, Leaf, TreePine, X } from "lucide-react";

const Club = () => {
  const [search, setSearch] = useState("");
  const [region, setRegion] = useState("All Regions");
  const [selectedClub, setSelectedClub] = useState(null);

  // NEW 👇 Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const clubsPerPage = 3;

 /* ---------------------------------------------
      OFFICIAL REGION + STATIONS
  ---------------------------------------------- */
  const regions = {
    "Central Nyanza Conference": [
      "Kisumu", "Ahero", "Katito", "Maseno", "Nyahera", "Nyakach",
      "Nyando", "Koru", "Awasi", "Sare", "Koru", "Sangoro"
    ],
    "Greater Rift Valley": [
      "Eldoret", "Nandi Hills", "Turbo", "Burnt Forest", "Mosoriot",
      "Itigo", "Kiptenden", "Kabiyet"
    ],
    "Kenya Lake Conference": [
      "Kendu Bay", "Homa Bay", "Rongo", "Rodi Kopany", "Kanyada",
      "Ndhiwa", "Rangwe", "Kanyamwa"
    ],
    "Ranen Conference": [
      "Migori", "Awendo", "Wawanda", "Uriri", "Rakwaro", "Wasio",
      "Ageng’a", "Rongo", "Kuria"
    ],
    "Western Kenya Conference": [
      "Kakamega", "Bungoma", "Busia", "Vihiga", "Lugari",
      "Butere", "Malava", "Navakholo"
    ],
    "Lake Victoria Field": [
      "Muhuru Bay", "Karungu", "Macalder", "Sori", "Kadem"
    ],
    "North Rift Valley Field": [
      "Kitale", "Kapenguria", "Makutano", "Endebess", "Cherangany"
    ],
    "South East Nyanza Field": [
      "Oyugis", "Keroka", "Suna East", "Nyamira", "Kodera"
    ],
    "South West Nyanza Field": [
      "Ndhiwa", "Kanyidoto", "Rangwe", "Mbita", "Magunga"
    ],
    "Southern Kenya Lake Field": [
      "Rodi", "Kanyada", "Homa Bay", "Kendu Bay", "Kanyach Kachar"
    ],
    "West Rift Valley Field": [
      "Nakuru", "Molo", "Njoro", "Elementaita", "Salgaa"
    ],
    "Central Kenya Conference": [
      "Nairobi", "Kasarani", "Githurai", "Ruiru", "Thika"
    ],
    "Central Rift Valley Conference": [
      "Naivasha", "Gilgil", "Mai Mahiu", "Longonot"
    ],
    "East Nairobi Field": [
      "Donholm", "Buruburu", "Pipeline", "Kayole"
    ],
    "Kenya Coast Field": [
      "Mombasa", "Likoni", "Kwale", "Malindi", "Kilifi"
    ],
    "North East Kenya Field": [
      "Garissa", "Wajir", "Isiolo", "Modogashe"
    ],
    "Nyamira Conference": [
      "Nyamira", "Borabu", "Ekerenyo", "Nyansiongo"
    ],
    "Nyamira West Field": [
      "Nyamaiya", "Bonyamatuta", "Sironga", "Nyaronde"
    ],
    "South East Kenya Field": [
      "Machakos", "Kitui", "Makueni", "Wote"
    ],
    "South Kenya Conference": [
      "Kisii", "Ogembo", "Keroka", "Suneka"
    ],
    "South Nairobi Kajiado Field": [
      "Kitengela", "Ngong", "Ongata Rongai", "Dagoretti"
    ],
    "South Rift Valley Field": [
      "Narok", "Bomet", "Sotik", "Mulot"
    ]
  };

  /* ---------------------------------------------
      MANUAL CLUB DATA
      (You manually assign region + station + trees)
  ---------------------------------------------- */
  const clubs = [
    {
      name: "Golden Eagles Pathfinder Club",
      region: "Central Kenya Conference",
      station: "Ruiru",
      trees: 1200,
      members: 42,
      leader: "Bro. Michael Otieno",
      founded: 2012,
      activities: "Community cleanups, tree planting drives, first aid training",
      image:
        "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=900&q=80",
    },
    {
      name: "Lakeview Champions Club",
      region: "Central Nyanza Conference",
      station: "Kisumu",
      trees: 980,
      members: 33,
      leader: "Sis. Ruth Achieng",
      founded: 2015,
      activities: "Water conservation projects, youth mentorship programs",
      image:
        "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=900&q=80",
    },
    {
      name: "Mt. Kenya Guardians",
      region: "Central Kenya Conference",
      station: "Thika",
      trees: 1430,
      members: 28,
      leader: "Bro. Peter Mwangi",
      founded: 2010,
      activities: "Mountain hikes, environmental conservation training",
      image:
        "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80",
    },
    {
      name: "Rift Valley Rangers",
      region: "West Rift Valley Field",
      station: "Nakuru",
      trees: 2100,
      members: 51,
      leader: "Sis. Shiro Wanjiku",
      founded: 2008,
      activities: "Safari expeditions, first responder training",
      image:
        "https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=900&q=80",
    },
    {
      name: "Coastal Sea Pathfinders",
      region: "Kenya Coast Field",
      station: "Mombasa",
      trees: 1560,
      members: 47,
      leader: "Bro. Yusuf Salim",
      founded: 2014,
      activities: "Beach cleanups, marine conservation awareness",
      image:
        "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=900&q=80",
    },
  ];

  const allRegions = ["All Regions", ...Object.keys(regions)];

  // ---------------------------------------------
  // FILTERED CLUBS
  // ---------------------------------------------
  const filtered = clubs.filter(
    (c) =>
      (region === "All Regions" || c.region === region) &&
      c.name.toLowerCase().includes(search.toLowerCase())
  );

  // Reset pagination when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [search, region]);

  // ---------------------------------------------
  // PAGINATION LOGIC
  // ---------------------------------------------
  const indexOfLast = currentPage * clubsPerPage;
  const indexOfFirst = indexOfLast - clubsPerPage;
  const currentClubs = filtered.slice(indexOfFirst, indexOfLast);

  const totalPages = Math.ceil(filtered.length / clubsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="bg-white text-green-900 overflow-x-hidden mt-[-2rem] md:mt-0 mb-[-4rem]">

      {/* HERO */}
      <section className="relative h-[50vh] flex items-center justify-center text-center rounded-b-3xl overflow-hidden shadow">
        <div
          className="absolute inset-0 bg-cover bg-center animate-zoomSlow"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1600&q=80')",
            opacity: 0.3,
          }}
        ></div>

        <div className="relative z-10 px-6">
          <h1 className="text-5xl font-extrabold drop-shadow text-green-900">
            Pathfinder Clubs Kenya
          </h1>
          <p className="text-green-800 text-lg mt-3 max-w-xl mx-auto">
            Browse registered clubs, their regions, and their impact on the environment.
          </p>
        </div>
      </section>

      {/* SEARCH + FILTER */}
      <section className="py-10 px-6 md:px-16 max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row gap-6 justify-between items-center">
          {/* Search */}
          <div className="flex items-center w-full md:w-1/2 bg-green-50 border border-green-200 p-3 rounded-full shadow">
            <Search className="text-green-700 mr-3" />
            <input
              type="text"
              placeholder="Search for a club..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-transparent outline-none w-full text-green-900"
            />
          </div>

          {/* Region */}
          <select
            value={region}
            onChange={(e) => setRegion(e.target.value)}
            className="bg-green-50 border border-green-200 px-6 py-3 rounded-full shadow text-green-900 font-medium"
          >
            {allRegions.map((r, i) => (
              <option key={i} value={r}>
                {r}
              </option>
            ))}
          </select>
        </div>
      </section>

      {/* CLUBS LIST */}
      <section className="pb-16 px-6 md:px-16 max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold mb-6">Clubs ({filtered.length})</h2>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
          {currentClubs.map((club, index) => (
            <div
              key={index}
              className="bg-green-50 border border-green-200 rounded-2xl p-6 shadow hover:shadow-xl hover:scale-[1.02] transition cursor-pointer"
              onClick={() => setSelectedClub(club)}
            >
              <img
                src={club.image}
                alt={club.name}
                className="w-full h-32 object-cover rounded-xl mb-4"
              />

              <h3 className="font-semibold text-green-900 text-lg flex items-center gap-2">
                <Leaf className="text-amber-500" /> {club.name}
              </h3>

              <div className="text-green-800 space-y-2 mt-3">
                <p className="flex items-center gap-2">
                  <MapPin className="text-green-700" size={18} /> {club.region} — {club.station}
                </p>
                <p className="flex items-center gap-2">
                  <Users className="text-green-700" size={18} /> {club.members} members
                </p>
                <p className="flex items-center gap-2">
                  <TreePine className="text-green-700" size={18} /> {club.trees} trees planted
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* PAGINATION */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-10 gap-3">
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                className={`px-4 py-2 rounded-lg border transition font-medium ${
                  currentPage === i + 1
                    ? "bg-green-600 text-white border-green-600 shadow"
                    : "bg-green-50 border-green-300 text-green-800 hover:bg-green-100"
                }`}
                onClick={() => handlePageChange(i + 1)}
              >
                {i + 1}
              </button>
            ))}
          </div>
        )}
      </section>

      {/* MODAL */}
      {selectedClub && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center p-6 z-50 animate-fadeIn">
          <div className="bg-white rounded-2xl p-8 max-w-lg w-full shadow-xl relative">
            <button
              className="absolute top-4 right-4 text-green-800 hover:text-red-600"
              onClick={() => setSelectedClub(null)}
            >
              <X size={28} />
            </button>

            <img
              src={selectedClub.image}
              alt={selectedClub.name}
              className="w-full h-40 object-cover rounded-xl mb-4"
            />

            <h2 className="text-2xl font-bold text-green-900 mb-2">{selectedClub.name}</h2>

            <p><strong>Region:</strong> {selectedClub.region}</p>
            <p><strong>Station:</strong> {selectedClub.station}</p>
            <p><strong>Members:</strong> {selectedClub.members}</p>
            <p><strong>Trees Planted:</strong> {selectedClub.trees}</p>
            <p><strong>Leader:</strong> {selectedClub.leader}</p>
            <p><strong>Founded:</strong> {selectedClub.founded}</p>

            <p className="mt-2"><strong>Activities:</strong> {selectedClub.activities}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Club;
