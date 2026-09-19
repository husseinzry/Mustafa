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
      className="w-full z-10 relative px-4 md:px-0 md:pl-6 font-semibold text-4xl sm:text-6xl md:text-[8.5rem] lg:text-[9.5rem] text-center md:text-left leading-[0.95] md:leading-none"
      style={{ letterSpacing: "-0.07em" }}
    >
      <Trail callback={horizontalCallback}>
        <a.div
          className="flex justify-center md:justify-start flex-wrap md:flex-nowrap"
          style={horizontal}
        >
          <div>Modern&nbsp;</div>
          <div>Dental&nbsp;</div>
        </a.div>
        <div className="flex justify-center md:justify-start flex-wrap md:flex-nowrap">
          <div>&amp; 3D&nbsp;</div>
          <div>Design&nbsp;</div>
        </div>
      </Trail>
    </div>
  );
};

export default Header;
