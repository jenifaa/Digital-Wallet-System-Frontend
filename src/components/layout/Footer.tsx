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

export default function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-4">
          <div className="space-y-4">
            <h2 className="text-xl font-bold">
              Wallet<span className="text-indigo-500">IQ</span>
            </h2>
            <p className="text-sm leading-7 text-muted-foreground">
              A modern digital wallet platform for payments, loans, and
              financial management.
            </p>
          </div>

          {Object.entries(footerLinks).map(([section, links]) => (
            <div key={section}>
              <h3 className="mb-4 text-sm font-semibold capitalize">{section}</h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.to}
                      className="text-sm text-muted-foreground transition hover:text-foreground"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t pt-8 sm:flex-row">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} WalletIQ. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground">
            Built with security, speed, and accessibility in mind.
          </p>
        </div>
      </div>
    </footer>
  );
}
