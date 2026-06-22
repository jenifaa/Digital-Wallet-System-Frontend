import { Link } from "react-router";

const footerLinks = {
  product: [
    { label: "Features", to: "/features" },
    { label: "Pricing", to: "/pricing" },
    { label: "Services", to: "/service" },
    { label: "FAQ", to: "/faq" },
  ],
  company: [
    { label: "About", to: "/about" },
    { label: "Contact", to: "/contact" },
    { label: "Careers", to: "/contact" },
  ],
  legal: [
    { label: "Privacy Policy", to: "/about" },
    { label: "Terms of Service", to: "/about" },
    { label: "Security", to: "/features" },
  ],
};

const stats = [
  { value: "99.9%", label: "Secure uptime" },
  { value: "2 sec", label: "Avg transfer" },
  { value: "24/7", label: "Monitoring" },
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-[#EEF0FF] text-[#1F2340] dark:bg-black dark:text-white">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(248,250,252,0.96)_0%,rgba(238,240,255,0.95)_42%,rgba(214,210,240,0.55)_100%)] dark:bg-[linear-gradient(135deg,rgba(0,0,0,1)_0%,rgba(31,35,64,0.96)_55%,rgba(108,114,184,0.55)_100%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(139,144,208,0.28),transparent_32%),radial-gradient(circle_at_86%_72%,rgba(245,158,11,0.16),transparent_30%)]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-[#8B90D0]/70 to-transparent" />

      <div className="relative mx-auto w-11/12 px-4 py-18 sm:px-6 sm:py-22 lg:px-8 lg:py-26">
        <div className="grid gap-12 lg:grid-cols-[1.15fr_1.85fr] lg:gap-20">
          <div>
            <Link to="/" className="inline-flex items-center gap-3">
              <span className="flex h-13 w-13 items-center justify-center rounded-2xl bg-linear-to-br from-[#8B90D0] via-[#6C72B8] to-[#1F2340] text-xl font-black text-white shadow-[0_18px_36px_rgba(108,114,184,0.35)]">
                W
              </span>

              <span className="text-3xl font-black tracking-tight sm:text-4xl">
                Wallet<span className="text-[#6C72B8]">IQ</span>
              </span>
            </Link>

            <p className="mt-6 max-w-lg text-base leading-8 text-slate-600 dark:text-white/65">
              A smart digital wallet for payments, transfers, loans, card
              control, and everyday financial management.
            </p>

            <div className="mt-8 grid max-w-lg grid-cols-3 gap-4">
              {stats.map((item) => (
                <div key={item.label}>
                  <p className="text-2xl font-black text-[#1F2340] dark:text-white">
                    {item.value}
                  </p>
                  <p className="mt-1 text-xs font-bold uppercase tracking-[0.14em] text-[#6C72B8] dark:text-[#D6D2F0]">
                    {item.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-10 sm:grid-cols-3">
            {Object.entries(footerLinks).map(([section, links]) => (
              <div key={section}>
                <h3 className="mb-5 text-sm font-black uppercase tracking-[0.2em] text-[#1F2340] dark:text-white">
                  {section}
                </h3>

                <ul className="space-y-3">
                  {links.map((link) => (
                    <li key={link.label}>
                      <Link
                        to={link.to}
                        className="text-sm font-semibold text-slate-600 transition hover:text-[#6C72B8] dark:text-white/60 dark:hover:text-white"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 grid gap-6 border-y border-[#8B90D0]/25 py-8 md:grid-cols-3">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.18em] text-[#6C72B8]">
              Payments
            </p>
            <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-white/60">
              Send, receive, and manage payments with a fast wallet experience.
            </p>
          </div>

          <div>
            <p className="text-sm font-black uppercase tracking-[0.18em] text-[#6C72B8]">
              Protection
            </p>
            <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-white/60">
              Built around secure access, transaction safety, and account
              confidence.
            </p>
          </div>

          <div>
            <p className="text-sm font-black uppercase tracking-[0.18em] text-[#F59E0B]">
              Mobile first
            </p>
            <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-white/60">
              Designed for smooth Android and iOS wallet control.
            </p>
          </div>
        </div>

        <div className="mt-8 flex flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left">
          <p className="text-xs font-semibold text-slate-500 dark:text-white/50">
            © {new Date().getFullYear()} WalletIQ. All rights reserved.
          </p>

          <p className="text-xs font-semibold text-slate-500 dark:text-white/50">
            Secure. Fast. Simple.
          </p>
        </div>
      </div>
    </footer>
  );
}