import React, { useState, useEffect, useRef } from "react";
import {
  CreditCard,
  Phone,
  HeartHandshake,
  DollarSign,
  Loader2,
  Heart,
  Zap,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";
import toast from "react-hot-toast";

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

const Donate = () => {
  const [amount, setAmount] = useState("");
  const [donorName, setDonorName] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("mpesa");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);

  // Format Phone Number
  const formatPhoneNumber = (number) => {
    let cleanNumber = number.replace(/\D/g, "");
    if (cleanNumber.startsWith("0")) {
      cleanNumber = "254" + cleanNumber.substring(1);
    } else if (cleanNumber.startsWith("7") || cleanNumber.startsWith("1")) {
      if (cleanNumber.length === 9) {
        cleanNumber = "254" + cleanNumber;
      }
    }
    return cleanNumber;
  };
  const AnimatedCounter = ({ end, duration = 2000, suffix = "" }) => {
    const [count, setCount] = useState(0);
    const ref = useRef(null);
    const [hasViewed, setHasViewed] = useState(false);

    useEffect(() => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setHasViewed(true);
            observer.disconnect(); // Run only once
          }
        },
        { threshold: 0.1 }, // Trigger when 10% visible
      );

      if (ref.current) observer.observe(ref.current);
      return () => observer.disconnect();
    }, []);

    useEffect(() => {
      if (!hasViewed) return;

      let startTime;
      let animationFrame;

      const animate = (currentTime) => {
        if (!startTime) startTime = currentTime;
        const progress = currentTime - startTime;

        // Calculate percentage (0 to 1)
        const percentage = Math.min(progress / duration, 1);

        // Easing function (EaseOutExpo) for a smooth stop
        const ease = percentage === 1 ? 1 : 1 - Math.pow(2, -10 * percentage);

        setCount(Math.floor(ease * end));

        if (percentage < 1) {
          animationFrame = requestAnimationFrame(animate);
        }
      };

      animationFrame = requestAnimationFrame(animate);
      return () => cancelAnimationFrame(animationFrame);
    }, [hasViewed, end, duration]);

    return (
      <span ref={ref} className="tabular-nums">
        {count}
        {suffix}
      </span>
    );
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

    const formattedPhone = formatPhoneNumber(phone);

    // Validate that the phone number matches the Kenyan format (e.g., 2547..., 2541...)
    if (!/^254[17]\d{8}$/.test(formattedPhone)) {
      toast.error(
        "Invalid phone number. Please enter a valid Kenyan number (e.g., 07... or 01...).",
      );
      return;
    }

    setLoading(true);
    let toastId;

    try {
      const res = await fetch(`${SERVER_URL}/api/donate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          donorName,
          amount,
          paymentMethod,
          phone: formattedPhone,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Donation failed");

      toastId = toast.loading("Please enter your M-Pesa PIN on your phone...", {
        duration: 60000,
      });

      const checkoutRequestID = data.checkoutRequestID;
      if (!checkoutRequestID) throw new Error("Missing checkout request ID");

      let attempts = 0;
      const maxAttempts = 20; // 20 * 3s = 60 seconds of polling

      const poll = setInterval(async () => {
        attempts++;
        try {
          const statusRes = await fetch(
            `${SERVER_URL}/api/donate/status/${checkoutRequestID}`,
          );
          if (statusRes.ok) {
            const statusData = await statusRes.json();
            if (statusData.status === "COMPLETED") {
              clearInterval(poll);
              toast.dismiss(toastId);
              toast.success(
                statusData.mpesaReceiptNumber
                  ? `Donation Successful! Receipt: ${statusData.mpesaReceiptNumber}`
                  : "Donation Successful!",
              );
              setLoading(false);
              setAmount("");
              setDonorName("");
              setPhone("");
            } else if (statusData.status === "FAILED") {
              clearInterval(poll);
              toast.dismiss(toastId);
              toast.error(
                `Payment failed: ${statusData.resultDesc || "Request cancelled by user."}`,
              );
              setLoading(false);
            }
          }
        } catch (err) {
          console.error("Polling error:", err);
        }

        if (attempts >= maxAttempts) {
          clearInterval(poll);
          toast.dismiss(toastId);
          toast.error(
            "Timeout waiting for payment. If you paid, it will reflect shortly.",
          );
          setLoading(false);
        }
      }, 3000);
    } catch (err) {
      if (toastId) toast.dismiss(toastId);
      toast.error(err.message || "Something went wrong.");
      setLoading(false);
    }
  };

  const donationOptions = [
    {
      id: "mpesa",
      icon: <Phone className="w-8 h-8" />,
      title: "M-Pesa",
      description: "Instant mobile transfer",
      color: "text-green-500",
      bg: "bg-green-50",
      border: "border-green-200",
    },
    {
      id: "bank",
      icon: <CreditCard className="w-8 h-8" />,
      title: "Card / Bank",
      description: "Secure bank transfer",
      color: "text-blue-500",
      bg: "bg-blue-50",
      border: "border-blue-200",
    },
    {
      id: "partner",
      icon: <HeartHandshake className="w-8 h-8" />,
      title: "Partnership",
      description: "Corporate sponsorship",
      color: "text-purple-500",
      bg: "bg-purple-50",
      border: "border-purple-200",
    },
  ];

  const quickAmounts = [100, 500, 1000, 2500, 5000];

  return (
    <div className="bg-slate-50 overflow-x-hidden min-h-screen font-sans selection:bg-pink-200">
      {/* 🌟 HERO SECTION (Futuristic Finance) */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden bg-slate-900 pt-20">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-green-500/20 rounded-full blur-[100px] animate-pulse-slow"></div>
          <div className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] bg-blue-500/20 rounded-full blur-[100px] animate-pulse-slow delay-1000"></div>
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
        </div>

        {/* Floating Coins/Icons */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-[15%] animate-float">
            <div className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20">
              <Heart className="text-pink-400 fill-current" />
            </div>
          </div>
          <div
            className="absolute bottom-32 right-[15%] animate-float"
            style={{ animationDelay: "1.5s" }}
          >
            <div className="w-20 h-20 bg-white/10 backdrop-blur-md rounded-2xl rotate-12 flex items-center justify-center border border-white/20">
              <DollarSign className="text-green-400 w-10 h-10" />
            </div>
          </div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center animate-fade-in-up pb-24">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-green-300 text-xs font-bold uppercase tracking-widest mb-6">
            <ShieldCheck size={14} /> Secure Donation
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-white mb-6 drop-shadow-2xl tracking-tight">
            Power the{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-blue-400 to-purple-400">
              Future
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-300 max-w-2xl mx-auto leading-relaxed font-light">
            Your contribution directly funds tree planting, youth mentorship,
            and peace initiatives across 47 counties.
          </p>
        </div>
      </section>

      {/* 💳 DONATION INTERFACE */}
      <section className="relative z-20 -mt-20 px-4 md:px-8 pb-20">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-12 gap-8">
            {/* LEFT: Impact Stats & Context */}
            <div className="lg:col-span-5 space-y-6">
              {/* Impact Card */}
              <div className="bg-white p-8 rounded-[2.5rem] shadow-xl border border-slate-100">
                <h3 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                  <Zap className="text-yellow-500 fill-current" /> Your Impact
                </h3>
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-green-100 flex items-center justify-center text-green-600 font-bold">
                      10
                    </div>
                    <div>
                      <p className="font-bold text-slate-800">Trees Planted</p>
                      <p className="text-xs text-slate-500">
                        Per KES 1,000 donation
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-blue-100 flex items-center justify-center text-blue-600 font-bold">
                      5
                    </div>
                    <div>
                      <p className="font-bold text-slate-800">
                        Youths Mentored
                      </p>
                      <p className="text-xs text-slate-500">
                        Through club activities
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-slate-100">
                  <p className="text-sm text-slate-500 italic">
                    "We act as a bridge between teens and society, helping youth
                    overcome developmental challenges."
                  </p>
                </div>
              </div>

              {/* Trust Badge */}
              <div className="bg-slate-900 text-white p-6 rounded-3xl flex items-center justify-between">
                <div>
                  <p className="font-bold text-lg">100% Secure</p>
                  <p className="text-slate-400 text-sm">
                    Encrypted Transactions
                  </p>
                </div>
                <ShieldCheck className="w-10 h-10 text-green-400" />
              </div>
            </div>

            {/* RIGHT: Donation Form */}
            <div className="lg:col-span-7">
              <div className="bg-white rounded-[2.5rem] shadow-2xl p-8 md:p-10 border border-slate-100">
                <form onSubmit={handleSubmit} className="space-y-8">
                  {/* 1. Payment Method */}
                  <div>
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 block">
                      Select Method
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      {donationOptions.map((option) => (
                        <div
                          key={option.id}
                          onClick={() => setPaymentMethod(option.id)}
                          className={`cursor-pointer p-4 rounded-2xl border-2 transition-all duration-300 flex flex-col items-center text-center gap-2 ${
                            paymentMethod === option.id
                              ? `border-blue-500 bg-blue-50/50 shadow-md transform scale-105`
                              : "border-slate-100 hover:border-slate-300 hover:bg-slate-50"
                          }`}
                        >
                          <div className={`${option.color}`}>{option.icon}</div>
                          <span
                            className={`font-bold text-sm ${paymentMethod === option.id ? "text-slate-900" : "text-slate-500"}`}
                          >
                            {option.title}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* 2. Amount Selection */}
                  <div>
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 block">
                      Select Amount (KES)
                    </label>
                    <div className="grid grid-cols-3 sm:grid-cols-5 gap-3 mb-4">
                      {quickAmounts.map((amt) => (
                        <button
                          key={amt}
                          type="button"
                          onClick={() => setAmount(amt.toString())}
                          className={`py-2 px-2 rounded-xl text-sm font-bold transition-all ${
                            amount === amt.toString()
                              ? "bg-slate-900 text-white shadow-lg scale-105"
                              : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                          }`}
                        >
                          {amt.toLocaleString()}
                        </button>
                      ))}
                    </div>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">
                        KES
                      </span>
                      <input
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        placeholder="Enter custom amount"
                        className="w-full pl-14 pr-4 py-4 bg-slate-50 border-2 border-slate-100 rounded-xl focus:bg-white focus:border-blue-500 outline-none transition-all font-bold text-lg text-slate-900 placeholder:font-normal"
                      />
                    </div>
                  </div>

                  {/* 3. Personal Details */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                        Your Name
                      </label>
                      <input
                        type="text"
                        value={donorName}
                        onChange={(e) => setDonorName(e.target.value)}
                        placeholder="John Doe"
                        required
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-blue-500 outline-none transition-all font-medium"
                      />
                    </div>

                    {paymentMethod === "mpesa" && (
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                          M-Pesa Number
                        </label>
                        <input
                          type="number"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="07XX XXX XXX"
                          required
                          maxLength={15}
                          className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-green-500 outline-none transition-all font-medium"
                        />
                      </div>
                    )}
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-5 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold text-lg rounded-2xl shadow-xl hover:shadow-green-500/30 hover:scale-[1.02] transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-6 h-6 animate-spin" />{" "}
                        Processing...
                      </>
                    ) : (
                      <>
                        Donate Now <ArrowRight size={20} />
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 🌍 FOOTER STATS */}
      {/* 🌍 FOOTER STATS */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-slate-100">
            {/* Stat 1 */}
            <div className="pb-8 md:pb-0">
              <p className="text-5xl font-black text-slate-900 mb-2">
                <AnimatedCounter end={50} suffix="k+" />
              </p>
              <p className="text-slate-500 font-medium uppercase tracking-wide text-sm">
                Youth Empowered
              </p>
            </div>

            {/* Stat 2 */}
            <div className="py-8 md:py-0">
              <p className="text-5xl font-black text-slate-900 mb-2">
                <AnimatedCounter end={47} duration={1500} />
              </p>
              <p className="text-slate-500 font-medium uppercase tracking-wide text-sm">
                Counties Reached
              </p>
            </div>

            {/* Stat 3 */}
            <div className="pt-8 md:pt-0">
              <p className="text-5xl font-black text-slate-900 mb-2">
                <AnimatedCounter end={100} suffix="k+" duration={2500} />
              </p>
              <p className="text-slate-500 font-medium uppercase tracking-wide text-sm">
                Trees Planted
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Donate;
