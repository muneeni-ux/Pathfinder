import React, { useState } from "react";
import { Leaf, Sprout, HeartHandshake, Users } from "lucide-react";

const Registration = () => {
  const [activeTab, setActiveTab] = useState("clubs");

  const tabs = [
    { id: "clubs", label: "Clubs", icon: <Users size={20} /> },
    { id: "volunteers", label: "Volunteers", icon: <Sprout size={20} /> },
    { id: "ambassadors", label: "Ambassadors", icon: <Leaf size={20} /> },
    { id: "partners", label: "Partners", icon: <HeartHandshake size={20} /> },
  ];

  const renderForm = () => {
    switch (activeTab) {
      case "clubs":
        return (
          <form className="flex flex-col gap-4">
            <input type="text" placeholder="Club Name" className="input-field" />
            <input type="text" placeholder="Leader Name" className="input-field" />
            <input type="email" placeholder="Email" className="input-field" />
            <input type="text" placeholder="Location/Region" className="input-field" />
            <button type="submit" className="btn-submit">
              Register Club
            </button>
          </form>
        );
      case "volunteers":
        return (
          <form className="flex flex-col gap-4">
            <input type="text" placeholder="Full Name" className="input-field" />
            <input type="email" placeholder="Email" className="input-field" />
            <input type="tel" placeholder="Phone Number" className="input-field" />
            <select className="input-field">
              <option value="">Select Region</option>
              <option value="north">North</option>
              <option value="south">South</option>
              <option value="east">East</option>
              <option value="west">West</option>
            </select>
            <button type="submit" className="btn-submit">
              Join as Volunteer
            </button>
          </form>
        );
      case "ambassadors":
        return (
          <form className="flex flex-col gap-4">
            <input type="text" placeholder="Full Name" className="input-field" />
            <input type="email" placeholder="Email" className="input-field" />
            <input type="text" placeholder="Club / Organization" className="input-field" />
            <button type="submit" className="btn-submit">
              Become an Ambassador
            </button>
          </form>
        );
      case "partners":
        return (
          <form className="flex flex-col gap-4">
            <input type="text" placeholder="Organization Name" className="input-field" />
            <input type="text" placeholder="Contact Person" className="input-field" />
            <input type="email" placeholder="Email" className="input-field" />
            <input type="tel" placeholder="Phone" className="input-field" />
            <button type="submit" className="btn-submit">
              Partner with Us
            </button>
          </form>
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-gradient-to-b from-green-50 via-green-100 to-amber-50 min-h-screen mt-[-2rem] px-6 md:px-12 lg:px-20 py-12">
      {/* Page Header */}
      <section className="text-center py-12">
        <h1 className="text-4xl md:text-5xl font-extrabold text-green-900 mb-4">
          Get Involved 🌱
        </h1>
        <p className="text-green-800 max-w-2xl mx-auto">
          Join the Pathfinder @75 Tree Planting Initiative by registering your club, volunteering, becoming an ambassador, or partnering with us.
        </p>
      </section>

      {/* Tabs */}
      <div className="flex justify-center gap-4 flex-wrap mb-10">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-6 py-2 rounded-full font-semibold transition-all duration-300
              ${
                activeTab === tab.id
                  ? "bg-amber-400 text-green-950 shadow-lg"
                  : "bg-white text-green-800 hover:bg-amber-200"
              }`}
          >
            {tab.icon} {tab.label}
          </button>
        ))}
      </div>

      {/* Form Container */}
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-2xl shadow-lg border border-green-200">
        {renderForm()}
      </div>

      {/* Tailwind Custom Input & Button Styles */}
      <style>
        {`
          .input-field {
            padding: 0.75rem 1rem;
            border-radius: 0.75rem;
            border: 2px solid #D1FAE5;
            outline: none;
            transition: all 0.3s;
          }
          .input-field:focus {
            border-color: #FBBF24;
            box-shadow: 0 0 0 3px rgba(251, 191, 36, 0.3);
          }
          .btn-submit {
            background-color: #FBBF24;
            color: #065F46;
            padding: 0.75rem 1rem;
            font-weight: 600;
            border-radius: 0.75rem;
            transition: all 0.3s;
          }
          .btn-submit:hover {
            background-color: #F59E0B;
            color: #065F46;
          }
        `}
      </style>
    </div>
  );
};

export default Registration;
