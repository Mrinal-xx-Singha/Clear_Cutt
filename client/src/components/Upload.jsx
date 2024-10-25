import React, { useContext } from "react";
import { Upload } from "lucide-react";
import { AppContext } from "../context/AppContext";
const UploadBtn = () => {

  const {removeBg} =useContext(AppContext)
  return (
    <div className="pb-16">
      {/* title */}

      <h1
        className="text-center sm:mb-20 mb-12 ms:mb-20 text-2xl md:text-3xl lg:text-4xl font-semibold mt-4 
        bg-gradient-to-r from-gray-900 to-gray-400 text-transparent bg-clip-text"
      >
        See The Magic, Try For Free
      </h1>
      <div className="text-center mb-24">
        <input type="file" accept="image/*" id="upload2" hidden 
        
        onChange={e =>removeBg(e.target.files[0])}
        />
        <label
          htmlFor="upload2"
          className="inline-flex gap-3 px-8 py-3.5 rounded-full 
          cursor-pointer bg-gradient-to-r  from-blue-500 to-blue-700 m-auto hover:scale-105 transition-all duration-700
          "
        >
          <Upload className="text-white" width={20} />
          <p
            className="text-white
             text-small"
          >
            Upload image
          </p>
        </label>
      </div>
    </div>
  );
};

export default UploadBtn;
