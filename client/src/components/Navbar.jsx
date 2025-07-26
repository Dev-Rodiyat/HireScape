import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/auth/authSlice";
import LogoutModal from "./LogoutModal";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDashMenuOpen, setIsDashMenuOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const location = useLocation();
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.auth);
console.log({user})
  const isActive = (path) => location.pathname === path;

  const navLinkClass = (path) =>
    `text-sm font-medium transition ${isActive(path)
      ? "text-indigo-600"
      : "text-gray-600 hover:text-indigo-600"
    }`;

  const handleLogoutConfirm = async () => {
    await dispatch(logout());
    setShowModal(false);
  };

  return (
    <nav className="bg-white shadow-md w-full sticky top-0 z-50">
      <div className="w-full px-4">
        <div className="flex items-center justify-between h-16 relative">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center">
              <span className="text-2xl font-bold text-indigo-600">HireScape</span>
            </Link>
          </div>

          {/* Center Nav Links */}
          <div className="absolute left-1/2 transform -translate-x-1/2 hidden md:flex space-x-6">
            <Link to="/" className={navLinkClass("/")}>Home</Link>
            <Link to="/about" className={navLinkClass("/about")}>About</Link>
            <Link to="/how" className={navLinkClass("/how")}>How It Works</Link>
            <Link to="/jobs" className={navLinkClass("/jobs")}>Jobs</Link>
            {user && (
              <>
                {user.role === "employer" ? (
                  <>
                    <Link to="/employer/dashboard" className={navLinkClass("/employer/dashboard")}>Dashboard</Link>
                    <Link to="/create-job" onClick={() => setIsMenuOpen(false)} className={navLinkClass("/create-job")}>Create Job</Link>
                  </>
                ) : (
                  <>
                    <Link to="/applicant/dashboard" className={navLinkClass("/applicant/dashboard")}>Dashboard</Link>
                    {/* <Link to="/applicant/analytics" className={navLinkClass("/applicant/analytics")}>Analytics</Link> */}
                  </>
                )}
              </>
            )}
          </div>

          {/* Right Side */}
          <div className="hidden md:flex items-center space-x-4">
            {!user ? (
              <>
                <Link
                  to="/register"
                  className="px-4 py-1.5 rounded-md border text-sm font-medium text-white border-indigo-600 bg-indigo-600 hover:bg-indigo-700"
                >
                  Register
                </Link>
                <Link
                  to="/login"
                  className="px-4 py-1.5 rounded-md border text-sm font-medium text-gray-800 border-gray-800 hover:bg-gray-100"
                >
                  Login
                </Link>
              </>
            ) : (
              <>
               <LogoutModal
                  isOpen={showModal}
                  onClose={() => setShowModal(false)}
                  onConfirm={handleLogoutConfirm}
                />
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-500 hover:text-indigo-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 ">
          <div className="px-4 py-4 space-y-2 flex flex-col gap-2">
            <Link to="/" onClick={() => setIsMenuOpen(false)} className={navLinkClass("/")}>Home</Link>
            <Link to="/about" onClick={() => setIsMenuOpen(false)} className={navLinkClass("/about")}>About</Link>
            <Link to="/how" onClick={() => setIsMenuOpen(false)} className={navLinkClass("/how")}>How It Works</Link>
            <Link to="/jobs" onClick={() => setIsMenuOpen(false)} className={navLinkClass("/jobs")}>Jobs</Link>

            {!user ? (
              <>
                <Link to="/register" onClick={() => setIsMenuOpen(false)} className={navLinkClass("/register")}>Register</Link>
                <Link to="/login" onClick={() => setIsMenuOpen(false)} className={navLinkClass("/login")}>Login</Link>
              </>
            ) : (
              <>
                {user.role === "employer" ? (
                  <>
                    <Link to="/employer/dashboard" onClick={() => setIsMenuOpen(false)} className={navLinkClass("/employer/dashboard")}>Dashboard</Link>
                    <Link to="/create-job" onClick={() => setIsMenuOpen(false)} className={navLinkClass("/create-job")}>Create Job</Link>
                  </>
                ) : (
                  <>
                    <Link to="/applicant/dashboard" onClick={() => setIsMenuOpen(false)} className={navLinkClass("/applicant/dashboard")}>Dashboard</Link>
                    {/* <Link to="/applicant/analytics" onClick={() => setIsMenuOpen(false)} className={navLinkClass("/applicant/analytics")}>Analytics</Link> */}
                  </>
                )}
                <LogoutModal
                  isOpen={showModal}
                  onClose={() => setShowModal(false)}
                  onConfirm={handleLogoutConfirm}
                />
              </>
            )}
          </div>
        </div>
      )}

      {/* Logout Modal */}

    </nav>
  );
};

export default Navbar;
