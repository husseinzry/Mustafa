"use client";
import React, { useEffect, useState } from "react";
import { animated, useSpring } from "@react-spring/web";
import { Trail } from "./TrailText";
import LetsTalk from "./LetsTalk";
import MenuButton from "./MenuButton";
import Link from "next/link";
import MusicButton from "./MusicButton";

const EMAIL = "fhfabadgshei@gmail.com";
const PHONE = "+964 771 387 8750";
const WHATSAPP_URL = "https://wa.me/9647713878750";
const INSTAGRAM_URL = "https://instagram.com/m55d1";

const scrollToSection = (id: string) => {
  if (typeof window === "undefined") return;
  const target = id === "top" ? 0 : document.getElementById(id);
  if (target == null) return;
  const lenis = (window as any).__lenis;
  if (lenis && typeof lenis.scrollTo === "function") {
    lenis.scrollTo(target, { offset: 0, duration: 1.4 });
    return;
  }
  if (target === 0) {
    window.scrollTo({ top: 0, behavior: "smooth" });
  } else {
    (target as HTMLElement).scrollIntoView({ behavior: "smooth", block: "start" });
  }
};

const MOBILE_NAV_ITEMS = [
  { label: "HOME", target: "top" },
  { label: "ABOUT", target: "about" },
  { label: "WORK", target: "projects-section" },
  { label: "CONTACT", target: "contact-section" },
];

function Navbar() {
  const [rotate, setRotate] = useSpring(() => ({
    transform: "rotate(0deg)",
    config: { tension: 300, friction: 20, mass: 1 },
  }));
  const [open] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    if (typeof document === "undefined") return;
    if (mobileOpen) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [mobileOpen]);

  const handleMobileNav = (e: React.MouseEvent, target: string) => {
    e.preventDefault();
    setMobileOpen(false);
    setRotate({ transform: "rotate(0deg)" });
    setTimeout(() => scrollToSection(target), 50);
  };

  return (
    <>
      {/* Navbar mobile screen */}
      <div className="fixed top-0 left-0 z-[100001] w-full py-4 lg:hidden px-5 bg-bg/80 backdrop-blur-md border-b border-theme-border/40">
        <div className="flex items-center justify-between w-full font-extrabold">
          <Link
            href="/"
            aria-label="Home"
            onClick={(e) => handleMobileNav(e, "top")}
            className="tracking-wider font-semibold text-xl cursor-pointer text-fg"
            style={{ letterSpacing: "-0.03em" }}
          >
            MUSTAFA ALI
          </Link>
          <div className="flex items-center gap-2">
            <MusicButton />
            <button
              type="button"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              className="nav_btn_sm flex items-center justify-center cursor-pointer"
              onClick={() => {
                const next = !mobileOpen;
                setMobileOpen(next);
                setRotate({ transform: next ? "rotate(45deg)" : "rotate(0deg)" });
              }}
            >
              <animated.div className="text-xs leading-none font-bold" style={rotate}>
                {mobileOpen ? "✕" : "• •"}
              </animated.div>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu overlay */}
      <div
        className={`fixed inset-0 z-[100000] lg:hidden transition-opacity duration-300 ${
          mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        aria-hidden={!mobileOpen}
      >
        <div
          className="absolute inset-0 bg-bg"
          onClick={() => {
            setMobileOpen(false);
            setRotate({ transform: "rotate(0deg)" });
          }}
        />
        <div className="relative z-10 h-full w-full flex flex-col pt-24 pb-8 px-6 overflow-y-auto">
          <nav className="flex flex-col gap-1">
            {MOBILE_NAV_ITEMS.map((item, i) => (
              <a
                key={item.target}
                href={item.target === "top" ? "#" : `#${item.target}`}
                onClick={(e) => handleMobileNav(e, item.target)}
                className="flex items-center justify-between py-4 border-b border-theme-border text-fg text-2xl sm:text-3xl font-semibold transition-colors duration-200 hover:text-brblue"
                style={{
                  letterSpacing: "-0.03em",
                  transform: mobileOpen ? "translateY(0)" : "translateY(20px)",
                  opacity: mobileOpen ? 1 : 0,
                  transition: `transform 0.4s ease ${0.05 + i * 0.05}s, opacity 0.4s ease ${
                    0.05 + i * 0.05
                  }s, color 0.2s ease`,
                }}
              >
                <span>{item.label}</span>
                <span className="text-fg-muted text-sm">0{i + 1}</span>
              </a>
            ))}
          </nav>

          <div className="mt-auto pt-8 flex flex-col gap-3">
            <p className="text-fg-muted text-xs tracking-[0.15em] uppercase font-semibold">Let&apos;s Connect</p>
            <a
              href={`mailto:${EMAIL}`}
              onClick={() => setMobileOpen(false)}
              className="flex items-center justify-between gap-2 bg-fg text-bg rounded-full px-4 sm:px-5 py-3.5 text-xs tracking-wider font-semibold min-h-[44px]"
            >
              <span className="truncate">EMAIL: {EMAIL}</span>
              <span aria-hidden="true" className="flex-shrink-0">↗</span>
            </a>
            <a
              href={`tel:${PHONE.replace(/\s+/g, '')}`}
              onClick={() => setMobileOpen(false)}
              className="flex items-center justify-between gap-2 border-2 border-fg text-fg rounded-full px-4 sm:px-5 py-3.5 text-xs tracking-wider font-semibold min-h-[44px]"
            >
              <span>PHONE: {PHONE}</span>
              <span aria-hidden="true" className="flex-shrink-0">↗</span>
            </a>
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noreferrer"
              onClick={() => setMobileOpen(false)}
              className="flex items-center justify-between gap-2 border-2 border-fg text-fg rounded-full px-4 sm:px-5 py-3.5 text-xs tracking-wider font-semibold min-h-[44px]"
            >
              <span>INSTAGRAM: @m55d1</span>
              <span aria-hidden="true" className="flex-shrink-0">↗</span>
            </a>
          </div>
        </div>
      </div>

      {/* Navbar large screen */}
      <div className="fixed top-0 left-0 w-full px-6 lg:px-20 z-[100001] pointer-events-none">
        <div className="items-start justify-between hidden lg:flex pt-12 pb-10">
          <div className="tracking-wider font-semibold text-2xl pointer-events-auto">
            <Link href="/" aria-label="Home" className="text-fg tracking-tight hover:text-brblue transition-colors">
              MUSTAFA ALI
            </Link>
          </div>
          <div className="hidden lg:flex items-center justify-around pointer-events-auto">
            <Trail open={open} className="flex items-center">
              <MusicButton />
              <LetsTalk />
              <MenuButton />
            </Trail>
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;
