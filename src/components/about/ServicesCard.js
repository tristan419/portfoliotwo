import React from "react";

const ServicesCard = ({ icons, title, subTitle }) => {
  return (
    <div className="py-7 px-4 md:px-6 flex flex-col items-center gap-2 borderRight borderBottom">
      <span className="text-4xl text-designColor mb-2">{icons}</span>
      <h2 className="font-titleFont text-lg font-semibold">{title}</h2>
      <p className="text-sm md:text-base text-center text-zinc-400 px-2 md:px-6 leading-relaxed">{subTitle}</p>
    </div>
  );
};

export default ServicesCard;
