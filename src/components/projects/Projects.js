// ...existing code...
import React from "react";
import ProjectsCard from "./ProjectsCard";
import workOne from "../../assets/work/workImgOne.jpg";
import workTwo from "../../assets/work/workImgTwo.jpg";
import workThree from "../../assets/work/workImgThree.jpg";

const projects = [
  {
    id: 1,
    title: "E-commerce Demo",
    imgSrc: workTwo,
    description: "Demo shop with Stripe.",
    liveUrl: "https://shop.example.com",
    repoUrl: "https://github.com/yourname/ecommerce-demo"
  },
  {
    id: 2,
    title: "CLI Tool",
    imgSrc: workThree,
    description: "Node.js utilities.",
    // 没有部署地址时，点击打开 GitHub
    repoUrl: "https://github.com/yourname/cli-tool"
  },
  {
    id: 3,
    title: "My Portfolio",
    imgSrc: workOne,
    description: "Personal site built with React.",
    liveUrl: "https://portfoliotwo-phi.vercel.app/about",
    repoUrl: "https://github.com/tristan419/portfoliotwo"
  },
  
];

const Projects = () => {
  return (
    <section id="projects" className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-1 gap-4">
      {projects.map(p => (
        <ProjectsCard
          key={p.id}
          title={p.title}
          description={p.description}
          imgSrc={p.imgSrc}
          tags={p.tags}
          liveUrl={p.liveUrl}
          repoUrl={p.repoUrl}
        />
      ))}
    </section>
  );
};

export default Projects;
// ...existing code...