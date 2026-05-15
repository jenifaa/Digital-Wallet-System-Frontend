// import { motion } from "framer-motion";
// import {
//   ArrowUpRight,
//   ShieldCheck,
//   Sparkles,
//   TrendingUp,
//   Globe2,
//   Play,
// } from "lucide-react";

// import phone2 from "@/assets/images/phone2.png";
// import phone2 from "@/assets/images/p.jpg";
// import { Link } from "react-router";

// export default function HeroSection() {
//   return (
//     <section className="relative py-16 overflow-hidden bg-[#030712] text-white">
//       {/* gradients */}
//       <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(16,185,129,0.18),transparent_30%),radial-gradient(circle_at_bottom_left,rgba(59,130,246,0.15),transparent_35%)]" />

//       {/* grid */}
//       <div className="absolute inset-0 opacity-[0.05] bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-size-[70px_70px]" />

//       {/* blur effects */}
//       <div className="absolute -left-20 top-20 h-72 w-72 rounded-full bg-emerald-500/20 blur-3xl" />
//       <div className="absolute -bottom-20 right-0 h-72 w-72 rounded-full bg-cyan-500/20 blur-3xl" />

//       <div className="relative z-10 mx-auto w-11/12 px-6 pb-20 pt-10 ">
//         <div className="grid items-center gap-36 lg:grid-cols-[1fr_0.95fr]">
//           {/* LEFT CONTENT */}
//           <motion.div
//             initial={{ opacity: 0, y: 40 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6 }}
//           >
//             {/* badge */}
//             <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-4 py-2 text-sm font-medium text-emerald-300 backdrop-blur-xl">
//               <Sparkles className="h-4 w-4" />
//               AI-powered financial ecosystem
//             </div>

//             {/* heading */}
//             <h1 className="max-w-3xl text-5xl font-black leading-none tracking-tight sm:text-6xl lg:text-6xl">
//               Smart Digital
//               <span className="bg-linear-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
//                 {" "}
//                 Wallet
//               </span>
//               <br />
//               For Modern Finance
//             </h1>

//             {/* description */}
//             <p className="mt-7 max-w-xl text-md leading-8 text-zinc-400">
//               Send money globally, manage virtual cards, track spending, and
//               automate payments through one intelligent financial platform.
//             </p>

//             {/* buttons */}
//             <div className="mt-10 flex flex-wrap items-center gap-6">
//               <Link
//                 to="/dashboard"
//                 className="group flex h-14 items-center rounded-2xl bg-emerald-500 px-8 text-base font-bold text-black transition hover:bg-emerald-400"
//               >
//                 Launch Wallet
//                 <ArrowUpRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
//               </Link>

//               <button className="flex h-14 items-center rounded-2xl border border-white/10 bg-white/5 px-8 text-base font-semibold text-white backdrop-blur-xl transition hover:bg-white/10">
//                 <Play className="mr-3 h-5 w-5" />
//                 Watch Demo
//               </button>
//             </div>

//             {/* features */}
//             <div className="mt-5 flex flex-wrap gap-5">
//               {[
//                 {
//                   icon: ShieldCheck,
//                   title: "Bank-level Security",
//                 },
//                 {
//                   icon: TrendingUp,
//                   title: "Real-time Analytics",
//                 },
//                 {
//                   icon: Globe2,
//                   title: "Global Transfers",
//                 },
//               ].map((item, index) => (
//                 <div
//                   key={index}
//                   className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 backdrop-blur-xl"
//                 >
//                   <div className="rounded-xl bg-emerald-500/10 p-2 text-emerald-400">
//                     <item.icon className="h-5 w-5" />
//                   </div>

//                   <span className="text-sm font-medium text-zinc-200">
//                     {item.title}
//                   </span>
//                 </div>
//               ))}
//             </div>
//           </motion.div>

//           {/* RIGHT SIDE */}
//           <motion.div
//             initial={{ opacity: 0, scale: 0.92 }}
//             animate={{ opacity: 1, scale: 1 }}
//             transition={{ duration: 0.7 }}
//             className="relative"
//           >
//             {/* floating phone */}
//             <img
//               src={phone2}
//               alt="wallet phone"
//               className="relative  -right-44 hidden  xl:block  w-90  max-w-none object-contain opacity-50 drop-shadow-[0_25px_50px_rgba(0,0,0,0.7)] "
//               // className="relative  -right-20 hidden  xl:block  w-150   max-w-none object-contain opacity-70 rounded-4xl drop-shadow-[0_25px_50px_rgba(0,0,0,0.7)] "
//             />

//             {/* MAIN CARD */}
//             <div className="absolute -bottom-2 -left-12 scale-95 overflow-hidden rounded-[32px] border border-white/10 bg-white/5 p-5 shadow-[0_20px_70px_rgba(0,0,0,0.5)] backdrop-blur-2xl">
//             {/* <div className="absolute -bottom-20 -left-28 scale-95 overflow-hidden rounded-[32px] border border-white/10 bg-white/5 p-5 shadow-[0_20px_70px_rgba(0,0,0,0.5)] backdrop-blur-2xl"> */}
//               {/* Glow Effects */}
//               <div className="absolute -right-20 -top-20 h-52 w-52 rounded-full bg-emerald-500/20 blur-3xl" />

//               <div className="absolute bottom-0 left-0 h-36 w-36 rounded-full bg-cyan-500/10 blur-3xl" />

//               {/* Header */}
//               <div className="flex items-start justify-between">
//                 <div>
//                   <p className="text-sm font-medium text-zinc-400">
//                     Total Balance
//                   </p>

//                   <h2 className="mt-2 text-3xl font-black tracking-tight">
//                     $84,250
//                   </h2>

//                   <div className="mt-4 flex items-center gap-2">
//                     <div className="h-2 w-2 rounded-full bg-emerald-400" />

//                     <p className="text-sm text-emerald-400">
//                       +18.2% this month
//                     </p>
//                   </div>
//                 </div>

//                 <div className="rounded-2xl border border-emerald-600/20 bg-emerald-800/10 px-4 py-3 backdrop-blur-xl">
//                   <p className="text-xs font-medium text-zinc-300">Revenue</p>

//                   <h4 className="mt-1 text-xl font-black text-emerald-400">
//                     +18.2%
//                   </h4>
//                 </div>
//               </div>

//               {/* Graph */}
//               <div className="mt-5 flex h-24 items-end gap-2 px-6">
//                 {[40, 65, 55, 90, 70, 120, 85].map((height, i) => (
//                   <motion.div
//                     key={i}
//                     initial={{ height: 0 }}
//                     animate={{ height: `${height}%` }}
//                     transition={{
//                       delay: i * 0.08,
//                       duration: 0.5,
//                     }}
//                     className="relative  flex-1 overflow-hidden rounded-t-2xl bg-linear-to-t from-emerald-500 via-emerald-400 to-cyan-300"
//                   >
//                     <div className="absolute inset-0 bg-white/10" />
//                   </motion.div>
//                 ))}
//               </div>

//               {/* Stats Cards */}
//               <div className="mt-6 grid gap-3 md:grid-cols-3">
//                 {/* Card 1 */}
//                 <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#0f172a]/90 p-4 backdrop-blur-xl">
//                   <img
//                     src={phone2}
//                     alt=""
//                     className="absolute bottom-0 right-0 w-14 opacity-[0.05]"
//                   />

//                   <div className="relative z-10">
//                     <p className="text-xs font-medium text-zinc-400">
//                       Monthly Spending
//                     </p>

//                     <h3 className="mt-2 text-xl font-black text-white">
//                       $2,840
//                     </h3>

//                     <p className="mt-2 text-xs font-medium text-emerald-400">
//                       +12% this month
//                     </p>
//                   </div>
//                 </div>

//                 {/* Card 2 */}
//                 <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#0f172a]/90 p-4 backdrop-blur-xl">
//                   <img
//                     src={phone2}
//                     alt=""
//                     className="absolute bottom-0 right-0 w-14 opacity-[0.05]"
//                   />

//                   <div className="relative z-10">
//                     <p className="text-xs font-medium text-zinc-400">
//                       Active Cards
//                     </p>

//                     <h3 className="mt-2 text-xl font-black text-white">
//                       12 Cards
//                     </h3>

//                     <p className="mt-2 text-xs font-medium text-cyan-400">
//                       4 virtual cards
//                     </p>
//                   </div>
//                 </div>

//                 {/* Card 3 */}
//                 <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#0f172a]/90 p-4 backdrop-blur-xl">
//                   <img
//                     src={phone2}
//                     alt=""
//                     className="absolute bottom-0 right-0 w-14 opacity-[0.05]"
//                   />

//                   <div className="relative z-10">
//                     <p className="text-xs font-medium text-zinc-400">
//                       Transfers
//                     </p>

//                     <h3 className="mt-2 text-xl font-black text-white">248k</h3>

//                     <p className="mt-2 text-xs font-medium text-purple-400">
//                       Global payments
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* floating transfer card */}
//             <motion.div className="absolute -bottom-20 -left-68 hidden w-64 rounded-3xl border border-white/10 bg-white/10 p-5 shadow-2xl backdrop-blur-2xl lg:block">
//               <div className="flex items-center justify-between">
//                 <p className="text-sm text-zinc-300">Quick Transfer</p>

//                 <div className="h-3 w-3 rounded-full bg-emerald-400" />
//               </div>

//               <div className="mt-5 flex items-center gap-3">
//                 <div className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/20 text-lg font-black text-emerald-400">
//                   A
//                 </div>

//                 <div>
//                   <h4 className="font-bold">Alex Morgan</h4>

//                   <p className="text-sm text-zinc-400">Sent Successfully</p>
//                 </div>
//               </div>

//               <div className="mt-6 flex items-end justify-between">
//                 <h2 className="text-3xl font-black">$1,250</h2>

//                 <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-400">
//                   Completed
//                 </span>
//               </div>
//             </motion.div>
//           </motion.div>
//         </div>
//       </div>
//     </section>
//   );
// }



import { motion } from "framer-motion";
import {
  ArrowUpRight,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  Globe2,
  Play,
} from "lucide-react";

import phone2 from "@/assets/images/pho.png";
import { Link } from "react-router";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-[#1F2340] py-16 text-white">
      {/* gradients */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(139,144,208,0.18),transparent_30%),radial-gradient(circle_at_bottom_left,rgba(183,179,217,0.15),transparent_35%)]" />

      {/* grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-size-[70px_70px] opacity-[0.04]" />

      {/* blur effects */}
      <div className="absolute -left-20 top-20 h-72 w-72 rounded-full bg-[#8B90D0]/30 blur-3xl" />

      <div className="absolute -bottom-20 right-0 h-72 w-72 rounded-full bg-[#B7B3D9]/20 blur-3xl" />

      <div className="relative z-10 mx-auto w-11/12 px-6 pb-20 pt-10">
        <div className="grid items-center gap-36 lg:grid-cols-[1fr_0.95fr]">
          {/* LEFT CONTENT */}
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
                to="/dashboard"
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

            {/* features */}
            <div className="mt-5 flex flex-wrap gap-5">
              {[
                {
                  icon: ShieldCheck,
                  title: "Bank-level Security",
                },
                {
                  icon: TrendingUp,
                  title: "Real-time Analytics",
                },
                {
                  icon: Globe2,
                  title: "Global Transfers",
                },
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

          {/* RIGHT SIDE */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            {/* floating phone */}
            <img
              src={phone2}
              alt="wallet phone"
              className="relative rounded-4xl -right-48 hidden w-90 max-w-none object-contain opacity-55 drop-shadow-[0_25px_50px_rgba(0,0,0,0.7)] xl:block"
            />

            {/* MAIN CARD */}
            <div className="absolute -bottom-2 -left-12 scale-95 overflow-hidden rounded-[32px] border border-white/10 bg-white/5 p-5 shadow-[0_20px_70px_rgba(0,0,0,0.5)] backdrop-blur-2xl">
              {/* Glow Effects */}
              <div className="absolute -right-20 -top-20 h-52 w-52 rounded-full bg-[#8B90D0]/20 blur-3xl" />

              <div className="absolute bottom-0 left-0 h-36 w-36 rounded-full bg-[#B7B3D9]/10 blur-3xl" />

              {/* Header */}
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-[#B6BCD3]">
                    Total Balance
                  </p>

                  <h2 className="mt-2 text-3xl font-black tracking-tight">
                    $84,250
                  </h2>

                  <div className="mt-4 flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-[#F5A524]" />

                    <p className="text-sm text-[#F5A524]">
                      +18.2% this month
                    </p>
                  </div>
                </div>

                <div className="rounded-2xl border border-[#8B90D0]/20 bg-[#8B90D0]/10 px-4 py-3 backdrop-blur-xl">
                  <p className="text-xs font-medium text-[#D6D2F0]">
                    Revenue
                  </p>

                  <h4 className="mt-1 text-xl font-black text-[#F5A524]">
                    +18.2%
                  </h4>
                </div>
              </div>

              {/* Graph */}
              <div className="mt-5 flex h-24 items-end gap-2 px-6">
                {[40, 65, 55, 90, 70, 120, 85].map((height, i) => (
                  <motion.div
                    key={i}
                    initial={{ height: 0 }}
                    animate={{ height: `${height}%` }}
                    transition={{
                      delay: i * 0.08,
                      duration: 0.5,
                    }}
                    className="relative flex-1 overflow-hidden rounded-t-2xl bg-linear-to-t from-[#8B90D0] via-[#6C72B8] to-[#2B3055]"
                  >
                    <div className="absolute inset-0 bg-white/10" />
                  </motion.div>
                ))}
              </div>

              {/* Stats Cards */}
              <div className="mt-6 grid gap-3 md:grid-cols-3">
                {/* Card 1 */}
                <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#2B3055]/90 p-4 backdrop-blur-xl">
                  <img
                    src={phone2}
                    alt=""
                    className="absolute bottom-0 right-0 w-14 opacity-[0.05]"
                  />

                  <div className="relative z-10">
                    <p className="text-xs font-medium text-[#B6BCD3]">
                      Monthly Spending
                    </p>

                    <h3 className="mt-2 text-xl font-black text-white">
                      $2,840
                    </h3>

                    <p className="mt-2 text-xs font-medium text-[#F5A524]">
                      +12% this month
                    </p>
                  </div>
                </div>

                {/* Card 2 */}
                <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#2B3055]/90 p-4 backdrop-blur-xl">
                  <img
                    src={phone2}
                    alt=""
                    className="absolute bottom-0 right-0 w-14 opacity-[0.05]"
                  />

                  <div className="relative z-10">
                    <p className="text-xs font-medium text-[#B6BCD3]">
                      Active Cards
                    </p>

                    <h3 className="mt-2 text-xl font-black text-white">
                      12 Cards
                    </h3>

                    <p className="mt-2 text-xs font-medium text-[#D6D2F0]">
                      4 virtual cards
                    </p>
                  </div>
                </div>

                {/* Card 3 */}
                <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#2B3055]/90 p-4 backdrop-blur-xl">
                  <img
                    src={phone2}
                    alt=""
                    className="absolute bottom-0 right-0 w-14 opacity-[0.05]"
                  />

                  <div className="relative z-10">
                    <p className="text-xs font-medium text-[#B6BCD3]">
                      Transfers
                    </p>

                    <h3 className="mt-2 text-xl font-black text-white">
                      248k
                    </h3>

                    <p className="mt-2 text-xs font-medium text-[#8B90D0]">
                      Global payments
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* floating transfer card */}
            <motion.div className="absolute -bottom-20 -left-68 hidden w-64 rounded-3xl border border-white/10 bg-white/10 p-5 shadow-2xl backdrop-blur-2xl lg:block">
              <div className="flex items-center justify-between">
                <p className="text-sm text-[#D6D2F0]">
                  Quick Transfer
                </p>

                <div className="h-3 w-3 rounded-full bg-[#F5A524]" />
              </div>

              <div className="mt-5 flex items-center gap-3">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#8B90D0]/20 text-lg font-black text-[#D6D2F0]">
                  A
                </div>

                <div>
                  <h4 className="font-bold">Alex Morgan</h4>

                  <p className="text-sm text-[#B6BCD3]">
                    Sent Successfully
                  </p>
                </div>
              </div>

              <div className="mt-6 flex items-end justify-between">
                <h2 className="text-3xl font-black">$1,250</h2>

                <span className="rounded-full bg-[#F5A524]/10 px-3 py-1 text-xs font-semibold text-[#F5A524]">
                  Completed
                </span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}