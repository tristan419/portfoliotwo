import ServicesCard from "./ServicesCard";
import { TbBrandNextjs } from "react-icons/tb";
import { FiCamera } from "react-icons/fi";
import { VscBeaker } from "react-icons/vsc";
import { SiOpenai } from "react-icons/si";

const MyServices = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2">
      <ServicesCard
        icons={<TbBrandNextjs />}
        title="Next.js Websites"
        subTitle="Production-ready Next.js (TS + Tailwind), SSR/SSG, clean routing & layouts, deployed on Vercel."
      />
      <ServicesCard
        icons={<VscBeaker />}
        title="Automated Testing"
        subTitle="AI-generated & cloud-run tests with reports; Playwright covers critical E2E paths and integrates with CI."
      />
      <ServicesCard
        icons={<SiOpenai />}
        title="AI-Assisted Annotation "
        subTitle="Transformer-powered prelabels with human-in-the-loop review for sentiment, image labels, and bounding boxes."
      />
      <ServicesCard
        icons={<FiCamera />}
        title="Visual Content for Web"
        subTitle="Photography + Photoshop/Premiere edits, plus AIGC banners & thumbnails aligned to brand."
      />
    </div>
  );
};

export default MyServices;
