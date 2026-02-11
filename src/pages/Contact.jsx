import React, { useState } from "react";
import { Phone, Mail, MapPin, Send, Globe } from "lucide-react";
import {
  FaWhatsapp,
  FaFacebookF,
  FaTwitter,
  FaInstagram,
} from "react-icons/fa";
import toast from "react-hot-toast";
import {
  success as toastSuccess,
  error as toastError,
} from "../utils/toastHelper";

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, email, message } = formData;

    if (!name || !email || !message) {
      toast.error("Please fill in all required fields.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(`${SERVER_URL}/api/contact/send-mail`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Failed to send message.");

      toastSuccess(
        `Thank you ${name}! Your message has been sent successfully.`,
      );
      setFormData({ name: "", email: "", message: "" });
    } catch (err) {
      toastError(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 overflow-x-hidden font-sans selection:bg-pink-200">
      {/* 🌟 HERO SECTION (Futuristic Glow) */}
      <section className="relative min-h-[50vh] flex items-center justify-center overflow-hidden bg-slate-900 pt-20">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-blue-600/20 rounded-full blur-[120px] animate-pulse-slow"></div>
          <div className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] bg-pink-600/20 rounded-full blur-[120px] animate-pulse-slow delay-1000"></div>
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center animate-fade-in-up pb-24">
          <h1 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tight">
            Let's{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-pink-500">
              Connect
            </span>
          </h1>
          <p className="text-xl text-slate-300 leading-relaxed max-w-2xl mx-auto font-light">
            Have questions about our programs or want to partner with us? We are
            ready to listen and collaborate for a better future.
          </p>
        </div>
      </section>

      {/* 📍 INFO CARDS (Floating) */}
      <section className="relative z-20 -mt-16 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-6">
          {/* Address */}
          <div className="bg-white p-8 rounded-3xl shadow-xl border-b-4 border-blue-500 hover:-translate-y-2 transition-transform duration-300">
            <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 mb-6">
              <MapPin size={28} />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">
              Headquarters
            </h3>
            <p className="text-slate-500 mb-1">P.O. Box 15643-00400</p>
            <p className="text-slate-900 font-semibold">Nairobi, Kenya</p>
          </div>

          {/* Email */}
          <div className="bg-white p-8 rounded-3xl shadow-xl border-b-4 border-pink-500 hover:-translate-y-2 transition-transform duration-300">
            <div className="w-14 h-14 bg-pink-50 rounded-2xl flex items-center justify-center text-pink-600 mb-6">
              <Mail size={28} />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Email Us</h3>
            <p className="text-slate-500 mb-1">For inquiries & partnerships:</p>
            <a
              href="mailto:teensvoiceafrica@gmail.com"
              className="text-slate-900 font-semibold hover:text-pink-600 transition-colors"
            >
              teensvoiceafrica@gmail.com
            </a>
          </div>

          {/* Phone */}
          <div className="bg-white p-8 rounded-3xl shadow-xl border-b-4 border-purple-500 hover:-translate-y-2 transition-transform duration-300">
            <div className="w-14 h-14 bg-purple-50 rounded-2xl flex items-center justify-center text-purple-600 mb-6">
              <Phone size={28} />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Call Us</h3>
            <p className="text-slate-500 mb-1">Mon-Fri from 8am to 5pm</p>
            <a
              href="tel:+254700000000"
              className="text-slate-900 font-semibold hover:text-purple-600 transition-colors"
            >
              +254 7XX XXX XXX
            </a>
          </div>
        </div>
      </section>

      {/* ✉️ MODERN SPLIT FORM SECTION */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto bg-white rounded-[3rem] shadow-2xl overflow-hidden border border-slate-100 flex flex-col lg:flex-row">
          {/* Left Side: Context & Socials */}
          <div className="lg:w-2/5 bg-slate-900 text-white p-12 lg:p-16 relative overflow-hidden flex flex-col justify-between">
            {/* Background Decor */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/20 rounded-full blur-[80px]"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-pink-600/20 rounded-full blur-[80px]"></div>

            <div className="relative z-10">
              <h2 className="text-3xl font-bold mb-6">Send us a Message</h2>
              <p className="text-slate-300 leading-relaxed mb-8">
                Whether you are a student looking to join our clubs, a school
                administrator interested in the Green Schools Movement, or a
                donor, we want to hear from you.
              </p>

              <div className="space-y-4">
                <div className="flex items-center gap-4 text-slate-300">
                  <Globe size={20} className="text-blue-400" />
                  <span>Operating in 47 Counties</span>
                </div>
                <div className="flex items-center gap-4 text-slate-300">
                  <Mail size={20} className="text-pink-400" />
                  <span>teensvoiceafrica@gmail.com</span>
                </div>
              </div>
            </div>

            <div className="relative z-10 mt-12">
              <p className="text-sm font-bold uppercase tracking-widest text-slate-500 mb-4">
                Follow Us
              </p>
              <div className="flex gap-4">
                <button
                  type="button"
                  className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-blue-600 transition-colors"
                >
                  <FaFacebookF />
                </button>
                <button
                  type="button"
                  className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-sky-500 transition-colors"
                >
                  <FaTwitter />
                </button>
                <button
                  type="button"
                  className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-pink-600 transition-colors"
                >
                  <FaInstagram />
                </button>
              </div>
            </div>
          </div>

          {/* Right Side: The Form */}
          <div className="lg:w-3/5 p-12 lg:p-16 bg-white">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 uppercase tracking-wide">
                    Your Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    required
                    className="w-full px-6 py-4 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 uppercase tracking-wide">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                    required
                    className="w-full px-6 py-4 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-pink-500 focus:ring-4 focus:ring-pink-500/10 outline-none transition-all"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 uppercase tracking-wide">
                  Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us how we can help..."
                  required
                  rows={6}
                  className="w-full px-6 py-4 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 outline-none transition-all resize-none"
                ></textarea>
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full bg-gradient-to-r from-blue-600 to-pink-600 text-white font-bold py-4 rounded-xl transition-all shadow-lg hover:shadow-blue-500/25 flex items-center justify-center gap-2 transform hover:-translate-y-1 ${
                    loading ? "opacity-70 cursor-not-allowed" : ""
                  }`}
                >
                  {loading ? (
                    "Sending..."
                  ) : (
                    <>
                      Send Message <Send size={20} />
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* 🗺️ MAP SECTION */}
      <section className="pb-24 px-6 md:px-12">
        <div className="max-w-7xl mx-auto rounded-[2rem] overflow-hidden shadow-2xl border-4 border-white h-[400px] relative grayscale hover:grayscale-0 transition-all duration-700">
          <iframe
            title="TVA Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d255281.22535497258!2d36.7073072584776!3d-1.3031933719272917!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f1172d84d49a7%3A0xf7cf0254b297924c!2sNairobi!5e0!3m2!1sen!2ske!4v1683884614000!5m2!1sen!2ske"
            width="100%"
            height="100%"
            className="border-0"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
          {/* Map Overlay Badge */}
          <div className="absolute bottom-6 left-6 bg-white p-4 rounded-2xl shadow-lg border border-slate-100 hidden sm:block">
            <p className="text-xs font-bold text-slate-400 uppercase">
              Location
            </p>
            <p className="font-bold text-slate-800">Nairobi, Kenya</p>
          </div>
        </div>
      </section>

      {/* 🟢 FLOATING WHATSAPP */}
      <a
        href="https://wa.me/254700000000"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-8 right-8 bg-[#25D366] hover:bg-[#20b858] text-white w-14 h-14 rounded-full flex items-center justify-center shadow-2xl hover:shadow-green-500/40 transition-all z-50 hover:scale-110 animate-bounce"
      >
        <FaWhatsapp className="w-7 h-7" />
      </a>
    </div>
  );
};

export default Contact;
