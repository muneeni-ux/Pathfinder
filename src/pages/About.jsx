import React, { useState, useEffect } from "react";
import {
  Target,
  Eye,
  Users,
  Heart,
  Shield,
  HandshakeIcon,
  Award,
  Globe,
  TreePine,
  Sparkles,
  ArrowRight,
  Zap,
  CheckCircle2,
} from "lucide-react";

const About = () => {
  const [offsetY, setOffsetY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setOffsetY(window.pageYOffset);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const coreValues = [
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Integrity",
      desc: "Upholding honesty and strong moral principles in all our actions.",
    },
    {
      icon: <Target className="w-6 h-6" />,
      title: "Perseverance",
      desc: "Continuing in a course of action despite difficulty or delay in achieving success.",
    },
    {
      icon: <Sparkles className="w-6 h-6" />,
      title: "Openness",
      desc: "Transparency and receptiveness to new ideas and diverse perspectives.",
    },
    {
      icon: <Award className="w-6 h-6" />,
      title: "Fairness",
      desc: "Impartial and just treatment for all without favoritism or discrimination.",
    },
    {
      icon: <Heart className="w-6 h-6" />,
      title: "Respect",
      desc: "Valuing and honoring others, their rights, and their dignity.",
    },
    {
      icon: <HandshakeIcon className="w-6 h-6" />,
      title: "Teamwork",
      desc: "Working collaboratively toward common goals to achieve greater impact.",
    },
  ];

  const objectives = [
    "Provide youth with adequate space for airing their challenges and solutions.",
    "Create employment and catalyze innovation through youth participation.",
    "Promote environmental conservation and climate action.",
    "Build peace and unity across diverse communities.",
    "Develop leadership skills through practical programs.",
  ];

  const impactAreas = [
    {
      icon: <TreePine className="w-10 h-10" />,
      title: "Environmental Action",
      desc: "Tree planting, school gardens, and restoration of degraded sites across Kenya.",
      gradient: "from-green-400 to-green-600",
      bg: "bg-green-50",
    },
    {
      icon: <Heart className="w-10 h-10" />,
      title: "Peacebuilding",
      desc: "Using sports and dialogue to promote peaceful coexistence among communities.",
      gradient: "from-pink-400 to-pink-600",
      bg: "bg-pink-50",
    },
    {
      icon: <Users className="w-10 h-10" />,
      title: "Youth Leadership",
      desc: "Training student leaders through clubs and exchange programs.",
      gradient: "from-blue-400 to-blue-600",
      bg: "bg-blue-50",
    },
    {
      icon: <Globe className="w-10 h-10" />,
      title: "Community Impact",
      desc: "School-based programs creating lasting positive change in society.",
      gradient: "from-purple-400 to-purple-600",
      bg: "bg-purple-50",
    },
  ];

  return (
    <div className="bg-white overflow-x-hidden font-sans">
      {/* 🌟 HERO SECTION (Parallax & Modern) */}
      <section className="relative min-h-[60vh] lg:min-h-[70vh] flex items-center justify-center overflow-hidden pt-20">
        {/* Background Image with Parallax */}
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?auto=format&fit=crop&q=80')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            transform: `translateY(${offsetY * 0.4}px)`,
          }}
        ></div>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/90 via-purple-900/80 to-pink-900/90 z-10 mix-blend-multiply"></div>
        <div className="absolute inset-0 bg-black/30 z-10"></div>

        {/* Content */}
        <div className="relative z-20 max-w-5xl mx-auto px-6 text-center text-white">
          <div className="inline-block mb-4 px-4 py-1.5 rounded-full border border-white/30 bg-white/10 backdrop-blur-md">
            <span className="text-xs font-bold tracking-widest uppercase">
              About Us
            </span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tight leading-tight">
            Empowering the <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-pink-400">
              Next Generation
            </span>
          </h1>
          <p className="text-lg md:text-2xl text-blue-100 leading-relaxed max-w-3xl mx-auto font-light">
            Nurturing a generation of{" "}
            <span className="font-semibold text-white">peaceful</span>,
            <span className="font-semibold text-white"> responsible</span>, and
            <span className="font-semibold text-white">
              {" "}
              environmentally conscious
            </span>{" "}
            leaders.
          </p>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center p-1">
            <div className="w-1 h-2 bg-white rounded-full"></div>
          </div>
        </div>
      </section>

      {/* 🎯 MISSION & VISION (Floating Cards) */}
      <section className="relative py-24 px-6 -mt-20 z-30">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            {/* Mission Card */}
            <div className="group bg-white p-10 rounded-[2.5rem] shadow-xl border border-slate-100 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 relative overflow-hidden">
              {/* Background Decor */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-pink-50 rounded-bl-[10rem] -z-10 group-hover:scale-110 transition-transform duration-500"></div>

              <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-rose-600 rounded-2xl flex items-center justify-center text-white mb-8 shadow-lg group-hover:rotate-6 transition-transform">
                <Target size={32} />
              </div>

              <h2 className="text-3xl font-bold text-slate-900 mb-4">
                Our Mission
              </h2>
              <p className="text-lg text-slate-600 leading-relaxed">
                To empower young people to promote{" "}
                <span className="text-pink-600 font-bold">peace</span>,{" "}
                <span className="text-green-600 font-bold">
                  environmental sustainability
                </span>
                , and{" "}
                <span className="text-purple-600 font-bold">
                  social transformation
                </span>
                .
                <br />
                <br />
                We provide a dynamic platform to address youth challenges
                through{" "}
                <span className="text-slate-900 font-semibold">
                  income-generating projects
                </span>
                , life-skills mentorship, and career seminars, stepping up
                synergy with stakeholders to drive behavioral change.
              </p>
            </div>

            {/* Vision Card */}
            <div className="group bg-white p-10 rounded-[2.5rem] shadow-xl border border-slate-100 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 relative overflow-hidden">
              {/* Background Decor */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50 rounded-bl-[10rem] -z-10 group-hover:scale-110 transition-transform duration-500"></div>

              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center text-white mb-8 shadow-lg group-hover:rotate-6 transition-transform">
                <Eye size={32} />
              </div>

              <h2 className="text-3xl font-bold text-slate-900 mb-4">
                Our Vision
              </h2>
              <p className="text-lg text-slate-600 leading-relaxed">
                A united Africa where young people lead in building{" "}
                <span className="text-blue-600 font-bold">
                  peaceful societies
                </span>{" "}
                and a{" "}
                <span className="text-green-600 font-bold">
                  restored environment
                </span>
                , creating a legacy of resilience and prosperity.
                <br />
                <br />
                We aspire to be the{" "}
                <span className="text-slate-900 font-semibold">
                  premier youth platform
                </span>{" "}
                in Kenya and Africa, ensuring every challenge is heard,
                expressed, and attended to effectively.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 💎 CORE VALUES (Grid Layout) */}
      <section className="py-20 px-6 bg-slate-50 relative overflow-hidden">
        {/* Background Decoration */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-10 left-10 w-72 h-72 bg-blue-200/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-pink-200/20 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900">
              Our Core{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-pink-600">
                Values
              </span>
            </h2>
            <p className="mt-4 text-xl text-slate-600 max-w-2xl mx-auto">
              The guiding principles that define our culture and drive our
              impact.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {coreValues.map((value, index) => (
              <div
                key={index}
                className="group p-8 bg-white rounded-3xl border border-slate-100 hover:border-pink-200 hover:shadow-xl transition-all duration-300"
              >
                <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center text-slate-700 mb-6 group-hover:bg-gradient-to-br group-hover:from-blue-500 group-hover:to-pink-500 group-hover:text-white transition-all duration-300">
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors">
                  {value.title}
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed group-hover:text-slate-700">
                  {value.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 📜 BACKGROUND & OBJECTIVES (Split Layout) */}
      <section className="md:py-24 px-6">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-start">
          {/* Left: Background Story */}
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-bold uppercase tracking-wider">
              <Zap size={12} /> Our Story
            </div>
            <h2 className="text-4xl font-extrabold text-slate-900">
              Building a Legacy of <br />
              <span className="text-blue-600">Change & Resilience</span>
            </h2>
            <div className="prose prose-lg text-slate-600">
              <p>
                <strong className="text-slate-900">
                  Teens Voice Africa (TVA)
                </strong>{" "}
                is a Non-Governmental Organization registered and operating in
                the Republic of Kenya. Our initial program areas include{" "}
                <strong>Kajiado, Muranga, Meru, Nairobi, and Kiambu</strong>{" "}
                with activities planned across all 47 counties.
              </p>

              <p>
                TVA delivers a wide range of specialist services and platforms
                for youth expression. We help teens and young people overcome
                developmental and career challenges, acquire life-skills,
                realize their potential, and foster ideals of patriotism.
              </p>

              <p>
                We understand teens face social, career, family and economic
                challenges that require specialised attention. Beyond providing
                services, TVA innovates by packaging interventions that solve
                both group and individual problems and acts as a bridge between
                youth and society to communicate their concerns.
              </p>

              <p className="border-l-4 border-pink-500 pl-4 italic text-slate-800 bg-slate-50 py-2 rounded-r-lg">
                "Our value proposition is to ensure that every teen leads a
                productive life and is accountable for their actions."
              </p>
            </div>
          </div>

          {/* Right: Objectives List */}
          <div className="bg-slate-900 text-white p-10 rounded-[2.5rem] shadow-2xl relative overflow-hidden">
            {/* Decor */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-600 to-pink-600 opacity-20 blur-3xl rounded-full"></div>

            <h3 className="text-2xl font-bold mb-8 relative z-10">
              Strategic Objectives
            </h3>
            <ul className="space-y-6 relative z-10">
              {objectives.map((obj, idx) => (
                <li key={idx} className="flex gap-4 items-start group">
                  <div className="mt-1 flex-shrink-0 w-6 h-6 rounded-full bg-blue-600/30 flex items-center justify-center border border-blue-500/50 group-hover:bg-pink-600/30 group-hover:border-pink-500/50 transition-colors">
                    <CheckCircle2
                      size={14}
                      className="text-blue-300 group-hover:text-pink-300"
                    />
                  </div>
                  <p className="text-slate-300 text-sm leading-relaxed group-hover:text-white transition-colors">
                    {obj}
                  </p>
                </li>
              ))}
            </ul>

            <div className="mt-10 pt-8 border-t border-white/10">
              <p className="text-xs text-slate-400 uppercase tracking-widest font-bold">
                Target Impact
              </p>
              <div className="flex items-center gap-2 mt-2">
                <span className="text-3xl font-black text-white">100k+</span>
                <span className="text-sm text-slate-400">
                  Youths Empowered by 2030
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 🌟 IMPACT AREAS (Modern Cards) */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-extrabold text-slate-900">
              Where We Make an Impact
            </h2>
            <p className="text-slate-500 mt-4">
              Driving change through four key pillars
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {impactAreas.map((area, index) => (
              <div
                key={index}
                className="group relative bg-white border border-slate-100 rounded-3xl p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 text-center overflow-hidden"
              >
                <div
                  className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${area.gradient}`}
                ></div>

                <div
                  className={`mx-auto w-20 h-20 ${area.bg} rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
                >
                  <div className="text-slate-700 group-hover:text-slate-900 transition-colors">
                    {area.icon}
                  </div>
                </div>

                <h3 className="text-lg font-bold text-slate-900 mb-2">
                  {area.title}
                </h3>
                <p className="text-sm text-slate-500 leading-relaxed">
                  {area.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 📚 BACKGROUND, PARTNERS & PROGRAMS (Detailed) */}
      <section className="py-8 px-6 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-extrabold text-slate-900">
              Background, Partners & Programs
            </h2>
            <p className="text-slate-500 mt-3 max-w-2xl mx-auto">
              Context, implementing partners, flagship programs and the project
              summary that guide TVA's work.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <div className="prose prose-lg text-slate-700 bg-white p-6 rounded-2xl border border-slate-100">
                <h3>Background</h3>
                <p>
                  The COVID-19 pandemic magnified existing gaps in youth
                  engagement. Schools and institutions were disrupted, leaving
                  many teenagers with idle time and fewer constructive
                  opportunities. TVA addresses this challenge by creating
                  productive, skills-based engagement for teens — helping them
                  develop commitment, responsibility and practical skills.
                </p>
                <p>
                  Teenagers make up a significant portion of the population and
                  represent untapped potential. TVA's programs are designed to
                  channel this energy into community restoration, environmental
                  action, peacebuilding and economic empowerment. Activities are
                  intended to run through 2030 and may be extended or adapted
                  depending on impact and partnerships.
                </p>

                <h4>Implementing Entity & Key Partners</h4>
                <p>
                  TVA partners with established youth and community
                  organisations to deliver programs across all 47 counties. Key
                  partners include school clubs, church youth groups, scouting
                  organisations and established humanitarian partners such as
                  Kenya Red Cross and St John Ambulance. We also collaborate
                  with county governments, education institutions and community
                  leaders.
                </p>
                <ul>
                  <li>Pathfinders & Ambassadors (Seventh Day Adventist)</li>
                  <li>Boys/Girls Brigades (Methodist & other denominations)</li>
                  <li>Kenya Scout Clubs</li>
                  <li>Kenya Red Cross & St John Ambulance</li>
                  <li>Local school clubs, NGOs and county administrations</li>
                </ul>

                <h4 className="mt-4">Flagship Programs</h4>
                <p>
                  TVA runs multiple interlinked programs focused on environment,
                  peace, livelihoods and youth leadership.
                </p>
                <ol className="list-decimal list-inside">
                  <li>Growing Trees – Seedbed for Schools</li>
                  <li>Teens For Trees (Tree planting & nurturing)</li>
                  <li>Kenya Environmentalist County Award</li>
                  <li>First Lady Sport Academy</li>
                  <li>Heart Touching Heart (Humanity activities)</li>
                  <li>1000 Hours Volunteer</li>
                  <li>Messenger of Hope / Peace Caravan</li>
                  <li>Teens Resource Centre & Trade Fair</li>
                </ol>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-slate-100 prose text-slate-700">
                <h4>Events & Timelines</h4>
                <p>
                  TVA runs recurring campaigns tied to the annual calendar. For
                  example, <strong>Heart Touching Heart Month</strong>{" "}
                  (March–May) mobilises donations and community support; the{" "}
                  <strong>Messenger of Hope Caravan</strong> is a
                  county-by-county tour designed to raise awareness, promote
                  unity and advocate for constructive youth engagement.
                </p>
                <p>
                  Programs are planned with county-level coordination and are
                  typically rolled out in phases so that engagement and
                  monitoring can be sustained over time.
                </p>
              </div>
            </div>

            <aside className="space-y-6">
              <div className="bg-white p-6 rounded-2xl border border-slate-100">
                <h4 className="text-slate-900 font-bold">Project Summary</h4>
                <p className="text-slate-600">
                  Expected outcomes and indicators that guide TVA's monitoring
                  framework.
                </p>
                <ul className="mt-3 text-slate-600 list-disc list-inside">
                  <li>Increased teen engagement across counties</li>
                  <li>Higher reforestation rates through tree-planting</li>
                  <li>Greater community responsibility and social cohesion</li>
                </ul>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-slate-100">
                <h4 className="text-slate-900 font-bold">
                  Monitoring & Evaluation
                </h4>
                <p className="text-slate-600">
                  Continuous supervision by designated personnel (head teachers,
                  parents, community role models) will track participation,
                  trees planted, and volunteer hours. Outstanding performance
                  will be recognised through awards and public acknowledgement.
                </p>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-slate-100">
                <h4 className="text-slate-900 font-bold">How to Partner</h4>
                <p className="text-slate-600">
                  We welcome organisations, county governments and donors to
                  join TVA. Partnerships can support tree nurseries, volunteer
                  mobilisation, awards, training and logistics for county-level
                  campaigns.
                </p>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* 🚀 CTA SECTION */}
      <section className="relative py-24 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900 to-slate-900"></div>
        {/* Animated Shapes */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-pink-600/10 rounded-full blur-[100px] animate-pulse-slow"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[100px] animate-pulse-slow delay-1000"></div>

        <div className="relative z-10 max-w-4xl mx-auto text-center text-white">
          <h2 className="text-4xl md:text-6xl font-black mb-6 tracking-tight">
            Ready to Join the Movement?
          </h2>
          <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
            Whether you're a student, professional, or partner organization,
            there is a place for you at Teens Voice Africa.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a
              href="/get-involved"
              className="px-8 py-4 bg-white text-blue-900 font-bold rounded-full hover:bg-blue-50 transition-all shadow-lg hover:shadow-white/20 hover:-translate-y-1 flex items-center justify-center gap-2"
            >
              Get Involved <ArrowRight size={20} />
            </a>
            <a
              href="/programs"
              className="px-8 py-4 bg-transparent border border-white/30 text-white font-bold rounded-full hover:bg-white/10 transition-all backdrop-blur-sm"
            >
              View Programs
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
