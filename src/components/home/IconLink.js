import React, { useCallback, useEffect, useRef, useState } from 'react';
import { NavLink } from 'react-router-dom';

/*
 * 通用图标导航项：
 * - 桌面(pointer: fine)：hover 显示 tooltip
 * - 触摸(pointer: none/coarse)：点击显示 tooltip，1 秒后自动隐藏
 */
const IconLink = ({ to, label, icon: Icon, isActive }) => {
  const [open, setOpen] = useState(false);
  const isTouchRef = useRef(false);
  const hideTimerRef = useRef(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const mq = window.matchMedia('(hover: none), (pointer: coarse)');
      isTouchRef.current = mq.matches;
      const listener = (e) => { isTouchRef.current = e.matches; };
      mq.addEventListener ? mq.addEventListener('change', listener) : mq.addListener(listener);
      return () => {
        mq.removeEventListener ? mq.removeEventListener('change', listener) : mq.removeListener(listener);
      };
    }
  }, []);

  const clearTimer = () => {
    if (hideTimerRef.current) {
      clearTimeout(hideTimerRef.current);
      hideTimerRef.current = null;
    }
  };

  const showTemp = useCallback(() => {
    clearTimer();
    setOpen(true);
    hideTimerRef.current = setTimeout(() => setOpen(false), 1000);
  }, []);

  const handleMouseEnter = () => {
    if (!isTouchRef.current) setOpen(true);
  };
  const handleMouseLeave = () => {
    if (!isTouchRef.current) setOpen(false);
  };
  const handleClick = (e) => {
    if (isTouchRef.current) {
      // 第一次点只展示 tooltip，不阻止跳转；交互期望：仍可导航
      showTemp();
    }
  };

  useEffect(() => () => clearTimer(), []);

  return (
    <NavLink
      to={to}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      className={`w-full h-6 text-xl flex items-center justify-center duration-100 cursor-pointer relative ${isActive ? 'text-designColor' : 'text-textColor hover:text-designColor'}`}
    >
      <Icon />
      <span
        className={`pointer-events-none text-black font-medium text-xs uppercase bg-designColor px-3 py-[3px] rounded-xl absolute left-full top-1/2 -translate-y-1/2 shadow-lg z-40 whitespace-nowrap transition-all duration-200
        ${open ? '-translate-x-2 opacity-100 scale-100 visible' : '-translate-x-1 opacity-0 scale-95 invisible'}`}
      >{label}</span>
    </NavLink>
  );
};

export default IconLink;
