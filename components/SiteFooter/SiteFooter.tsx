"use client";
import React from "react";

const Icon = ({ children }: { children: React.ReactNode }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    {children}
  </svg>
);

const InstagramIcon = () => (
  <Icon>
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </Icon>
);

const PhoneIcon = () => (
  <Icon>
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
  </Icon>
);

const MailIcon = () => (
  <Icon>
    <rect width="20" height="16" x="2" y="4" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </Icon>
);

const MessageCircleIcon = () => (
  <Icon>
    <path d="m3 21 1.9-5.7a8.5 8.5 0 1 1 3.8 3.8z" />
  </Icon>
);

const EMAIL = "fhfabadgshei@gmail.com";
const PHONE = "+964 771 387 8750";
const WHATSAPP_URL = "https://wa.me/9647713878750";
const INSTAGRAM_URL = "https://instagram.com/m55d1";

const SiteFooter = () => {
  return (
    <footer id="main-footer">
      <div className="footer-top">
        <div className="footer-brand">
          <h1 className="f-logo">MUSTAFA ALI</h1>
          <p className="f-desc">
            Dentist &amp; 3D Designer. <br />
            Passionate about modern dentistry, Exocad digital CAD workflows,
            Blender 3D design, and endodontics.
          </p>
          <div className="f-socials">
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram @m55d1"
              title="Instagram @m55d1"
            >
              <InstagramIcon />
            </a>
            <a
              href={`tel:${PHONE.replace(/\s+/g, '')}`}
              aria-label="Phone"
              title={`Call ${PHONE}`}
            >
              <PhoneIcon />
            </a>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noreferrer"
              aria-label="WhatsApp"
              title="WhatsApp"
            >
              <MessageCircleIcon />
            </a>
            <a
              href={`mailto:${EMAIL}`}
              aria-label="Email"
              title={`Email ${EMAIL}`}
            >
              <MailIcon />
            </a>
          </div>
        </div>

        <div className="footer-links">
          <div className="f-col">
            <h3>EXPLORE</h3>
            <a href="#projects-section">Projects &amp; Cases</a>
            <a href="#ventures">Clinical Practice</a>
            <a href="#about">Expertise &amp; Bio</a>
            <a href="#contact-section">Get in touch</a>
          </div>

          <div className="f-col">
            <h3>LET&apos;S CONNECT</h3>
            <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
            <a href={`tel:${PHONE.replace(/\s+/g, '')}`}>{PHONE}</a>
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noreferrer"
            >
              Instagram: @m55d1
            </a>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noreferrer"
            >
              WhatsApp Available
            </a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} Mustafa Ali. All rights reserved.</p>
        <p>Dentist • Exocad Expert • 3D Designer • Endodontics</p>
      </div>
    </footer>
  );
};

export default SiteFooter;
