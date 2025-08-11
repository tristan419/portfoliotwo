import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { FaUser, FaEnvelope } from "react-icons/fa";
import { IoIosPaper } from "react-icons/io";
import { MdWork, MdOutlineClose } from "react-icons/md";
import { SiGooglechat } from "react-icons/si";
import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import Left from "./components/home/Left";
import Sidenav from "./components/home/sidenav/Sidenav";

const Home = () => {
  // 不再用本地状态，改用路由
  const [sidenav, setSidenav] = useState(false);
  const ref = useRef();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handler = (e) => {
      if (e.target.contains(ref.current)) setSidenav(false);
    };
    document.body.addEventListener("click", handler);
    return () => document.body.removeEventListener("click", handler);
  }, []);

  // Listen for a global event to open the Contact section (no routing / no hash)
  useEffect(() => {
    const openContact = () => {
      navigate('/contact');
      setTimeout(() => {
        const el = document.getElementById('contact');
        if (el) el.scrollIntoView({behavior:'smooth'});
      },0);
    };
    window.addEventListener("openContact", openContact);
    return () => window.removeEventListener("openContact", openContact);
  }, [navigate]);
  const active = (path) => location.pathname.startsWith(path);
  return (
  <div className="w-full max-w-[2200px] mx-auto min-h-screen bg-transparent text-white z-10 flex items-start gap-4 p-4 lgl:p-4">
      {/* ================= Left Icons列（桌面） ======================== */}
  <div className="hidden lgl:flex flex-col gap-4 sticky top-4 self-start z-[150]">
        <div className="w-16 h-96 bg-transparent flex flex-col gap-4">
        {/* ======= Home Icon start */}
        <div
          onClick={() => setSidenav(true)}
          className="w-full h-20 bg-bodyColor rounded-3xl flex justify-center items-center cursor-pointer group"
        >
          <div className="flex flex-col gap-1.5 overflow-hidden">
            <span className="w-8 h-[2px] bg-textColor inline-block -translate-x-2 group-hover:translate-x-0 transition-transform duration-300 group-hover:bg-designColor"></span>
            <span className="w-8 h-[2px] bg-textColor inline-block group-hover:bg-designColor duration-300"></span>
            <span className="w-8 h-[2px] bg-textColor inline-block -translate-x-3.5 group-hover:translate-x-0 transition-transform duration-300 group-hover:bg-designColor"></span>
          </div>
        </div>
        {/* ======= Home Icon End */}

        {/* ============= Sidenav Start here ============= */}
        {sidenav && (
          <div className="w-full h-screen fixed top-0 left-0 bg-black bg-opacity-50 z-50">
            <div className="w-96 h-full relative">
              <motion.div
                ref={ref}
                initial={{ x: -500, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="w-full h-full bg-bodyColor overflow-y-scroll scrollbar-thin scrollbar-thumb-[#646464]"
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
        {/* ============= Sidenav End here =============== */}
  {/* ======= Other Icons Start */}
  <div className="w-16 h-80 bg-bodyColor rounded-3xl flex flex-col items-center justify-between py-6 relative z-[200] overflow-visible">
          {/* About Icon */}
          <NavLink to="/about" className={`w-full h-6 text-xl flex items-center justify-center duration-300 cursor-pointer relative group ${active('/about')? 'text-designColor':'text-textColor hover:text-designColor'}`}>
            <FaUser />
            <span className="pointer-events-none text-black font-medium text-xs uppercase bg-designColor px-3 py-[3px] rounded-xl absolute left-full -translate-x-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-200 shadow-lg z-[999] whitespace-nowrap">About</span>
          </NavLink>
          {/* Resume Icon */}
          <NavLink to="/resume" className={`w-full h-6 text-xl flex items-center justify-center duration-300 cursor-pointer relative group ${active('/resume')? 'text-designColor':'text-textColor hover:text-designColor'}`}>
            <IoIosPaper />
            <span className="pointer-events-none text-black font-medium text-xs uppercase bg-designColor px-3 py-[3px] rounded-xl absolute left-full -translate-x-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-200 shadow-lg z-[999] whitespace-nowrap">Resume</span>
          </NavLink>
          {/* Project Icon */}
          <NavLink to="/projects" className={`w-full h-6 text-xl flex items-center justify-center duration-300 cursor-pointer relative group ${active('/projects')? 'text-designColor':'text-textColor hover:text-designColor'}`}>
            <MdWork />
            <span className="pointer-events-none text-black font-medium text-xs uppercase bg-designColor px-3 py-[3px] rounded-xl absolute left-full -translate-x-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-200 shadow-lg z-[999] whitespace-nowrap">Projects</span>
          </NavLink>
          {/* Blog Icon */}
          <NavLink to="/blog" className={`w-full h-6 text-xl flex items-center justify-center duration-300 cursor-pointer relative group ${active('/blog')? 'text-designColor':'text-textColor hover:text-designColor'}`}>
            <SiGooglechat />
            <span className="pointer-events-none text-black font-medium text-xs uppercase bg-designColor px-3 py-[3px] rounded-xl absolute left-full -translate-x-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-200 shadow-lg z-[999] whitespace-nowrap">Blog</span>
          </NavLink>
          {/* Contact Icon */}
          <NavLink to="/contact" className={`w-full h-6 text-xl flex items-center justify-center duration-300 cursor-pointer relative group ${active('/contact')? 'text-designColor':'text-textColor hover:text-designColor'}`}>
            <FaEnvelope />
            <span className="pointer-events-none text-black font-medium text-xs uppercase bg-designColor px-3 py-[3px] rounded-xl absolute left-full -translate-x-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-200 shadow-lg z-[999] whitespace-nowrap">Contact</span>
          </NavLink>
        </div>
        {/* ======= Other Icons End */}
    {/* ======= 固定个人卡片占位（与左侧个人卡片宽度保持一致） ======= */}
  <div className="mt-4 w-[clamp(400px,40vw,840px)]" />
        </div>
      </div>
      {/* 左侧个人信息卡片：独立 sticky，与图标列并列 */}
  <div className="hidden lgl:block sticky top-4 w-[clamp(400px,40vw,840px)] self-start">
        <Left />
      </div>
      {/* 右侧主内容区域 */}
  <div className="flex-1 min-h-[calc(100vh-2rem)] bg-bodyColor rounded-2xl flex flex-col overflow-hidden">
        {/* 移动端：上方显示 Left，下面内容滚动 */}
        <div className="lgl:hidden mb-4">
          <Left />
        </div>
        <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-[#646464] px-4 py-6">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="w-full"
          >
            <Outlet />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Home;
