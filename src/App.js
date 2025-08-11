import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import RoundOne from "./components/roundDesigns/RoundOne";
import RoundTwo from "./components/roundDesigns/RoundTwo";
import RoundThree from "./components/roundDesigns/RoundThree";
import RoundFour from "./components/roundDesigns/RoundFour";
import RoundFive from "./components/roundDesigns/RoundFive";
import Home from "./Home"; // 作为布局 (Layout)
import BlogDetail from "./components/blog/BlogDetail";
import About from "./components/about/About";
import Resume from "./components/resume/Resume";
import Projects from "./components/projects/Projects";
import Blog from "./components/blog/Blog";
import Contact from "./components/contact/Contact";

function App() {
  return (
    <Router>
      <div className="w-full min-h-screen font-bodyfont text-textColor bg-black relative">
        <div className="max-w-screen-2xl min-h-screen mx-auto">
          <Routes>
            {/* 布局 + 子路由 */}
            <Route path="/" element={<Home />}> 
              <Route index element={<Navigate to="about" replace />} />
              <Route path="about" element={<About />} />
              <Route path="resume" element={<Resume />} />
              <Route path="projects" element={<Projects />} />
              <Route path="blog" element={<Blog />} />
              <Route path="contact" element={<Contact />} />
            </Route>
            <Route path="/blog/:id" element={<BlogDetail />} />
          </Routes>
        </div>
        <div className="w-full h-full pointer-events-none absolute top-0 left-0 z-10 select-none">
          <RoundOne />
          <RoundTwo />
          <RoundThree />
          <RoundFour />
          <RoundFive />
        </div>
      </div>
    </Router>
  );
}

export default App;
