// 自动读取 assets/blog 下的所有 pdf，文件名即标题
import { blogImgOne, blogImgTwo, blogImgThree } from '../../assets';

// Webpack (CRA) 的 require.context 用于批量导入
const pdfContext = require.context('../../assets/blog', false, /\.pdf$/i);
const covers = [blogImgOne, blogImgTwo, blogImgThree];

export const blogPosts = pdfContext.keys().map((key, idx) => {
  const pdfModule = pdfContext(key); // 得到打包后的 url
  const rawName = decodeURIComponent(
    key.replace('./', '').replace(/\.pdf$/i, '')
  );
  return {
    id: (idx + 1).toString(),
    cover: covers[idx % covers.length],
    date: new Date().toISOString().slice(0, 10),
    title: rawName, // PDF 文件名即标题
    category: 'PDF',
    summary: rawName,
    pdf: pdfModule,
  };
});

export function getPostById(id) {
  return blogPosts.find((p) => p.id === id);
}
