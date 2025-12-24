// import React from "react";
// import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";

// const SERVER_URL = process.env.REACT_APP_SERVER_URL;

// const team = [
//   {
//     name: "John Mwangi",
//     role: "National Project Coordinator",
//     image:
//       "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=800&q=60",
//     socials: {
//       facebook: "#",
//       twitter: "#",
//       instagram: "#",
//       linkedin: "#",
//     },
//   },
//   {
//     name: "Sarah Wanjiku",
//     role: "Environmental Lead",
//     image:
//       "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=800&q=60",
//     socials: {
//       facebook: "#",
//       twitter: "#",
//       instagram: "#",
//       linkedin: "#",
//     },
//   },
//   {
//     name: "David Otieno",
//     role: "Union Youth Director",
//     image:
//       "https://images.unsplash.com/photo-1527980965255-d3b416303d12?auto=format&fit=crop&w=800&q=60",
//     socials: {
//       facebook: "#",
//       twitter: "#",
//       instagram: "#",
//       linkedin: "#",
//     },
//   },
//   {
//     name: "Grace Kerubo",
//     role: "Communications & Media Lead",
//     image:
//       "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=800&q=60",
//     socials: {
//       facebook: "#",
//       twitter: "#",
//       instagram: "#",
//       linkedin: "#",
//     },
//   },
// ];

// function Profiles() {
//   return (
//     <div className="min-h-screen bg-green-50 pt-12 pb-16 mt-[-2rem] mb-[-4rem]">
//       {/* Header */}
//       <div className="text-center mb-12">
//         <h2 className="text-4xl font-bold text-green-800">
//           Meet Our Leadership Team
//         </h2>
//         <p className="text-brown-700 mt-3 text-lg max-w-2xl mx-auto">
//           The dedicated individuals driving the Pathfinder @75 Tree Planting
//           Initiative across East & Central Africa.
//         </p>
//       </div>

//       {/* Team Grid */}
//       <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
//         {team.map((member, index) => (
//           <div
//             key={index}
//             className="bg-white shadow-md rounded-xl overflow-hidden hover:shadow-xl transition duration-300"
//           >
//             {/* Image */}
//             <div className="h-56 w-full overflow-hidden">
//               <img
//                 src={member.image}
//                 alt={member.name}
//                 className="w-full h-full object-cover hover:scale-110 transition duration-500"
//               />
//             </div>

//             {/* Info */}
//             <div className="p-5 text-center">
//               <h3 className="text-xl font-semibold text-green-900">
//                 {member.name}
//               </h3>
//               <p className="text-brown-600 text-sm mb-4">{member.role}</p>

//               {/* Social Links */}
//               <div className="flex justify-center space-x-4">
//                 <a
//                   href={member.socials.facebook}
//                   className="text-green-700 hover:text-brown-700 transition"
//                 >
//                   <Facebook size={20} />
//                 </a>
//                 <a
//                   href={member.socials.twitter}
//                   className="text-green-700 hover:text-brown-700 transition"
//                 >
//                   <Twitter size={20} />
//                 </a>
//                 <a
//                   href={member.socials.instagram}
//                   className="text-green-700 hover:text-brown-700 transition"
//                 >
//                   <Instagram size={20} />
//                 </a>
//                 <a
//                   href={member.socials.linkedin}
//                   className="text-green-700 hover:text-brown-700 transition"
//                 >
//                   <Linkedin size={20} />
//                 </a>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Bottom Section */}
//       <div className="text-center mt-16">
//         <p className="text-green-900 text-lg">
//           More team members, partners, and regional leaders will be added soon.
//         </p>
//       </div>
//     </div>
//   );
// }

// export default Profiles;

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

function Profiles() {
  const [team, setTeam] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchLeaders = async () => {
      try {
        const res = await axios.get(`${SERVER_URL}/api/leadership`);
        setTeam(res.data.data || []);
      } catch (err) {
        console.error("Leadership fetch error:", err);
        setError(
          "Unable to load leadership profiles at the moment. Please try again later."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchLeaders();
  }, []);

  return (
    <div className="min-h-screen bg-green-50 pt-12 pb-16 mt-[-2rem] mb-[-4rem]">
      {/* Header */}
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-green-800">
          Meet Our Leadership Team
        </h2>
        <p className="text-brown-700 mt-3 text-lg max-w-2xl mx-auto">
          The dedicated individuals driving the Pathfinder @75 Tree Planting
          Initiative across East & Central Africa.
        </p>
      </div>

      {/* Loader */}
      {loading && (
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="bg-white rounded-xl shadow-md overflow-hidden animate-pulse"
            >
              <div className="h-56 bg-gray-200" />
              <div className="p-5 space-y-3">
                <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto" />
                <div className="h-3 bg-gray-200 rounded w-1/2 mx-auto" />
                <div className="flex justify-center space-x-4 mt-4">
                  <div className="h-5 w-5 bg-gray-200 rounded-full" />
                  <div className="h-5 w-5 bg-gray-200 rounded-full" />
                  <div className="h-5 w-5 bg-gray-200 rounded-full" />
                  <div className="h-5 w-5 bg-gray-200 rounded-full" />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Error */}
      {!loading && error && (
        <div className="text-center text-red-600 font-medium mt-10">
          {error}
        </div>
      )}

      {/* Team Grid */}
      {!loading && !error && (
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
          {team.map((member) => (
            <div
              key={member._id}
              className="bg-white shadow-md rounded-xl overflow-hidden hover:shadow-xl transition duration-300"
            >
              {/* Image */}
              <div className="h-56 w-full overflow-hidden">
                <img
                  src={member.imageUrl}
                  alt={member.name}
                  className="w-full h-full object-cover hover:scale-110 transition duration-500"
                />
              </div>

              {/* Info */}
              <div className="p-5 text-center">
                <h3 className="text-xl font-semibold text-green-900">
                  {member.name}
                </h3>
                <p className="text-brown-600 text-sm mb-4">{member.role}</p>

                {/* Social Links */}
                <div className="flex justify-center space-x-4">
                  {member.socials?.facebook && (
                    <a
                      href={member.socials.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-green-700 hover:text-brown-700 transition"
                    >
                      <Facebook size={20} />
                    </a>
                  )}
                  {member.socials?.twitter && (
                    <a
                      href={member.socials.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-green-700 hover:text-brown-700 transition"
                    >
                      <Twitter size={20} />
                    </a>
                  )}
                  {member.socials?.instagram && (
                    <a
                      href={member.socials.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-green-700 hover:text-brown-700 transition"
                    >
                      <Instagram size={20} />
                    </a>
                  )}
                  {member.socials?.linkedin && (
                    <a
                      href={member.socials.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-green-700 hover:text-brown-700 transition"
                    >
                      <Linkedin size={20} />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Bottom Section */}
      {!loading && !error && (
        <div className="text-center mt-16">
          <p className="text-green-900 text-lg">
            More team members, partners, and regional leaders will be added soon.
          </p>
        </div>
      )}
    </div>
  );
}

export default Profiles;
