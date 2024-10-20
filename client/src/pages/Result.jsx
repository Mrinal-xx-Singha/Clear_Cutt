const Result = () => {
  return (
    <div className="mx-4 my-3 lg:mx-44 mt-14">
      <div className="bg-white rounded-lg px-8 py-6 drop-shadow">
        {/* --------Image Container--------- */}
        <div className="flex flex-col sm:grid grid-cols-2 gap-8 ">
          {/* ---Left side-- */}
          <div>
            <p
              className="
            font-semibold text-gray-600 mb-2
            "
            >
              Original
            </p>
            <img
              src="/bg.png"
              alt="original bg"
              className="rounded-md border"
            />
          </div>

          {/* -----Right Side----- */}
          <div className="flex flex-col ">
            <p className="  font-semibold text-gray-600 mb-2">
              Background Removed
            </p>
            <div className="rounded-md border border-gray-300 h-full relative bg-layer overflow-hidden">
              {/* <img src="/bg_removed.png" alt="bg-removed" /> */}
              <div className="absolute right-1/2 bottom-1/2 transform translate-x-1/2 translate-y-1/2 ">
                {/* Loader */}
                <div className="border-4 border-blue-600 rounded-full h-12 w-12 border-t-transparent animate-spin"></div>
              </div>
            </div>
          </div>
        </div>
        {/* Two Buttons  */}
        <div className="flex gap-4 justify-center sm:justify-end items-center flex-wrap mt-6">
          <button className="px-8 py-2.5 text-blue-600 text-sm border border-blue-600 rounded-full hover:scale-105 transition-all duration-700">
            Try Another Image
          </button>
          <a
            href=""
            className="px-8 py-2.5 text-white text-sm bg-gradient-to-r from-blue-800 to-blue-600 rounded-full  hover:scale-105 transition-all duration-700"
          >
            Download Image
          </a>
        </div>
      </div>
    </div>
  );
};

export default Result;
