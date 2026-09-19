"use client";
import React, { useEffect, useState } from "react";
import { a, useSpring } from "@react-spring/web";
import { Trail } from "./TrailText";

const Header = () => {
  const [horizontal, api] = useSpring(() => ({
    from: { transform: "translateX(0%)" },
  }));

  const horizontalCallback = (isOpen: boolean) =>
    api.start({ transform: `translateX(${isOpen ? "20%" : "0%"})` });

  return (
    <div
      className="w-full z-10 relative font-semibold text-3xl xs:text-4xl sm:text-5xl md:text-7xl lg:text-8xl xl:text-9xl text-left leading-[0.95] tracking-tight"
      style={{ letterSpacing: "-0.05em" }}
    >
      <Trail callback={horizontalCallback}>
        <a.div
          className="flex justify-start flex-wrap md:flex-nowrap"
          style={horizontal}
        >
          <div>Modern&nbsp;</div>
          <div>Dental&nbsp;</div>
        </a.div>
        <div className="flex justify-start flex-wrap md:flex-nowrap">
          <div>&amp; 3D&nbsp;</div>
          <div>Design&nbsp;</div>
        </div>
      </Trail>
    </div>
  );
};

export default Header;
