import { AnimatePresence, motion } from "framer-motion";
import { PhoneCall, Plus, Minus } from "lucide-react";
import { useState } from "react";

import faqImage from "@/assets/images/faq.jpg";

const faqs = [
  {
    question: "How to integrate WalletIQ with my business?",
    answer:
      "You can integrate WalletIQ using our merchant dashboard, payment links, QR checkout, or API tools. Our onboarding flow helps you connect payments quickly and securely.",
  },
  {
    question: "What to do if a transaction fails on WalletIQ?",
    answer:
      "Check the transaction status from your wallet history. If the amount was deducted, it will either be reversed automatically or marked for support review.",
  },
  {
    question: "How does WalletIQ protect user financial data?",
    answer:
      "WalletIQ uses encrypted sessions, secure authentication, fraud monitoring, and strict access controls to help protect every user account.",
  },
  {
    question: "Can I use WalletIQ for international payments?",
    answer:
      "Yes. WalletIQ supports cross-border transfers with transparent rates, secure processing, and real-time transaction updates.",
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="bg-[#F8FAFC] px-6 py-24 text-[#1F2340] dark:bg-black">
      <div className="mx-auto grid max-w-7xl gap-16 lg:grid-cols-[0.95fr_1.05fr]">
        <div>
          <h2 className="max-w-xl text-5xl font-light leading-tight tracking-tight sm:text-6xl dark:text-white">
            Frequently Asked{" "}
            <span className="bg-linear-to-r from-[#23194f] via-[#8B90D0] to-[#3159E7] bg-clip-text text-transparent">
              Questions
            </span>
          </h2>

          <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-600">
            Find quick answers about payments, security, transfers, and business
            integration with WalletIQ.
          </p>

          <div className="relative mt-10 max-w-2xl">
            <img
              src={faqImage}
              alt="WalletIQ support"
              className="h-56 w-full rounded-[22px] object-cover"
            />

            <div className="absolute -bottom-14 left-0 flex w-90 max-w-[92%] items-center gap-5 rounded-3xl bg-white p-5 shadow-[0_22px_60px_rgba(31,35,64,0.14)]">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-[#2f294e] text-white">
                <PhoneCall className="h-7 w-7" />
              </div>

              <div>
                <h3 className="text-2xl font-black text-[#283050]">
                  Call Us Now!
                </h3>
                <p className="mt-1 text-lg text-slate-700">+62 897-897-098</p>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <div key={faq.question} className="border-b border-slate-300">
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? -1 : index)}
                  className="flex w-full items-center gap-8 py-7 text-left"
                >
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center text-[#F59E0B]">
                    {isOpen ? (
                      <Minus className="h-5 w-5" />
                    ) : (
                      <Plus className="h-5 w-5" />
                    )}
                  </span>

                  <span className="text-xl font-black text-black dark:text-white">
                    {faq.question}
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.28, ease: "easeOut" }}
                      className="overflow-hidden"
                    >
                      <p className="pb-8 pl-16 text-lg leading-8 text-slate-600 dark:text-slate-300">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}