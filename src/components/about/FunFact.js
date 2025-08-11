import { FiCpu } from "react-icons/fi";
import { VscBeaker } from "react-icons/vsc";
import { FiUsers } from "react-icons/fi";
import { SiOpenai } from "react-icons/si";
import FunFactCard from "./FunFactCard";

const facts = [
  { icon: <FiUsers />, text: "Organised Continental Group event" },
  { icon: <SiOpenai />, text: "AI pre-labels accelerated annotation" },
  { icon: <VscBeaker />, text: "Auto tests with TestSprite + Playwright" },
  { icon: <FiCpu />, text: "Blog: multi-agent collaboration" },
];

const FunFact = () => (
  <div className="px-0 grid grid-cols-2 md:grid-cols-4 pb-10">
    {facts.map((f, i) => (
      <FunFactCard key={i} icon={f.icon} des={f.text} />
    ))}
  </div>
);

export default FunFact;
