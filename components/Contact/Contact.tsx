"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const EMAIL = "fhfabadgshei@gmail.com";
const PHONE = "+964 771 387 8750";
const WHATSAPP_URL = "https://wa.me/9647713878750";
const INSTAGRAM_URL = "https://instagram.com/m55d1";

const ArrowUpRight = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M7 17 17 7" />
    <path d="M7 7h10v10" />
  </svg>
);

const Contact = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const eyebrowRef = useRef<HTMLDivElement | null>(null);
  const headlineRef = useRef<HTMLHeadingElement | null>(null);
  const emailRef = useRef<HTMLAnchorElement | null>(null);
  const ctaRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const eyebrowChars = eyebrowRef.current?.querySelectorAll(".ct-char") ?? [];
      const headlineChars = headlineRef.current?.querySelectorAll(".ct-char") ?? [];

      gsap.from(eyebrowChars, {
        opacity: 0,
        y: 40,
        duration: 1.0,
        stagger: { amount: 0.4, from: "start" },
        ease: "power3.out",
        scrollTrigger: {
          trigger: eyebrowRef.current,
          start: "top 90%",
          toggleActions: "play none none reverse",
        },
      });

      gsap.from(headlineChars, {
        opacity: 0,
        y: 200,
        duration: 1.4,
        stagger: { amount: 0.6, from: "start" },
        ease: "power3.out",
        scrollTrigger: {
          trigger: headlineRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });

      gsap.from([emailRef.current, ctaRef.current], {
        autoAlpha: 0,
        y: 50,
        duration: 1,
        stagger: 0.15,
        ease: "power2.out",
        scrollTrigger: {
          trigger: emailRef.current,
          start: "top 95%",
          toggleActions: "play none none reverse",
        },
      });
    }, sectionRef.current || undefined);

    return () => ctx.revert();
  }, []);

  const splitChars = (text: string) =>
    text.split("").map((char, i) => (
      <span key={i} className="ct-char" style={{ display: "inline-block" }}>
        {char === " " ? "\u00A0" : char}
      </span>
    ));

  return (
    <section id="contact-section" ref={sectionRef}>
      <div id="ct-eyebrow" ref={eyebrowRef}>
        {splitChars("LET'S CONNECT")}
      </div>

      <h2 id="ct-headline" ref={headlineRef}>
        {splitChars("let's talk.")}
      </h2>

      <a
        id="ct-email"
        href={`mailto:${EMAIL}`}
        ref={emailRef}
        aria-label={`Email ${EMAIL}`}
      >
        {EMAIL}
      </a>

      <div id="ct-actions" ref={ctaRef}>
        <a id="ct-btn" href={`mailto:${EMAIL}`}>
          <span>SAY HELLO</span>
          <ArrowUpRight />
        </a>

        <a
          id="ct-btn-call"
          className="ct-btn-secondary"
          href={`tel:${PHONE.replace(/\s+/g, '')}`}
        >
          <span>CALL: {PHONE}</span>
          <ArrowUpRight />
        </a>

        <a
          id="ct-btn-whatsapp"
          className="ct-btn-secondary"
          href={WHATSAPP_URL}
          target="_blank"
          rel="noreferrer"
        >
          <span>WHATSAPP</span>
          <ArrowUpRight />
        </a>

        <a
          id="ct-btn-instagram"
          className="ct-btn-secondary"
          href={INSTAGRAM_URL}
          target="_blank"
          rel="noreferrer"
        >
          <span>INSTAGRAM @m55d1</span>
          <ArrowUpRight />
        </a>
      </div>
    </section>
  );
};

export default Contact;
