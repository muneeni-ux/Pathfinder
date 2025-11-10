import React from "react";
import { FileText, Download } from "lucide-react";

// Sample policies data
const policiesData = [
  {
    title: "Environmental Policy",
    description: "Outlines our commitment to sustainable practices and environmental stewardship.",
    link: "#", // Replace with actual file link
  },
  {
    title: "Child Protection Policy",
    description: "Ensures safety and well-being of children involved in our activities.",
    link: "#",
  },
  {
    title: "Volunteer Guidelines",
    description: "Guidelines and responsibilities for volunteers participating in our programs.",
    link: "#",
  },
  {
    title: "Data Privacy Policy",
    description: "How we handle personal data of staff, volunteers, and community members.",
    link: "#",
  },
];

const Policies = () => {
  return (
    <div className="bg-green-50 min-h-screen py-16 mt-[-2rem] mb-[-4rem]">
      {/* Section Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold text-green-900 mb-2">
          Policies & Documents
        </h1>
        <p className="text-green-700 text-lg md:text-xl">
          Browse our official documents, policies, and guidelines for transparency 🌿
        </p>
      </div>

      {/* Policies Grid */}
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {policiesData.map((policy, idx) => (
          <div
            key={idx}
            className="bg-white rounded-xl shadow-lg overflow-hidden transition-transform transform hover:scale-105"
          >
            <div className="flex items-center justify-center h-40 bg-green-100">
              <FileText className="w-12 h-12 text-amber-500" />
            </div>
            <div className="p-6 flex flex-col justify-between h-full">
              <div>
                <h2 className="text-2xl font-bold text-green-900 mb-2">{policy.title}</h2>
                <p className="text-green-700 mb-4">{policy.description}</p>
              </div>
              <a
                href={policy.link}
                className="inline-flex items-center gap-2 text-amber-500 font-semibold hover:text-amber-400 transition"
              >
                <Download size={18} />
                Download
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Policies;
