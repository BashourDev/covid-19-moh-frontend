import React from "react";

const SectionItem = ({ number, title, description }) => {
  return (
    <div className="flex gap-x-1 md:space-x-5 py-10 px-2 md:px-10 border border-light/10">
      <span className="rounded-full p-3 bg-dark-gold max-w-[3rem] max-h-[3rem] w-full h-full text-light text-center">
        {number}
      </span>
      <div className="flex flex-col space-y-1">
        <h1 className="text-white font-medium text-xl">{title}</h1>
        <p className="text-light text-sm">{description}</p>
      </div>
    </div>
  );
};

export default SectionItem;
