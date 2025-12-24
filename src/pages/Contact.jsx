import React, { useState } from "react";
import { Phone, Mail, MapPin, TreePine } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import toast from "react-hot-toast";

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

      toast.success(
        `Thank you ${name}! Your message has been sent successfully.`
      );
      setFormData({ name: "", email: "", message: "" });
    } catch (err) {
      toast.error(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 via-green-100 to-amber-50 mt-[-2rem] px-6 md:px-12 lg:px-20 py-12 relative mb-[-4rem]">

      {/* Page Header */}
      <section className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold text-green-900 mb-4">
          Get in Touch with Us 📬
        </h1>
        <p className="text-green-800 max-w-2xl mx-auto">
          Have questions, ideas, or want to partner with us? Reach out anytime!
        </p>
      </section>

      {/* Contact Info */}
      <section className="max-w-6xl mx-auto mb-12 grid md:grid-cols-3 gap-8 text-center">
        {/* Phone Section */}
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-green-200 hover:shadow-2xl transition">
          <Phone className="w-8 h-8 text-amber-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-green-900 mb-2">Call Us</h3>
          <p className="text-green-800 font-medium">
            <a
              href="tel:+254700000000"
              className="hover:text-amber-500 transition-colors"
            >
              +254 700 000 000
            </a>
          </p>
        </div>

        {/* Email Section */}
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-green-200 hover:shadow-2xl transition">
          <Mail className="w-8 h-8 text-amber-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-green-900 mb-2">Email</h3>
          <p className="text-green-800 font-medium">
            <a
              href="mailto:info@pathfinders75.org"
              className="hover:text-amber-500 transition-colors"
            >
              info@pathfinders75.org
            </a>
          </p>
        </div>

        {/* Location Section */}
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-green-200 hover:shadow-2xl transition">
          <MapPin className="w-8 h-8 text-amber-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-green-900 mb-2">
            Location
          </h3>
          <p className="text-green-800 font-medium">Nairobi, Kenya</p>
        </div>
      </section>

      {/* Mini Map Section */}
      <section className="max-w-6xl mx-auto mb-12 relative rounded-2xl overflow-hidden shadow-lg border border-green-200">
        <iframe
          title="Pathfinders Location"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1992.832635257898!2d36.81930527660596!3d-1.292065936617474!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f10bdb23cb89d%3A0x88c2a3b62ec8e71c!2sNairobi%2C%20Kenya!5e0!3m2!1sen!2sus!4v1699644800000!5m2!1sen!2sus"
          width="100%"
          height="400"
          className="border-0"
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
        <div className="absolute top-4 left-4 flex gap-2">
          <TreePine className="w-6 h-6 text-amber-400 animate-pulse" />
          <TreePine className="w-6 h-6 text-green-600 animate-bounce" />
          <TreePine className="w-6 h-6 text-green-800 animate-pulse" />
        </div>
      </section>

      {/* Contact Form */}
      <section className="max-w-3xl mx-auto bg-green-50/70 p-8 rounded-2xl shadow-lg border border-green-200">
        <h2 className="text-2xl md:text-3xl font-bold text-green-900 mb-6 text-center">
          Send Us a Message 💬
        </h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Your Name"
            required
            className="w-full px-4 py-3 rounded-lg border border-green-300 focus:outline-none focus:ring-2 focus:ring-amber-400 transition"
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Your Email"
            required
            className="w-full px-4 py-3 rounded-lg border border-green-300 focus:outline-none focus:ring-2 focus:ring-amber-400 transition"
          />
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Your Message"
            required
            rows={5}
            className="w-full px-4 py-3 rounded-lg border border-green-300 focus:outline-none focus:ring-2 focus:ring-amber-400 transition"
          ></textarea>
          <button
            type="submit"
            disabled={loading}
            className={`bg-amber-400 hover:bg-amber-500 text-green-950 font-bold py-3 rounded-full transition-all text-lg ${
              loading ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Sending..." : "Send Message"}
          </button>
        </form>
      </section>

      {/* Floating WhatsApp Button */}
      <a
        href="https://wa.me/254700000000"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 bg-green-600 hover:bg-green-800 text-white w-16 h-16 rounded-full flex items-center justify-center shadow-lg hover:shadow-2xl transition-all z-50 animate-bounce"
      >
        <FaWhatsapp className="w-8 h-8" />
      </a>
    </div>
  );
};

export default Contact;
