import React from "react";
import Lottie from "react-lottie";
import animationData from ".json"; // Replace with the path to your JSON animation file

jsx;

const YourAnimationComponent = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData, // Your JSON animation data
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <div>
      <Lottie options={defaultOptions} height={400} width={400} />
    </div>
  );
};

export default YourAnimationComponent;
