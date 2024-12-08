import { Link } from 'react-router-dom';
import useDarkMode from '../hooks/useDarkMode';
import { useRecoilValue } from 'recoil';
import { userContextAtom } from '../store/atom/UserContext';
import { captainCoordinatesAtom } from '../store/atom/CoordinatesContext';
import { useState } from 'react';

const Navbar = () => {
    const {theme, toggleTheme} = useDarkMode();
    const user = useRecoilValue(userContextAtom);
    const captain = useRecoilValue(captainCoordinatesAtom);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    const renderLinks = () => {
        if (!captain && !user) {
            return (
                <>
                    <Link to="/login" className="text-gray-700 dark:text-white hover:text-black">Login</Link>
                    <Link to="/signup" className="text-gray-700 dark:text-white hover:text-black">Signup</Link>
                    <Link to="/captain/register" className="text-gray-700 dark:text-white hover:text-black">Become a Captain</Link>
                </>
            );
        }
        if (user) {
            return (
                <>
                    <Link to="#" className="text-gray-700 dark:text-white hover:text-black">Book a Ride</Link>
                    <Link to="#" className="text-gray-700 dark:text-white hover:text-black">My Rides</Link>
                </>
            );
        }
        if (captain) {
            return (
                <>
                    <Link to="#" className="text-gray-700 dark:text-white hover:text-black">Available Rides</Link>
                    <Link to="#" className="text-gray-700 dark:text-white hover:text-black">Ride History</Link>
                </>
            );
        }
    };

    return (
        <nav className="bg-white dark:bg-slate-900 dark:text-white shadow-md">
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex items-center justify-between h-14">
                    {/* Logo */}
                    <Link to="/" className="font-semibold font-sans text-xl">
                        Sasta Uber
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center space-x-4">
                        {renderLinks()}
                        <Link to={user ? "/profile" : captain ? "/captain/profile" : "#"} className="text-gray-700 dark:text-white hover:text-black">
                            <i className="fas fa-user text-xl"></i>
                        </Link>
                        <button onClick={toggleTheme} className="text-gray-700 hover:text-black">
                            {theme === 'dark' ? (
                                <i className="fas fa-sun text-xl"></i>
                            ) : (
                                <i className="fas fa-moon text-xl"></i>
                            )}
                        </button>
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden">
                        <button onClick={toggleMenu} className="text-gray-700 dark:text-white hover:text-black">
                            <i className={`fas ${isMenuOpen ? 'fa-times' : 'fa-bars'} text-xl`}></i>
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                {isMenuOpen && (
                    <div className="md:hidden pb-4">
                        <div className="flex flex-col space-y-3">
                            {renderLinks()}
                            <Link to='#' className="text-gray-700 dark:text-white hover:text-black">
                                Profile
                            </Link>
                            <button onClick={toggleTheme} className="text-gray-700 dark:text-white hover:text-black text-left">
                                {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;