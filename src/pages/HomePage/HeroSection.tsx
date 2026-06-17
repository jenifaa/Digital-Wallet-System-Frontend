import { motion } from "framer-motion";
import {
  ArrowUpRight,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  Globe2,
  Play,
} from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

import phone2 from "@/assets/images/rob.png";
import robot from "@/assets/images/robot_transparent.webm";

// import im1 from "@/assets/images/1.png";
// import im2 from "@/assets/images/2.png";
// import im3 from "@/assets/images/3.png";
// import im4 from "@/assets/images/4.png";
// import im5 from "@/assets/images/5.png";
// import im6 from "@/assets/images/6.png";
// import im7 from "@/assets/images/7.png";
// import im8 from "@/assets/images/8.png";
// import im9 from "@/assets/images/9.png";
// import im10 from "@/assets/images/10.png";

import i1 from "@/assets/icons/money.png";
import i2 from "@/assets/icons/notification.png";
import i3 from "@/assets/icons/loan.png";
import i4 from "@/assets/icons/send.png";
import i5 from "@/assets/icons/wallet.png";
import i6 from "@/assets/icons/withdraw.png";

import { Link } from "react-router";
import { useRef } from "react";

gsap.registerPlugin(useGSAP);

// Each icon's final position relative to the robot image center-top area.
// The robot image is w-100 (~400px). Top-right area ≈ x:55–75%, y:15–45%.
// We store final offsets from the icon's initial stacked position so GSAP can tween from 0 → these.
const ICON_CONFIG = [
  // top-left of cluster — money
  { finalX: -110, finalY: -90, rotation: -18, floatAmp: 10, floatDur: 2.1 },
  // top-right — notification
  { finalX: 100, finalY: -80, rotation: 14, floatAmp: 13, floatDur: 1.9 },
  // mid-left — loan
  { finalX: -130, finalY: 30, rotation: -10, floatAmp: 9, floatDur: 2.4 },
  // mid-right — send
  { finalX: 120, finalY: 20, rotation: 20, floatAmp: 12, floatDur: 2.0 },
  // bottom-left — wallet
  { finalX: -60, finalY: 130, rotation: 8, floatAmp: 11, floatDur: 2.3 },
  // bottom-right — withdraw
  { finalX: 70, finalY: 145, rotation: -16, floatAmp: 8, floatDur: 1.8 },
];

export default function HeroSection() {
  const iconContainer = useRef<HTMLDivElement>(null);
  // const robotRef = useRef<HTMLDivElement>(null);

  // const robotFrames = [im1, im2, im3, im4, im5, im6, im7, im8, im9, im10];

  useGSAP(
    () => {
      const icons = gsap.utils.toArray<HTMLElement>(".popup-icon");

      // 1. Start: all icons hidden, at scale 0, clustered together
      gsap.set(icons, {
        opacity: 0,
        scale: 0,
        x: 0,
        y: 0,
        rotation: 0,
        filter: "drop-shadow(0px 0px 0px rgba(139,144,208,0))",
      });

      const tl = gsap.timeline({ delay: 0.6 });

      // 2. Entrance: all burst outward simultaneously from cluster
      icons.forEach((icon, i) => {
        const cfg = ICON_CONFIG[i];

        // Pop into view with glow flash
        tl.to(
          icon,
          {
            opacity: 1,
            scale: 1.25,
            duration: 0.35,
            ease: "back.out(2.5)",
            filter:
              "drop-shadow(0px 0px 18px rgba(139,144,208,0.95)) drop-shadow(0px 0px 8px rgba(214,210,240,0.8))",
          },
          i === 0 ? "burst" : "burst+=0.06", // stagger by 60ms
        );

        // Fly to final position while settling scale + glow dims
        tl.to(
          icon,
          {
            x: cfg.finalX,
            y: cfg.finalY,
            rotation: cfg.rotation,
            scale: 1,
            duration: 0.6,
            ease: "power3.out",
            filter:
              "drop-shadow(0px 4px 12px rgba(139,144,208,0.5)) drop-shadow(0px 0px 4px rgba(214,210,240,0.3))",
          },
          `burst+=${i * 0.06 + 0.1}`,
        );
      });

      // 3. After entrance: idle float — each icon floats independently
      tl.call(() => {
        icons.forEach((icon, i) => {
          const cfg = ICON_CONFIG[i];
          gsap.to(icon, {
            y: `+=${cfg.floatAmp}`,
            duration: cfg.floatDur,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
          });

          // Subtle glow pulse
          gsap.to(icon, {
            filter:
              "drop-shadow(0px 6px 16px rgba(139,144,208,0.7)) drop-shadow(0px 0px 6px rgba(214,210,240,0.5))",
            duration: cfg.floatDur * 0.8,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
          });
        });
      });
    },
    { scope: iconContainer },
  );

  // useGSAP(() => {
  //   const frames = gsap.utils.toArray<HTMLElement>(".robot-frame");

  //   gsap.set(frames, {
  //     opacity: 0,
  //     scale: 1,
  //   });

  //   gsap.set(frames[0], {
  //     opacity: 1,
  //   });

  //   const tl = gsap.timeline({
  //     repeat: -1,
  //     repeatDelay: 1,
  //   });

  //   frames.forEach((frame, i) => {
  //     if (i === 0) return;

  //     tl.to(frames[i - 1], {
  //       opacity: 0,
  //       scale: 0.98,
  //       duration: 0.25,
  //       ease: "power2.out",
  //     });

  //     tl.fromTo(
  //       frame,
  //       {
  //         opacity: 0,
  //         scale: 0.95,
  //         y: 10,
  //       },
  //       {
  //         opacity: 1,
  //         scale: 1,
  //         y: 0,
  //         duration: 0.35,
  //         ease: "back.out(1.7)",
  //       },
  //       "<",
  //     );
  //   });
  // }, []);

  return (
    <section className="relative overflow-hidden bg-[#1F2340] py-16 text-white">
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
                { icon: Globe2, title: "Global Transfers" },
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
            // initial={{ opacity: 0, scale: 0.92 }}
            // animate={{ opacity: 1, scale: 1 }}
            // transition={{ duration: 0.7 }}
            className="relative"
          >
            {/* Icon burst container — icons are absolutely positioned relative to this */}
            <div ref={iconContainer} className="relative hidden xl:block">
              <video src={robot}  className="w-100 object-contain" autoPlay loop />
              {/* <div ref={robotRef} className="relative h-100 w-100"> */}
                {/* {robotFrames.map((img, index) => (
                  <img
                    key={index}
                    src={img}
                    alt={`robot-${index}`}
                    className="robot-frame absolute inset-0 h-full w-full object-contain"
                  />
                ))} */}
              {/* </div> */}

              {/* <img
                src={i1}
                alt="money"
                className="popup-icon absolute left-[65%] top-[25%] w-10 cursor-pointer"
              />
              <img
                src={i2}
                alt="notification"
                className="popup-icon absolute left-[65%] top-[25%] w-10 cursor-pointer"
              />
              <img
                src={i3}
                alt="loan"
                className="popup-icon absolute left-[65%] top-[25%] w-10 cursor-pointer"
              />
              <img
                src={i4}
                alt="send"
                className="popup-icon absolute left-[65%] top-[25%] w-10 cursor-pointer"
              />
              <img
                src={i5}
                alt="wallet"
                className="popup-icon absolute left-[65%] top-[25%] w-10 cursor-pointer"
              />
              <img
                src={i6}
                alt="withdraw"
                className="popup-icon absolute left-[65%] top-[25%] w-10 cursor-pointer"
              /> */}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
