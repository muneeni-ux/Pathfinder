import React from "react";
import { Facebook, Instagram, Youtube, MessageCircle, FileText, Image, Newspaper, UserPen, FileHeart, Club } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  const year = new Date().getFullYear();

  const quickLinks = [
    { to: "/news-updates", label: "News & Updates", icon: <Newspaper size={18} /> },
    {to: "/testimonials", label: "Testimonials", icon: <FileHeart size={18} />},
    { to: "/media", label: "Media & Gallery", icon: <Image size={18} /> },
    { to: "/document-center", label: "Document Center", icon: <FileText size={18} /> },
    { to: "/clubs", label: "Regional Clubs", icon: <Club size={18} /> },
    { to: "/policies", label: "Policies", icon: <FileText size={18} /> },
    { to: "/profiles", label: "Team Profiles", icon: <UserPen size={18} /> },
  ];

  const socialLinks = [
    { href: "https://facebook.com", icon: <Facebook size={20} />, label: "Facebook" },
    { href: "https://instagram.com", icon: <Instagram size={20} />, label: "Instagram" },
    { href: "https://youtube.com", icon: <Youtube size={20} />, label: "YouTube" },
    { href: "https://wa.me/123456789", icon: <MessageCircle size={20} />, label: "WhatsApp" },
  ];

  // Sample thumbnails for Gallery and Document Center
  const galleryThumbs = [
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmRtodFo1eW8Q1HOdbaTDMS1p3AjN0tsGqQA&s ",
    "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=800&q=60",
    "https://img.freepik.com/free-vector/nature-landscape-beautiful-tree-background_1035-27115.jpg?semt=ais_hybrid&w=740&q=80",
  ];

  const documentsThumbs = [
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSbGRSzm-q0usCpOR9Zag0vmrdC1oqq51Z65g&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSbGRSzm-q0usCpOR9Zag0vmrdC1oqq51Z65g&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSbGRSzm-q0usCpOR9Zag0vmrdC1oqq51Z65g&s",
  ];

  return (
    <footer className="bg-green-950 text-amber-200 border-t border-amber-800/30 mt-12">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Branding */}
        <div className="flex flex-col gap-2 text-center md:text-left">
          <h2 className="text-2xl font-bold text-amber-400">Pathfinders @75</h2>
          <p className="text-sm md:text-base">
            Growing Faith, Stewardship & Trees 🌍
          </p>
        </div>

        {/* Quick Links */}
        <div className="flex flex-col gap-3 text-center md:text-left">
          <h3 className="text-lg font-semibold text-amber-300 mb-2">Quick Links</h3>
          {quickLinks.map(({ to, label, icon }) => (
            <Link
              key={to}
              to={to}
              className="flex items-center gap-2 hover:text-amber-400 transition-colors text-sm md:text-base"
            >
              <span className="text-amber-400">{icon}</span>
              {label}
            </Link>
          ))}
        </div>

        {/* Gallery Thumbnails */}
        <div className="flex flex-col gap-3 text-center md:text-left">
          <h3 className="text-lg font-semibold text-amber-300 mb-2">Gallery Preview</h3>
          <div className="flex gap-2">
            {galleryThumbs.map((src, idx) => (
              <img
                key={idx}
                src={src}
                alt={`Gallery ${idx + 1}`}
                className="w-12 h-12 object-cover rounded-md shadow-sm hover:scale-105 transition-transform"
              />
            ))}
          </div>
        </div>

        {/* Document Center Thumbnails */}
        <div className="flex flex-col gap-3 text-center md:text-left">
          <h3 className="text-lg font-semibold text-amber-300 mb-2">Documents Preview</h3>
          <div className="flex gap-2">
            {documentsThumbs.map((src, idx) => (
              <img
                key={idx}
                src={src}
                alt={`Document ${idx + 1}`}
                className="w-12 h-12 object-cover rounded-md shadow-sm hover:scale-105 transition-transform"
              />
            ))}
          </div>
        </div>
      </div>

      {/* Social Media */}
      <div className="flex justify-center md:justify-end gap-6 px-6 pb-6">
        {socialLinks.map(({ href, icon, label }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-amber-400 transition-colors"
            aria-label={label}
          >
            {icon}
          </a>
        ))}
      </div>

      {/* Bottom Copyright */}
      <div className="bg-green-900/70 py-4 text-center text-sm border-t border-amber-800/20">
        <p>© {year} Pathfinders @75. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
