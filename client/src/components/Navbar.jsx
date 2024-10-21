import { Link } from "react-router-dom";
import { MoveRight } from "lucide-react";
import { useClerk, UserButton, useUser } from "@clerk/clerk-react";
import { useContext, useEffect } from "react";
import { AppContext } from "../context/AppContext";

const Navbar = () => {
  const { openSignIn } = useClerk();
  const { isSignedIn, user } = useUser();

  const { credit, loadCreditsData } = useContext(AppContext);

  useEffect(() => {
    if (isSignedIn) {
      loadCreditsData();
    }
  }, [isSignedIn]);

  return (
    <nav className="flex items-center justify-between mx-4 py-4 lg:mx-44">
      {/* Logo */}
      <Link to="/" className="flex items-center">
        <img
          src="/logo.svg"
          alt="logo"
          className="w-10 sm:w-12 hover:opacity-90 transition-opacity duration-300"
        />
      </Link>

      {isSignedIn ? (
        <div className="flex justify-center items-center gap-2 lg:gap-3">
          <button className="flex items-center gap-2 bg-yellow-300 px-4 sm:px-7 py-1.5 sm:py-2.5 rounded-full hover:scale-105 transition-all duration-700">
            <img src="/icon/credit.svg" alt="credit" className="w-5 " />
            <p className="text-gray-600 text-xs sm:text-sm font-medium ">
              Credits :{credit}
            </p>
          </button>
          <p className="text-gray-600 max-sm:hidden">Hi, {user.fullName}</p>
          <UserButton />
        </div>
      ) : (
        <button
          onClick={() => openSignIn({})}
          className="px-6 py-2.5 flex items-center gap-2 text-white bg-gradient-to-r from-blue-500 to-blue-700 text-sm rounded-full hover:scale-105 transition-all duration-300"
        >
          Get Started <MoveRight className="w-4 h-4" />
        </button>
      )}
    </nav>
  );
};

export default Navbar;
