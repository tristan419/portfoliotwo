import React, { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Left from "./components/home/Left";
import MobileHeader from "./components/home/MobileHeader";
import NavigationBall from "./components/navigation/NavigationBall";
import DesktopSidebar from "./components/navigation/DesktopSidebar";
import { useNavigation } from "./hooks/useNavigation";

const Home = () => {
  const containerRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();
  const {
    sidenav,
    setSidenav,
    showSwipeHint,
    showNavBall,
    active,
    handleOutsideClick
  } = useNavigation();

  // Global event to open Contact - needs navigate from useNavigate hook
  useEffect(() => {
    const openContact = () => {
      navigate("/contact");
      setTimeout(() => {
        const el = document.getElementById("contact");
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }, 0);
    };
    window.addEventListener("openContact", openContact);
    return () => window.removeEventListener("openContact", openContact);
  }, [navigate]);

  return (
    <div className="w-full max-w-[2200px] mx-auto h-screen bg-transparent text-white z-10 flex items-start gap-4 p-4 lgl:p-4">
      {/* Long Press Navigation Hint */}
      {showSwipeHint && (
        <div className="fixed top-2 left-1/2 -translate-x-1/2 z-[500] px-3 py-1 rounded-full bg-black/70 backdrop-blur text-[11px] font-medium tracking-wide text-gray-200 shadow-lg transition-opacity duration-500">
          Long press ⚬ to navigate
        </div>
      )}

      {/* Desktop Sidebar (Menu + Navigation Icons) */}
      <DesktopSidebar
        sidenav={sidenav}
        setSidenav={setSidenav}
        active={active}
        onOutsideClick={handleOutsideClick}
      />

      {/* Desktop Left Panel (Personal Card) */}
      <div className="hidden lgl:block sticky top-4 w-[clamp(400px,40vw,840px)] self-start">
        <Left />
      </div>

      {/* Main Content Area */}
      <div
        ref={containerRef}
        className="flex-1 h-full bg-bodyColor rounded-2xl flex flex-col main-content-scroll scroll-container"
        style={{ 
          touchAction: 'pan-y pinch-zoom',
          height: 'calc(100vh - 2rem)',
          maxHeight: 'calc(100vh - 2rem)'
        }}
      >
        {/* Mobile Header */}
        <div className="lgl:hidden flex-shrink-0 p-4">
          <MobileHeader />
        </div>

        {/* Content Area with Scroll */}
        <div className="flex-1 px-4 py-2 lgl:py-6 overflow-y-auto -webkit-overflow-scrolling-touch">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="w-full lgl:h-auto min-h-full"
          >
            <Outlet />
          </motion.div>
        </div>
      </div>

      {/* Mobile Navigation Ball */}
      <NavigationBall 
        isVisible={showNavBall}
        active={active}
      />
    </div>
  );
};

export default Home;