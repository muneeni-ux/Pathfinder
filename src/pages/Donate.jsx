// import React, { useState } from "react";
// import { CreditCard, Phone, HeartHandshake, Users } from "lucide-react";

// const Donate = () => {
//   const [amount, setAmount] = useState("");
//   const [donorName, setDonorName] = useState("");
//   const [paymentMethod, setPaymentMethod] = useState("mpesa");

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     alert(
//       `Thank you, ${donorName}! You pledged ${amount} via ${paymentMethod.toUpperCase()}.`
//     );
//     setAmount("");
//     setDonorName("");
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-green-50 via-green-100 to-amber-50 mt-[-2rem] px-6 md:px-12 lg:px-20 py-12 mb-[-4rem]">
//       {/* Header */}
//       <section className="text-center mb-12">
//         <h1 className="text-4xl md:text-5xl font-extrabold text-green-900 mb-4">
//           Support Our Tree Planting Initiative 🌳
//         </h1>
//         <p className="text-green-800 max-w-2xl mx-auto">
//           Your donations help us plant more trees, engage communities, and
//           create a sustainable future.
//         </p>
//       </section>

//       {/* Donation Options */}
//       <section className="max-w-4xl mx-auto mb-12 grid sm:grid-cols-2 gap-6">
//         <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center text-center border border-green-200 hover:shadow-2xl transition">
//           <Phone className="w-10 h-10 text-amber-400 mb-4" />
//           <h3 className="text-xl font-semibold text-green-900 mb-2">M-Pesa</h3>
//           <p className="text-green-800 mb-2">Send directly to our M-Pesa Paybill.</p>
//           <p className="font-bold text-green-900">Paybill: 123456 | Account: TREE</p>
//         </div>
//         <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center text-center border border-green-200 hover:shadow-2xl transition">
//           <CreditCard className="w-10 h-10 text-amber-400 mb-4" />
//           <h3 className="text-xl font-semibold text-green-900 mb-2">Bank Transfer</h3>
//           <p className="text-green-800 mb-2">Use the following bank details:</p>
//           <p className="font-bold text-green-900">Account: 9876543210 | Bank: EcoBank</p>
//         </div>
//         <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center text-center border border-green-200 hover:shadow-2xl transition">
//           <HeartHandshake className="w-10 h-10 text-amber-400 mb-4" />
//           <h3 className="text-xl font-semibold text-green-900 mb-2">Partnership</h3>
//           <p className="text-green-800 mb-2">Become a sponsor or partner with us.</p>
//           <p className="font-bold text-green-900">Contact us for collaboration.</p>
//         </div>
//         <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center text-center border border-green-200 hover:shadow-2xl transition">
//           <Users className="w-10 h-10 text-amber-400 mb-4" />
//           <h3 className="text-xl font-semibold text-green-900 mb-2">Volunteer Donations</h3>
//           <p className="text-green-800 mb-2">Contribute through volunteering & in-kind donations.</p>
//           <p className="font-bold text-green-900">Join a local club today!</p>
//         </div>
//       </section>

//       {/* Donation Form */}
//       <section className="max-w-2xl mx-auto bg-green-50/70 p-8 rounded-2xl shadow-lg border border-green-200">
//         <h2 className="text-2xl md:text-3xl font-bold text-green-900 mb-6 text-center">
//           Make a Donation 💚
//         </h2>
//         <form onSubmit={handleSubmit} className="flex flex-col gap-6">
//           <div>
//             <label className="block text-green-800 font-medium mb-2">Name</label>
//             <input
//               type="text"
//               value={donorName}
//               onChange={(e) => setDonorName(e.target.value)}
//               required
//               className="w-full px-4 py-3 rounded-lg border border-green-300 focus:outline-none focus:ring-2 focus:ring-amber-400 transition"
//               placeholder="Your Name"
//             />
//           </div>
//           <div>
//             <label className="block text-green-800 font-medium mb-2">Amount (KES)</label>
//             <input
//               type="number"
//               value={amount}
//               onChange={(e) => setAmount(e.target.value)}
//               required
//               className="w-full px-4 py-3 rounded-lg border border-green-300 focus:outline-none focus:ring-2 focus:ring-amber-400 transition"
//               placeholder="e.g., 500"
//             />
//           </div>
//           <div>
//             <label className="block text-green-800 font-medium mb-2">Payment Method</label>
//             <select
//               value={paymentMethod}
//               onChange={(e) => setPaymentMethod(e.target.value)}
//               className="w-full px-4 py-3 rounded-lg border border-green-300 focus:outline-none focus:ring-2 focus:ring-amber-400 transition"
//             >
//               <option value="mpesa">M-Pesa</option>
//               <option value="bank">Bank Transfer</option>
//               <option value="partner">Partnership</option>
//             </select>
//           </div>
//           <button
//             type="submit"
//             className="bg-amber-400 hover:bg-amber-500 text-green-950 font-bold py-3 rounded-full transition-all text-lg"
//           >
//             Donate Now
//           </button>
//         </form>
//       </section>
//     </div>
//   );
// };

// export default Donate;
import React, { useState } from "react";
import { CreditCard, Phone, HeartHandshake, Users } from "lucide-react";
import toast from "react-hot-toast";

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

const Donate = () => {
  const [amount, setAmount] = useState("");
  const [donorName, setDonorName] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("mpesa");
  const [phone, setPhone] = useState(""); 
  const [loading, setLoading] = useState(false);

  // --- HELPER: Format Phone Number ---
  const formatPhoneNumber = (number) => {
    // 1. Remove all non-numeric characters (spaces, dashes, +, etc.)
    let cleanNumber = number.replace(/\D/g, "");

    // 2. Check if it starts with '0' (standard local format e.g., 07xx or 01xx)
    if (cleanNumber.startsWith("0")) {
      cleanNumber = "254" + cleanNumber.substring(1);
    } 
    // 3. Check if it starts with '7' or '1' directly (missing prefix)
    else if (cleanNumber.startsWith("7") || cleanNumber.startsWith("1")) {
       if(cleanNumber.length === 9) {
          cleanNumber = "254" + cleanNumber;
       }
    }

    // 4. Ensure it's the correct length for M-Pesa (12 digits: 254XXXXXXXXX)
    return cleanNumber;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (paymentMethod !== "mpesa") {
      toast("This payment method is coming soon!", { icon: "⏳" });
      return;
    }

    if (!phone) {
      toast.error("Please enter your phone number for M-Pesa donations.");
      return;
    }

    // --- APPLY FORMATTING HERE ---
    const formattedPhone = formatPhoneNumber(phone);

    // Basic validation: M-Pesa numbers in 254 format are typically 12 digits
    if (formattedPhone.length !== 12) {
      toast.error("Invalid phone number format. Please use 07... or 01...");
      return;
    }

    setLoading(true);

    let toastId;
    try {
      const res = await fetch(`${SERVER_URL}/api/donate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // Send the formatted phone number
        body: JSON.stringify({ donorName, amount, paymentMethod, phone: formattedPhone }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Donation failed");

      // Show initial "processing" toast
      toastId = toast.loading("Processing your M-Pesa donation...", { duration: 30000 });

      const checkoutRequestID = data.checkoutRequestID;

      // Poll for transaction status every 3 seconds, max 30 seconds
      const startTime = Date.now();
      const pollInterval = 3000;
      
      const poll = async () => {
        if (Date.now() - startTime > 30000) {
          toast.dismiss(toastId);
          toast.error("Transaction timed out. Please check your phone.");
          setLoading(false);
          return;
        }

        try {
          const statusRes = await fetch(`${SERVER_URL}/api/donate/transactions/${checkoutRequestID}`);
          const statusData = await statusRes.json();

          if (statusData.status === "Success") {
            toast.dismiss(toastId);
            toast.success(`Thank you, ${donorName}! Your donation of KES ${amount} was successful.`);
            setAmount("");
            setDonorName("");
            setPhone("");
            setLoading(false);
          } else if (statusData.status === "Failed") {
            toast.dismiss(toastId);
            toast.error("Donation failed. Please try again.");
            setLoading(false);
          } else {
            setTimeout(poll, pollInterval); // Continue polling if still pending
          }
        } catch (err) {
          // If polling fails (network blip), just keep trying until timeout
          setTimeout(poll, pollInterval);
        }
      };

      poll(); // Start polling
    } catch (err) {
      if (toastId) toast.dismiss(toastId);
      toast.error(err.message || "Something went wrong. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 via-green-100 to-amber-50 mt-[-2rem] px-6 md:px-12 lg:px-20 py-12 mb-[-4rem]">

      {/* Header */}
      <section className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold text-green-900 mb-4">
          Support Our Tree Planting Initiative 🌳
        </h1>
        <p className="text-green-800 max-w-2xl mx-auto">
          Your donations help us plant more trees, engage communities, and create a sustainable future.
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

          {paymentMethod === "mpesa" && (
            <div>
              <label className="block text-green-800 font-medium mb-2">Phone Number</label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-lg border border-green-300 focus:outline-none focus:ring-2 focus:ring-amber-400 transition"
                placeholder="e.g., 0712 345 678 or 0110..."
              />
              <p className="text-xs text-green-600 mt-1 ml-1">
                Accepted formats: 07xx, 01xx, or 2547xx
              </p>
            </div>
          )}

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
            disabled={loading}
            className={`bg-amber-400 hover:bg-amber-500 text-green-950 font-bold py-3 rounded-full transition-all text-lg ${
              loading ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Processing..." : "Donate Now"}
          </button>
        </form>
      </section>
    </div>
  );
};

export default Donate;