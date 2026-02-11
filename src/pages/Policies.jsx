import React from "react";
import {
  FileText,
  Download,
  Shield,
  Landmark,
  Users,
  Lock,
  Scale,
  Eye,
  ChevronRight,
} from "lucide-react";

const policiesData = [
  {
    title: "Environmental Sustainability Policy",
    description:
      "Our commitment to sustainable practices, climate action, and environmental stewardship in all youth programs.",
    link: "#",
    icon: <Landmark size={28} className="text-white" />,
    gradient: "from-green-400 to-emerald-600",
    bg: "bg-green-50",
    border: "border-green-100",
  },
  {
    title: "Youth Protection & Safeguarding",
    description:
      "Ensuring safety, well-being, and protection of all young people involved in TVA activities and programs.",
    link: "#",
    icon: <Shield size={28} className="text-white" />,
    gradient: "from-blue-400 to-indigo-600",
    bg: "bg-blue-50",
    border: "border-blue-100",
  },
  {
    title: "Volunteer Code of Conduct",
    description:
      "Guidelines, responsibilities, and ethical standards for volunteers participating in our programs.",
    link: "#",
    icon: <Users size={28} className="text-white" />,
    gradient: "from-purple-400 to-violet-600",
    bg: "bg-purple-50",
    border: "border-purple-100",
  },
  {
    title: "Data Privacy & Protection",
    description:
      "How we handle, protect, and manage personal data of youth, volunteers, staff, and community members.",
    link: "#",
    icon: <Lock size={28} className="text-white" />,
    gradient: "from-pink-400 to-rose-600",
    bg: "bg-pink-50",
    border: "border-pink-100",
  },
  {
    title: "Financial Transparency Report",
    description:
      "Detailed report on our funding, expenditures, financial accountability, and resource allocation.",
    link: "#",
    icon: <FileText size={28} className="text-white" />,
    gradient: "from-yellow-400 to-amber-600",
    bg: "bg-yellow-50",
    border: "border-yellow-100",
  },
  {
    title: "Diversity, Equity & Inclusion",
    description:
      "Our commitment to creating an inclusive environment that celebrates diversity and promotes equity for all.",
    link: "#",
    icon: <Eye size={28} className="text-white" />,
    gradient: "from-teal-400 to-cyan-600",
    bg: "bg-teal-50",
    border: "border-teal-100",
  },
  {
    title: "Code of Ethics & Integrity",
    description:
      "Ethical principles and integrity standards guiding all TVA operations, partnerships, and programs.",
    link: "#",
    icon: <Scale size={28} className="text-white" />,
    gradient: "from-indigo-400 to-blue-600",
    bg: "bg-indigo-50",
    border: "border-indigo-100",
  },
];

const Policies = () => {
  return (
    <div className="bg-slate-50 overflow-x-hidden min-h-screen font-sans selection:bg-pink-200">
      {/* 🌟 HERO SECTION (Unique & Themed) */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden bg-slate-900 pt-20">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-blue-600/20 rounded-full blur-[100px] animate-pulse-slow"></div>
          <div className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] bg-pink-600/20 rounded-full blur-[100px] animate-pulse-slow delay-1000"></div>
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
        </div>

        {/* Floating Icons */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-[15%] animate-float">
            <div className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/20 rotate-12">
              <Shield className="text-blue-300 w-8 h-8" />
            </div>
          </div>
          <div
            className="absolute bottom-32 right-[15%] animate-float"
            style={{ animationDelay: "1.5s" }}
          >
            <div className="w-20 h-20 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20 -rotate-12">
              <Scale className="text-pink-300 w-10 h-10" />
            </div>
          </div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center animate-fade-in-up pb-24">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-blue-200 text-xs font-bold uppercase tracking-widest mb-6">
            <FileText size={14} /> Official Documentation
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-white mb-6 drop-shadow-2xl tracking-tight leading-tight">
            Policies &{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-pink-500">
              Governance
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-300 max-w-2xl mx-auto leading-relaxed font-light">
            We believe in complete transparency. Access our official operational
            frameworks, ethical guidelines, and reports.
          </p>
        </div>
      </section>

      {/* 📄 POLICIES GRID */}
      <section className="py-20 px-6 md:px-12 bg-white relative z-20 -mt-20 rounded-t-[3rem]">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-6 pt-10">
            {policiesData.map((policy, idx) => (
              <div
                key={idx}
                className={`group relative bg-white p-8 rounded-[2rem] border transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 overflow-hidden ${policy.border}`}
              >
                {/* Hover Gradient Overlay */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${policy.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
                ></div>

                <div className="relative z-10 flex flex-col h-full">
                  <div className="flex items-start justify-between mb-6">
                    <div
                      className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${policy.gradient} flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform duration-300`}
                    >
                      {policy.icon}
                    </div>
                    {policy.link && policy.link !== "#" ? (
                      <a
                        href={policy.link}
                        className="p-3 rounded-full bg-slate-50 hover:bg-slate-900 hover:text-white text-slate-400 transition-all duration-300 group/download"
                        title="Download PDF"
                      >
                        <Download
                          size={20}
                          className="group-hover/download:animate-bounce"
                        />
                      </a>
                    ) : (
                      <button
                        type="button"
                        className="p-3 rounded-full bg-slate-50 text-slate-400 transition-all duration-300"
                        title="No document"
                      >
                        <Download size={20} />
                      </button>
                    )}
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-pink-600 transition-all">
                    {policy.title}
                  </h3>

                  <p className="text-slate-500 leading-relaxed mb-8 flex-grow font-medium">
                    {policy.description}
                  </p>

                  {policy.link && policy.link !== "#" ? (
                    <a
                      href={policy.link}
                      className={`inline-flex items-center gap-2 text-sm font-bold bg-clip-text text-transparent bg-gradient-to-r ${policy.gradient} group-hover:gap-3 transition-all`}
                    >
                      View Document <ChevronRight size={16} />
                    </a>
                  ) : (
                    <button
                      type="button"
                      className={`inline-flex items-center gap-2 text-sm font-bold ${policy.gradient}`}
                    >
                      View Document
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* 📞 CONTACT CTA */}
          <div className="mt-20 bg-slate-900 rounded-[3rem] p-12 md:p-16 text-center relative overflow-hidden shadow-2xl group">
            {/* Decor */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/20 rounded-full blur-[80px] group-hover:bg-blue-600/30 transition-colors duration-500"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-pink-600/20 rounded-full blur-[80px] group-hover:bg-pink-600/30 transition-colors duration-500"></div>

            <div className="relative z-10 max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-black text-white mb-6 tracking-tight">
                Questions about our policies?
              </h2>
              <p className="text-slate-400 mb-10 text-lg leading-relaxed">
                We are committed to accountability. If you have any inquiries
                regarding our governance, compliance, or ethical standards, our
                dedicated team is here to assist you.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <a
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-slate-900 font-bold rounded-full hover:bg-blue-50 transition-all shadow-lg hover:shadow-white/20 hover:-translate-y-1"
                >
                  Contact Compliance Team
                </a>
                <button
                  type="button"
                  onClick={() => {
                    // Placeholder for opening reports or initiating download
                    // If you have a reports URL, replace this with: window.open(reportsUrl, '_blank')
                    alert("Annual reports will be available soon.");
                  }}
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-transparent border border-slate-700 text-white font-bold rounded-full hover:bg-slate-800 transition-all hover:-translate-y-1"
                >
                  View Annual Reports
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Policies;
