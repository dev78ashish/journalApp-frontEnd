import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, BookOpen, LogIn, UserPlus, LogOut, Home, Settings } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";

const Navbar = ({ showAlert }) => {
  const { isAuthenticated, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  // Close mobile menu when changing routes
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  const handleLogout = () => {
    logout();
    showAlert("Logged out successfully!", "warning");
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <nav className="bg-gradient-to-r from-indigo-700 to-indigo-600 text-white shadow-md">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 font-bold text-xl">
            <BookOpen size={24} className="text-indigo-200" />
            <span className="text-white">
              Journal<span className="text-indigo-200">Mind</span>
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-1">
            <NavLink to="/" active={isActive("/")}>
              <Home size={18} className="mr-1" />
              Home
            </NavLink>

            {!isAuthenticated ? (
              <>
                <NavLink to="/login" active={isActive("/login")}>
                  <LogIn size={18} className="mr-1" />
                  Login
                </NavLink>
                <NavLink to="/signup" active={isActive("/signup")}>
                  <UserPlus size={18} className="mr-1" />
                  Signup
                </NavLink>
                <button className="ml-4 px-4 py-2 bg-white text-indigo-700 hover:bg-indigo-50 rounded-lg transition-colors duration-200 flex items-center font-medium">
                  Get Started
                </button>
              </>
            ) : (
              <>
                <NavLink to="/settings" active={isActive("/settings")}>
                  <Settings size={18} className="mr-1" />
                  Settings
                </NavLink>
                <button
                  onClick={handleLogout}
                  className="ml-4 px-4 py-2 text-white border border-white hover:bg-indigo-500 rounded-lg transition-colors duration-200 flex items-center"
                >
                  <LogOut size={18} className="mr-1" />
                  Logout
                </button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-indigo-500 transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden mt-4 pt-4 border-t border-indigo-500 rounded-lg">
            <div className="flex flex-col space-y-2 p-2">
              <MobileNavLink to="/" active={isActive("/")}>
                <Home size={18} className="mr-2" />
                Home
              </MobileNavLink>

              {!isAuthenticated ? (
                <>
                  <MobileNavLink to="/login" active={isActive("/login")}>
                    <LogIn size={18} className="mr-2" />
                    Login
                  </MobileNavLink>
                  <MobileNavLink to="/signup" active={isActive("/signup")}>
                    <UserPlus size={18} className="mr-2" />
                    Signup
                  </MobileNavLink>
                  <button className="mt-2 py-3 w-full bg-white text-indigo-700 hover:bg-indigo-50 rounded-lg transition-colors duration-200 flex items-center justify-center font-medium">
                    Get Started
                  </button>
                </>
              ) : (
                <>
                  <MobileNavLink to="/settings" active={isActive("/settings")}>
                    <Settings size={18} className="mr-2" />
                    Settings
                  </MobileNavLink>
                  <button
                    onClick={handleLogout}
                    className="py-3 mt-2 w-full border border-white text-white hover:bg-indigo-500 rounded-lg transition-colors duration-200 flex items-center justify-center"
                  >
                    <LogOut size={18} className="mr-2" />
                    Logout
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

// Desktop navigation link component
const NavLink = ({ children, to, active }) => {
  return (
    <Link
      to={to}
      className={`px-3 py-2 rounded-lg flex items-center transition-colors duration-200
        ${active ? "bg-indigo-800 font-semibold" : "hover:bg-indigo-500"}
      `}
    >
      {children}
    </Link>
  );
};

// Mobile navigation link component
const MobileNavLink = ({ children, to, active }) => {
  return (
    <Link
      to={to}
      className={`px-4 py-2 rounded-lg flex items-center transition-colors duration-200
        ${active ? "bg-indigo-800 font-semibold" : "hover:bg-indigo-500"}
      `}
    >
      {children}
    </Link>
  );
};

export default Navbar;
