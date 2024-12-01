import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import { API_URL } from "../utils/constants";
import { useRecoilState } from "recoil";
import { captainContextAtom } from "../store/atom/CaptainContext";
const CaptainLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error , setError] = useState(null);
    const [captain , setCaptain] = useRecoilState(captainContextAtom);
    const Navigate = useNavigate();
    const submitHanlder = async(e) => {
        e.preventDefault();
        const data = {email , password};
        try {
            const response = await axios.post(API_URL + '/captain/login' , data, {
                withCredentials:true,
            } )

            if(response.status == 200){
                setCaptain(response.data.captain);
                localStorage.setItem('token' , response.data.token);
                Navigate('/captain/home')
            }
            
            
        } catch (error) {
            console.log("eroor" , error);
            const error_message = error.response.data.msg || 
            error.response.data.errors[0]?.message;
            setError(error_message);
            
        }



        // Clear Data
        setPassword('');
        setEmail('');
       
    }

    return (
        <div className="relative h-[100vh] flex items-center flex-col justify-center bg-gray-50">
            <img className="absolute top-0 left-0 h-10 p-1 ml-2 my-5" src="src/assets/images/logo.png" alt="Logo" />

            <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow-md">
                <div>
                    <h2 className="text-center text-3xl font-bold text-gray-900">Welcome Back Captain !</h2>
                </div>

                    {/* Error Message Page */}
                    {error && (
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                            <strong className="font-bold">Oops! </strong>
                            <span className="block sm:inline">{error}</span>
                            <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
                                <svg onClick={()=>setError(null)} className="fill-current h-6 w-6 text-red-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                    <title>Close</title>
                                    <path d="M14.348 5.652a1 1 0 10-1.414-1.414L10 7.172 7.066 4.238a1 1 0 00-1.414 1.414L8.586 10l-2.934 2.934a1 1 0 001.414 1.414L10 12.828l2.934 2.934a1 1 0 001.414-1.414L11.414 10l2.934-2.934z"/>
                                </svg>
                            </span>
                        </div>
                    )}

                <form onSubmit={submitHanlder} className="mt-8 space-y-6">
                    <div className="rounded-md shadow-sm space-y-4">
                        <div>
                            <label htmlFor="email" className="sr-only">Email address</label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                required
                                value={email}
                                className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                placeholder="Email address"
                                onChange={(e) => setEmail(e.target.value)}
                               
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="sr-only">Password</label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                required
                                value={password}
                                className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                placeholder="Password"
                                onChange={(e) => setPassword(e.target.value)}
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
                    <Link to="/captain/register" className="font-medium text-indigo-600 hover:text-indigo-500">
                        Sign up here
                    </Link>
                </p>
                
            </div>

            <div className="flex items-center justify-center w-[50%] "></div>
                <Link to="/login" className="absolute bottom-10 bg-gray-200 px-10 py-2 rounded-lg font-semibold text-lg hover:bg-black hover:text-white transition-all duration-200">
                    Sign in as User
                </Link>
        </div>

    );
};

export default CaptainLogin;
