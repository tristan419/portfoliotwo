import React from "react";

// 统一右侧内容区域的内部宽度与左右内边距
// 使用方式：在 Home.js 的 Outlet 外层包裹，所有右侧模块自动获得一致的内边距/最大宽度
// 可传入额外 className 定制局部差异
const ContentWrapper = ({ children, className = "" }) => {
  return (
  <div className={`w-full mx-auto px-3 sm:px-4 md:px-6 lgl:px-8 space-y-12 ${className}`}>
      {children}
    </div>
  );
};

export default ContentWrapper;
