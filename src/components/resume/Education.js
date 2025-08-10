import React from "react";
import ResumeTitle from "./ResumeTitle";
import { MdWork } from "react-icons/md";
import { GiGraduateCap } from "react-icons/gi";
import ResumeCard from "./ResumeCard";

const Education = () => {
  return (
    <div className="w-full grid grid-cols-9 px-6">
      <div className="col-span-9 md:col-span-4">
        <ResumeTitle title="Projects" icon={<MdWork />} />
        <ResumeCard
          badge="2024"
          title="Capstone Project - UNSW"
          subTitle="Full Stack Application"
          des="Built a responsive SPA for annotator/researcher workflows (login/registration, task marketplace, application & review, annotation UIs for sentiment, single/multi‑label image, bounding‑box), using component‑driven architecture and reusable hooks. Repo: https://github.com/unsw-cse-comp99-3900/capstone-project-2024-t3-9900f18atransformers"
        />
        <ResumeCard
          badge="Personal"
          title="Portfolio Website"
          subTitle="React & TailwindCSS"
          des="Designed and built a responsive portfolio website showcasing projects and skills using React.js, TailwindCSS, and modern web development practices."
        />
      </div>
      <div className="w-full h-full hidden lgl:flex justify-center items-center">
        <span className="w-[1px] h-full bg-zinc-800 inline-flex"></span>
      </div>
      <div className="col-span-9 md:col-span-4">
        <ResumeTitle title="Education" icon={<GiGraduateCap />} />
        <ResumeCard
          badge="2022 - 2025"
          title="University of New South Wales"
          subTitle="Sydney, Australia"
          des="Pursuing studies in Computer Science with focus on full‑stack web development, software engineering principles, and modern programming practices."
        />
        <ResumeCard
          badge="2017 - 2021"
          title="Wuhan University of Technology (211)"
          subTitle="Marine Engineering"
          des="Undergraduate studies covering marine diesel engines, automatic control principles, and marine power systems; hands‑on coursework with engine fundamentals and control systems."
        />
        <ResumeCard
          badge="Self-Learning"
          title="Full Stack Development"
          subTitle="Online Courses & Projects"
          des="Continuous self-improvement through online courses, tutorials, and personal projects in React, Node.js, MongoDB, and modern web development technologies."
        />
      </div>
    </div>
  );
};

export default Education;
