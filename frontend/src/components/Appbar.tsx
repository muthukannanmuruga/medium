import { useState, useRef, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

export const Appbar = ({ UserInitial }: { UserInitial: string }) => {
  const router = useNavigate();
  const location = useLocation();
  const dropdownRef = useRef<HTMLDivElement>(null); // Ref for the dropdown button
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleWriteClick = () => {
    router('/postblog');
  };

  const handleUserInitialClick = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
    // Clear localStorage or any other authentication tokens
    localStorage.removeItem('token');
    // Redirect the user to the login page
    router('/signin');
  };

  const closeDropdown = () => {
    setIsDropdownOpen(false);
  };

  useEffect(() => {
    // Close dropdown when clicking outside of it
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const isWriteDisabled = location.pathname === '/postblog';

  return (
    <div className="px-10 my-5 border-b border-gray-150 pb-5 mb-10 flex justify-between items-center">
      <div className="font-semibold cursor-pointer">
        <Link to={'/blog'}>Medium</Link>
      </div>
      <div className="flex items-center space-x-4">
        <button
          type="button"
          className={`text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700 ${isWriteDisabled ? 'cursor-not-allowed' : ''}`}
          onClick={handleWriteClick}
          disabled={isWriteDisabled}
        >
          Write
        </button>
        <div className="relative" ref={dropdownRef}>
          <div
            className="text-base font-bold text-gray-800 rounded-full h-10 w-10 flex items-center justify-center bg-gray-300 cursor-pointer"
            onClick={handleUserInitialClick}
          >
            {UserInitial}
          </div>
          {isDropdownOpen && (
            <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-lg shadow-lg">
              <button
                className="block w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-gray-200"
                onClick={handleLogout}
              >
                Log Out
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
