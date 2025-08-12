import { FaUser, FaEnvelope } from "react-icons/fa";
import { IoIosPaper } from "react-icons/io";
import { MdWork } from "react-icons/md";
import { SiGooglechat } from "react-icons/si";

// Navigation constants
export const LONG_PRESS_DELAY = 100;
export const PARTICLE_LIFETIME_DECAY = 0.02;
export const MAX_PARTICLES = 15;
export const MENU_RADIUS = 90;
export const TOUCH_THRESHOLD = 35;
export const VIBRATE_FEEDBACK = { short: 10, medium: 15, long: 25 };

// Navigation pages configuration
export const NAV_PAGES = [
  { page: "/about", color: "#f2f96a", icon: FaUser, label: "About" },
  { page: "/resume", color: "#f2f96a", icon: IoIosPaper, label: "Resume" },
  { page: "/projects", color: "#f2f96a", icon: MdWork, label: "Projects" },
  { page: "/blog", color: "#f2f96a", icon: SiGooglechat, label: "Blog" },
  { page: "/contact", color: "#f2f96a", icon: FaEnvelope, label: "Contact" }
];

// Page order for navigation
export const PAGE_ORDER = ["/about", "/resume", "/projects", "/blog", "/contact"];

// Utility functions
export const getCircularPosition = (index, total, radius = 80) => {
  // Right semicircle: from 12 o'clock (-90°) to 6 o'clock (90°)
  const startAngle = -Math.PI / 2;
  const endAngle = Math.PI / 2;
  const angleRange = endAngle - startAngle;
  const angle = startAngle + (index * angleRange) / (total - 1);
  return { x: -Math.cos(angle) * radius, y: Math.sin(angle) * radius };
};

export const vibrate = (ms = VIBRATE_FEEDBACK.short) => {
  if (navigator.vibrate) navigator.vibrate(ms);
};

export const createParticle = (x, y, targetColor = "#ffffff", particleIdRef) => ({
  id: particleIdRef.current++,
  x: x + (Math.random() - 0.5) * 20,
  y: y + (Math.random() - 0.5) * 20,
  vx: (Math.random() - 0.5) * 4,
  vy: (Math.random() - 0.5) * 4,
  life: 1,
  color: targetColor
});