// ...existing code...
import React from "react";

const ProjectsCard = ({
  title,
  description,
  imgSrc,
  tags = [],
  liveUrl,     // 新增：线上地址
  repoUrl      // 新增：GitHub 地址
}) => {
  const primaryUrl = liveUrl || repoUrl;

  const openPrimary = (e) => {
    if (!primaryUrl) return;
    // 允许键盘访问
    if (e?.key && e.key !== "Enter" && e.key !== " ") return;
    window.open(primaryUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <div
      className="relative group rounded-2xl overflow-hidden bg-[#0e1a24] border border-white/10 hover:border-white/20 transition"
      role={primaryUrl ? "link" : undefined}
      tabIndex={primaryUrl ? 0 : -1}
      onKeyDown={openPrimary}
    >
      {/* 覆盖整卡片的可点击区域，避免弹窗拦截，兼容移动端 */}
      {primaryUrl && (
        <a
          href={primaryUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Open ${title}`}
          className="absolute inset-0 z-[1]"
        />
      )}

      {/* 封面图 */}
      <img
        src={imgSrc}
        alt={title}
        className="w-full h-48 object-cover"
      />

      {/* 内容 */}
      <div className="p-4 space-y-2">
        <h3 className="text-lg font-semibold">{title}</h3>
        {description && <p className="text-sm text-gray-300">{description}</p>}
        {!!tags.length && (
          <div className="flex flex-wrap gap-2 pt-1">
            {tags.map((t) => (
              <span key={t} className="px-2 py-0.5 text-xs rounded-full bg-white/10">
                {t}
              </span>
            ))}
          </div>
        )}
        {/* 次要操作按钮（可选） */}
        <div className="flex gap-2 pt-2 relative z-[2]">
          {liveUrl && (
            <a
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1 rounded-md bg-designColor/20 hover:bg-designColor/30 text-sm"
            >
              Live
            </a>
          )}
          {repoUrl && (
            <a
              href={repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1 rounded-md bg-white/10 hover:bg-white/20 text-sm"
            >
              GitHub
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectsCard;
// ...existing code...