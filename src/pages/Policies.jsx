import React from "react";
import { FileText, Download, Shield, Landmark, Users, Lock } from "lucide-react";

// Sample policies data
const policiesData = [
  {
    title: "Environmental Policy",
    description: "Outlines our commitment to sustainable practices and environmental stewardship.",
    link: "#", // Replace with actual file link
    icon: <Landmark size={24} className="text-amber-500" />,
  },
  {
    title: "Child Protection Policy",
    description: "Ensures safety and well-being of children involved in our activities.",
    link: "#",
    icon: <Shield size={24} className="text-amber-500" />,
  },
  {
    title: "Volunteer Guidelines",
    description: "Guidelines and responsibilities for volunteers participating in our programs.",
    link: "#",
    icon: <Users size={24} className="text-amber-500" />,
  },
  {
    title: "Data Privacy Policy",
    description: "How we handle personal data of staff, volunteers, and community members.",
    link: "#",
    icon: <Lock size={24} className="text-amber-500" />,
  },
  {
    title: "Financial Transparency Report",
    description: "Detailed report on our funding, expenditures, and financial accountability.",
    link: "#",
    icon: <FileText size={24} className="text-amber-500" />,
  },
];

const Policies = () => {
  return (
    <div className="bg-green-50 min-h-screen py-16 mt-[-2rem] mb-[-4rem]">
      {/* Section Header */}
      <div className="text-center mb-16 max-w-4xl mx-auto px-6">
        <h1 className="text-4xl md:text-5xl font-extrabold text-green-900 mb-3">
          📜 Official Policies & Documents
        </h1>
        <p className="text-green-700 text-lg md:text-xl">
          We believe in **complete transparency**. Access our official policies, guidelines, and reports to understand our commitments and operations.
        </p>
      </div>

      {/* Policies List (Sleek Horizontal Card Design) */}
      <div className="max-w-4xl mx-auto px-6 space-y-5"> {/* Centralized and uses vertical spacing */}
        {policiesData.map((policy, idx) => (
          <div
            key={idx}
            className="bg-green-50/70 p-5 rounded-xl shadow-lg border-l-4 border-amber-500 transition-all duration-300 hover:shadow-xl hover:bg-green-100/80 group"
          >
            <div className="flex items-start justify-between">
              
              {/* Content Area */}
              <div className="flex items-start gap-4 flex-1 pr-4">
                <div className="mt-1 flex-shrink-0">
                  {policy.icon} {/* Dynamic Icon */}
                </div>
                <div>
                  <h2 className="text-xl font-bold text-green-900 mb-1 leading-tight group-hover:text-amber-600 transition">
                    {policy.title}
                  </h2>
                  <p className="text-green-700 text-sm">{policy.description}</p>
                </div>
              </div>

              {/* Download CTA Button */}
              <a
                href={policy.link}
                className="flex items-center gap-2 text-white bg-amber-500 py-3 px-5 rounded-lg font-semibold hover:bg-amber-600 transition shadow-md flex-shrink-0 transform group-hover:scale-105"
                title={`Download ${policy.title}`}
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