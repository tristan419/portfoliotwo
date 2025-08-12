import React, { useEffect, useRef, useState, useMemo } from "react";
import { motion } from "framer-motion";
import { FaUser, FaEnvelope } from "react-icons/fa";
import { IoIosPaper } from "react-icons/io";
import { MdWork, MdOutlineClose } from "react-icons/md";
import { SiGooglechat } from "react-icons/si";
import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useSwipeable } from "react-swipeable";
import Left from "./components/home/Left";
import Sidenav from "./components/home/sidenav/Sidenav";

const Home = () => {
  const [sidenav, setSidenav] = useState(false);
  const [showSwipeHint, setShowSwipeHint] = useState(false);
  const sidenavRef = useRef(null);
  const containerRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();

  // 动态导航球状态
  const [navBall, setNavBall] = useState({
    isDragging: false,
    isExpanded: false,
    position: { x: 0, y: 0 },
    targetPage: null,
    particles: []
  });
  const navBallRef = useRef(null);
  const particleIdRef = useRef(0);
  const longPressTimer = useRef(null);

  // 仅在客户端计算是否触屏（并限制到小屏）
  const isTouch = useMemo(() => {
    if (typeof window === "undefined") return false;
    return (("ontouchstart" in window) || navigator.maxTouchPoints > 0) && window.innerWidth < 1024;
  }, []);

  // 点击外部关闭侧栏（修正 contains 判断方向）
  useEffect(() => {
    const handler = (e) => {
      if (!sidenavRef.current) return;
      if (!sidenavRef.current.contains(e.target)) setSidenav(false);
    };
    if (sidenav) document.body.addEventListener("click", handler);
    return () => document.body.removeEventListener("click", handler);
  }, [sidenav]);

  // 全局事件打开 Contact
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

  const active = (path) => location.pathname.startsWith(path);
  const vibrate = (ms = 10) => { if (navigator.vibrate) navigator.vibrate(ms); };
  const order = ["/about", "/resume", "/projects", "/blog", "/contact"];

  // 动态导航球逻辑
  const navPages = [
    { page: "/about", color: "#f2f96aff", icon: FaUser},
    { page: "/resume", color: "#f2f96aff", icon: IoIosPaper},
    { page: "/projects", color: "#f2f96aff", icon: MdWork},
    { page: "/blog", color: "#f2f96aff", icon: SiGooglechat},
    { page: "/contact", color: "#f2f96aff", icon: FaEnvelope }
  ];

  const getCircularPosition = (index, total, radius = 80) => {
    // 右半圆：从12点位置开始，到6点位置结束（经过3点位置）
    const startAngle = -Math.PI / 2; // 12点位置 (-90度)
    const endAngle = Math.PI / 2;    // 6点位置 (90度)
    const angleRange = endAngle - startAngle; // 180度范围
    const angle = startAngle + (index * angleRange) / (total - 1);
    
    return {
      x: -Math.cos(angle) * radius, // 镜像对称：x坐标取反
      y: Math.sin(angle) * radius
    };
  };

  const createParticle = (x, y) => {
    const particle = {
      id: particleIdRef.current++,
      x: x + (Math.random() - 0.5) * 20,
      y: y + (Math.random() - 0.5) * 20,
      vx: (Math.random() - 0.5) * 4,
      vy: (Math.random() - 0.5) * 4,
      life: 1,
      color: navBall.targetPage?.color || "#ffffff"
    };
    return particle;
  };

  const handleNavBallStart = (e) => {
    if (!isTouch) return;
    const touch = e.touches[0];
    
    // 开始长按计时 - 缩短到100ms
    longPressTimer.current = setTimeout(() => {
      setNavBall(prev => ({
        ...prev,
        isExpanded: true
      }));
      vibrate(15);
    }, 100); // 100ms 长按
    
    const rect = navBallRef.current.getBoundingClientRect();
    setNavBall(prev => ({
      ...prev,
      isDragging: true,
      position: { x: touch.clientX - rect.width/2, y: touch.clientY - rect.height/2 }
    }));
  };

  const handleNavBallMove = (e) => {
    if (!navBall.isDragging || !isTouch) return;
    
    // 如果开始移动，取消长按
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current);
      longPressTimer.current = null;
    }
    
    const touch = e.touches[0];
    
    setNavBall(prev => {
      const newParticles = [...prev.particles, createParticle(touch.clientX, touch.clientY)]
        .filter(p => p.life > 0)
        .slice(-15);
      
      return {
        ...prev,
        position: { x: touch.clientX - 30, y: touch.clientY - 30 },
        particles: newParticles.map(p => ({
          ...p,
          x: p.x + p.vx,
          y: p.y + p.vy,
          life: p.life - 0.05
        }))
      };
    });
  };

  const handleNavBallEnd = (e) => {
    // 清除长按计时器
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current);
      longPressTimer.current = null;
    }
    
    // 如果菜单展开且有触摸结束位置，检查是否在某个导航圆形区域内
    if (navBall.isExpanded && e.changedTouches && e.changedTouches[0]) {
      const touch = e.changedTouches[0];
      const ballRect = navBallRef.current.getBoundingClientRect();
      const ballCenterX = ballRect.left + ballRect.width / 2;
      const ballCenterY = ballRect.top + ballRect.height / 2;
      
      // 检查每个导航圆形
      for (let i = 0; i < navPages.length; i++) {
        const position = getCircularPosition(i, navPages.length, 90);
        const circleX = ballCenterX + position.x;
        const circleY = ballCenterY + position.y;
        
        // 计算触摸点与圆形中心的距离
        const distance = Math.sqrt(
          Math.pow(touch.clientX - circleX, 2) + 
          Math.pow(touch.clientY - circleY, 2)
        );
        
        // 如果在圆形范围内（半径24px + 一些容错）
        if (distance < 35) {
          handlePageSelect(navPages[i].page);
          return;
        }
      }
    }
    
    // 如果没有选中任何导航圆形，就收起菜单
    setNavBall(prev => ({
      ...prev,
      isDragging: false,
      isExpanded: false,
      position: { x: 0, y: 0 },
      targetPage: null,
      particles: []
    }));
  };

  const handlePageSelect = (page) => {
    navigate(page);
    vibrate(25);
    setNavBall(prev => ({
      ...prev,
      isDragging: false,
      isExpanded: false,
      position: { x: 0, y: 0 },
      targetPage: null,
      particles: []
    }));
  };

  const gotoRelative = (dir) => {
    let idx = order.findIndex((p) => location.pathname.startsWith(p));
    if (idx === -1 && location.pathname === "/") idx = -1; // root 放在 about 前
    const nextIdx = idx + dir;
    if (nextIdx >= 0 && nextIdx < order.length) {
      navigate(order[nextIdx]);
      vibrate(15);
    }
  };

  // 只让横滑用于切页；不阻止浏览器默认滚动；被动事件
  const handlers = useSwipeable({
    onSwipedLeft: () => gotoRelative(1),
    onSwipedRight: () => gotoRelative(-1),
    trackTouch: true,
    trackMouse: false,               // 桌面端不追踪鼠标拖拽
    delta: 30,                       // 提高阈值，减少误触
    preventScrollOnSwipe: false,     // 关键：不阻止默认滚动
    touchEventOptions: { passive: true },
  });

  // 移动端首次进入展示“Swipe”提示
  useEffect(() => {
    if (!isTouch) return;
    if (!localStorage.getItem("swipeHintShown")) {
      setShowSwipeHint(true);
      localStorage.setItem("swipeHintShown", "1");
    }
  }, [isTouch]);

  useEffect(() => {
    if (!showSwipeHint) return;
    const hideTimer = setTimeout(() => setShowSwipeHint(false), 2000);
    return () => clearTimeout(hideTimer);
  }, [showSwipeHint]);

  // 清理粒子动画
  useEffect(() => {
    if (navBall.particles.length === 0) return;
    const cleanupTimer = setInterval(() => {
      setNavBall(prev => ({
        ...prev,
        particles: prev.particles.filter(p => p.life > 0).map(p => ({
          ...p,
          x: p.x + p.vx,
          y: p.y + p.vy,
          life: p.life - 0.02
        }))
      }));
    }, 16); // 60fps
    
    return () => clearInterval(cleanupTimer);
  }, [navBall.particles.length]);

  // 清理长按定时器
  useEffect(() => {
    return () => {
      if (longPressTimer.current) {
        clearTimeout(longPressTimer.current);
      }
    };
  }, []);

  return (
    <div className="w-full max-w-[2200px] mx-auto min-h-screen bg-transparent text-white z-10 flex items-start gap-4 p-4 lgl:p-4">
      {showSwipeHint && (
        <div className="fixed top-2 left-1/2 -translate-x-1/2 z-[500] px-3 py-1 rounded-full bg-black/70 backdrop-blur text-[11px] font-medium tracking-wide text-gray-200 shadow-lg transition-opacity duration-500">
          Swipe ← → to switch
        </div>
      )}

      {/* 左侧图标列（桌面） */}
      <div className="hidden lgl:flex flex-col gap-4 sticky top-4 self-start z-[150]">
        <div className="w-16 h-96 bg-transparent flex flex-col gap-4">
          {/* Menu Icon */}
          <div
            onClick={() => setSidenav(true)}
            className="w-full h-20 bg-bodyColor rounded-3xl flex justify-center items-center cursor-pointer group z-[300]"
          >
            <div className="flex flex-col gap-1.5 overflow-hidden">
              <span className="w-8 h-[2px] bg-textColor inline-block -translate-x-2 group-hover:translate-x-0 transition-transform duration-300 group-hover:bg-designColor"></span>
              <span className="w-8 h-[2px] bg-textColor inline-block group-hover:bg-designColor duration-300"></span>
              <span className="w-8 h-[2px] bg-textColor inline-block -translate-x-3.5 group-hover:translate-x-0 transition-transform duration-300 group-hover:bg-designColor"></span>
            </div>
          </div>

          {/* Sidenav */}
          {sidenav && (
            <div className="w-full h-screen fixed top-0 left-0 bg-black bg-opacity-50 z-[400]">
              <div className="w-96 h-full relative">
                <motion.div
                  ref={sidenavRef}
                  initial={{ x: -500, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className="w-full h-full bg-bodyColor overflow-y-scroll scrollbar-thin scrollbar-thumb-[#646464] z-[410]"
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

          {/* 侧边图标 */}
          <div className="w-16 h-80 bg-bodyColor rounded-3xl flex flex-col items-center justify-between py-6 relative z-[200] overflow-visible">
            <NavLink to="/about" className={`w-full h-6 text-xl flex items-center justify-center duration-300 cursor-pointer relative group ${active("/about") ? "text-designColor" : "text-textColor hover:text-designColor"}`}>
              <FaUser />
              <span className="pointer-events-none text-black font-medium text-xs uppercase bg-designColor px-3 py-[3px] rounded-xl absolute left-full -translate-x-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-200 shadow-lg z-[999] whitespace-nowrap">About</span>
            </NavLink>
            <NavLink to="/resume" className={`w-full h-6 text-xl flex items-center justify-center duration-300 cursor-pointer relative group ${active("/resume") ? "text-designColor" : "text-textColor hover:text-designColor"}`}>
              <IoIosPaper />
              <span className="pointer-events-none text-black font-medium text-xs uppercase bg-designColor px-3 py-[3px] rounded-xl absolute left-full -translate-x-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-200 shadow-lg z-[999] whitespace-nowrap">Resume</span>
            </NavLink>
            <NavLink to="/projects" className={`w-full h-6 text-xl flex items-center justify-center duration-300 cursor-pointer relative group ${active("/projects") ? "text-designColor" : "text-textColor hover:text-designColor"}`}>
              <MdWork />
              <span className="pointer-events-none text-black font-medium text-xs uppercase bg-designColor px-3 py-[3px] rounded-xl absolute left-full -translate-x-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-200 shadow-lg z-[999] whitespace-nowrap">Projects</span>
            </NavLink>
            <NavLink to="/blog" className={`w-full h-6 text-xl flex items-center justify-center duration-300 cursor-pointer relative group ${active("/blog") ? "text-designColor" : "text-textColor hover:text-designColor"}`}>
              <SiGooglechat />
              <span className="pointer-events-none text-black font-medium text-xs uppercase bg-designColor px-3 py-[3px] rounded-xl absolute left-full -translate-x-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-200 shadow-lg z-[999] whitespace-nowrap">Blog</span>
            </NavLink>
            <NavLink to="/contact" className={`w-full h-6 text-xl flex items-center justify-center duration-300 cursor-pointer relative group ${active("/contact") ? "text-designColor" : "text-textColor hover:text-designColor"}`}>
              <FaEnvelope />
              <span className="pointer-events-none text-black font-medium text-xs uppercase bg-designColor px-3 py-[3px] rounded-xl absolute left-full -translate-x-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-200 shadow-lg z-[999] whitespace-nowrap">Contact</span>
            </NavLink>
          </div>

          {/* 占位，保持与 Left 宽度一致 */}
          <div className="mt-4 w-[clamp(400px,40vw,840px)]" />
        </div>
      </div>

      {/* 左侧个人卡片（桌面 sticky） */}
      <div className="hidden lgl:block sticky top-4 w-[clamp(400px,40vw,840px)] self-start">
        <Left />
      </div>

      {/* 右侧主内容区域 */}
      <div
        {...(isTouch ? handlers : {})}
        ref={containerRef}
        className="flex-1 min-h-[calc(100vh-2rem)] bg-bodyColor rounded-2xl flex flex-col overflow-hidden [touch-action:pan-y]"
      >
        {/* 移动端：上方显示 Left，下面内容滚动 */}
        <div className="lgl:hidden mb-4">
          <Left />
        </div>

        <div className="flex-1 px-4 py-6">
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

      {/* 动态导航球 - 仅移动端显示 */}
      {isTouch && (
        <>
          {/* 粒子效果层 */}
          <div className="fixed inset-0 pointer-events-none z-[600]">
            {navBall.particles.map(particle => (
              <div
                key={particle.id}
                className="absolute w-1 h-1 rounded-full"
                style={{
                  left: particle.x,
                  top: particle.y,
                  backgroundColor: particle.color,
                  opacity: particle.life,
                  boxShadow: `0 0 ${particle.life * 10}px ${particle.color}`
                }}
              />
            ))}
          </div>

          {/* 导航球 */}
          <motion.div
            ref={navBallRef}
            className="fixed w-16 h-16 rounded-full backdrop-blur-md border-2 border-white/30 z-[700] shadow-lg"
            style={{
              right: '20px',
              bottom: '120px',
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              boxShadow: '0 0 20px rgba(255, 255, 255, 0.3)'
            }}
            animate={{
              scale: navBall.isExpanded ? 1.1 : 1,
            }}
            transition={{
              scale: { type: "spring", stiffness: 300, damping: 20 }
            }}
            onTouchStart={handleNavBallStart}
            onTouchMove={handleNavBallMove}
            onTouchEnd={handleNavBallEnd}
          >
            <div className="w-full h-full flex items-center justify-center">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-white/60 to-transparent" />
            </div>

            {/* 圆形导航菜单 */}
            {navBall.isExpanded && (
              <>
                {navPages.map((page, index) => {
                  const position = getCircularPosition(index, navPages.length, 90);
                  const IconComponent = page.icon;
                  const isActive = active(page.page);
                  
                  return (
                    <motion.div
                      key={page.page}
                      className="absolute w-12 h-12 rounded-full backdrop-blur-md border-2 border-white/40 cursor-pointer shadow-lg"
                      style={{
                        left: position.x + 32 - 24, // 中心对齐
                        top: position.y + 32 - 24,
                        backgroundColor: isActive ? page.color : 'rgba(255, 255, 255, 0.15)',
                        boxShadow: `0 0 20px ${page.color}40`
                      }}
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0, opacity: 0 }}
                      transition={{ 
                        delay: index * 0.05,
                        type: "spring",
                        stiffness: 400,
                        damping: 20
                      }}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <div className="w-full h-full flex items-center justify-center">
                        <IconComponent 
                          className="text-white text-lg"
                          style={{ color: isActive ? '#000' : '#fff' }}
                        />
                      </div>
                      
                      {/* 页面标签 - 根据右半圆位置智能调整 */}
                      <div
                        className="absolute text-xs text-white font-medium whitespace-nowrap pointer-events-none"
                        style={{
                          left: position.x >= 0 ? '-60px' : '48px', // 右侧圆形标签在左边，左侧圆形标签在右边
                          top: '50%',
                          transform: 'translateY(-50%)',
                          textShadow: '0 0 10px rgba(0,0,0,0.8)'
                        }}
                      >
                        {page.label}
                      </div>
                    </motion.div>
                  );
                })}
                
                {/* 背景遮罩 */}
                <div 
                  className="fixed inset-0 bg-black/20 backdrop-blur-sm"
                  style={{ left: '-100vw', top: '-100vh', width: '200vw', height: '200vh' }}
                />
              </>
            )}
          </motion.div>
        </>
      )}
    </div>
  );
};

export default Home;
