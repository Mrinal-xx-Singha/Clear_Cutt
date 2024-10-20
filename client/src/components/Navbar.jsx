import { Link } from "react-router-dom";
import { MoveRight } from "lucide-react";
import { useClerk, UserButton, useUser } from "@clerk/clerk-react";

const Navbar = () => {
  const { openSignIn } = useClerk();
  const { isSignedIn, user } = useUser();

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
        <div>
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
