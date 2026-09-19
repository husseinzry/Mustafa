"use client";
import React from "react";

const SERVICES = [
  {
    title: "Dentistry & Clinical Care",
    body: "Passionate about modern digital dentistry, patient comfort, and comprehensive clinical care.",
  },
  {
    title: "Exocad CAD Workflows",
    body: "Digital dental design, crowns, bridges, smile makeovers, and high-precision CAD workflows.",
  },
  {
    title: "3D Dental Design",
    body: "High-precision 3D designs, anatomical modeling, and aesthetic dental visualizations with Blender.",
  },
  {
    title: "Endodontics",
    body: "Deep clinical expertise in endodontics, root canal treatments, and restorative procedures.",
  },
];

const SubHeader = () => {
  return (
    <div className="w-full flex flex-col justify-center">
      {/* Bio Paragraphs matching Image 1 Reference */}
      <div className="flex flex-col gap-4 text-left">
        <p className="text-xl sm:text-2xl lg:text-[1.65rem] xl:text-[1.75rem] font-medium leading-[1.35] tracking-tight text-fg">
          Mustafa Ali is a Dentist passionate about modern dentistry and high-precision digital dental design.
        </p>
        <p className="text-base sm:text-lg lg:text-[1.125rem] leading-[1.6] text-fg-muted font-normal max-w-[62ch]">
          He integrates Exocad CAD workflows and creates 3D designs with Blender, combined with deep clinical expertise in endodontics and root canal treatment.
        </p>
      </div>

      {/* Services Section matching Image 1 Reference */}
      <div className="mt-8 lg:mt-12 w-full">
        {/* Services Header */}
        <div className="border-b border-theme-border pb-3 mb-4 sm:mb-6 flex items-center justify-between">
          <span className="text-xs sm:text-sm font-semibold tracking-[0.25em] uppercase text-fg">
            SERVICES
          </span>
        </div>

        {/* 2x2 Services Grid with dividers matching Image 1 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 border-b border-theme-border">
          {SERVICES.map((service, index) => {
            const isLeft = index % 2 === 0;
            const isTop = index < 2;
            return (
              <article
                key={service.title}
                className={`py-5 sm:py-6 flex flex-col justify-start transition-colors duration-200 ${
                  isLeft ? "sm:pr-8 sm:border-r border-theme-border" : "sm:pl-8"
                } ${isTop ? "border-b border-theme-border" : ""}`}
              >
                <h4 className="text-base sm:text-lg lg:text-[1.15rem] font-semibold text-fg tracking-tight mb-2">
                  {service.title}
                </h4>
                <p className="text-xs sm:text-sm lg:text-[0.925rem] text-fg-muted leading-relaxed">
                  {service.body}
                </p>
              </article>
            );
          })}
        </div>

        {/* Let's Connect Contact Strip */}
        <div className="mt-8 pt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs sm:text-sm">
          <div className="font-semibold uppercase tracking-widest text-fg-muted text-[11px] sm:text-xs">
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
