import { motion } from "framer-motion";
import {
  ArrowUpRight,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  // Globe2,
  Play,
} from "lucide-react";

import phone2 from "@/assets/images/p3.png";

import { Link } from "react-router";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-[#1F2340] pt-24 text-white">
      {/* gradients */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(139,144,208,0.18),transparent_30%),radial-gradient(circle_at_bottom_left,rgba(183,179,217,0.15),transparent_35%)]" />

      {/* grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-size-[70px_70px] opacity-[0.04]" />

      {/* blur blobs */}
      <div className="absolute -left-20 top-20 h-72 w-72 rounded-full bg-[#8B90D0]/30 blur-3xl" />
      <div className="absolute -bottom-20 right-0 h-72 w-72 rounded-full bg-[#B7B3D9]/20 blur-3xl" />

      <div className="relative z-10 mx-auto w-11/12 px-6 pb-20 pt-10">
        <div className="grid items-center gap-36 lg:grid-cols-[1fr_0.95fr]">
          {/* ── LEFT CONTENT ── */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* badge */}
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#8B90D0]/20 bg-[#8B90D0]/10 px-4 py-2 text-sm font-medium text-[#D6D2F0] backdrop-blur-xl">
              <Sparkles className="h-4 w-4" />
              AI-powered financial ecosystem
            </div>

            {/* heading */}
            <h1 className="max-w-3xl text-5xl font-black leading-none tracking-tight sm:text-6xl lg:text-6xl">
              Smart Digital
              <span className="bg-linear-to-r from-[#D6D2F0] via-[#8B90D0] to-[#6C72B8] bg-clip-text text-transparent">
                {" "}
                Wallet
              </span>
              <br />
              For Modern Finance
            </h1>

            {/* description */}
            <p className="mt-7 max-w-xl text-md leading-8 text-[#B6BCD3]">
              Send money globally, manage virtual cards, track spending, and
              automate payments through one intelligent financial platform.
            </p>

            {/* buttons */}
            <div className="mt-10 flex flex-wrap items-center gap-6">
              <Link
                to="/register"
                className="group flex h-14 items-center rounded-2xl bg-[#8B90D0] px-8 text-base font-bold text-[#1F2340] transition hover:bg-[#A2A7E6]"
              >
                Launch Wallet
                <ArrowUpRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              </Link>

              <button className="flex h-14 items-center rounded-2xl border border-white/10 bg-white/5 px-8 text-base font-semibold text-white backdrop-blur-xl transition hover:bg-white/10">
                <Play className="mr-3 h-5 w-5" />
                Watch Demo
              </button>
            </div>

            {/* feature pills */}
            <div className="mt-5 flex flex-wrap gap-5">
              {[
                { icon: ShieldCheck, title: "Bank-level Security" },
                { icon: TrendingUp, title: "Real-time Analytics" },
                // { icon: Globe2, title: "Global Transfers" },
              ].map((item, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 backdrop-blur-xl"
                >
                  <div className="rounded-xl bg-[#8B90D0]/10 p-2 text-[#D6D2F0]">
                    <item.icon className="h-5 w-5" />
                  </div>
                  <span className="text-sm font-medium text-[#E8E6F0]">
                    {item.title}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* ── RIGHT SIDE ── */}
          <motion.div
            initial={{
              opacity: 0,
              scale: 0.2,
              rotateY: -20,
              y: 100,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              rotateY: 0,
              y: 0,
            }}
            transition={{
              duration: 1.2,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="relative"
          >
            <img
              src={phone2}
              alt="Phone"
              className="w-100 h-full object-contain"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
