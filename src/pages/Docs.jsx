import React from "react";
import { FileText, Download} from "lucide-react";

// Sample documents data
const documents = [
  {
    title: "Environmental Policy",
    type: "Policy",
    link: "#",
  },
  {
    title: "Volunteer Guidelines",
    type: "Guideline",
    link: "#",
  },
  {
    title: "Annual Report 2025",
    type: "Report",
    link: "#",
  },
  {
    title: "Training Manual",
    type: "Manual",
    link: "#",
  },
  {
    title: "Project Proposal Template",
    type: "Proposal",
    link: "#",
  },
  {
    title: "Certificate Template",
    type: "Certificate",
    link: "#",
  },
];

const Docs = () => {
  return (
    <div className="bg-green-50 min-h-screen py-16 mt-[-2rem] mb-[-4rem]">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold text-green-900 mb-2">
          Document Center
        </h1>
        <p className="text-green-700 text-lg md:text-xl">
          Access all our official documents, policies, reports, and certificates 🌿
        </p>
      </div>

      {/* Documents Grid */}
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {documents.map((doc, idx) => (
          <div
            key={idx}
            className="bg-white rounded-xl shadow-lg overflow-hidden transition-transform transform hover:scale-105"
          >
            {/* Icon / Thumbnail */}
            <div className="flex items-center justify-center h-40 bg-green-100">
              <FileText className="w-12 h-12 text-amber-500" />
            </div>

            {/* Content */}
            <div className="p-6 flex flex-col justify-between h-full">
              <div>
                <h2 className="text-xl font-bold text-green-900 mb-1">{doc.title}</h2>
                <p className="text-green-700 text-sm mb-4">{doc.type}</p>
              </div>
              <a
                href={doc.link}
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

export default Docs;
