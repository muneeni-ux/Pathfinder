import React, { useState } from "react";
import {
  Leaf,
  Sprout,
  HeartHandshake,
  Users,
  Loader2,
  UploadCloud,
  Heart,
  Sparkles,
  CheckCircle2,
  MapPin,
  School,
  User,
} from "lucide-react";
import {
  success as toastSuccess,
  error as toastError,
} from "../utils/toastHelper";

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

const Registration = () => {
  const [activeTab, setActiveTab] = useState("clubs");
  const [loading, setLoading] = useState(false);

  // Unified State
  const [formData, setFormData] = useState({
    name: "",
    leader: "",
    email: "",
    phone: "",
    region: "",
    station: "",
    members: "",
    founded: "",
    activities: "",
    organization: "",
    contactPerson: "",
  });

  // File state
  const [imageFile, setImageFile] = useState(null);

  const regionsList = [
    "Nairobi",
    "Central",
    "Coast",
    "Eastern",
    "North Eastern",
    "Nyanza",
    "Rift Valley",
    "Western",
  ];
  const tabs = [
    {
      id: "clubs",
      label: "School Clubs",
      icon: <School size={18} />,
      gradient: "from-blue-500 to-indigo-600",
      bg: "bg-blue-50",
      text: "text-blue-600",
    },
    {
      id: "volunteers",
      label: "Volunteers",
      icon: <Sprout size={18} />,
      gradient: "from-green-500 to-emerald-600",
      bg: "bg-green-50",
      text: "text-green-600",
    },
    {
      id: "ambassadors",
      label: "Ambassadors",
      icon: <Leaf size={18} />,
      gradient: "from-pink-500 to-rose-600",
      bg: "bg-pink-50",
      text: "text-pink-600",
    },
    {
      id: "partners",
      label: "Partners",
      icon: <HeartHandshake size={18} />,
      gradient: "from-purple-500 to-violet-600",
      bg: "bg-purple-50",
      text: "text-purple-600",
    },
  ];

  const handleChange = (e) => {
    let { name, value } = e.target;

    // Prevent invalid characters for phone
    if (name === "phone") {
      value = value.replace(/[^0-9+\-\s()]/g, "");
    }

    // Prevent non-digits and limit length for founded year
    if (name === "founded") {
      value = value.replace(/\D/g, "");
      if (value.length > 4) value = value.slice(0, 4);
    }

    setFormData({ ...formData, [name]: value });
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    if (name === "founded" && value) {
      const currentYear = new Date().getFullYear();
      if (parseInt(value, 10) > currentYear) {
        setFormData((prev) => ({ ...prev, founded: currentYear.toString() }));
        toastError(`Year founded cannot be beyond ${currentYear}`);
      }
    }
  };

  // Handle File Selection
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toastError("File size too large (Max 5MB)");
        return;
      }
      setImageFile(file);
    }
  };

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    setFormData({
      name: "",
      leader: "",
      email: "",
      phone: "",
      region: "",
      station: "",
      members: "",
      founded: "",
      activities: "",
      organization: "",
      contactPerson: "",
    });
    setImageFile(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ---------------- VALIDATION ----------------
    if (formData.email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        return toastError("Please enter a valid email address.");
      }
    }

    if (formData.phone) {
      const phoneClean = formData.phone.replace(/[\s\-()]/g, "");
      if (
        phoneClean.length < 10 ||
        phoneClean.length > 15 ||
        !/^\+?[0-9]+$/.test(phoneClean)
      ) {
        return toastError("Please enter a valid phone number (min 10 digits).");
      }
    }

    if (activeTab === "clubs" && formData.founded) {
      const currentYear = new Date().getFullYear();
      if (parseInt(formData.founded, 10) > currentYear) {
        return toastError(
          `Year founded cannot be after the current year (${currentYear}).`,
        );
      }
      if (parseInt(formData.founded, 10) < 1800) {
        return toastError("Please enter a valid year founded.");
      }
    }

    if (activeTab === "clubs" && formData.members) {
      if (parseInt(formData.members, 10) < 1) {
        return toastError("Number of members must be at least 1.");
      }
    }
    // --------------------------------------------

    setLoading(true);

    try {
      const data = new FormData();
      data.append("type", activeTab);
      Object.keys(formData).forEach((key) => {
        if (formData[key]) data.append(key, formData[key]);
      });

      if (imageFile) {
        data.append("image", imageFile);
      }

      const response = await fetch(`${SERVER_URL}/api/registrations`, {
        method: "POST",
        body: data,
      });

      const result = await response.json();

      if (!response.ok) throw new Error(result.error || "Something went wrong");

      toastSuccess(
        activeTab === "clubs"
          ? "School club registered successfully!"
          : "Registration successful!",
      );

      // Reset
      setFormData({
        name: "",
        leader: "",
        email: "",
        phone: "",
        region: "",
        station: "",
        members: "",
        founded: "",
        activities: "",
        organization: "",
        contactPerson: "",
      });
      setImageFile(null);
    } catch (error) {
      console.error(error);
      toastError(error.message || "Failed to register.");
    } finally {
      setLoading(false);
    }
  };

  const getTabInfo = () => {
    switch (activeTab) {
      case "clubs":
        return {
          title: "Register Your School Club",
          description:
            "Join the TVA movement by registering your school's environmental or peace club.",
        };
      case "volunteers":
        return {
          title: "Become a Volunteer",
          description:
            "Support youth programs and environmental initiatives in your community.",
        };
      case "ambassadors":
        return {
          title: "Join as Youth Ambassador",
          description:
            "Lead by example and inspire others to take action for peace and the environment.",
        };
      case "partners":
        return {
          title: "Partner With Us",
          description:
            "Collaborate with TVA to create lasting impact for youth and the environment.",
        };
      default:
        return { title: "", description: "" };
    }
  };

  const currentTabStyle = tabs.find((t) => t.id === activeTab);

  const renderForm = () => {
    switch (activeTab) {
      case "clubs":
        return (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 uppercase tracking-wide">
                  School Club Name <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <School
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                    size={18}
                  />
                  <input
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    type="text"
                    placeholder="e.g., Green Peace Club"
                    required
                    className="w-full pl-12 pr-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 uppercase tracking-wide">
                  Patron / Leader Name <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <User
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                    size={18}
                  />
                  <input
                    name="leader"
                    value={formData.leader}
                    onChange={handleChange}
                    type="text"
                    placeholder="Club leader's name"
                    required
                    className="w-full pl-12 pr-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all"
                  />
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 uppercase tracking-wide">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  type="email"
                  placeholder="club@school.ac.ke"
                  required
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 uppercase tracking-wide">
                  Phone <span className="text-red-500">*</span>
                </label>
                <input
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  type="text"
                  inputMode="tel"
                  maxLength="15"
                  placeholder="+254..."
                  required
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 uppercase tracking-wide">
                  Region <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <MapPin
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                    size={18}
                  />
                  <select
                    name="region"
                    value={formData.region}
                    onChange={handleChange}
                    required
                    className="w-full pl-12 pr-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all appearance-none"
                  >
                    <option value="">Select Region</option>
                    {regionsList.map((r) => (
                      <option key={r} value={r}>
                        {r}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 uppercase tracking-wide">
                  Station / Town <span className="text-red-500">*</span>
                </label>
                <input
                  name="station"
                  value={formData.station}
                  onChange={handleChange}
                  type="text"
                  placeholder="Town/Location"
                  required
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 uppercase tracking-wide">
                  Number of Members <span className="text-red-500">*</span>
                </label>
                <input
                  name="members"
                  value={formData.members}
                  onChange={handleChange}
                  type="number"
                  placeholder="e.g., 25"
                  required
                  min="1"
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 uppercase tracking-wide">
                  Year Founded <span className="text-red-500">*</span>
                </label>
                <input
                  name="founded"
                  value={formData.founded}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  type="text"
                  inputMode="numeric"
                  placeholder="e.g., 2024"
                  required
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 uppercase tracking-wide">
                Club Activities
              </label>
              <textarea
                name="activities"
                value={formData.activities}
                onChange={handleChange}
                placeholder="Describe your club's environmental and peace activities..."
                className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all h-24 resize-none"
              />
            </div>

            {/* FILE UPLOAD */}
            <div className="relative border-2 border-dashed border-slate-200 rounded-2xl p-8 text-center hover:bg-slate-50 hover:border-blue-400 transition-all cursor-pointer group">
              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={handleFileChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
              />
              <div className="flex flex-col items-center justify-center text-slate-500 group-hover:text-blue-500 transition-colors">
                <div
                  className={`w-12 h-12 rounded-full ${imageFile ? "bg-green-100 text-green-600" : "bg-blue-50 text-blue-500"} flex items-center justify-center mb-3`}
                >
                  {imageFile ? <CheckCircle2 /> : <UploadCloud />}
                </div>
                <span className="font-bold text-sm">
                  {imageFile ? imageFile.name : "Click to Upload Club Photo"}
                </span>
                <span className="text-xs mt-1 opacity-70">
                  Max 5MB (Optional)
                </span>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full bg-gradient-to-r ${currentTabStyle.gradient} text-white font-bold py-4 px-6 rounded-xl transition-all shadow-lg hover:shadow-xl hover:-translate-y-1 flex justify-center items-center gap-2`}
            >
              {loading ? (
                <Loader2 className="animate-spin" />
              ) : (
                "Register School Club"
              )}
            </button>
          </form>
        );

      case "volunteers":
        return (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 uppercase tracking-wide">
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                type="text"
                placeholder="Your full name"
                required
                className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-green-500 focus:ring-4 focus:ring-green-500/10 outline-none transition-all"
              />
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 uppercase tracking-wide">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  type="email"
                  placeholder="your@email.com"
                  required
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-green-500 focus:ring-4 focus:ring-green-500/10 outline-none transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 uppercase tracking-wide">
                  Phone <span className="text-red-500">*</span>
                </label>
                <input
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  type="text"
                  inputMode="tel"
                  maxLength="15"
                  placeholder="+254..."
                  required
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-green-500 focus:ring-4 focus:ring-green-500/10 outline-none transition-all"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 uppercase tracking-wide">
                Region <span className="text-red-500">*</span>
              </label>
              <select
                name="region"
                value={formData.region}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-green-500 focus:ring-4 focus:ring-green-500/10 outline-none transition-all appearance-none"
              >
                <option value="">Select your region</option>
                {regionsList.map((r) => (
                  <option key={r} value={r}>
                    {r}
                  </option>
                ))}
              </select>
            </div>
            <button
              type="submit"
              disabled={loading}
              className={`w-full bg-gradient-to-r ${currentTabStyle.gradient} text-white font-bold py-4 px-6 rounded-xl transition-all shadow-lg hover:shadow-xl hover:-translate-y-1 flex justify-center items-center gap-2`}
            >
              {loading ? (
                <Loader2 className="animate-spin" />
              ) : (
                "Join as Volunteer"
              )}
            </button>
          </form>
        );

      case "ambassadors":
        return (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 uppercase tracking-wide">
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                type="text"
                placeholder="Your full name"
                required
                className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-pink-500 focus:ring-4 focus:ring-pink-500/10 outline-none transition-all"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 uppercase tracking-wide">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                name="email"
                value={formData.email}
                onChange={handleChange}
                type="email"
                placeholder="your@email.com"
                required
                className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-pink-500 focus:ring-4 focus:ring-pink-500/10 outline-none transition-all"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 uppercase tracking-wide">
                School / Organization <span className="text-red-500">*</span>
              </label>
              <input
                name="organization"
                value={formData.organization}
                onChange={handleChange}
                type="text"
                placeholder="Your school or organization"
                required
                className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-pink-500 focus:ring-4 focus:ring-pink-500/10 outline-none transition-all"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className={`w-full bg-gradient-to-r ${currentTabStyle.gradient} text-white font-bold py-4 px-6 rounded-xl transition-all shadow-lg hover:shadow-xl hover:-translate-y-1 flex justify-center items-center gap-2`}
            >
              {loading ? (
                <Loader2 className="animate-spin" />
              ) : (
                "Apply as Ambassador"
              )}
            </button>
          </form>
        );

      case "partners":
        return (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 uppercase tracking-wide">
                Organization Name <span className="text-red-500">*</span>
              </label>
              <input
                name="organization"
                value={formData.organization}
                onChange={handleChange}
                type="text"
                placeholder="Your organization"
                required
                className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 outline-none transition-all"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 uppercase tracking-wide">
                Contact Person <span className="text-red-500">*</span>
              </label>
              <input
                name="contactPerson"
                value={formData.contactPerson}
                onChange={handleChange}
                type="text"
                placeholder="Full name of contact person"
                required
                className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 outline-none transition-all"
              />
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 uppercase tracking-wide">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  type="email"
                  placeholder="contact@organization.org"
                  required
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 outline-none transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 uppercase tracking-wide">
                  Phone <span className="text-red-500">*</span>
                </label>
                <input
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  type="text"
                  inputMode="tel"
                  maxLength="15"
                  placeholder="+254..."
                  required
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 outline-none transition-all"
                />
              </div>
            </div>
            <button
              type="submit"
              disabled={loading}
              className={`w-full bg-gradient-to-r ${currentTabStyle.gradient} text-white font-bold py-4 px-6 rounded-xl transition-all shadow-lg hover:shadow-xl hover:-translate-y-1 flex justify-center items-center gap-2`}
            >
              {loading ? (
                <Loader2 className="animate-spin" />
              ) : (
                "Partner with Us"
              )}
            </button>
          </form>
        );

      default:
        return null;
    }
  };

  const tabInfo = getTabInfo();

  return (
    <div className="bg-slate-50 overflow-x-hidden min-h-screen font-sans selection:bg-pink-200">
      {/* 🌟 HERO SECTION */}
      <section className="relative min-h-[50vh] flex items-center justify-center overflow-hidden bg-slate-900 pt-20">
        <div className="absolute inset-0">
          <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-blue-600/20 rounded-full blur-[120px] animate-pulse-slow"></div>
          <div className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] bg-purple-600/20 rounded-full blur-[120px] animate-pulse-slow delay-1000"></div>
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
        </div>

        {/* Floating Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <Sparkles className="absolute top-20 left-10 w-12 h-12 text-white/20 animate-pulse" />
          <Heart className="absolute top-40 right-20 w-16 h-16 text-pink-300/20 animate-float" />
          <Leaf
            className="absolute bottom-20 left-1/4 w-14 h-14 text-green-300/20 animate-float"
            style={{ animationDelay: "1s" }}
          />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center animate-fade-in-up pb-24">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-blue-200 text-xs font-bold uppercase tracking-widest mb-6">
            <Users size={14} /> Join The TVA Community
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-white mb-6 drop-shadow-2xl tracking-tight">
            Take Action <br />{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-pink-500">
              Today
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-300 max-w-2xl mx-auto leading-relaxed font-light">
            Join the movement for peace, environmental action, and youth
            empowerment across Africa.
          </p>
        </div>
      </section>

      {/* 🔘 TABS SECTION */}
      <section className="relative z-20 -mt-8 px-4">
        <div className="max-w-4xl mx-auto bg-white rounded-full shadow-xl p-2 flex flex-wrap justify-center gap-2 border border-slate-100">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => handleTabChange(tab.id)}
              className={`flex items-center gap-2 px-6 py-3 rounded-full font-bold transition-all duration-300 flex-1 sm:flex-none justify-center ${
                activeTab === tab.id
                  ? `bg-slate-900 text-white shadow-lg transform scale-105`
                  : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
              }`}
            >
              {tab.icon} {tab.label}
            </button>
          ))}
        </div>
      </section>

      {/* 📝 FORM SECTION */}
      <section className="py-16 px-6 md:px-12 lg:px-20">
        <div className="max-w-3xl mx-auto">
          {/* Dynamic Header */}
          <div className="text-center mb-10 animate-fade-in-up">
            <span
              className={`inline-block p-4 rounded-2xl mb-4 ${currentTabStyle.bg} ${currentTabStyle.text}`}
            >
              {currentTabStyle.icon}
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4">
              {tabInfo.title}
            </h2>
            <p className="text-lg text-slate-500 max-w-lg mx-auto">
              {tabInfo.description}
            </p>
          </div>

          {/* Form Card */}
          <div className="bg-white p-8 md:p-10 rounded-[2.5rem] shadow-2xl border border-slate-100 relative overflow-hidden">
            {/* Top Decoration Line */}
            <div
              className={`absolute top-0 left-0 w-full h-2 bg-gradient-to-r ${currentTabStyle.gradient}`}
            ></div>

            {renderForm()}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Registration;
