
import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown } from "lucide-react";
import { toast } from "sonner";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = () => {
      const loggedIn = localStorage.getItem("userLoggedIn");
      const email = localStorage.getItem("userEmail");
      setIsLoggedIn(!!loggedIn);
      setUserEmail(email);
    };

    checkAuth();
    window.addEventListener("storage", checkAuth);

    const handleScroll = () => {
      const offset = window.scrollY;
      setScrolled(offset > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("storage", checkAuth);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("userLoggedIn");
    localStorage.removeItem("userEmail");
    setIsLoggedIn(false);
    setUserEmail(null);
    toast.success("Successfully logged out!");
    navigate("/");
  };

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);
  const isActive = (path: string) => location.pathname === path;

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ease-in-out ${
        scrolled
          ? "bg-white/90 dark:bg-gray-900/90 backdrop-blur-md shadow-md"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-16 md:h-20">
          <Link
            to="/"
            className="flex items-center space-x-2"
            onClick={closeMenu}
          >
            <div className="w-8 h-8 bg-gov-blue rounded flex items-center justify-center">
              <span className="text-white font-bold text-lg">B</span>
            </div>
            <span className="font-bold text-xl text-gov-blue dark:text-white">
              Bharuch DDO
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link
              to="/"
              className={`text-sm font-medium transition-colors hover:text-gov-blue ${
                isActive("/")
                  ? "text-gov-blue"
                  : "text-gray-700 dark:text-gray-200"
              }`}
            >
              Home
            </Link>
            
            {isLoggedIn && (
              <>
                <Link
                  to="/dashboard"
                  className={`text-sm font-medium transition-colors hover:text-gov-blue ${
                    isActive("/dashboard")
                      ? "text-gov-blue"
                      : "text-gray-700 dark:text-gray-200"
                  }`}
                >
                  Dashboard
                </Link>
                <Link
                  to="/projects"
                  className={`text-sm font-medium transition-colors hover:text-gov-blue ${
                    isActive("/projects")
                      ? "text-gov-blue"
                      : "text-gray-700 dark:text-gray-200"
                  }`}
                >
                  Projects
                </Link>
              </>
            )}

            {isLoggedIn ? (
              <div className="relative group">
                <button className="flex items-center space-x-1 text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-gov-blue">
                  <span>{userEmail}</span>
                  <ChevronDown className="h-4 w-4" />
                </button>
                <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 ease-in-out z-50">
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    Sign out
                  </button>
                </div>
              </div>
            ) : (
              <Link to="/login">
                <Button
                  variant="default"
                  size="sm"
                  className="bg-gov-blue hover:bg-gov-blue/90 text-white"
                >
                  Login
                </Button>
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 dark:text-gray-200 hover:text-gov-blue hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <X className="block h-6 w-6" />
              ) : (
                <Menu className="block h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden transition-all duration-300 ease-in-out ${
          isOpen
            ? "max-h-64 opacity-100"
            : "max-h-0 opacity-0 pointer-events-none"
        } overflow-hidden bg-white dark:bg-gray-800 shadow-md`}
      >
        <div className="px-4 pt-2 pb-3 space-y-1">
          <Link
            to="/"
            className={`block px-3 py-2 rounded-md text-base font-medium ${
              isActive("/")
                ? "text-gov-blue bg-gray-50 dark:bg-gray-700"
                : "text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700"
            }`}
            onClick={closeMenu}
          >
            Home
          </Link>
          
          {isLoggedIn && (
            <>
              <Link
                to="/dashboard"
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  isActive("/dashboard")
                    ? "text-gov-blue bg-gray-50 dark:bg-gray-700"
                    : "text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700"
                }`}
                onClick={closeMenu}
              >
                Dashboard
              </Link>
              <Link
                to="/projects"
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  isActive("/projects")
                    ? "text-gov-blue bg-gray-50 dark:bg-gray-700"
                    : "text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700"
                }`}
                onClick={closeMenu}
              >
                Projects
              </Link>
            </>
          )}
          
          {isLoggedIn ? (
            <div className="px-3 py-2">
              <div className="text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                Signed in as {userEmail}
              </div>
              <button
                onClick={() => {
                  handleLogout();
                  closeMenu();
                }}
                className="text-sm text-gov-blue hover:text-gov-blue/80"
              >
                Sign out
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="block px-3 py-2"
              onClick={closeMenu}
            >
              <Button
                variant="default"
                size="sm"
                className="w-full bg-gov-blue hover:bg-gov-blue/90 text-white"
              >
                Login
              </Button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
