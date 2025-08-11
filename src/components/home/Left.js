import React, { useState } from "react";
import { useTypewriter, Cursor } from "react-simple-typewriter";
import { BsCloudLightningFill } from "react-icons/bs";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { FiMail } from "react-icons/fi";
import CV from "../../assets/Yuankai_Li_resume.pdf";
import { avatarImg } from "../../assets/index";

const Left = () => {
  const [text] = useTypewriter({
    words: ["Web Developer", "Full Stack Developer", "AI Infrastructure"],
    loop: true,
    typeSpeed: 30,
    deleteSpeed: 20,
    delaySpeed: 2000,
  });
  const [collapsed, setCollapsed] = useState(true);
  const toggle = () => setCollapsed((c) => !c);
  return (
    <div className="w-full bg-bodyColor rounded-2xl shadow-testShwdow overflow-hidden flex flex-col">
      <div className="w-full aspect-square lgl:aspect-auto">
        <img
          className="w-full h-full object-cover"
          src={avatarImg}
          loading="eager"
          alt="avatar of Yuankai Li"
        />
      </div>
      <div className="flex flex-col flex-1">
        <div className="flex flex-col items-center gap-2 py-5 lgl:py-8 px-4 text-center">
          <h1 className="text-textColor text-2xl sm:text-3xl lgl:text-4xl font-semibold leading-tight">Yuankai Li</h1>
          <p className="text-sm sm:text-base text-designColor tracking-wide min-h-[1.5em]">
            {text}
            <Cursor cursorBlinking={false} cursorStyle="|" />
          </p>
          <div className="flex justify-center gap-3 mt-2">
            <a href="https://github.com/unsw-cse-comp99-3900/capstone-project-2024-t3-9900f18atransformers" target="_blank" rel="noopener noreferrer" className="hover:text-designColor transition-colors duration-300 cursor-pointer text-lg">
              <FaGithub />
            </a>
            <a href="https://www.linkedin.com/in/tristan-li-862883245/" target="_blank" rel="noopener noreferrer" className="hover:text-designColor transition-colors duration-300 cursor-pointer text-lg">
              <FaLinkedin />
            </a>
            <a href="mailto:tristanlyk@gmail.com" className="hover:text-designColor transition-colors duration-300 cursor-pointer text-lg">
              <FiMail />
            </a>
          </div>
        </div>
        <div className={`transition-[max-height] duration-300 overflow-hidden ${collapsed ? 'max-h-0 lgl:max-h-none lgl:overflow-visible' : 'max-h-40'}`}>
          <div className="flex h-14 border-t border-t-zinc-800">
            <a
              href={CV}
              target="_blank"
              className="w-1/2 text-sm tracking-wide uppercase gap-2 hover:text-designColor transition-colors duration-300"
              rel="noreferrer"
            >
              <button className="w-full h-full flex justify-center items-center gap-2">
                Download CV <BsCloudLightningFill />
              </button>
            </a>
            <button onClick={() => window.dispatchEvent(new Event('openContact'))} className="w-1/2 text-sm tracking-wide uppercase flex justify-center items-center gap-2 hover:text-designColor transition-colors duration-300">
              Reach me
            </button>
          </div>
        </div>
        <button onClick={toggle} className="lgl:hidden text-xs tracking-wide uppercase py-2 border-t border-zinc-800 hover:text-designColor transition-colors duration-300">
          {collapsed ? 'Expand More' : 'Collapse'}
        </button>
      </div>
    </div>
  );
};

export default Left;
