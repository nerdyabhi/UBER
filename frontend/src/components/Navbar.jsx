import { Link } from 'react-router-dom';
import useDarkMode from '../hooks/useDarkMode';

const Navbar = () => {
    const {theme, toggleTheme} = useDarkMode();

    return (
        <div className="bg-white dark:bg-slate-900 dark:text-white h-14 w-full flex items-center justify-between px-4 shadow-md z-100">
            <div className="flex items-center space-x-4">
                <Link to="/" className="font-semibold font-sans text-xl">Sasta Uber</Link>
            </div>
            <div className="flex items-center space-x-4">
                <Link to="/login" className="text-gray-700 dark:text-white hover:text-black">Login</Link>
                <Link to="/signup" className="text-gray-700 dark:text-white hover:text-black">Signup</Link>
                <Link to="/captain/register" className="text-gray-700 dark:text-white hover:text-black">Become a Captain</Link>
                <button className="text-gray-700 dark:text-white hover:text-black">
                    <i className="fas fa-user text-xl"></i>
                </button>
                <button onClick={toggleTheme} className="text-gray-700 hover:text-black ml-2">
                    {theme === 'dark' ? (
                        <i className="fas fa-sun text-xl"></i>
                    ) : (
                        <i className="fas fa-moon text-xl"></i>
                    )}
                </button>
            </div>
        </div>
    )
}

export default Navbar;