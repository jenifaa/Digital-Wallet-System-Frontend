
// import {
//   ArrowRight,
//   CheckCircle2,
//   Globe,
//   Headphones,
// } from "lucide-react"

// import { Button } from "@/components/ui/button"
// import { Card, CardContent } from "@/components/ui/card"

// export default function HeroSection() {
//   return (
//     <section className="relative overflow-hidden bg-[#f3f4f6]">
//       {/* angled background */}
//       <div className="absolute left-0 top-[38%] h-175 w-full -skew-y-6 bg-[#003f43]" />

//       <div className="relative z-10 mx-auto max-w-7xl px-6 pb-28 pt-8 lg:px-10">
//         {/* HERO */}
//         <div className="grid items-center gap-12 lg:grid-cols-2">
//           {/* LEFT CONTENT */}
//           <div className="max-w-xl pt-10">
//             <div className="mb-5 flex items-center gap-2 text-sm font-semibold text-[#003f43]">
//               <span className="text-lg">✦</span>
//               <span>Digital Wallet Platform</span>
//             </div>

//             <h1 className="text-5xl font-black leading-[1.05] tracking-tight text-black lg:text-6xl">
//               Secure & Seamless
//               <br />
//               Digital Wallet
//               <br />
//               Payments
//             </h1>

//             <p className="mt-6 max-w-lg text-base leading-7 text-neutral-600">
//               A modern wallet system built for secure, fast, and reliable
//               financial transactions worldwide with complete flexibility and
//               enterprise-level protection.
//             </p>

//             {/* BUTTONS */}
//             <div className="mt-8 flex flex-wrap items-center gap-4">
//               <Button className="h-14 rounded-xl border-2 border-black bg-lime-400 px-8 text-base font-bold text-black shadow-[4px_4px_0px_#000] transition-all hover:-translate-y-0.5 hover:bg-lime-300">
//                 Get Started
//               </Button>

//               <Button
//                 variant="outline"
//                 className="h-14 rounded-xl border-2 border-black bg-yellow-300 px-8 text-base font-bold text-black shadow-[4px_4px_0px_#000] transition-all hover:-translate-y-0.5 hover:bg-yellow-200"
//               >
//                 About Us
//               </Button>
//             </div>

//             {/* FEATURES */}
//             <div className="mt-7 flex flex-wrap gap-5 text-sm text-neutral-600">
//               <div className="flex items-center gap-2">
//                 <CheckCircle2 className="h-4 w-4" />
//                 No credit card required
//               </div>

//               <div className="flex items-center gap-2">
//                 <Globe className="h-4 w-4" />
//                 Trusted 120+ Countries
//               </div>

//               <div className="flex items-center gap-2">
//                 <Headphones className="h-4 w-4" />
//                 24/7 Support
//               </div>
//             </div>

//             {/* USERS */}
//             <div className="mt-8 flex items-center gap-4">
//               <div className="flex -space-x-3">
//                 <img
//                   src="https://i.pravatar.cc/100?img=1"
//                   alt="user"
//                   width={46}
//                   height={46}
//                   className="rounded-full border-2 border-white"
//                 />

//                 <img
//                   src="https://i.pravatar.cc/100?img=2"
//                   alt="user"
//                   width={46}
//                   height={46}
//                   className="rounded-full border-2 border-white"
//                 />
//                 <img
//                   src="https://i.pravatar.cc/100?img=3"
//                   alt="user"
//                   width={46}
//                   height={46}
//                   className="rounded-full border-2 border-white"
//                 />
//               </div>

//               <div>
//                 <h4 className="text-lg font-black text-black">20.8k+</h4>
//                 <p className="text-sm text-neutral-500">
//                   Positive Wallet Reviews
//                 </p>
//               </div>
//             </div>
//           </div>

//           {/* RIGHT SIDE */}
//           <div className="relative flex justify-center lg:justify-end">
//             {/* DASHBOARD */}
//             <div className="relative w-full max-w-180 rounded-[28px] border-[5px] border-black bg-white p-5 shadow-2xl">
//               {/* top nav */}
//               <div className="mb-6 flex items-center justify-between">
//                 <div className="flex items-center gap-8">
//                   <h3 className="text-xl font-black">WalletPay</h3>

//                   <div className="hidden items-center gap-3 md:flex">
//                     <span className="rounded-full bg-black px-4 py-1 text-xs font-semibold text-white">
//                       Dashboard
//                     </span>

//                     <span className="text-xs font-medium text-neutral-500">
//                       Payments
//                     </span>

//                     <span className="text-xs font-medium text-neutral-500">
//                       History
//                     </span>

//                     <span className="text-xs font-medium text-neutral-500">
//                       Settings
//                     </span>
//                   </div>
//                 </div>

//                 <div className="hidden items-center gap-3 md:flex">
//                   <div className="h-10 w-40 rounded-full bg-neutral-100" />
//                   <div className="h-10 w-10 rounded-full bg-neutral-200" />
//                   <div className="h-10 w-10 rounded-full bg-neutral-200" />
//                 </div>
//               </div>

//               {/* content */}
//               <div className="grid gap-4 lg:grid-cols-[1fr_320px]">
//                 {/* LEFT */}
//                 <div className="space-y-4">
//                   {/* balance */}
//                   <Card className="rounded-3xl border-none bg-[#5b5cff] text-white shadow-none">
//                     <CardContent className="p-6">
//                       <div className="flex items-start justify-between">
//                         <div>
//                           <p className="text-sm text-white/80">
//                             Available Balance
//                           </p>

//                           <h2 className="mt-2 text-4xl font-black">
//                             $42,580
//                           </h2>

//                           <p className="mt-4 text-sm text-white/80">
//                             Updated today
//                           </p>
//                         </div>

//                         <div className="rounded-2xl bg-white/20 p-4">
//                           <ArrowRight className="h-6 w-6" />
//                         </div>
//                       </div>
//                     </CardContent>
//                   </Card>

//                   {/* transactions */}
//                   <Card className="rounded-3xl border-none bg-[#f7f7f7] shadow-none">
//                     <CardContent className="p-5">
//                       <div className="mb-5 flex items-center justify-between">
//                         <h4 className="text-lg font-black">
//                           Recent Transactions
//                         </h4>

//                         <span className="text-sm text-neutral-500">
//                           This Week
//                         </span>
//                       </div>

//                       <div className="space-y-4">
//                         {[
//                           {
//                             name: "Netflix",
//                             amount: "-$15.99",
//                           },
//                           {
//                             name: "Spotify",
//                             amount: "-$9.99",
//                           },
//                           {
//                             name: "Apple Store",
//                             amount: "-$149.00",
//                           },
//                         ].map((item, index) => (
//                           <div
//                             key={index}
//                             className="flex items-center justify-between rounded-2xl bg-white p-4"
//                           >
//                             <div className="flex items-center gap-3">
//                               <div className="h-12 w-12 rounded-full bg-[#e5e7eb]" />

//                               <div>
//                                 <h5 className="font-bold">{item.name}</h5>
//                                 <p className="text-sm text-neutral-500">
//                                   Subscription
//                                 </p>
//                               </div>
//                             </div>

//                             <span className="font-bold">
//                               {item.amount}
//                             </span>
//                           </div>
//                         ))}
//                       </div>
//                     </CardContent>
//                   </Card>
//                 </div>

//                 {/* RIGHT */}
//                 <div className="space-y-4">
//                   {/* transfer card */}
//                   <Card className="rounded-3xl border-none bg-[#f7f7f7] shadow-none">
//                     <CardContent className="p-5">
//                       <div className="mb-5 flex items-center justify-between">
//                         <h4 className="font-black">Scheduled Transfers</h4>

//                         <div className="h-8 w-8 rounded-full bg-white" />
//                       </div>

//                       <div className="space-y-4">
//                         {[
//                           "John Carter",
//                           "Sarah Smith",
//                           "Michael Lee",
//                         ].map((name, i) => (
//                           <div
//                             key={i}
//                             className="rounded-2xl bg-white p-4"
//                           >
//                             <div className="flex items-center justify-between">
//                               <div>
//                                 <h5 className="font-bold">{name}</h5>
//                                 <p className="text-sm text-neutral-500">
//                                   International Transfer
//                                 </p>
//                               </div>

//                               <span className="font-black">
//                                 ${(i + 2) * 250}
//                               </span>
//                             </div>
//                           </div>
//                         ))}
//                       </div>
//                     </CardContent>
//                   </Card>

//                   {/* analytics */}
//                   <Card className="rounded-3xl border-none bg-[#f7f7f7] shadow-none">
//                     <CardContent className="p-5">
//                       <div className="mb-6 flex items-center justify-between">
//                         <h4 className="font-black">Wallet Analytics</h4>

//                         <span className="rounded-full bg-black px-3 py-1 text-xs text-white">
//                           Monthly
//                         </span>
//                       </div>

//                       <div className="flex h-56 items-end gap-3">
//                         {[60, 90, 50, 120, 70, 95, 40].map((h, i) => (
//                           <div
//                             key={i}
//                             className="flex-1 rounded-t-2xl bg-[#5b5cff]"
//                             style={{ height: `${h}%` }}
//                           />
//                         ))}
//                       </div>
//                     </CardContent>
//                   </Card>
//                 </div>
//               </div>

//               {/* PHONE MOCKUP */}
//               <div className="absolute -bottom-20 -left-15 hidden w-62.5 rounded-[40px] border-[5px] border-black bg-white p-5 shadow-2xl lg:block">
//                 <div className="mb-5 flex items-center justify-between">
//                   <div className="h-5 w-24 rounded-full bg-black" />
//                   <div className="flex gap-1">
//                     <div className="h-2 w-2 rounded-full bg-black" />
//                     <div className="h-2 w-2 rounded-full bg-black" />
//                     <div className="h-2 w-2 rounded-full bg-black" />
//                   </div>
//                 </div>

//                 <div className="text-center">
//                   <p className="text-sm text-neutral-500">Total Balance</p>

//                   <h2 className="mt-2 text-4xl font-black">$32,510</h2>
//                 </div>

//                 <div className="mt-8 grid grid-cols-4 gap-3">
//                   {["Send", "Receive", "Topup", "More"].map(
//                     (item, index) => (
//                       <div key={index} className="text-center">
//                         <div className="mx-auto mb-2 h-12 w-12 rounded-2xl bg-[#eef2ff]" />

//                         <p className="text-xs font-medium">{item}</p>
//                       </div>
//                     )
//                   )}
//                 </div>

//                 <div className="mt-8">
//                   <div className="mb-4 flex items-center justify-between">
//                     <h5 className="font-black">Transactions</h5>

//                     <span className="text-xs text-neutral-500">
//                       See all
//                     </span>
//                   </div>

//                   <div className="space-y-3">
//                     {[1, 2].map((item) => (
//                       <div
//                         key={item}
//                         className="flex items-center justify-between"
//                       >
//                         <div className="flex items-center gap-3">
//                           <div className="h-10 w-10 rounded-full bg-[#f3f4f6]" />

//                           <div>
//                             <h6 className="text-sm font-bold">
//                               Payment #{item}
//                             </h6>

//                             <p className="text-xs text-neutral-500">
//                               Today
//                             </p>
//                           </div>
//                         </div>

//                         <span className="text-sm font-bold">
//                           -$25.00
//                         </span>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* STATS */}
//         <div className="relative z-20 mx-auto mt-28 max-w-5xl">
//           <div className="grid gap-5 rounded-[28px] border border-white/20 bg-white/90 p-5 shadow-2xl backdrop-blur md:grid-cols-4">
//             {[
//               {
//                 value: "140k",
//                 label: "Active Users",
//               },
//               {
//                 value: "15+",
//                 label: "Years Of Experience",
//               },
//               {
//                 value: "14k",
//                 label: "Wallet Downloads",
//               },
//               {
//                 value: "18k+",
//                 label: "User Reviews",
//               },
//             ].map((item, i) => (
//               <div
//                 key={i}
//                 className="rounded-2xl bg-[#f3f4f6] p-8 text-center"
//               >
//                 <h3 className="text-5xl font-black text-black">
//                   {item.value}
//                 </h3>

//                 <p className="mt-3 text-neutral-500">{item.label}</p>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* TRUSTED */}
//         <div className="mt-20 text-center">
//           <p className="text-lg font-black text-black">
//             Trusted by 152,000+ customers worldwide
//           </p>

//           <div className="mt-10 flex flex-wrap items-center justify-center gap-14 text-3xl font-black text-[#1f1147]">
//             <span>Sitemark</span>
//             <span>Greenish</span>
//             <span>Prismic</span>
//             <span>Umbrella</span>
//             <span>Unsplash</span>
//           </div>
//         </div>
//       </div>
//     </section>
//   )
// }