import React from "react";
import Title from "../home/Title";
import BlogCard from "./BlogCard";
import { blogPosts } from "./blogPosts";

const Blog = () => {
  // 分两列渲染
  const left = blogPosts.filter((_, i) => i % 2 === 0);
  const right = blogPosts.filter((_, i) => i % 2 === 1);
  return (
    <div>
      <Title title="Latest" subTitle="Posts" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lgl:gap-10">
        <div className="px-6">
          {left.map(p => (
            <BlogCard key={p.id} id={p.id} image={p.cover} title={p.date} subTitle={p.title} category={p.category} summary={p.summary} />
          ))}
        </div>
        <div className="px-6">
          {right.map(p => (
            <BlogCard key={p.id} id={p.id} image={p.cover} title={p.date} subTitle={p.title} category={p.category} summary={p.summary} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blog;
