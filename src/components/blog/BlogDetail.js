import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getPostById } from './blogPosts';
import { FiArrowLeft } from 'react-icons/fi';

const BlogDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const post = getPostById(id);

  if (!post) {
    return <div className="p-10 text-center text-red-400">文章不存在或尚未发布</div>;
  }

  return (
    <div className="w-full h-full bg-bodyColor text-textColor overflow-y-auto relative z-20">
      <div className="max-w-screen-xl mx-auto py-6 px-4">
        <button
          onClick={() => navigate(-1)}
          aria-label="back"
          className="mb-4 w-9 h-9 flex items-center justify-center border border-zinc-600 rounded hover:bg-zinc-700 hover:text-designColor duration-150"
        >
          <FiArrowLeft />
        </button>
        <h1 className="text-2xl md:text-4xl font-bold mb-2 break-words leading-snug">{post.title}</h1>
        <div className="flex flex-wrap items-center gap-4 text-xs md:text-sm text-gray-400 mb-4">
          <span>{post.date}</span>
          <span className="text-designColor">{post.category}</span>
          {post.pdf && <span className="text-gray-500">PDF 文档</span>}
        </div>
        <img src={post.cover} alt={post.title} className="w-full max-h-[360px] md:max-h-[420px] object-cover rounded-lg mb-5 pointer-events-none select-none" />
        {post.pdf ? (
          <div className="w-full mb-6 border border-zinc-700 rounded overflow-hidden bg-black/40" style={{height:'72vh'}}>
            <iframe
              title={post.title}
              src={post.pdf}
              className="w-full h-full"
              style={{ border: 'none' }}
            />
          </div>
        ) : (
          <p className="text-gray-300 mb-6 leading-relaxed whitespace-pre-line">{post.summary}</p>
        )}
        {post.pdf && (
          <a
            href={post.pdf}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block text-sm text-designColor underline hover:opacity-80"
          >新标签打开/下载</a>
        )}
      </div>
    </div>
  );
};

export default BlogDetail;
