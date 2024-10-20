import { useState } from "react";

const BgSlider = () => {
  const [sliderPosition, setSliderPosition] = useState(50);

  const handleSlider = (e) => {
    setSliderPosition(e.target.value);
  };
  return (
    <div className="pb-10 md:py-20 mx-2">
      {/* Title */}
      <h1
        className="text-center sm:mb-20 mb-12 ms:mb-20 text-2xl md:text-3xl lg:text-4xl font-semibold mt-4 
        bg-gradient-to-r from-gray-900 to-gray-400 text-transparent bg-clip-text"
      >
        Remove Background with The
        <br />
        Help fo Ai in High Quality
      </h1>
      <div className="relative w-full max-w-xl  overflow-hidden m-auto rounded-xl">
        {/* background image */}
        <img
          src="/1.jpg"
          alt="background"
          className="w-full h-full"
          style={{ clipPath: `inset(0 ${100.2 - sliderPosition}% 0 0)` }}
        />
        {/* ForgroundImage */}

        <img
          src="/2.jpg"
          className="absolute top-0 left-0 w-full h-full"
          alt="background"
          style={{ clipPath: `inset(0 0 0 ${sliderPosition}%)` }}
        />
        {/* Slider */}
        <input
          type="range"
          min={0}
          max={100}
          value={sliderPosition}
          onChange={handleSlider}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full z-10 slider"
        />
      </div>
    </div>
  );
};

export default BgSlider;
