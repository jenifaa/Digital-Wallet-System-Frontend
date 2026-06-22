import { Link } from "react-router";
import {
  ArrowRight,
  CheckCircle2,
  ShieldCheck,
 
  CreditCard,
} from "lucide-react";

const benefits = [
  "Send and receive money instantly",
  "Track expenses with smart insights",
  "Pay securely with cards or wallet balance",
];
import img from "@/assets/images/tr.jpg"
import img2 from "@/assets/images/tr2.jpg"

export default function DigitalTransactionPage() {
  return (
    <section className="relative overflow-hidden bg-[#F8FAFC] pt-16   text-[#1F2340] dark:bg-black dark:text-white sm:py-20 lg:py-24">
      <div className="flex mb-4 justify-center items-center">
        {" "}
        <div className=" rounded-full border border-[#8B90D0]/30 bg-white/80 px-5 py-2 text-xs font-black uppercase tracking-[0.2em] text-[#6C72B8] shadow-sm backdrop-blur dark:bg-white/10">
          Digital Wallet Platform
        </div>
      </div>
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_16%_18%,rgba(139,144,208,0.25),transparent_30%),radial-gradient(circle_at_86%_72%,rgba(245,158,11,0.15),transparent_28%)]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-[#8B90D0]/60 to-transparent" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1fr_1.12fr] lg:gap-16">
        <div className="relative mx-auto w-full  ">
          <div className="relative overflow-visible rounded-[34px] bg-linear-to-br from-white via-[#EEF0FF] to-[#F8FAFC] p-4 shadow-[0_28px_90px_rgba(31,35,64,0.14)]">
            <img
              src={img}
              alt="Smiling person using digital wallet"
              className="h-100 w-full rounded-[28px] object-cover object-center"
            />

            <div className="absolute -left-10 top-30 rounded-3xl border border-white/80 bg-white/90 p-4 shadow-[0_20px_55px_rgba(31,35,64,0.18)] backdrop-blur-xl sm:-left-16 sm:p-5">
              <p className="text-xs font-black uppercase tracking-[0.18em] text-[#6C72B8]">
                Expense Statistic
              </p>

              <div className="mt-5 flex h-32 items-end gap-3">
                {[55, 38, 64, 28, 88, 58].map((height, index) => (
                  <div key={index} className="flex flex-col items-center gap-2">
                    <div
                      style={{ height: `${height}px` }}
                      className="w-5 rounded-full bg-linear-to-t from-[#6C72B8] via-[#8B90D0] to-[#F59E0B]"
                    />
                    <span className="text-[10px] font-bold text-slate-400">
                      {["Jan", "Feb", "Mar", "Apr", "May", "Jun"][index]}
                    </span>
                  </div>
                ))}
              </div>

              <div className="absolute left-1/2 top-14 rounded-2xl bg-white px-4 py-2 shadow-[0_12px_30px_rgba(31,35,64,0.12)]">
                <p className="text-xs font-black text-[#1F2340]">$7,120 USD</p>
              </div>
            </div>

            <div className="absolute right-2 -bottom-4 rounded-3xl border border-white/80 bg-white/90 p-4 shadow-[0_20px_55px_rgba(31,35,64,0.16)] backdrop-blur-xl sm:right-6">
              <div className="flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#EEF0FF] text-[#6C72B8]">
                  <CreditCard size={22} />
                </span>
                <div>
                  <p className="text-xs font-bold text-slate-400">
                    Card payment
                  </p>
                  <p className="text-sm font-black text-[#1F2340]">Approved</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div>
          <h1 className="mt-6 max-w-3xl text-4xl  font-light leading-tight tracking-tight sm:text-5xl lg:text-6xl">
            Seamless Digital{" "}
            <span className="bg-linear-to-r from-[#321653] via-[#8B90D0] to-[#315BE8] bg-clip-text text-transparent">
              Transactions
            </span>{" "}
            By WalletIQ
          </h1>

          <p className=" max-w-2xl text-base leading-8 text-slate-500 dark:text-white/60 sm:text-md">
            Manage payments, transfers, cards, and spending from one secure
            wallet experience built for speed, clarity, and everyday confidence.
          </p>

          <div className="flex gap-5">
            <div className="mt-8 grid   rounded-[28px] border border-[#8B90D0]/20 bg-white/70 p-5 shadow-[0_20px_65px_rgba(31,35,64,0.08)] backdrop-blur-xl dark:border-white/10 dark:bg-white/5">
              {benefits.map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-[#F59E0B]" />
                  <p className="text-sm font-semibold text-slate-600 dark:text-white/70 sm:text-base">
                    {item}
                  </p>
                </div>
              ))}
            </div>
            <div className="mt-8 overflow-hidden rounded-[30px] shadow-[0_22px_65px_rgba(31,35,64,0.12)]">
              <img
                src={img2}
                alt="Customer making a contactless digital payment"
                className="h-40 sm:w-full  object-cover "
              />
            </div>
          </div>

          

          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <Link
              to="/features"
              className="inline-flex min-h-14 items-center justify-center gap-3 rounded-full bg-[#8B90D0] px-7 text-sm font-black text-white shadow-[0_18px_40px_rgba(49,91,232,0.3)] transition hover:bg-[#2549c8]"
            >
              Discover More
              <ArrowRight size={18} />
            </Link>

            <Link
              to="/contact"
              className="inline-flex min-h-14 items-center justify-center gap-3 rounded-full border border-[#8B90D0]/30 bg-white/70 px-7 text-sm font-black text-[#1F2340] transition hover:border-[#6C72B8] hover:text-[#6C72B8] dark:bg-white/10 dark:text-white"
            >
              <ShieldCheck size={18} />
              Secure Wallet
            </Link>
          </div>
        </div>
      </div>

     
    </section>
  );
}
