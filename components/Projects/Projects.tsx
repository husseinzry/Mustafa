"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const PROJECTS = [
  {
    name: "Digital Smile Design",
    role: "Exocad Aesthetic Planning",
    note: "Digital diagnostic wax-up and anterior aesthetic reconstruction in Exocad.",
    kind: "Exocad",
    href: null,
  },
  {
    name: "Full Arch CAD Reconstruction",
    role: "Digital Prosthetics",
    note: "Multi-unit implant bar and monolithic zirconia arch design with precision CAD parameters.",
    kind: "CAD/CAM",
    href: null,
  },
  {
    name: "3D Dental Anatomy Sculpting",
    role: "Blender 3D Modeling",
    note: "High-resolution anatomical tooth morphology and photorealistic rendering in Blender.",
    kind: "Blender",
    href: null,
  },
  {
    name: "Rotary Endodontic Therapy",
    role: "Root Canal Treatment",
    note: "Advanced canal instrumentation, continuous wave warm obturation, and apex locator accuracy.",
    kind: "Clinical",
    href: null,
  },
  {
    name: "Surgical Implant Guides",
    role: "Guided Dental Surgery",
    note: "Integration of DICOM CBCT and intraoral optical scans for 3D printed surgical stents.",
    kind: "3D Print",
    href: null,
  },
  {
    name: "Crown & Bridge Restorations",
    role: "CAD Design Workflows",
    note: "Custom emergence profiles, precision margin fitting, and contact point optimization.",
    kind: "Digital",
    href: null,
  },
];

const VENTURES = [
  {
    name: "Modern Dental Practice",
    role: "General Dentist & Endodontics",
    kind: "Clinical",
    note: "State-of-the-art clinical dental care with special focus on root canal therapy and aesthetic restorations.",
  },
  {
    name: "Dental 3D & CAD Studio",
    role: "Lead CAD Designer",
    kind: "Exocad / Blender",
    note: "Comprehensive digital dental workflows, Exocad custom crown and bridge design, and 3D modeling.",
  },
  {
    name: "Continuous Dental Education",
    role: "Speaker & Practitioner",
    kind: "Academic",
    note: "Modern endodontic techniques, rotary instrumentation protocols, and digital CAD integrations.",
  },
];

const ArrowIcon = () => (
  <svg
    viewBox="0 0 24 24"
    width="100%"
    height="100%"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M7 17 17 7" />
    <path d="M8 7h9v9" />
  </svg>
);

interface ItemData {
  name: string;
  role?: string;
  note?: string;
  kind?: string;
  href?: string | null;
}

const Row = ({ item, index }: { item: ItemData; index: number }) => {
  const hasLink = Boolean(item.href);
  const Wrapper = hasLink ? "a" : "div";
  const wrapperProps = hasLink
    ? { href: item.href, target: "_blank", rel: "noreferrer" }
    : {};

  return (
    <li className="pj-row">
      <Wrapper
        className={`pj-link${hasLink ? "" : " pj-link--static"}`}
        {...(wrapperProps as any)}
      >
        <span className="pj-num">{String(index + 1).padStart(2, "0")}</span>
        <div className="pj-meta">
          <span className="pj-name">{item.name}</span>
          {item.role && <span className="pj-role">{item.role}</span>}
          {item.note && <span className="pj-note">{item.note}</span>}
        </div>
        <span className="pj-kind">{item.kind}</span>
        <span className="pj-arrow" aria-hidden="true">
          {hasLink ? <ArrowIcon /> : <span className="pj-dot">•</span>}
        </span>
      </Wrapper>
    </li>
  );
};

const Projects = () => {
  const sectionRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const rows = sectionRef.current?.querySelectorAll(".pj-row") || [];
      gsap.from(rows, {
        opacity: 0,
        y: 60,
        duration: 0.9,
        stagger: 0.08,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          once: true,
        },
      });

      const titles = sectionRef.current?.querySelectorAll(".pj-title") || [];
      gsap.from(titles, {
        opacity: 0,
        y: 40,
        duration: 1,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
          once: true,
        },
      });
    }, sectionRef.current || undefined);

    return () => ctx.revert();
  }, []);

  return (
    <section id="projects-section" ref={sectionRef}>
      <div className="pj-head">
        <span className="pj-label">CASES &amp; DESIGNS</span>
        <h2 className="pj-title">selected work</h2>
      </div>
      <ul className="pj-list">
        {PROJECTS.map((p, i) => (
          <Row key={p.name} item={p} index={i} />
        ))}
      </ul>

      <div id="ventures" className="pj-head pj-head--secondary">
        <span className="pj-label">PRACTICE &amp; CLINIC</span>
        <h2 className="pj-title">clinical &amp; design practice</h2>
      </div>
      <ul className="pj-list">
        {VENTURES.map((v, i) => (
          <Row key={v.name} item={v} index={i} />
        ))}
      </ul>
    </section>
  );
};

export default Projects;
