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
    <div className="w-full flex flex-col items-start gap-6 md:gap-8">
      {/* Bio Paragraph */}
      <div className="w-full text-base md:text-xl flex flex-col gap-3 md:gap-4 leading-relaxed text-left">
        <p className="font-semibold text-xl sm:text-2xl md:text-3xl text-fg tracking-tight">
          Mustafa Ali is a Dentist passionate about modern dentistry and high-precision digital dental design.
        </p>
        <p className="text-fg-muted text-base sm:text-lg leading-relaxed">
          Mastering Exocad CAD workflows and creating 3D designs with Blender, combined with deep clinical expertise in endodontics and root canal treatment.
        </p>
      </div>

      {/* Services / Expertise Grid */}
      <div className="about-inline-services w-full mt-2 md:mt-4 h-auto">
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
        <div className="mt-8 pt-6 border-t border-theme-border flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs sm:text-sm">
          <div className="font-semibold uppercase tracking-widest text-fg-muted">
            Let&apos;s Connect
          </div>
          <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-fg">
            <a
              href="https://instagram.com/m55d1"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center min-h-[44px] transition-colors hover:text-brblue font-medium"
            >
              Instagram: <span className="underline ml-1">@m55d1</span>
            </a>
            <span className="text-fg-muted hidden sm:inline">•</span>
            <a
              href="tel:+9647713878750"
              className="inline-flex items-center min-h-[44px] transition-colors hover:text-brblue font-medium"
            >
              Phone: <span className="underline ml-1">+964 771 387 8750</span>
            </a>
            <span className="text-fg-muted hidden sm:inline">•</span>
            <a
              href="mailto:fhfabadgshei@gmail.com"
              className="inline-flex items-center min-h-[44px] transition-colors hover:text-brblue font-medium"
            >
              Email: <span className="underline ml-1">fhfabadgshei@gmail.com</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubHeader;
