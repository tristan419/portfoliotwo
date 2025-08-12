import React from "react";
import { useTypewriter, Cursor } from "react-simple-typewriter";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { FiMail } from "react-icons/fi";
import CV from "../../assets/Yuankai_Li_resume.pdf";
import { avatarImg } from "../../assets/index";

const MobileHeader = () => {
  const [text] = useTypewriter({
    words: ["Web Developer", "Full Stack Developer", "AI Infrastructure"],
    loop: true,
    typeSpeed: 30,
    deleteSpeed: 20,
    delaySpeed: 2000,
  });

  return (
    <div className="w-full bg-bodyColor rounded-2xl shadow-testShwdow p-4 flex items-center gap-4 mb-4">
      {/* Avatar Section */}
      <div className="w-20 h-20 flex-shrink-0">
        <img
          className="w-full h-full object-cover rounded-xl"
          src={avatarImg}
          loading="eager"
          alt="avatar of Yuankai Li"
        />
      </div>
      
      {/* Name and Info Section */}
      <div className="flex-1 min-w-0">
        <h1 className="text-textColor text-xl font-semibold leading-tight mb-1">
          Yuankai Li
        </h1>
        <p className="text-sm text-designColor tracking-wide min-h-[1.2em] mb-2">
          {text}
          <Cursor cursorBlinking={false} cursorStyle="|" />
        </p>
        
        {/* Social Links */}
        <div className="flex gap-3">
          <a 
            href="https://github.com/tristan419" 
            target="_blank" 
            rel="noreferrer" 
            className="hover:text-designColor transition-colors duration-300 cursor-pointer text-base"
          >
            <FaGithub />
          </a>
          <a 
            href="https://www.linkedin.com/in/tristan-li-862883245/" 
            target="_blank" 
            rel="noreferrer" 
            className="hover:text-designColor transition-colors duration-300 cursor-pointer text-base"
          >
            <FaLinkedin />
          </a>
          <a 
            href="mailto:tristanlyk@gmail.com" 
            className="hover:text-designColor transition-colors duration-300 cursor-pointer text-base"
          >
            <FiMail />
          </a>
          
          {/* Quick Actions */}
          <div className="ml-auto flex gap-2">
            <a
              href={CV}
              target="_blank"
              rel="noreferrer"
              className="text-xs px-2 py-1 bg-designColor/10 text-designColor rounded hover:bg-designColor/20 transition-colors duration-300"
            >
              CV
            </a>
            <button 
              onClick={() => window.dispatchEvent(new Event('openContact'))} 
              className="text-xs px-2 py-1 bg-designColor/10 text-designColor rounded hover:bg-designColor/20 transition-colors duration-300"
            >
              Contact
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileHeader;