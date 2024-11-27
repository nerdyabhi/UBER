import { useState } from "react";
import { Link } from "react-router-dom";


const UserLogin = () => {
    const [email , setEmail] = useState('');
    const [password , setPassword] = useState('');
    const submitHanlder = (e)=>{
        e.preventDefault();
        console.log("Email : " , email);
        console.log("Password : " , password);
        setPassword('');
        setEmail('');
    }
    return (
        <div className="relative h-[100vh] flex items-center flex-col justify-center ">

            {/* Content */}
            <img className=" absolute top-0 left-0 h-10 p-1 ml-2 my-5" src="src/assets/images/logo.png" alt="Logo" />

            <div className="flex  items-center justify-center bg-gray-50">
                <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow-md">
                    <div>
                        <h2 className="text-center text-3xl font-bold text-gray-900">
                            Welcome Back
                        </h2>
                        
                    </div>

                    <form onSubmit={submitHanlder} className="mt-8 space-y-6">
                        <div className="rounded-md shadow-sm space-y-4">
                            <div>
                                <label htmlFor="email" className="sr-only">
                                    Email address
                                </label>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    required
                                    className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                    placeholder="Email address"
                                    onChange={(e)=>setEmail(e.target.value)}
                                />
                            </div>
                            <div>
                                <label htmlFor="password" className="sr-only">
                                    Password
                                </label>
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    required
                                    className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                    placeholder="Password"
                                    onChange={(e)=>setPassword(e.target.value)}
                                    
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                        >
                            Sign in
                        </button>
                    </form>

                    <p className="mt-2 text-center text-sm text-gray-600">
                            New Here?{" "}
                            <a href="/signup" className="font-medium text-indigo-600 hover:text-indigo-500">
                                Sign up here
                            </a>
                        </p>
                </div>
            </div>

            <div className="absolute bottom-12">
                <Link  to='/captain/register' className="w-full bg-gray-200 px-10 py-2 rounded-lg font-semibold text-lg hover:bg-black  hover:text-white transition-all duration-200">SignIn as a Captain</Link>
            </div>
        </div>
    )
};

export default UserLogin;