import React from "react";
import { Link } from "react-router-dom";
import { Sprout, TreePine, HeartHandshake, Leaf } from "lucide-react";

const Home = () => {
  return (
    <div className="bg-white text-green-900 overflow-x-hidden mt-[-2rem] mb-[-4rem]">
      {/* 🌿 Hero Section */}
      <section className="relative h-[75vh] flex items-center justify-center text-center bg-green-100 rounded-b-3xl">
        <img
          src="https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=1500&q=80"
          alt="Forest"
          className="absolute inset-0 w-full h-full object-cover opacity-25"
        />
        <div className="relative z-10 max-w-3xl px-4">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-4 text-green-900 drop-shadow-md">
            Pathfinders @75 Tree Planting Initiative 🌳
          </h1>
          <p className="text-lg md:text-xl text-green-800 mb-8">
            Celebrating 75 years of service, faith, and stewardship by growing
            a greener future for generations to come. Planting trees, planting
            hope (2025-2030).
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/get-involved"
              className="bg-amber-400 hover:bg-amber-500 text-green-950 font-semibold px-6 py-3 rounded-full transition-all"
            >
              Get Involved
            </Link>
            <Link
              to="/tracker"
              className="border-2 border-amber-400 text-amber-600 hover:bg-amber-400 hover:text-green-950 font-semibold px-6 py-3 rounded-full transition-all"
            >
              Track Progress
            </Link>
          </div>
        </div>
      </section>

      {/* 🌍 Vision & Mission */}
      <section className="py-16 px-6 md:px-12 lg:px-20 text-center bg-white">
        <h2 className="text-3xl md:text-4xl font-bold text-green-900 mb-8">
          Our Vision & Mission
        </h2>
        <div className="grid md:grid-cols-2 gap-10 max-w-6xl mx-auto">
          <div className="bg-green-50 p-8 rounded-2xl shadow-md border border-green-200">
            <h3 className="text-2xl font-semibold mb-4 flex items-center justify-center gap-2 text-green-900">
              <Leaf className="text-amber-400" /> Vision
            </h3>
            <p className="text-green-800 leading-relaxed">
              To inspire a generation of young people committed to caring for
              creation, preserving nature, and living sustainably in harmony
              with God’s world.
            </p>
          </div>
          <div className="bg-green-50 p-8 rounded-2xl shadow-md border border-green-200">
            <h3 className="text-2xl font-semibold mb-4 flex items-center justify-center gap-2 text-green-900">
              <Sprout className="text-amber-400" /> Mission
            </h3>
            <p className="text-green-800 leading-relaxed">
              To plant millions of trees across conferences, clubs, and
              communities—symbolizing faith, unity, and our commitment to a
              sustainable planet.
            </p>
          </div>
        </div>
      </section>

      {/* 🌱 Pathfinder @75 Overview */}
      <section className="py-20 px-6 md:px-12 lg:px-20 text-center bg-green-50">
        <h2 className="text-3xl md:text-4xl font-bold text-green-900 mb-6">
          Pathfinder @75 Overview
        </h2>
        <p className="max-w-4xl mx-auto text-green-800 mb-10 leading-relaxed">
          As the Pathfinder movement celebrates 75 years of empowering young
          leaders, this environmental initiative marks a historic milestone.
          Each planted tree represents service, growth, and hope—echoing our
          heritage of faith in action.
        </p>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[
            {
              icon: <TreePine size={36} />,
              title: "Planting Goals",
              desc: "Millions of trees planted across all regions by 2025.",
            },
            {
              icon: <HeartHandshake size={36} />,
              title: "Community Involvement",
              desc: "Engaging clubs, churches, and volunteers in joint efforts.",
            },
            {
              icon: <Sprout size={36} />,
              title: "Sustainable Future",
              desc: "Training young people in stewardship and eco-leadership.",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="bg-white p-8 rounded-2xl border border-amber-200 shadow hover:shadow-lg transition-all"
            >
              <div className="flex justify-center text-amber-400 mb-4">
                {item.icon}
              </div>
              <h4 className="text-xl font-semibold mb-2 text-green-900">
                {item.title}
              </h4>
              <p className="text-green-800">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 🌳 Get Involved CTA */}
      <section className="relative py-24 text-center bg-green-100">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1500&q=80')] bg-cover bg-center opacity-10"></div>
        <div className="relative z-10 max-w-3xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-green-900 mb-4">
            Join the Movement 🌱
          </h2>
          <p className="text-green-800 mb-8">
            Be part of the green legacy — register your club, volunteer, or
            become a partner today.
          </p>
          <Link
            to="/get-involved"
            className="bg-amber-400 hover:bg-amber-500 text-green-950 font-semibold px-8 py-4 rounded-full transition-all text-lg"
          >
            Register Now
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
