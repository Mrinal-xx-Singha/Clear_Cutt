const Footer = () => {
    return (
      <footer className="flex items-center justify-between gap-4 px-6 lg:px-44 py-4 bg-gray-100 ">
        {/* Logo */}
        <img src="/logo.svg" alt="footer logo" className="w-10 lg:w-12 hover:opacity-90 transition-opacity duration-300" />
        
        {/* Copyright Text */}
        <p className="flex-1 border-l border-gray-300 pl-4 text-xs md:text-sm text-gray-500 hidden sm:block">
          © {new Date().getFullYear()} MrinalSingha | All rights reserved.
        </p>
        
        {/* Social Icons */}
        <div className="flex gap-3">
          <a href="#" aria-label="Facebook" className="hover:opacity-80 transition-opacity duration-300">
            <img src="/icon/facebook.svg" alt="facebook" width={28} />
          </a>
          <a href="#" aria-label="Twitter" className="hover:opacity-80 transition-opacity duration-300">
            <img src="/icon/twitter.svg" alt="twitter" width={28} />
          </a>
          <a href="#" aria-label="Google" className="hover:opacity-80 transition-opacity duration-300">
            <img src="/icon/google.svg" alt="google" width={28} />
          </a>
        </div>
      </footer>
    );
  };
  
  export default Footer;
  