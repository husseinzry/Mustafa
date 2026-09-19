"use client";
import React, { useRef, useState } from "react";
import { a, useSpring } from "@react-spring/web";
import Menu from "./Menu";

const MenuButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const offset = 10;
  const ref = useRef<HTMLButtonElement | null>(null);

  const [dots, dotsApi] = useSpring(() => ({
    from: { transform: `rotate(0deg)` },
  }));

  const handleMouseEnter = () => {
    dotsApi.start({ transform: `rotate(90deg)` });
  };

  const handleMouseLeave = () => {
    if (!isOpen) {
      dotsApi.start({ transform: `rotate(0deg)` });
    }
  };

  const [menu, menuApi] = useSpring(() => ({
    from: { y: offset, opacity: 1 },
  }));

  const [close, closeApi] = useSpring(() => ({
    from: { y: offset, opacity: 0 },
  }));

  const toggleMenu = () => {
    const next = !isOpen;
    setIsOpen(next);
    menuApi.stop();
    closeApi.stop();
    menuApi.start({
      y: next ? -offset : offset,
      opacity: next ? 0 : 1,
    });
    closeApi.start({
      y: next ? -offset : offset,
      opacity: next ? 1 : 0,
    });
    dotsApi.start({ transform: next ? "rotate(90deg)" : "rotate(0deg)" });
  };

  const closeMenu = () => {
    if (!isOpen) return;
    setIsOpen(false);
    dotsApi.start({ transform: `rotate(0deg)` });
    menuApi.start({ y: offset, opacity: 1 });
    closeApi.start({ y: offset, opacity: 0 });
  };

  const handleWindowClick = (event: MouseEvent) => {
    if (ref.current && !ref.current.contains(event.target as Node)) {
      closeMenu();
    }
  };

  return (
    <div className="relative">
      <Menu
        open={isOpen}
        onOutsideClick={handleWindowClick}
        onClose={closeMenu}
      />
      <button
        type="button"
        aria-label={isOpen ? "Close menu" : "Open menu"}
        aria-expanded={isOpen}
        className={`nav_btn_lg py-6 flex items-center justify-center cursor-pointer transition-colors duration-200 ${
          isOpen ? "bg-bg-alt text-fg" : "bg-brgray hover:bg-bg-alt text-fg"
        }`}
        ref={ref}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={toggleMenu}
      >
        <div className="flex flex-col h-6 items-center justify-center overflow-hidden">
          <a.div style={menu}>MENU&nbsp;&nbsp;</a.div>
          <a.div style={close}>CLOSE&nbsp;&nbsp;</a.div>
        </div>
        <a.div style={dots}>•&nbsp;•</a.div>
      </button>
    </div>
  );
};

export default MenuButton;
