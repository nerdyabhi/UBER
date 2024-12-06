import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <div className="bg-white h-14 w-full flex items-center justify-between px-4 mt-2 shadow-md">
            <div className="flex items-center space-x-4">

                <Link to="/" className="font-semibold font-sans text-xl">Sasta Uber</Link>
            </div>
            <div className="flex items-center space-x-4">
                <Link to="/login" className="text-gray-700 hover:text-black">Login</Link>
                <Link to="/signup" className="text-gray-700 hover:text-black">Signup</Link>
                <Link to="/captain/register" className="text-gray-700 hover:text-black">Become a Captain</Link>
                <button className="text-gray-700 hover:text-black">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                </button>
            </div>
        </div>
    )
}

export default Navbar;