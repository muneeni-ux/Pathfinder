import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Facebook,
  Instagram,
  Linkedin,
  Twitter,
  Loader2,
  Users,
  UserCircle2,
} from "lucide-react";

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
          "Unable to load leadership profiles at the moment. Please try again later.",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchLeaders();
  }, []);

  return (
    <div className="bg-slate-50 overflow-x-hidden min-h-screen font-sans selection:bg-pink-200">
      {/* 🌟 HERO SECTION (Futuristic Connection) */}
      <section className="relative min-h-[50vh] flex items-center justify-center overflow-hidden bg-slate-900 pt-20">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-purple-600/20 rounded-full blur-[100px] animate-pulse-slow"></div>
          <div className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] bg-blue-600/20 rounded-full blur-[100px] animate-pulse-slow delay-1000"></div>
          {/* Network Grid */}
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
        </div>

        {/* Floating Icons */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-[15%] animate-float opacity-30">
            <Users className="text-purple-300 w-16 h-16" />
          </div>
          <div
            className="absolute bottom-20 right-[15%] animate-float opacity-30"
            style={{ animationDelay: "1.5s" }}
          >
            <UserCircle2 className="text-blue-300 w-12 h-12" />
          </div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center animate-fade-in-up pb-24">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-purple-200 text-xs font-bold uppercase tracking-widest mb-6">
            <Users size={14} /> Our People
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-white mb-6 drop-shadow-2xl tracking-tight">
            Leadership{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
              Team
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-300 max-w-2xl mx-auto leading-relaxed font-light">
            Meet the dedicated visionaries and changemakers driving youth
            empowerment and environmental action across Africa.
          </p>
        </div>
      </section>

      {/* 👥 TEAM GRID */}
      <section className="py-20 px-6 md:px-12 bg-white relative z-20 -mt-20 rounded-t-[3rem]">
        <div className="max-w-7xl mx-auto pt-10">
          {/* Loading State */}
          {loading && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {Array.from({ length: 8 }).map((_, i) => (
                <div
                  key={i}
                  className="bg-white rounded-[2rem] border border-slate-100 p-4 shadow-sm animate-pulse"
                >
                  <div className="h-64 bg-slate-100 rounded-3xl mb-4" />
                  <div className="h-6 bg-slate-100 rounded w-3/4 mx-auto mb-2" />
                  <div className="h-4 bg-slate-100 rounded w-1/2 mx-auto" />
                </div>
              ))}
            </div>
          )}

          {/* Error State */}
          {!loading && error && (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mb-4 text-red-500">
                <Loader2 className="w-8 h-8 animate-spin" />
              </div>
              <p className="text-slate-600 text-lg font-medium max-w-md">
                {error}
              </p>
              <button
                onClick={() => window.location.reload()}
                className="mt-6 px-6 py-2 bg-slate-900 text-white rounded-full text-sm font-bold"
              >
                Retry
              </button>
            </div>
          )}

          {/* Team Grid */}
          {!loading && !error && (
            <>
              {team.length === 0 ? (
                <div className="text-center py-20 border-2 border-dashed border-slate-200 rounded-[3rem]">
                  <p className="text-slate-500 text-lg">
                    No leadership profiles available yet.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                  {team.map((member) => (
                    <div
                      key={member._id}
                      className="group relative bg-white rounded-[2.5rem] overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-slate-100"
                    >
                      {/* Image Container */}
                      <div className="h-80 w-full overflow-hidden relative bg-slate-200">
                        <img
                          src={
                            member.imageUrl ||
                            "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80"
                          }
                          alt={member.name}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 filter grayscale group-hover:grayscale-0"
                        />
                        {/* Overlay Gradient */}
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300"></div>

                        {/* Socials (Reveal on Hover) */}
                        <div className="absolute bottom-4 left-0 w-full flex justify-center gap-3 translate-y-10 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 delay-100">
                          {member.socials?.facebook && (
                            <a
                              href={member.socials.facebook}
                              target="_blank"
                              rel="noreferrer"
                              className="p-2 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-blue-600 transition-colors"
                            >
                              <Facebook size={18} />
                            </a>
                          )}
                          {member.socials?.twitter && (
                            <a
                              href={member.socials.twitter}
                              target="_blank"
                              rel="noreferrer"
                              className="p-2 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-sky-500 transition-colors"
                            >
                              <Twitter size={18} />
                            </a>
                          )}
                          {member.socials?.linkedin && (
                            <a
                              href={member.socials.linkedin}
                              target="_blank"
                              rel="noreferrer"
                              className="p-2 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-blue-700 transition-colors"
                            >
                              <Linkedin size={18} />
                            </a>
                          )}
                          {member.socials?.instagram && (
                            <a
                              href={member.socials.instagram}
                              target="_blank"
                              rel="noreferrer"
                              className="p-2 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-pink-600 transition-colors"
                            >
                              <Instagram size={18} />
                            </a>
                          )}
                        </div>
                      </div>

                      {/* Info */}
                      <div className="p-6 text-center relative bg-white">
                        <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-20 h-1 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        <h3 className="text-xl font-bold text-slate-900 mb-1 group-hover:text-purple-600 transition-colors">
                          {member.name}
                        </h3>
                        <p className="text-slate-500 text-sm font-medium uppercase tracking-wider">
                          {member.role}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Bottom Note */}
              {team.length > 0 && (
                <div className="text-center mt-20">
                  <p className="text-slate-400 text-sm font-medium mb-4">
                    More team members, partners, and regional leaders will be
                    added soon.
                  </p>
                  <div className="w-16 h-1 bg-slate-100 mx-auto rounded-full"></div>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </div>
  );
}

export default Profiles;
