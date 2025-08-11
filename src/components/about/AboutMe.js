import React from "react";

const AboutMe = () => {
  return (
  <div className="flex flex-col lgl:flex-row pb-6 w-full">
      <div className="w-full lgl:w-1/2 text-zinc-400 lgl:pl-6 lgl:pr-4 lgl:border-r-[1px] lgl:border-r-zinc-800 flex items-center">
        <div className="py-6 pr-2 px-0">
          <h2 className="font-semibold mb-1">Hello! I'm Yuankai Li</h2>
          <p className="text-base leading-6 ">
            Full Stack Developer from Sydney, Australia. I specialize in React and Node.js development with expertise in modern web technologies. 
            Passionate about building scalable full-stack applications and creating seamless user experiences.
          </p>
        </div>
      </div>
  <div className="w-full lgl:w-1/2 pt-4 lgl:pl-6 lgl:pr-6">
        <ul className="flex flex-col gap-1">
          <li className="aboutRightLi">
            <span className="aboutRightLiSpan">Residence:</span>
            Sydney, Australia
          </li>
          <li className="aboutRightLi">
            <span className="aboutRightLiSpan">Specialization:</span>
            React & Node.js
          </li>
          <li className="aboutRightLi">
            <span className="aboutRightLiSpan">Freelance:</span>
            Available
          </li>
          <li className="aboutRightLi">
            <span className="aboutRightLiSpan">Email:</span>
            tristanlyk@gmail.com
          </li>
        </ul>
      </div>
    </div>
  );
};

export default AboutMe;
