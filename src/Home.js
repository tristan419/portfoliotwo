import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { FaUser, FaEnvelope } from "react-icons/fa";
import { IoIosPaper } from "react-icons/io";
import { MdWork, MdOutlineClose } from "react-icons/md";
import { SiGooglechat } from "react-icons/si";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Left from "./components/home/Left";
import MobileProfile from "./components/home/MobileProfile";
import Sidenav from "./components/home/sidenav/Sidenav";
import ContentWrapper from "./components/layout/ContentWrapper";
import IconLink from "./components/home/IconLink";
// 移除旧 MobileNavBar，改用悬浮 MobileJumpNav
import MobileJumpNav from "./components/home/MobileJumpNav";

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
  const [showTop, setShowTop] = useState(false);
  // 监听滚动（移动端容器与窗口）决定回到顶部按钮显示
  useEffect(() => {
    const scrollContainers = () => {
      const el = document.querySelector('.flex-1.overflow-y-auto');
      const scrolled = (el?.scrollTop || window.scrollY);
      setShowTop(scrolled > 300);
    };
    const el = document.querySelector('.flex-1.overflow-y-auto');
    el && el.addEventListener('scroll', scrollContainers);
    window.addEventListener('scroll', scrollContainers);
    return () => {
      el && el.removeEventListener('scroll', scrollContainers);
      window.removeEventListener('scroll', scrollContainers);
    };
  }, [location.pathname]);
  return (
    <div className="w-full min-h-screen bg-transparent text-white z-10">
      {/* MOBILE (<1024): 单列连续滚动 */}
  <div className="lgl:hidden w-full app-shell-max px-4 pt-4 pb-[calc(5rem+env(safe-area-inset-bottom))] flex flex-col gap-5">
        <MobileProfile />
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.35 }}
          className="w-full"
        >
          <ContentWrapper className="px-0 space-y-9">
            <Outlet />
          </ContentWrapper>
        </motion.div>
      </div>

      {/* DESKTOP (>=1024): 图标列 + 左卡片 + 内容，限制整体宽度不溢出 */}
      <div className="hidden lgl:grid lgl:grid-cols-[64px_minmax(320px,480px)_minmax(0,1fr)] xl:grid-cols-[64px_minmax(340px,520px)_minmax(0,1fr)] max-w-[1600px] mx-auto gap-6 p-6">
        {/* 图标列 */}
        <div className="flex flex-col gap-4 sticky top-6 self-start z-10">
          {/* Menu / Sidenav trigger */}
          <div
            onClick={() => setSidenav(true)}
            className="w-16 h-20 bg-bodyColor rounded-3xl flex justify-center items-center cursor-pointer group"
          >
            <div className="flex flex-col gap-1.5 overflow-hidden">
              <span className="w-8 h-[2px] bg-textColor inline-block -translate-x-2 group-hover:translate-x-0 transition-transform duration-300 group-hover:bg-designColor" />
              <span className="w-8 h-[2px] bg-textColor inline-block group-hover:bg-designColor duration-300" />
              <span className="w-8 h-[2px] bg-textColor inline-block -translate-x-3.5 group-hover:translate-x-0 transition-transform duration-300 group-hover:bg-designColor" />
            </div>
          </div>
          {/* 其他图标 */}
          <div className="w-16 h-80 bg-bodyColor rounded-3xl flex flex-col items-center justify-between py-6 relative overflow-visible">
            <IconLink to="/about" label="About" icon={FaUser} isActive={active('/about')} />
            <IconLink to="/resume" label="Resume" icon={IoIosPaper} isActive={active('/resume')} />
            <IconLink to="/projects" label="Projects" icon={MdWork} isActive={active('/projects')} />
            <IconLink to="/blog" label="Blog" icon={SiGooglechat} isActive={active('/blog')} />
            <IconLink to="/contact" label="Contact" icon={FaEnvelope} isActive={active('/contact')} />
          </div>
        </div>
        {/* 左侧个人卡片 */}
        <div className="sticky top-6 self-start">
          <Left />
        </div>
        {/* 右侧内容区域 */}
        <div className="min-h-[calc(100vh-3rem)] bg-bodyColor rounded-2xl flex flex-col overflow-hidden">
          <div className="flex-1 overflow-y-auto js-scroll-area scrollbar-thin scrollbar-thumb-[#646464] py-8 px-2">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
              className="w-full"
            >
              <ContentWrapper>
                <Outlet />
              </ContentWrapper>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Sidenav Overlay */}
      {sidenav && (
        <div className="fixed inset-0 bg-black/50 z-50">
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

      {/* 回到顶部按钮（移动端）*/}
      {showTop && (
        <button
          onClick={() => { try { window.scrollTo({top:0,behavior:'smooth'});} catch(e){} }}
          className="lgl:hidden fixed right-4 bottom-28 z-50 w-10 h-10 rounded-full bg-designColor text-black text-lg font-bold shadow-lg flex items-center justify-center active:scale-95 transition-transform"
          aria-label="Back to top"
        >↑</button>
      )}
      {/* 悬浮跳转导航 */}
      <MobileJumpNav />
      {/* 若不再需要底部条，可移除 MobileNavBar 组件文件与引用 */}
    </div>
  );
};

export default Home;
