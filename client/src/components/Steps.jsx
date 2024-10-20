import { Upload, CircleX, Download } from "lucide-react";

const Steps = () => {
  return (
    <div className="mx-4 lg:mx-44 py-20 xl:py-40">
      <h1
        className="text-center text-2xl md:text-3xl lg:text-4xl font-semibold mt-4 
        bg-gradient-to-r from-gray-900 to-gray-400 text-transparent bg-clip-text"
      >
        Steps to remove background
        <br /> images for free
      </h1>
      {/* Cards container */}
      <div className="flex items-start gap-4 mt-16 xl:mt-24 justify-center flex-wrap lg:flex-nowrap">
        {/* First card */}
        <div className="flex items-start gap-4 bg-white border drop-shadow-md p-7 pb-10 rounded hover:scale-105 transition-all duration-500 w-full lg:w-auto">
          <Upload className="bg-gradient-to-r from-blue-500 to-blue-700 w-12 text-white h-10 rounded-lg px-2" />
          <div className="">
            <p className="text-md font-bold">Upload Image</p>
            <p className="text-sm text-neutral-500 mt-1">
              Upload your image to remove the unwanted background magically
            </p>
          </div>
        </div>
        {/* Second card */}
        <div className="flex items-start gap-4 bg-white border drop-shadow-md p-7 pb-10 rounded hover:scale-105 transition-all duration-500 w-full lg:w-auto">
          <CircleX className="bg-gradient-to-r from-blue-500 to-blue-700 w-12 text-white h-10 rounded-lg px-2" />
          <div className="">
            <p className="text-md font-bold">Remove Background</p>
            <p className="text-sm text-neutral-500 mt-1">
              Remove the unwanted background automatically.
            </p>
          </div>
        </div>
        {/* Third card */}
        <div className="flex items-start gap-4 bg-white border drop-shadow-md p-7 pb-10 rounded hover:scale-105 transition-all duration-500 w-full lg:w-auto">
          <Download className="bg-gradient-to-r from-blue-500 to-blue-700 w-12 text-white h-10 rounded-lg px-2" />
          <div className="">
            <p className="text-md font-bold">Download Image</p>
            <p className="text-sm text-neutral-500 mt-1">
              Download your image with the background removed.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Steps;
