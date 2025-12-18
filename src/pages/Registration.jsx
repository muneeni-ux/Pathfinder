// import React, { useState } from "react";
// import { Leaf, Sprout, HeartHandshake, Users } from "lucide-react";

// const SERVER_URL = process.env.REACT_APP_SERVER_URL;

// const Registration = () => {
//   const [activeTab, setActiveTab] = useState("clubs");

//   const tabs = [
//     { id: "clubs", label: "Clubs", icon: <Users size={20} /> },
//     { id: "volunteers", label: "Volunteers", icon: <Sprout size={20} /> },
//     { id: "ambassadors", label: "Ambassadors", icon: <Leaf size={20} /> },
//     { id: "partners", label: "Partners", icon: <HeartHandshake size={20} /> },
//   ];

//   const renderForm = () => {
//     switch (activeTab) {
//       case "clubs":
//         return (
//           <form className="flex flex-col gap-4">
//             <input type="text" placeholder="Club Name" className="input-field" />
//             <input type="text" placeholder="Leader Name" className="input-field" />
//             <input type="email" placeholder="Email" className="input-field" />
//             <input type="text" placeholder="Location/Region" className="input-field" />
//             <button type="submit" className="btn-submit">
//               Register Club
//             </button>
//           </form>
//         );
//       case "volunteers":
//         return (
//           <form className="flex flex-col gap-4">
//             <input type="text" placeholder="Full Name" className="input-field" />
//             <input type="email" placeholder="Email" className="input-field" />
//             <input type="tel" placeholder="Phone Number" className="input-field" />
//             <select className="input-field">
//               <option value="">Select Region</option>
//               <option value="north">North</option>
//               <option value="south">South</option>
//               <option value="east">East</option>
//               <option value="west">West</option>
//             </select>
//             <button type="submit" className="btn-submit">
//               Join as Volunteer
//             </button>
//           </form>
//         );
//       case "ambassadors":
//         return (
//           <form className="flex flex-col gap-4">
//             <input type="text" placeholder="Full Name" className="input-field" />
//             <input type="email" placeholder="Email" className="input-field" />
//             <input type="text" placeholder="Club / Organization" className="input-field" />
//             <button type="submit" className="btn-submit">
//               Become an Ambassador
//             </button>
//           </form>
//         );
//       case "partners":
//         return (
//           <form className="flex flex-col gap-4">
//             <input type="text" placeholder="Organization Name" className="input-field" />
//             <input type="text" placeholder="Contact Person" className="input-field" />
//             <input type="email" placeholder="Email" className="input-field" />
//             <input type="tel" placeholder="Phone" className="input-field" />
//             <button type="submit" className="btn-submit">
//               Partner with Us
//             </button>
//           </form>
//         );
//       default:
//         return null;
//     }
//   };

//   return (
//     <div className="bg-gradient-to-b from-green-50 via-green-100 to-amber-50 min-h-screen mt-[-2rem] px-6 md:px-12 lg:px-20  mb-[-4rem]">
//       {/* Page Header */}
//       <section className="text-center py-12">
//         <h1 className="text-4xl md:text-5xl font-extrabold text-green-900 mb-4">
//           Get Involved 🌱
//         </h1>
//         <p className="text-green-800 max-w-2xl mx-auto">
//           Join the Pathfinder @75 Tree Planting Initiative by registering your club, volunteering, becoming an ambassador, or partnering with us.
//         </p>
//       </section>

//       {/* Tabs */}
//       <div className="flex justify-center gap-4 flex-wrap mb-10">
//         {tabs.map((tab) => (
//           <button
//             key={tab.id}
//             onClick={() => setActiveTab(tab.id)}
//             className={`flex items-center gap-2 px-6 py-2 rounded-full font-semibold transition-all duration-300
//               ${
//                 activeTab === tab.id
//                   ? "bg-amber-400 text-green-950 shadow-lg"
//                   : "bg-white text-green-800 hover:bg-amber-200"
//               }`}
//           >
//             {tab.icon} {tab.label}
//           </button>
//         ))}
//       </div>

//       {/* Form Container */}
//       <div className="max-w-3xl mx-auto bg-white p-8 rounded-2xl shadow-lg border border-green-200">
//         {renderForm()}
//       </div>

//       {/* Tailwind Custom Input & Button Styles */}
//       <style>
//         {`
//           .input-field {
//             padding: 0.75rem 1rem;
//             border-radius: 0.75rem;
//             border: 2px solid #D1FAE5;
//             outline: none;
//             transition: all 0.3s;
//           }
//           .input-field:focus {
//             border-color: #FBBF24;
//             box-shadow: 0 0 0 3px rgba(251, 191, 36, 0.3);
//           }
//           .btn-submit {
//             background-color: #FBBF24;
//             color: #065F46;
//             padding: 0.75rem 1rem;
//             font-weight: 600;
//             border-radius: 0.75rem;
//             transition: all 0.3s;
//           }
//           .btn-submit:hover {
//             background-color: #F59E0B;
//             color: #065F46;
//           }
//         `}
//       </style>
//     </div>
//   );
// };

// export default Registration;

import React, { useState } from "react";
import { Leaf, Sprout, HeartHandshake, Users, Loader2, UploadCloud } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

const Registration = () => {
  const [activeTab, setActiveTab] = useState("clubs");
  const [loading, setLoading] = useState(false);

  // Unified State
  const [formData, setFormData] = useState({
    name: "", leader: "", email: "", phone: "",
    region: "", station: "", members: "", founded: "",
    activities: "", organization: "", contactPerson: "",
  });

  // New State specifically for the file
  const [imageFile, setImageFile] = useState(null);

  const regionsList = [
    "Central Nyanza Conference", "Greater Rift Valley", "Kenya Lake Conference",
    "Ranen Conference", "Western Kenya Conference", "Lake Victoria Field",
    "North Rift Valley Field", "South East Nyanza Field", "South West Nyanza Field",
    "Southern Kenya Lake Field", "West Rift Valley Field", "Central Kenya Conference",
    "Central Rift Valley Conference", "East Nairobi Field", "Kenya Coast Field",
    "North East Kenya Field", "Nyamira Conference", "Nyamira West Field",
    "South East Kenya Field", "South Kenya Conference", "South Nairobi Kajiado Field",
    "South Rift Valley Field"
  ];

  const tabs = [
    { id: "clubs", label: "Clubs", icon: <Users size={20} /> },
    { id: "volunteers", label: "Volunteers", icon: <Sprout size={20} /> },
    { id: "ambassadors", label: "Ambassadors", icon: <Leaf size={20} /> },
    { id: "partners", label: "Partners", icon: <HeartHandshake size={20} /> },
  ];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle File Selection
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB Limit
        toast.error("File size too large (Max 5MB)");
        return;
      }
      setImageFile(file);
    }
  };

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    setFormData({
      name: "", leader: "", email: "", phone: "",
      region: "", station: "", members: "", founded: "",
      activities: "", organization: "", contactPerson: "",
    });
    setImageFile(null); // Reset image
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // 1. Create FormData object
      const data = new FormData();
      
      // 2. Append standard text fields
      data.append("type", activeTab); // Crucial: Send 'type' separately
      Object.keys(formData).forEach((key) => {
        if (formData[key]) data.append(key, formData[key]);
      });

      // 3. Append Image (only if exists)
      if (imageFile) {
        data.append("image", imageFile);
      }

      // 4. Send Request (Do NOT set Content-Type header manually)
      const response = await fetch(`${SERVER_URL}/api/registrations`, {
        method: "POST",
        body: data, 
      });

      const result = await response.json();

      if (!response.ok) throw new Error(result.error || "Something went wrong");

      toast.success(activeTab === "clubs" ? "Club registered successfully!" : "Registration successful!");

      // Reset
      setFormData({
        name: "", leader: "", email: "", phone: "",
        region: "", station: "", members: "", founded: "",
        activities: "", organization: "", contactPerson: "",
      });
      setImageFile(null);

    } catch (error) {
      console.error(error);
      toast.error(error.message || "Failed to register.");
    } finally {
      setLoading(false);
    }
  };

  const renderForm = () => {
    switch (activeTab) {
      case "clubs":
        return (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="grid md:grid-cols-2 gap-4">
              <input name="name" value={formData.name} onChange={handleChange} type="text" placeholder="Club Name" required className="input-field" />
              <input name="leader" value={formData.leader} onChange={handleChange} type="text" placeholder="Leader Name" required className="input-field" />
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <input name="email" value={formData.email} onChange={handleChange} type="email" placeholder="Email" required className="input-field" />
              <input name="phone" value={formData.phone} onChange={handleChange} type="tel" placeholder="Phone" required className="input-field" />
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <select name="region" value={formData.region} onChange={handleChange} required className="input-field bg-white">
                <option value="">Select Region</option>
                {regionsList.map(r => <option key={r} value={r}>{r}</option>)}
              </select>
              <input name="station" value={formData.station} onChange={handleChange} type="text" placeholder="Station" required className="input-field" />
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <input name="members" value={formData.members} onChange={handleChange} type="number" placeholder="Number of Members" required className="input-field" />
              <input name="founded" value={formData.founded} onChange={handleChange} type="number" placeholder="Year Founded" required className="input-field" />
            </div>
            <textarea name="activities" value={formData.activities} onChange={handleChange} placeholder="Club Activities..." className="input-field h-24 resize-none" />
            
            {/* FILE UPLOAD INPUT */}
            <div className="relative border-2 border-dashed border-green-200 rounded-xl p-4 text-center hover:bg-green-50 transition cursor-pointer">
              <input 
                type="file" 
                name="image" 
                accept="image/*"
                onChange={handleFileChange} 
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <div className="flex flex-col items-center justify-center text-green-700">
                <UploadCloud size={32} className="mb-2 text-amber-500" />
                <span className="font-medium text-sm">
                  {imageFile ? imageFile.name : "Click to Upload Club Photo"}
                </span>
              </div>
            </div>

            <button type="submit" disabled={loading} className="btn-submit flex justify-center items-center">
              {loading ? <Loader2 className="animate-spin" /> : "Register Club"}
            </button>
          </form>
        );

      // ... (Keep Volunteers, Ambassadors, Partners exactly as they were in previous code)
      // They don't have file uploads, but the shared handleSubmit will handle them fine 
      // because imageFile will be null.
      
      case "volunteers":
          // ... copy previous volunteer form code ...
           return (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input name="name" value={formData.name} onChange={handleChange} type="text" placeholder="Full Name" required className="input-field" />
            <input name="email" value={formData.email} onChange={handleChange} type="email" placeholder="Email" required className="input-field" />
            <input name="phone" value={formData.phone} onChange={handleChange} type="tel" placeholder="Phone" required className="input-field" />
            <select name="region" value={formData.region} onChange={handleChange} required className="input-field bg-white">
              <option value="">Select Region</option>
              {regionsList.map(r => <option key={r} value={r}>{r}</option>)}
            </select>
            <button type="submit" disabled={loading} className="btn-submit flex justify-center items-center">
              {loading ? <Loader2 className="animate-spin" /> : "Join as Volunteer"}
            </button>
          </form>
        );
      case "ambassadors":
           // ... copy previous ambassador form code ...
           return (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input name="name" value={formData.name} onChange={handleChange} type="text" placeholder="Full Name" required className="input-field" />
            <input name="email" value={formData.email} onChange={handleChange} type="email" placeholder="Email" required className="input-field" />
            <input name="organization" value={formData.organization} onChange={handleChange} type="text" placeholder="Club / Organization" required className="input-field" />
            <button type="submit" disabled={loading} className="btn-submit flex justify-center items-center">
              {loading ? <Loader2 className="animate-spin" /> : "Become an Ambassador"}
            </button>
          </form>
        );
      case "partners":
          // ... copy previous partner form code ...
          return (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input name="organization" value={formData.organization} onChange={handleChange} type="text" placeholder="Organization Name" required className="input-field" />
            <input name="contactPerson" value={formData.contactPerson} onChange={handleChange} type="text" placeholder="Contact Person" required className="input-field" />
            <input name="email" value={formData.email} onChange={handleChange} type="email" placeholder="Email" required className="input-field" />
            <input name="phone" value={formData.phone} onChange={handleChange} type="tel" placeholder="Phone" required className="input-field" />
            <button type="submit" disabled={loading} className="btn-submit flex justify-center items-center">
              {loading ? <Loader2 className="animate-spin" /> : "Partner with Us"}
            </button>
          </form>
        );
      default: return null;
    }
  };

  return (
    // ... Same layout wrapper as before ...
    <div className="bg-gradient-to-b from-green-50 via-green-100 to-amber-50 min-h-screen mt-[-2rem] px-6 md:px-12 lg:px-20 mb-[-4rem]">
      <Toaster position="top-center" />
      <section className="text-center py-12">
        <h1 className="text-4xl md:text-5xl font-extrabold text-green-900 mb-4">Get Involved 🌱</h1>
        <p className="text-green-800 max-w-2xl mx-auto">Join the Pathfinder @75 Tree Planting Initiative.</p>
      </section>
      <div className="flex justify-center gap-4 flex-wrap mb-10">
        {tabs.map(tab => (
          <button key={tab.id} onClick={() => handleTabChange(tab.id)} className={`flex items-center gap-2 px-6 py-2 rounded-full font-semibold transition-all duration-300 ${activeTab === tab.id ? "bg-amber-400 text-green-950 shadow-lg" : "bg-white text-green-800 hover:bg-amber-200"}`}>
            {tab.icon} {tab.label}
          </button>
        ))}
      </div>
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-2xl shadow-lg border border-green-200">
        {renderForm()}
      </div>
       <style>{`
        .input-field { padding: 0.75rem 1rem; border-radius: 0.75rem; border: 2px solid #D1FAE5; outline: none; transition: all 0.3s; width: 100%; }
        .input-field:focus { border-color: #FBBF24; box-shadow: 0 0 0 3px rgba(251, 191, 36, 0.3); }
        .btn-submit { background-color: #FBBF24; color: #065F46; padding: 0.75rem 1rem; font-weight: 600; border-radius: 0.75rem; transition: all 0.3s; width: 100%; }
        .btn-submit:hover:not(:disabled) { background-color: #F59E0B; }
        .btn-submit:disabled { background-color: #FDE68A; cursor: not-allowed; }
      `}</style>
    </div>
  );
};

export default Registration;