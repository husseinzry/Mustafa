"use client";
import React from "react";

const SERVICES = [
  {
    title: "Dentist",
    body: "Passionate about modern dentistry.",
  },
  {
    title: "Exocad Expert",
    body: "Digital dental design & CAD workflows.",
  },
  {
    title: "3D Designer",
    body: "Creating 3D designs with Blender.",
  },
  {
    title: "Endodontics",
    body: "Strong interest in endodontics and root canal treatment.",
  },
];

const SubHeader = () => {
  return (
    <div className="relative md:absolute md:top-1/5 left-0 md:left-1/2 w-full md:-translate-x-1/2 md:mt-40 z-10 flex flex-col md:items-start items-center px-5 md:px-0">
      {/* Bio Paragraph */}
      <div className="w-full md:w-1/2 text-base md:text-2xl flex flex-col gap-3 md:gap-4 leading-relaxed md:leading-snug text-center md:text-left">
        <p className="font-semibold text-lg md:text-2xl text-fg">
          Mustafa Ali is a Dentist passionate about modern dentistry and high-precision digital dental design.
        </p>
        <p className="text-fg-muted text-sm md:text-lg">
          Mastering Exocad CAD workflows and creating 3D designs with Blender, combined with deep clinical expertise in endodontics and root canal treatment.
        </p>
      </div>

      {/* Services / Expertise Grid */}
      <div className="about-inline-services w-full md:w-1/2 mt-8 md:mt-12 h-auto">
        <div className="about-inline-services__head">
          <span className="about-inline-services__label">EXPERTISE &amp; SERVICES</span>
        </div>
        <div className="about-inline-services__grid">
          {SERVICES.map((service) => (
            <article key={service.title} className="about-inline-services__item">
              <h4 className="text-fg">{service.title}</h4>
              <p className="text-fg-muted">{service.body}</p>
            </article>
          ))}
        </div>

        {/* Bio Let's Connect Contact Strip */}
        <div className="mt-8 pt-6 border-t border-theme-border flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs md:text-sm">
          <div className="font-semibold uppercase tracking-widest text-fg-muted">
            Let&apos;s Connect
          </div>
          <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-fg">
            <a
              href="https://instagram.com/m55d1"
              target="_blank"
              rel="noreferrer"
              className="transition-colors hover:text-brblue font-medium"
            >
              Instagram: <span className="underline">@m55d1</span>
            </a>
            <span className="text-fg-muted hidden sm:inline">•</span>
            <a
              href="tel:+9647713878750"
              className="transition-colors hover:text-brblue font-medium"
            >
              Phone: <span className="underline">+964 771 387 8750</span>
            </a>
            <span className="text-fg-muted hidden sm:inline">•</span>
            <a
              href="mailto:fhfabadgshei@gmail.com"
              className="transition-colors hover:text-brblue font-medium"
            >
              Email: <span className="underline">fhfabadgshei@gmail.com</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubHeader;
