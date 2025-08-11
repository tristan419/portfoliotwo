import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getPostById } from './blogPosts';
import { FiArrowLeft } from 'react-icons/fi';
import { Worker, Viewer } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';

// 在组件外部创建一次插件实例，避免在渲染流程中动态创建导致 hook 次序检查异常
let defaultLayoutPluginInstance;
try {
  defaultLayoutPluginInstance = defaultLayoutPlugin({});
} catch (e) {
  // 如果初始化异常（理论上不该），打印并降级为无插件模式
  // eslint-disable-next-line no-console
  console.warn('[pdf-viewer] defaultLayoutPlugin init failed, fallback without toolbar', e);
  defaultLayoutPluginInstance = null;
}

const BlogDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const post = getPostById(id);

  // 插件实例已在组件外创建

  if (!post) {
    return <div className="p-10 text-center text-red-400">文章不存在或尚未发布</div>;
  }

  if (!post.pdf) {
    return (
      <div className="p-6 text-gray-300">
        <button
          onClick={() => navigate(-1)}
          aria-label="back"
          className="mb-4 w-9 h-9 flex items-center justify-center border border-zinc-600 rounded hover:bg-zinc-700 hover:text-designColor duration-150"
        >
          <FiArrowLeft />
        </button>
        <h1 className="text-2xl md:text-3xl font-bold mb-4 break-words leading-snug">{post.title}</h1>
        <p className="leading-relaxed whitespace-pre-line">{post.summary}</p>
      </div>
    );
  }

  return (
    <div className="w-full h-full flex flex-col bg-bodyColor text-textColor">
      {/* 顶部工具条：返回 + 下载 */}
      <div className="flex items-center justify-between px-3 h-12 shrink-0 border-b border-zinc-700 bg-black/40 backdrop-blur-sm">
        <button
          onClick={() => navigate(-1)}
          aria-label="返回"
          className="w-9 h-9 flex items-center justify-center border border-zinc-600 rounded hover:bg-zinc-700 hover:text-designColor duration-150"
        >
          <FiArrowLeft />
        </button>
        <div className="flex items-center gap-3 text-xs md:text-sm">
          <span className="hidden sm:inline text-gray-400 truncate max-w-[40vw]" title={post.title}>{post.title}</span>
          <a
            href={post.pdf}
            download
            className="px-2 py-1 rounded border border-zinc-600 text-designColor hover:bg-zinc-700 duration-150"
          >下载</a>
        </div>
      </div>
      {/* PDF 区域：减去顶部 3rem 高度 */}
      <div className="h-[calc(100vh-3rem)] w-full overflow-hidden">        
        <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
          <div className="h-full">
            <Viewer fileUrl={post.pdf} plugins={defaultLayoutPluginInstance ? [defaultLayoutPluginInstance] : []} />
          </div>
        </Worker>
      </div>
    </div>
  );
};

export default BlogDetail;
