import React, { useState, useEffect } from "react";
import { 
  TreePine, 
  ChevronDown, 
  ChevronRight, 
  Crown, 
  MessageCircle, 
  X, 
  Send, 
  Copy, 
  Camera 
} from "lucide-react";
import { toast, Toaster } from "react-hot-toast";

const SERVER_URL = process.env.REACT_APP_SERVER_URL;
const WHATSAPP_NUMBER = "254738380692"; // REPLACE THIS WITH YOUR ACTUAL ADMIN NUMBER

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
  
  // WhatsApp Modal State
  const [showWhatsAppModal, setShowWhatsAppModal] = useState(false);

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
  // WHATSAPP HANDLERS
  // -------------------------------------------------
  const reportTemplate = `*TREE PLANTING REPORT 🌳*
------------------
*Club Name:* [Enter Name]
*Region/Conference:* [Enter Region]
*Station:* [Enter Station]
*Trees Planted:* [Number]
------------------
*Evidence:* (Please attach photos/videos below)`;

  const handleOpenWhatsApp = () => {
    const encodedMessage = encodeURIComponent(reportTemplate);
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
    window.open(whatsappUrl, "_blank");
    setShowWhatsAppModal(false);
  };

  const copyTemplate = () => {
    navigator.clipboard.writeText(reportTemplate);
    toast.success("Template copied to clipboard!");
  };

  // -------------------------------------------------
  // LOADING STATE
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
  // ERROR STATE
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
  // MAIN UI
  // -------------------------------------------------
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 via-green-100 to-amber-50 px-6 md:px-14 lg:px-20 py-12 mt-[-2rem] mb-[-4rem] relative">
      <Toaster position="top-center" />

      {/* HEADER */}
      <section className="text-center mb-14">
        <h1 className="text-4xl md:text-5xl font-extrabold text-green-900 mb-4">
          Tree Planting Tracker 🌳
        </h1>
        <p className="text-green-800 max-w-2xl mx-auto">
          Tracking tree planting progress across Kenya station by station.
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

      {/* ------------------------------------------------------- */}
      {/* FLOATING WHATSAPP BUTTON */}
      {/* ------------------------------------------------------- */}
      <div className="fixed bottom-8 right-6 z-40">
        <button
          onClick={() => setShowWhatsAppModal(true)}
          className="group flex items-center gap-2 bg-[#25D366] hover:bg-[#128C7E] text-white px-4 py-3 rounded-full shadow-2xl transition-all duration-300 transform hover:scale-105 border-4 border-white/30"
        >
          <span className="font-bold hidden md:block">Update Status</span>
          <MessageCircle size={28} className="fill-white text-[#25D366]" />
          
          {/* Notification Dot */}
          <span className="absolute -top-1 -right-1 flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-4 w-4 bg-red-500"></span>
          </span>
        </button>
      </div>

      {/* ------------------------------------------------------- */}
      {/* UPDATE INFO MODAL */}
      {/* ------------------------------------------------------- */}
      {showWhatsAppModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in zoom-in duration-200">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md relative overflow-hidden">
            
            {/* Header */}
            <div className="bg-[#075E54] p-6 text-white">
              <button 
                onClick={() => setShowWhatsAppModal(false)}
                className="absolute top-4 right-4 text-white/80 hover:text-white bg-white/10 rounded-full p-1"
              >
                <X size={20} />
              </button>
              <h3 className="text-xl font-bold flex items-center gap-2">
                <MessageCircle className="fill-white" /> Report Progress
              </h3>
              <p className="text-green-100 text-sm mt-1">
                Send your tree planting updates directly to our admin team via WhatsApp.
              </p>
            </div>

            {/* Body */}
            <div className="p-6">
              <div className="bg-green-50 border border-green-100 rounded-lg p-4 mb-4">
                <h4 className="text-green-800 font-bold mb-2 flex items-center gap-2 text-sm">
                  <Camera size={16} /> Evidence Required
                </h4>
                <p className="text-green-700 text-sm mb-2">
                  Please attach photos or videos of your planting activity along with the text details.
                </p>
              </div>

              <div className="relative">
                <label className="text-xs font-bold text-gray-500 uppercase mb-1 block">Message Preview</label>
                <textarea 
                  readOnly 
                  value={reportTemplate} 
                  className="w-full h-36 bg-gray-50 border border-gray-200 rounded-lg p-3 text-sm text-gray-700 font-mono resize-none focus:outline-none"
                />
                <button 
                  onClick={copyTemplate}
                  className="absolute top-8 right-2 p-1.5 bg-white border border-gray-200 rounded-md text-gray-500 hover:text-green-600 shadow-sm"
                  title="Copy Text"
                >
                  <Copy size={14} />
                </button>
              </div>

              <button 
                onClick={handleOpenWhatsApp}
                className="w-full mt-6 bg-[#25D366] hover:bg-[#128C7E] text-white font-bold py-3.5 rounded-xl shadow-lg flex items-center justify-center gap-2 transition-transform transform hover:-translate-y-1"
              >
                <Send size={18} /> Open WhatsApp
              </button>
              
              <p className="text-center text-xs text-gray-400 mt-3">
                This will open WhatsApp with the pre-filled message.
              </p>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default Tracker;