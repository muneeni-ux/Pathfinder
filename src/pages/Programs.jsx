import React from "react";
import {
  Award,
  Globe,
  TreePine,
  TrendingUp,
  Users,
  Heart,
  Sparkles,
  CheckCircle2,
  ArrowRight,
  Leaf,
  Megaphone,
  Briefcase,
  Zap,
} from "lucide-react";
import { Link } from "react-router-dom";

const Programs = () => {
  const keyPrograms = [
    {
      icon: <Award className="w-10 h-10" />,
      title: "Peace & Environment Awards",
      subtitle: "Excellence Recognition",
      description:
        "A prestige system recognizing schools that excel in environmental conservation and peace initiatives.",
      features: [
        "Regional Quarterly Awards",
        "National Top School Recognition",
        "Awards at Major National Events",
      ],
      gradient: "from-yellow-400 to-orange-500",
      bg: "bg-orange-50",
      border: "border-orange-100",
    },
    {
      icon: <Globe className="w-10 h-10" />,
      title: "Student Exchange Program",
      subtitle: "Global Ambassadors",
      description:
        "Building youth ambassadors for sustainability through cross-cultural learning tours (e.g., Kigali, Rwanda).",
      features: [
        "Top 2 Students Per County",
        "Cross-cultural Environmental Ed.",
        "Leadership Development",
      ],
      gradient: "from-blue-400 to-blue-600",
      bg: "bg-blue-50",
      border: "border-blue-100",
    },
    {
      icon: <TreePine className="w-10 h-10" />,
      title: "School Action Projects",
      subtitle: "Restoration & Impact",
      description:
        "Student-led solutions where schools adopt and restore degraded sites within their communities.",
      features: [
        "Adoption of Degraded Sites",
        "Documented Impact Reports",
        "Community-based Action",
      ],
      gradient: "from-green-400 to-green-600",
      bg: "bg-green-50",
      border: "border-green-100",
    },
    {
      icon: <TrendingUp className="w-10 h-10" />,
      title: "National Showcases",
      subtitle: "Impact Celebration",
      description:
        "A platform for counties to present their environmental impact during World Environment Day.",
      features: [
        "Holiday Award Ceremonies",
        "National Recognition Platform",
        "Knowledge Sharing Network",
      ],
      gradient: "from-pink-400 to-pink-600",
      bg: "bg-pink-50",
      border: "border-pink-100",
    },
  ];

  const signatureCampaigns = [
    {
      title: "Teens for Trees",
      desc: "Our flagship campaign mobilizing youth to plant and nurture trees to reach our 2 Billion goal.",
      icon: <Leaf className="text-white" size={24} />,
      gradient: "from-green-500 to-emerald-600",
    },
    {
      title: "Messenger of Peace",
      desc: "A caravan moving across 47 counties using sports and arts to preach unity and coexistence.",
      icon: <Megaphone className="text-white" size={24} />,
      gradient: "from-pink-500 to-rose-600",
    },
    {
      title: "Teens Trade Fair",
      desc: "An economic empowerment platform teaching youth entrepreneurship and self-reliance.",
      icon: <Briefcase className="text-white" size={24} />,
      gradient: "from-blue-500 to-indigo-600",
    },
  ];

  const greenSchoolsActions = [
    { text: "Tree Planting & Nurturing", icon: <TreePine size={20} /> },
    { text: "School Gardens Maintenance", icon: <Sparkles size={20} /> },
    { text: "Waste Management & Recycling", icon: <Zap size={20} /> },
    { text: "Community Clean-ups", icon: <Users size={20} /> },
  ];

  return (
    <div className="bg-white overflow-x-hidden font-sans">
      {/* 🌟 HERO SECTION (Futuristic, Animated & Themed) */}
      <section className="relative min-h-[75vh] flex items-center justify-center pt-20 overflow-hidden bg-slate-50">
        {/* 🎨 CSS for Custom Floating Animations */}
        <style>{`
    @keyframes float {
      0%, 100% { transform: translateY(0px); }
      50% { transform: translateY(-20px); }
    }
    @keyframes textShimmer {
      0% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
      100% { background-position: 0% 50%; }
    }
    .animate-float-1 { animation: float 6s ease-in-out infinite; }
    .animate-float-2 { animation: float 8s ease-in-out infinite; animation-delay: 1s; }
    .animate-float-3 { animation: float 7s ease-in-out infinite; animation-delay: 2s; }
    .animate-text-shimmer { 
      background-size: 200% auto;
      animation: textShimmer 5s linear infinite;
    }
  `}</style>

        {/* 🌌 Animated Background Layers */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Glowing Orbs */}
          <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-blue-400/20 rounded-full blur-[120px] animate-pulse-slow"></div>
          <div className="absolute bottom-[-10%] left-[-5%] w-[600px] h-[600px] bg-pink-400/20 rounded-full blur-[120px] animate-pulse-slow delay-1000"></div>

          {/* Technical Grid */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>

          {/* ✨ Floating Theme Icons (The "Unique" Touch) */}
          {/* 1. Leaf (Environment) */}
          <div className="absolute top-[15%] left-[10%] md:left-[20%] animate-float-1 opacity-60">
            <div className="w-16 h-16 bg-white rounded-2xl shadow-xl flex items-center justify-center border border-green-100 transform -rotate-12">
              <Leaf
                className="text-green-500 w-8 h-8"
                fill="currentColor"
                fillOpacity={0.2}
              />
            </div>
          </div>

          {/* 2. Heart (Peace) */}
          <div className="absolute bottom-[20%] right-[10%] md:right-[20%] animate-float-2 opacity-60">
            <div className="w-14 h-14 bg-white rounded-full shadow-xl flex items-center justify-center border border-pink-100 transform rotate-12">
              <Heart
                className="text-pink-500 w-6 h-6"
                fill="currentColor"
                fillOpacity={0.2}
              />
            </div>
          </div>

          {/* 3. Zap (Action/Youth) */}
          <div className="absolute top-[20%] right-[15%] hidden md:block animate-float-3 opacity-60">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl shadow-lg flex items-center justify-center transform rotate-6">
              <Zap className="text-white w-6 h-6" />
            </div>
          </div>
        </div>

        {/* 📝 Main Content */}
        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          {/* Glass Badge */}
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/60 backdrop-blur-md border border-slate-200/60 shadow-sm mb-8 animate-fade-in-up hover:scale-105 transition-transform cursor-default">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-gradient-to-r from-blue-500 to-pink-500"></span>
            </span>
            <span className="text-xs font-bold text-slate-600 uppercase tracking-[0.2em]">
              Vision 2030 Strategy
            </span>
          </div>

          {/* Headline with Shimmer Effect */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-slate-900 mb-8 tracking-tighter leading-[0.9] drop-shadow-sm">
            Our Programs & <br />
            <span className="animate-text-shimmer bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-pink-500 to-purple-600">
              Strategic Initiatives
            </span>
          </h1>

          {/* Description */}
          <p className="text-lg md:text-2xl text-slate-600 leading-relaxed max-w-3xl mx-auto font-medium">
            We are implementing bold strategies to create{" "}
            <span className="text-green-600 font-bold bg-green-50 px-2 rounded-md">
              greener schools
            </span>
            , a{" "}
            <span className="text-pink-600 font-bold bg-pink-50 px-2 rounded-md">
              stronger peace culture
            </span>
            , and sustainable{" "}
            <span className="text-blue-600 font-bold bg-blue-50 px-2 rounded-md">
              youth leadership
            </span>
            .
          </p>

          {/* Scroll Indicator */}
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce hidden md:flex flex-col items-center gap-2 opacity-50">
            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
              Scroll to Explore
            </span>
            <div className="w-[1px] h-12 bg-gradient-to-b from-slate-300 to-transparent"></div>
          </div>
        </div>
      </section>

      {/* 🚀 SIGNATURE CAMPAIGNS (Added for Completeness) */}
      <section className="py-12 px-6 relative z-20 -mt-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-6">
            {signatureCampaigns.map((campaign, index) => (
              <div
                key={index}
                className="group bg-white p-6 rounded-3xl shadow-xl border border-slate-100 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
              >
                <div
                  className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${campaign.gradient} flex items-center justify-center shadow-md mb-4 group-hover:scale-110 transition-transform`}
                >
                  {campaign.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">
                  {campaign.title}
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  {campaign.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 💎 KEY PROGRAMS (2026-2030) - Glass Cards */}
      <section className="py-24 px-6 relative bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16 md:flex justify-between items-end">
            <div className="max-w-2xl">
              <h2 className="text-4xl font-extrabold text-slate-900 mb-4">
                Strategic Programs{" "}
                <span className="text-blue-600">(2026-2030)</span>
              </h2>
              <p className="text-lg text-slate-600">
                Four flagship programs designed to drive our mission forward and
                achieve measurable impact.
              </p>
            </div>
            <Link
              to="/contact"
              className="hidden md:flex items-center gap-2 text-pink-600 font-bold hover:text-pink-700 transition-colors"
            >
              Partner with us <ArrowRight size={20} />
            </Link>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {keyPrograms.map((program, index) => (
              <div
                key={index}
                className={`group relative overflow-hidden bg-white p-8 rounded-[2rem] border-2 ${program.border} hover:shadow-2xl transition-all duration-300 hover:-translate-y-1`}
              >
                {/* Hover Gradient Background */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${program.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
                ></div>

                <div className="relative z-10">
                  <div className="flex justify-between items-start mb-6">
                    <div
                      className={`w-16 h-16 ${program.bg} rounded-2xl flex items-center justify-center text-slate-800 group-hover:text-white group-hover:bg-gradient-to-br ${program.gradient} transition-all duration-300 shadow-sm`}
                    >
                      {program.icon}
                    </div>
                    <span className="bg-slate-100 text-slate-500 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">
                      {program.subtitle}
                    </span>
                  </div>

                  <h3 className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors">
                    {program.title}
                  </h3>

                  <p className="text-slate-600 mb-8 leading-relaxed">
                    {program.description}
                  </p>

                  <div className="space-y-3">
                    {program.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-3">
                        <div
                          className={`w-5 h-5 rounded-full flex items-center justify-center bg-slate-100 group-hover:bg-white`}
                        >
                          <CheckCircle2
                            size={12}
                            className="text-slate-400 group-hover:text-green-500"
                          />
                        </div>
                        <span className="text-sm font-medium text-slate-500 group-hover:text-slate-700">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 🌿 GREEN SCHOOLS MOVEMENT (Modern Grid) */}
      <section className="py-24 px-6 bg-slate-900 text-white relative overflow-hidden">
        {/* Background blobs */}
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-green-600/20 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[100px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto relative z-10 grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-bold uppercase mb-6">
              <Leaf size={12} /> Environmental Pillar
            </div>
            <h2 className="text-4xl md:text-5xl font-black mb-6">
              The Green Schools <br />{" "}
              <span className="text-green-400">Movement</span>
            </h2>
            <p className="text-xl text-slate-300 mb-8 leading-relaxed">
              We are empowering schools to become environmental champions. Every
              participating school transforms into a hub of sustainability and
              restoration.
            </p>
            <Link
              to="/get-involved"
              className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-400 text-white font-bold px-8 py-4 rounded-full transition-all shadow-lg hover:shadow-green-500/20"
            >
              Join the Movement <ArrowRight size={20} />
            </Link>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            {greenSchoolsActions.map((item, index) => (
              <div
                key={index}
                className="bg-white/5 border border-white/10 p-6 rounded-2xl hover:bg-white/10 transition-all backdrop-blur-sm group"
              >
                <div className="text-green-400 mb-4 group-hover:scale-110 transition-transform duration-300">
                  {item.icon}
                </div>
                <h4 className="text-lg font-bold">{item.text}</h4>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ❤️ PEACE INITIATIVES (Split Layout) */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <div className="relative order-2 lg:order-1">
            <div className="aspect-square bg-slate-100 rounded-[3rem] overflow-hidden relative">
              <img
                src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=800&q=80"
                alt="Youth Peace"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-pink-900/60 to-transparent"></div>
            </div>
            {/* Floating Badge */}
            <div className="absolute bottom-10 right-[-20px] bg-white p-6 rounded-3xl shadow-xl border border-pink-100 animate-bounce-slow hidden sm:block">
              <div className="flex items-center gap-4">
                <div className="bg-pink-100 p-3 rounded-full text-pink-600">
                  <Heart fill="currentColor" />
                </div>
                <div>
                  <p className="text-2xl font-black text-slate-900">100%</p>
                  <p className="text-xs font-bold text-slate-500 uppercase">
                    Youth Driven
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-50 border border-pink-100 text-pink-600 text-xs font-bold uppercase mb-6">
              <Heart size={12} /> Peace Pillar
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6">
              Peace Through <br />{" "}
              <span className="text-pink-500">Youth Engagement</span>
            </h2>
            <p className="text-lg text-slate-600 mb-8 leading-relaxed">
              We promote peace by engaging youth in meaningful activities that
              build understanding, unity, and conflict resolution skills. Our
              approach uses sports, arts, and dialogue to bridge divides.
            </p>

            <ul className="space-y-4">
              {[
                "Using sports to unite students across communities",
                "Training youth in dialogue and conflict resolution",
                "Encouraging peaceful participation in national moments",
                "Building bridges between diverse ethnic groups",
              ].map((item, i) => (
                <li
                  key={i}
                  className="flex items-start gap-4 p-4 rounded-xl bg-slate-50 border border-slate-100 hover:bg-white hover:shadow-md transition-all"
                >
                  <div className="bg-pink-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                    {i + 1}
                  </div>
                  <span className="text-slate-700 font-medium">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* 🚀 CTA FOOTER */}
      <section className="relative py-24 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900 to-indigo-900"></div>
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-pink-500/20 rounded-full blur-[120px] animate-pulse-slow"></div>

        <div className="relative z-10 max-w-4xl mx-auto text-center text-white">
          <h2 className="text-4xl md:text-6xl font-black mb-6 tracking-tight">
            Be Part of the Solution
          </h2>
          <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto font-light">
            Join us in creating lasting impact through environmental action and
            peacebuilding.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to="/get-involved"
              className="px-10 py-4 bg-white text-blue-900 font-bold rounded-full hover:bg-blue-50 transition-all shadow-xl hover:-translate-y-1"
            >
              Get Involved Today
            </Link>
            <Link
              to="/contact"
              className="px-10 py-4 bg-transparent border border-white/30 text-white font-bold rounded-full hover:bg-white/10 transition-all backdrop-blur-sm"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Programs;
