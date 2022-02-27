import React from "react";
import Lottie from "lottie-react";
import loadingAn from "../assets/loading-state.json";

const Loading = () => {
  return (
    <div className="flex justify-center items-center self-center">
      <Lottie animationData={loadingAn} className="w-20 h-20 self-center" />
    </div>
  );
};

export default Loading;
