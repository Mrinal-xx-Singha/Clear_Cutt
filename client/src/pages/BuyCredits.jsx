const plans = [
  { id: "Basic", price: 10, credits: 100, desc: "Best for personal use." },
  { id: "Advanced", price: 50, credits: 500, desc: "Best for Business use." },
  {
    id: "Business",
    price: 250,
    credits: 5000,
    desc: "Best for enterprise use.",
  },
];

const BuyCredits = () => {
  return (
    <div className="min-h-[80vh] text-center pt-12 mb-10">
      <button className="border border-gray-400 px-10 py-2 rounded-full mb-6">
        Choose your Plans
      </button>
      <h1
        className="text-center text-2xl md:text-3xl lg:text-4xl font-semibold mt-4 
        bg-gradient-to-r from-gray-900 to-gray-400 text-transparent bg-clip-text mb-6 sm:mb-10"
      >
        Chose the plan thats right for you{" "}
      </h1>
      <div className="flex flex-wrap justify-center gap-6 text-left">
        {plans.map((item, index) => (
          <div key={index}
          className="bg-white drop-shadow-sm border rounded-lg text-gray-700 py-12 px-8
          hover:scale-105 transition-all duration-500
          "
          >
            <img src="/logo.svg" alt="" className="w-10" />
            <p
            className="mt-3 font-semibold"
            >{item.id}</p>
            <p
            className="text-sm"
            >{item.desc}</p>
            <p className="mt-6">
              <span
              className="text-3xl font-medium "
              >${item.price}</span>/{item.credits} credits
            </p>
            <button className="
            w-full bg-gray-800 text-white mt-8 text-sm rounded-md py-2.5 min-w-52
            ">Buy</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BuyCredits;
