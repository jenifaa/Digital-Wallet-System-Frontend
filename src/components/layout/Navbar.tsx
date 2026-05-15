import { useEffect, useState } from "react";
import { Link } from "react-router";
import logo from "@/assets/icons/logo.png"
export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  const navLinks = [
    { to: "/", label: "Home", role: "PUBLIC" },
    { to: "/about", label: "About", role: "PUBLIC" },
    { to: "/services", label: "Services", role: "PUBLIC" },
    { to: "/pricing", label: "Pricing", role: "PUBLIC" },

    { to: "/contact", label: "Contact", role: "PUBLIC" },
  ];

  return (
    <header  className={`fixed  top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "border-b bg-white/80 backdrop-blur-xl shadow-sm"
          : "bg-transparent text-white"
      }`}>
      <div className="container w-11/12 mx-auto flex h-16 items-center justify-between px-4 lg:px-6">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-md">
            <img src={logo} alt="Logo" className="h-full w-full object-contain" />
          </div>

          <div>
            <h1 className="text-base font-semibold tracking-tight">WalletIQ</h1>
            <p className="text-xs text-muted-foreground -mt-0.5">
              Modern Experience
            </p>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-1 lg:flex">
          {navLinks
            .filter((link) => link.role === "PUBLIC" || link.role === "USER")
            .map((link, index) => (
              <Link
                key={index}
                to={link.to}
                className="rounded-lg px-4 py-2 text-sm font-medium  transition-all duration-200 hover:bg-muted hover:text-foreground"
              >
                {link.label}
              </Link>
            ))}
        </nav>

        {/* Actions */}
        <div className="hidden items-center gap-3 lg:flex">
          <button className="rounded-xl border px-4 py-2 text-sm font-medium transition hover:bg-muted">
            Login
          </button>

          <button className="rounded-xl bg-[#1F2340] px-5 py-2 text-sm font-medium text-primary-foreground shadow-lg transition hover:opacity-90">
            Get Started
          </button>
        </div>

        {/* Mobile Menu */}
        <details className="relative lg:hidden">
          <summary className="flex cursor-pointer list-none items-center rounded-xl border p-2 hover:bg-muted">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </summary>

          <div className="absolute right-0 mt-3 w-72 rounded-2xl border bg-background p-4 shadow-2xl">
            <div className="flex flex-col gap-1">
              {navLinks
                .filter(
                  (link) => link.role === "PUBLIC" || link.role === "USER",
                )
                .map((link, index) => (
                  <Link
                    key={index}
                    to={link.to}
                    className="rounded-lg px-4 py-2 text-sm font-medium text-muted-foreground transition-all duration-200 hover:bg-muted hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                ))}
            </div>

            <div className="mt-4 flex flex-col gap-2 border-t pt-4">
              <Link to="/login" className="rounded-xl border px-4 py-2.5 text-sm font-medium transition hover:bg-muted">
                Login
              </Link>

              <Link to="/register" className="rounded-xl bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground shadow-lg transition hover:opacity-90">
                Get Started
              </Link>
            </div>
          </div>
        </details>
      </div>
    </header>
  );
}
