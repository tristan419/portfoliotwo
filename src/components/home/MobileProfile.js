import React, { useState } from "react";
import { useTypewriter, Cursor } from "react-simple-typewriter";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { FiMail } from "react-icons/fi";
import { BsCloudLightningFill } from "react-icons/bs";
import { avatarImg } from "../../assets";
import CV from "../../assets/Yuankai_Li_resume.pdf";

// 移动端精简个人资料：横向布局 + 可展开附加操作
const MobileProfile = () => {
  const [open, setOpen] = useState(false);
  const [text] = useTypewriter({
    words: ["Web Developer", "Full Stack Developer", "AI Infrastructure"],
    loop: true,
    typeSpeed: 30,
    deleteSpeed: 20,
    delaySpeed: 2000,
  });
  return (
    <div className="w-full rounded-2xl bg-bodyColor/70 backdrop-blur-sm shadow-testShwdow border border-zinc-800/60 overflow-hidden">
      <div className="flex gap-4 px-4 pt-4 pb-3 items-center xs:flex-row flex-col">
        <div className="w-24 h-24 shrink-0 rounded-xl overflow-hidden ring-1 ring-zinc-700/60">
          <img src={avatarImg} alt="avatar" className="w-full h-full object-cover" loading="eager" />
        </div>
        <div className="flex flex-col min-w-0 text-center xs:text-left">
          <h1 className="text-lg font-semibold text-textColor leading-snug">Yuankai Li</h1>
          <p className="text-xs text-designColor tracking-wide min-h-[1.3em]">
            {text}<Cursor cursorBlinking={false} cursorStyle="|" />
          </p>
          <div className="flex gap-3 mt-2 text-base justify-center xs:justify-start">
            <a href="https://github.com/unsw-cse-comp99-3900/capstone-project-2024-t3-9900f18atransformers" target="_blank" rel="noopener noreferrer" className="hover:text-designColor transition-colors"><FaGithub /></a>
            <a href="https://www.linkedin.com/in/tristan-li-862883245/" target="_blank" rel="noopener noreferrer" className="hover:text-designColor transition-colors"><FaLinkedin /></a>
            <a href="mailto:tristanlyk@gmail.com" className="hover:text-designColor transition-colors"><FiMail /></a>
          </div>
        </div>
      </div>
      <div className={`grid transition-[grid-template-rows] duration-300 ${open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
        <div className="overflow-hidden">
          <div className="flex border-t border-zinc-800">
            <a
              href={CV}
              target="_blank"
              rel="noreferrer"
              className="w-1/2 text-[11px] font-medium tracking-wide uppercase flex items-center justify-center gap-1 py-3 hover:text-designColor transition-colors"
            >
              Download CV <BsCloudLightningFill className="text-sm" />
            </a>
            <button
              onClick={() => window.dispatchEvent(new Event('openContact'))}
              className="w-1/2 text-[11px] font-medium tracking-wide uppercase flex items-center justify-center gap-2 py-3 hover:text-designColor transition-colors"
            >
              Reach me
            </button>
          </div>
        </div>
      </div>
      <button
        onClick={() => setOpen(o=>!o)}
        className="w-full text-center text-[11px] tracking-wide uppercase py-2 border-t border-zinc-800 hover:text-designColor transition-colors"
      >
        {open ? 'Collapse' : 'More'}
      </button>
    </div>
  );
};

export default MobileProfile;
