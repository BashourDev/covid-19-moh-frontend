import React from "react";

const AboutUsHero = ({ title, subtitle, description }) => {
  return (
    <div className="max-w-7xl w-full p-5 mx-auto pb-32">
      <div className="px-2 sm:px-6 pb-8 flex flex-col items-center space-y-4">
        <h3 className="text-dark-gold text-center w-full font-semibold text-base">
          {title}
        </h3>
        <h3 className="text-dark-blue text-center max-w-sm w-full font-bold text-3xl">
          {subtitle}
        </h3>
        <div className="w-2/6 md:w-1/6 h-0.5 bg-dark-blue mt-2"></div>
      </div>
      <div className="text-gray-600 w-full flex flex-col justify-center items-center">
        <p className="w-full max-w-3xl text-center">{description}</p>
      </div>
    </div>
  );
};

export default AboutUsHero;
