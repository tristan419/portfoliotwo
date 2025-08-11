import React, { useState, useEffect, useRef } from 'react';
import { FaUser, FaEnvelope } from 'react-icons/fa';
import { IoIosPaper } from 'react-icons/io';
import { MdWork } from 'react-icons/md';
import { SiGooglechat } from 'react-icons/si';
import { NavLink } from 'react-router-dom';

// 移动端悬浮跳转导航（路由跳转）
const links = [
  { to: '/about', icon: FaUser, label: 'About' },
  { to: '/resume', icon: IoIosPaper, label: 'Resume' },
  { to: '/projects', icon: MdWork, label: 'Projects' },
  { to: '/blog', icon: SiGooglechat, label: 'Blog' },
  { to: '/contact', icon: FaEnvelope, label: 'Contact' },
];

const MobileJumpNav = () => {
  const [visible, setVisible] = useState(false); // 是否显示整条
  const lastScroll = useRef(0);
  const idleTimer = useRef(null);
  // 显示导航
  const showBar = () => setVisible(true);
  const hideBar = () => setVisible(false);
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const delta = y - lastScroll.current;
      if (Math.abs(delta) < 2) return; // 微抖忽略
      if (delta < 0) { // 向上滚动
        showBar();
        if (idleTimer.current) clearTimeout(idleTimer.current);
        idleTimer.current = setTimeout(() => hideBar(), 1200);
      } else if (delta > 0) { // 向下滚动
        hideBar();
      }
      lastScroll.current = y;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return (
    <div className="lgl:hidden fixed top-0 inset-x-0 z-40 pointer-events-none">
      <div className={`mx-auto app-shell-max px-3 transition-transform duration-400 ${visible ? 'translate-y-0' : '-translate-y-full'} pointer-events-auto`}>
        <div className="mt-2 rounded-full bg-bodyColor/85 backdrop-blur-md border border-zinc-700 shadow-md flex items-center justify-between px-3 py-2 overflow-hidden relative">
          {links.map(({ to, icon: Icon, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) => `flex flex-col items-center justify-center gap-0.5 text-[10px] font-medium px-2 py-1 rounded-md transition-colors ${isActive ? 'text-designColor' : 'text-textColor hover:text-designColor'}`}
            >
              <Icon className="text-base" />
              <span>{label}</span>
            </NavLink>
          ))}
        </div>
      </div>
      {/* 隐藏时保留极细唤出条 */}
      {!visible && (
        <button
          aria-label="Open navigation"
          onClick={() => showBar()}
          className="absolute right-5 top-0 h-2 w-16 rounded-b-full bg-designColor/70 shadow pointer-events-auto"
        />
      )}
    </div>
  );
};

export default MobileJumpNav;
