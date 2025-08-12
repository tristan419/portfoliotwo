import React, { useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";
import { MdOutlineClose } from "react-icons/md";
import { NAV_PAGES } from "../../utils/navigationConstants";
import Sidenav from "../home/sidenav/Sidenav";

const DesktopSidebar = ({ 
  sidenav, 
  setSidenav, 
  active,
  onOutsideClick 
}) => {
  const sidenavRef = useRef(null);

  const handleMenuClick = useCallback((e) => {
    console.log("Menu clicked!", e);
    console.log("Current sidenav state:", sidenav);
    setSidenav(true);
    console.log("Setting sidenav to true");
  }, [sidenav, setSidenav]);

  return (
    <div className="hidden lgl:flex flex-col gap-4 sticky top-4 self-start z-[200]">
      <div className="w-16 h-96 bg-transparent flex flex-col gap-4 relative">
        {/* Menu Icon */}
        <div
          onClick={handleMenuClick}
          className="w-full h-20 bg-bodyColor rounded-3xl flex justify-center items-center cursor-pointer group z-[500] relative"
          style={{ pointerEvents: 'auto' }}
        >
          <div className="flex flex-col gap-1.5 overflow-hidden">
            <span className="w-8 h-[2px] bg-textColor inline-block -translate-x-2 group-hover:translate-x-0 transition-transform duration-300 group-hover:bg-designColor"></span>
            <span className="w-8 h-[2px] bg-textColor inline-block group-hover:bg-designColor duration-300"></span>
            <span className="w-8 h-[2px] bg-textColor inline-block -translate-x-3.5 group-hover:translate-x-0 transition-transform duration-300 group-hover:bg-designColor"></span>
          </div>
        </div>

        {/* Sidenav */}
        {sidenav && (
          <div className="w-full h-screen fixed top-0 left-0 bg-black bg-opacity-50 z-[600]" onClick={onOutsideClick}>
            {console.log("Rendering sidenav, sidenav state:", sidenav)}
            <div className="w-96 h-full relative">
              <motion.div
                ref={sidenavRef}
                initial={{ x: -500, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="w-full h-full bg-bodyColor overflow-y-scroll scrollbar-thin scrollbar-thumb-[#646464] z-[610]"
                onClick={(e) => e.stopPropagation()}
              >
                <Sidenav />
                <span
                  onClick={() => setSidenav(false)}
                  className="absolute top-0 -right-16 w-12 h-12 bg-bodyColor text-2xl text-textColor hover:text-designColor duration-300 cursor-pointer flex items-center justify-center z-50"
                >
                  <MdOutlineClose />
                </span>
              </motion.div>
            </div>
          </div>
        )}

        {/* Side Icons */}
        <div className="w-16 h-80 bg-bodyColor rounded-3xl flex flex-col items-center justify-between py-6 relative z-[200] overflow-visible">
          {NAV_PAGES.map((page) => {
            const IconComponent = page.icon;
            return (
              <NavLink 
                key={page.page}
                to={page.page} 
                className={`w-full h-6 text-xl flex items-center justify-center duration-300 cursor-pointer relative group ${
                  active(page.page) ? "text-designColor" : "text-textColor hover:text-designColor"
                }`}
              >
                <IconComponent />
                <span className="pointer-events-none text-black font-medium text-xs uppercase bg-designColor px-3 py-[3px] rounded-xl absolute left-full -translate-x-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-200 shadow-lg z-[999] whitespace-nowrap">
                  {page.label}
                </span>
              </NavLink>
            );
          })}
        </div>

        {/* Spacer to keep consistent with Left component width */}
        <div className="mt-4 w-[clamp(400px,40vw,840px)]" />
      </div>
    </div>
  );
};

export default DesktopSidebar;