"use client";
import React, { useEffect, useRef, useState } from "react";
import { useSpring, a } from "@react-spring/web";

const EMAIL = "fhfabadgshei@gmail.com";
const PHONE = "+964 771 387 8750";
const WHATSAPP_URL = "https://wa.me/9647713878750";

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

interface MenuProps {
  open: boolean;
  onOutsideClick: (e: MouseEvent) => void;
  onClose: () => void;
}

const Menu: React.FC<MenuProps> = ({ open, onOutsideClick, onClose }) => {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleChildClick = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        onOutsideClick(event);
      }
    };
    document.addEventListener("click", handleChildClick);
    return () => {
      document.removeEventListener("click", handleChildClick);
    };
  }, [onOutsideClick]);

  const [contents, contentsApi] = useSpring(() => ({
    from: { y: 100, opacity: 0, transform: "rotate(20deg)" },
  }));

  const [news, newsApi] = useSpring(() => ({
    from: { y: 100, opacity: 0, transform: "rotate(-20deg)" },
  }));

  useEffect(() => {
    if (!open) {
      contentsApi.start({
        y: 100,
        opacity: 0,
        transform: "rotate(20deg)",
      });
      newsApi.start({
        y: 100,
        opacity: 0,
        transform: "rotate(-20deg)",
      });
    } else {
      contentsApi.start({
        y: 0,
        opacity: 1,
        transform: "rotate(0deg)",
      });
      newsApi.start({
        y: 0,
        opacity: 1,
        transform: "rotate(0deg)",
      });
    }
  }, [open, contentsApi, newsApi]);

  const navItems = [
    { label: "HOME", target: "top" },
    { label: "ABOUT", target: "about" },
    { label: "WORK", target: "projects-section" },
    { label: "CONTACT", target: "contact-section" },
  ];

  const handleNavClick = (e: React.MouseEvent, target: string) => {
    e.preventDefault();
    scrollToSection(target);
    if (typeof onClose === "function") onClose();
  };

  return (
    <div
      className={`absolute top-[4.5rem] right-0 w-[22rem] z-[100002] shadow-2xl transition-all duration-300 ${
        open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      }`}
      ref={ref}
      aria-hidden={!open}
    >
      {/* Site navigation */}
      <a.div
        className="rounded-2xl bg-bg-alt text-fg flex flex-col font-Aeonik text-2xl p-7 border border-theme-border shadow-lg"
        style={contents}
      >
        {navItems.map((item, i) => (
          <a
            key={item.target}
            href={item.target === "top" ? "#" : `#${item.target}`}
            onClick={(e) => handleNavClick(e, item.target)}
            className={`flex items-center justify-between transition-colors duration-200 hover:text-brblue cursor-pointer ${
              i === 0 ? "pb-3" : i === navItems.length - 1 ? "pt-3" : "py-3"
            }`}
          >
            <span>{item.label}</span>
            <span className="text-fg-muted text-lg">•</span>
          </a>
        ))}
      </a.div>

      {/* Get in touch */}
      <a.div
        className="rounded-2xl bg-bg-alt text-fg flex flex-col p-7 my-3 border border-theme-border shadow-lg"
        style={news}
      >
        <div className="font-Aeonik text-2xl leading-tight font-semibold">
          Got a case or project?
          <br />
          <span className="text-brblue">Let&apos;s connect.</span>
        </div>
        <div className="text-xs text-fg-muted mt-2">
          Mustafa Ali • Dentist &amp; 3D Designer
        </div>
        <div className="flex flex-col gap-2.5 mt-5">
          <a
            href={`mailto:${EMAIL}`}
            onClick={() => onClose && onClose()}
            className="flex items-center justify-between bg-fg text-bg rounded-xl px-4 py-3 text-xs tracking-widest font-semibold transition-transform duration-200 hover:-translate-y-0.5"
          >
            <span>EMAIL ME</span>
            <span aria-hidden="true">↗</span>
          </a>
          <a
            href={`tel:${PHONE.replace(/\s+/g, '')}`}
            onClick={() => onClose && onClose()}
            className="flex items-center justify-between border border-fg text-fg rounded-xl px-4 py-3 text-xs tracking-widest font-semibold transition-colors duration-200 hover:bg-accent-soft"
          >
            <span>CALL: {PHONE}</span>
            <span aria-hidden="true">↗</span>
          </a>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noreferrer"
            onClick={() => onClose && onClose()}
            className="flex items-center justify-between border border-fg text-fg rounded-xl px-4 py-3 text-xs tracking-widest font-semibold transition-colors duration-200 hover:bg-accent-soft"
          >
            <span>WHATSAPP</span>
            <span aria-hidden="true">↗</span>
          </a>
        </div>
      </a.div>
    </div>
  );
};

export default Menu;
