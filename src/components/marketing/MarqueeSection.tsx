import { useState } from "react";
import { motion } from "framer-motion";
import { CreditCard, Mail, Sparkles, Layers } from "lucide-react";

export default function PremiumFeaturesGrid() {
  const [activeTab, setActiveTab] = useState<"card" | "paypal">("card");

  return (
    <section className="relative overflow-hidden bg-[#F8FAFC] py-10  text-slate-900">
      <div className="flex justify-center item-center">
        <span className=" mb-5 rounded-full border border-[#8B90D0]/40 px-5 py-2 text-xs font-bold uppercase tracking-[0.22em] text-[#6C72B8]">
          Fintech Features
        </span>
      </div>
      {/* Container Wrapper */}
      <div className="mx-auto w-11/12 max-w-7xl relative z-10">
        {/* Responsive Two-Column Grid Setup */}
        <div className="grid gap-8 lg:grid-cols-2">
          {/* ================= LEFT CARD: BANKING AS A SERVICE ================= */}
          <div className="flex flex-col justify-between rounded-[40px] bg-slate-50 border border-slate-200/70 p-8 sm:p-12 shadow-[0_4px_30px_rgba(0,0,0,0.02)] overflow-hidden relative group">
            {/* Context Content */}
            <div className="max-w-xl mb-12">
              <h2 className="text-3xl font-black uppercase tracking-tight text-slate-900 sm:text-4xl leading-none">
                BUILD A FINTECH WITH <br />
                <span className="text-transparent bg-clip-text bg-linear-to-r from-[#6C72B8] to-[#8B90D0]">
                  BANKING AS A SERVICE
                </span>
              </h2>
              <p className="mt-5 text-sm sm:text-base text-slate-500 font-medium leading-relaxed">
                Keep your business account and all your finance needs safely
                organized under one roof. Manage money quickly, easily &
                efficiently. Whether you're alone or leading a team.
              </p>
            </div>

            {/* Interactive Functional Interactive UI Preview Component */}
            <div className="bg-white rounded-3xl border border-slate-100 p-6 shadow-[0_20px_50px_rgba(0,0,0,0.04)] max-w-md w-full mx-auto relative z-10">
              {/* Tab Selector Buttons */}
              <div className="flex gap-2 bg-slate-100/80 p-1.5 rounded-2xl mb-6">
                <button
                  onClick={() => setActiveTab("card")}
                  className={`flex-1 py-2.5 text-xs sm:text-sm font-bold rounded-xl transition duration-200 ${
                    activeTab === "card"
                      ? "bg-white text-slate-900 shadow-sm"
                      : "text-slate-400 hover:text-slate-600"
                  }`}
                >
                  Pay by Cards
                </button>
                <button
                  onClick={() => setActiveTab("paypal")}
                  className={`flex-1 py-2.5 text-xs sm:text-sm font-bold rounded-xl transition duration-200 ${
                    activeTab === "paypal"
                      ? "bg-white text-slate-900 shadow-sm"
                      : "text-slate-400 hover:text-slate-600"
                  }`}
                >
                  Pay with Paypal
                </button>
              </div>

              {/* Fake Interactive Form Elements */}
              <div className="space-y-4 pointer-events-none opacity-80">
                <div>
                  <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">
                    Email address
                  </label>
                  <div className="flex items-center gap-3 bg-slate-50 border border-slate-100 rounded-xl px-4 py-3">
                    <Mail className="h-4 w-4 text-slate-400" />
                    <span className="text-sm text-slate-400 font-medium">
                      johndoe@mail.com
                    </span>
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">
                    Card details
                  </label>
                  <div className="flex items-center gap-3 bg-slate-50 border border-slate-100 rounded-xl px-4 py-3">
                    <CreditCard className="h-4 w-4 text-slate-400" />
                    <span className="text-sm text-slate-300 font-medium">
                      Card number
                    </span>
                  </div>
                </div>
              </div>

              {/* Floating Success Transaction Receipt Widget overlaying design */}
              <motion.div
                initial={{ x: 30, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="absolute -right-6 bottom-10 bg-white rounded-2xl border border-slate-100 p-4 shadow-[0_15px_40px_rgba(0,0,0,0.08)] max-w-52.5 hidden sm:block"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-4 pb-2 border-b border-slate-100">
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                      <span className="text-[10px] font-black text-slate-700">
                        Bill Chanky
                      </span>
                    </div>
                    <span className="text-[10px] font-black text-emerald-500">
                      $23.00
                    </span>
                  </div>
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-blue-500" />
                      <span className="text-[10px] font-black text-slate-700">
                        Alesana Inc
                      </span>
                    </div>
                    <span className="text-[10px] font-black text-emerald-500">
                      $23.00
                    </span>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <Layers className="h-3 w-3 text-slate-900" />
                    <span className="text-[9px] font-black tracking-tighter uppercase text-slate-900">
                      Cyber Bank
                    </span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* ================= RIGHT CARD: ACCEPT & OPTIMIZE PAYMENTS ================= */}
          <div className="flex flex-col justify-between rounded-[40px] bg-slate-50 border border-slate-200/60 p-8 sm:p-12 shadow-[0_4px_30px_rgba(0,0,0,0.02)] overflow-hidden relative group">
            {/* Context Content */}
            <div className="max-w-xl mb-12">
              <h2 className="text-3xl font-black uppercase tracking-tight text-slate-900 sm:text-4xl leading-none">
                ACCEPT AND OPTIMIZE <br />
                <span className="text-transparent bg-clip-text bg-linear-to-r from-[#6C72B8] to-[#8B90D0]">
                  PAYMENT GLOBALLY
                </span>
              </h2>
              <p className="mt-5 text-sm sm:text-base text-slate-500 font-medium leading-relaxed">
                Keep your business account and all your finance needs safely
                organized under one roof. Manage money quickly, easily &
                efficiently. Whether you're alone or leading a team.
              </p>
            </div>

            {/* Premium Metallic/Holographic Styled Cards Rendering Area */}
            <div className="relative h-64 sm:h-72 w-full max-w-md mx-auto flex items-center justify-center">
              {/* Backing Card - Deep Premium Finish */}
              <div className="absolute w-70 h-45 sm:w-[320px] sm:h-50 rounded-3xl bg-linear-to-br from-slate-900 via-[#1F2340] to-slate-950 p-6 text-white shadow-xl transform -rotate-12 -translate-x-8 translate-y-2 transition duration-500 group-hover:-rotate-6 group-hover:-translate-x-12">
                <div className="flex flex-col h-full justify-between">
                  <div className="flex justify-between items-start">
                    <div className="h-8 w-10 bg-white/10 rounded-lg backdrop-blur-md" />
                    <span className="text-[10px] font-bold tracking-widest text-white/40 uppercase">
                      VV 341
                    </span>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs font-medium tracking-widest text-slate-400">
                      EXP 09/24
                    </p>
                    <p className="text-sm sm:text-base font-mono tracking-extrawide">
                      •••• •••• •••• 3090
                    </p>
                  </div>
                </div>
              </div>

              {/* Front Card - Vibrant Holographic/Radial Gradient Finish */}
              <div className="absolute w-70 h-45 sm:w-[320px] sm:h-50 rounded-3xl bg-linear-to-tr from-cyan-400 via-[#8B90D0] via-55% to-rose-300 p-6 text-slate-900 shadow-[0_25px_60px_rgba(0,0,0,0.15)] transform rotate-6 translate-x-6 -translate-y-2 transition duration-500 group-hover:rotate-2 group-hover:translate-x-10">
                <div className="flex flex-col h-full justify-between relative overflow-hidden">
                  {/* Digital Reflection Wave Graphic Layer */}
                  <div className="absolute -inset-20 bg-linear-to-b from-white/20 to-transparent rounded-full blur-2xl pointer-events-none transform -skew-y-12" />

                  <div className="flex justify-between items-start relative z-10">
                    <span className="text-[11px] font-black uppercase tracking-wider bg-white/40 backdrop-blur-md px-2.5 py-1 rounded-lg text-slate-900">
                      IQ WALLET
                    </span>
                    <Sparkles className="h-5 w-5 text-slate-900/70" />
                  </div>

                  <div className="space-y-1 relative z-10">
                    <div className="flex justify-between items-end">
                      <p className="text-lg sm:text-xl font-mono font-bold tracking-wider text-slate-900">
                        3521 3090
                      </p>
                      <span className="text-[9px] font-bold text-slate-800 tracking-wider">
                        06/28
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
