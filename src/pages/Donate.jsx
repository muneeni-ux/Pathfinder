import React, { useState } from "react";
import { CreditCard, Phone, HeartHandshake, Users } from "lucide-react";

const Donate = () => {
  const [amount, setAmount] = useState("");
  const [donorName, setDonorName] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("mpesa");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(
      `Thank you, ${donorName}! You pledged ${amount} via ${paymentMethod.toUpperCase()}.`
    );
    setAmount("");
    setDonorName("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 via-green-100 to-amber-50 mt-[-2rem] px-6 md:px-12 lg:px-20 py-12">
      {/* Header */}
      <section className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold text-green-900 mb-4">
          Support Our Tree Planting Initiative 🌳
        </h1>
        <p className="text-green-800 max-w-2xl mx-auto">
          Your donations help us plant more trees, engage communities, and
          create a sustainable future.
        </p>
      </section>

      {/* Donation Options */}
      <section className="max-w-4xl mx-auto mb-12 grid sm:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center text-center border border-green-200 hover:shadow-2xl transition">
          <Phone className="w-10 h-10 text-amber-400 mb-4" />
          <h3 className="text-xl font-semibold text-green-900 mb-2">M-Pesa</h3>
          <p className="text-green-800 mb-2">Send directly to our M-Pesa Paybill.</p>
          <p className="font-bold text-green-900">Paybill: 123456 | Account: TREE</p>
        </div>
        <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center text-center border border-green-200 hover:shadow-2xl transition">
          <CreditCard className="w-10 h-10 text-amber-400 mb-4" />
          <h3 className="text-xl font-semibold text-green-900 mb-2">Bank Transfer</h3>
          <p className="text-green-800 mb-2">Use the following bank details:</p>
          <p className="font-bold text-green-900">Account: 9876543210 | Bank: EcoBank</p>
        </div>
        <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center text-center border border-green-200 hover:shadow-2xl transition">
          <HeartHandshake className="w-10 h-10 text-amber-400 mb-4" />
          <h3 className="text-xl font-semibold text-green-900 mb-2">Partnership</h3>
          <p className="text-green-800 mb-2">Become a sponsor or partner with us.</p>
          <p className="font-bold text-green-900">Contact us for collaboration.</p>
        </div>
        <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center text-center border border-green-200 hover:shadow-2xl transition">
          <Users className="w-10 h-10 text-amber-400 mb-4" />
          <h3 className="text-xl font-semibold text-green-900 mb-2">Volunteer Donations</h3>
          <p className="text-green-800 mb-2">Contribute through volunteering & in-kind donations.</p>
          <p className="font-bold text-green-900">Join a local club today!</p>
        </div>
      </section>

      {/* Donation Form */}
      <section className="max-w-2xl mx-auto bg-green-50/70 p-8 rounded-2xl shadow-lg border border-green-200">
        <h2 className="text-2xl md:text-3xl font-bold text-green-900 mb-6 text-center">
          Make a Donation 💚
        </h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div>
            <label className="block text-green-800 font-medium mb-2">Name</label>
            <input
              type="text"
              value={donorName}
              onChange={(e) => setDonorName(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-lg border border-green-300 focus:outline-none focus:ring-2 focus:ring-amber-400 transition"
              placeholder="Your Name"
            />
          </div>
          <div>
            <label className="block text-green-800 font-medium mb-2">Amount (KES)</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-lg border border-green-300 focus:outline-none focus:ring-2 focus:ring-amber-400 transition"
              placeholder="e.g., 500"
            />
          </div>
          <div>
            <label className="block text-green-800 font-medium mb-2">Payment Method</label>
            <select
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-green-300 focus:outline-none focus:ring-2 focus:ring-amber-400 transition"
            >
              <option value="mpesa">M-Pesa</option>
              <option value="bank">Bank Transfer</option>
              <option value="partner">Partnership</option>
            </select>
          </div>
          <button
            type="submit"
            className="bg-amber-400 hover:bg-amber-500 text-green-950 font-bold py-3 rounded-full transition-all text-lg"
          >
            Donate Now
          </button>
        </form>
      </section>
    </div>
  );
};

export default Donate;
