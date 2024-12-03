import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { captainContextAtom } from "../store/atom/CaptainContext";
import { useRecoilState } from "recoil";
import axios from "axios";
import { API_URL } from "../utils/constants";

const CaptainSignup = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        vehicleColor: '',
        vehiclePlate: '',
        vehicleCapacity: '',
        vehicleType: 'car'
    });
    const [error , setError] = useState(null);
    const [captain, setCaptain] = useRecoilState(captainContextAtom);
    const Navigate = useNavigate();
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    const handleSubmit = async(e) => {
        e.preventDefault();
        const captainData = {
            fullName: {
                firstName: formData.firstName,
                lastName: formData.lastName
            },
            email: formData.email,
            password: formData.password,
            vehicle: {
                color: formData.vehicleColor,
                plate: formData.vehiclePlate,
                capacity: Number(formData.vehicleCapacity),
                vehicleType: formData.vehicleType
            }
        };

        try {
            const response = await axios.post(API_URL + '/captain/register', captainData , {
                withCredentials:true,
            })
            
            console.log(response);
            
            if(response.status ==200){

                localStorage.setItem('token' , response.data.token);
                setCaptain(response.data.captain);
                Navigate('/captain/home');
            }
        } catch (error) {
            console.log(error);
            
            const error_message = error?.response?.data?.msg || (error?.response?.data?.error[0]?.message)   ;
            setError(error_message);
        }

        // Clear data
        // setFormData({
        //     firstName: '',
        //     lastName: '',
        //     email: '',
        //     password: '',
        //     vehicleColor: '',
        //     vehiclePlate: '',
        //     vehicleCapacity: '',
        //     vehicleType: 'car'
        // });
    };

    return (
        <div className="relative h-[100vh] flex items-center flex-col justify-center">
            <img className="absolute top-0 left-0 h-10 p-1 ml-2 my-5" src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="Logo" />
            <div className="flex flex-col items-center justify-center bg-gray-50">
                <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow-md">
                    <h2 className="text-center text-3xl font-bold text-gray-900">Register as Captain</h2>
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
                    <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                        <div className="rounded-md shadow-sm space-y-4">
                            <div className="flex space-x-4">
                                <input
                                    type="text"
                                    name="firstName"
                                    placeholder="First Name"
                                    required
                                    className="w-1/2 px-3 py-2 border rounded-lg"
                                    onChange={handleChange}
                                    value={formData.firstName}
                                />
                                <input
                                    type="text"
                                    name="lastName"
                                    placeholder="Last Name"
                                    required
                                    className="w-1/2 px-3 py-2 border rounded-lg"
                                    onChange={handleChange}
                                    value={formData.lastName}
                                />
                            </div>
                            <input
                                type="email"
                                name="email"
                                placeholder="Email"
                                required
                                className="w-full px-3 py-2 border rounded-lg"
                                onChange={handleChange}
                                value={formData.email}
                            />
                            <input
                                type="password"
                                name="password"
                                placeholder="Password"
                                required
                                className="w-full px-3 py-2 border rounded-lg"
                                onChange={handleChange}
                                value={formData.password}
                            />
                            <div className="space-y-4">
                                <div className="flex space-x-4">
                                    <input
                                        type="text"
                                        name="vehicleColor"
                                        placeholder="Vehicle Color"
                                        required
                                        className="w-1/2 px-3 py-2 border rounded-lg"
                                        onChange={handleChange}
                                        value={formData.vehicleColor}
                                    />
                                    <select
                                        name="vehicleType"
                                        className="w-1/2 px-3 py-2 border rounded-lg"
                                        onChange={handleChange}
                                        value={formData.vehicleType}
                                    >
                                        <option value="car">Car</option>
                                        <option value="motorcycle">Motorcycle</option>
                                        <option value="auto">Auto</option>
                                    </select>
                                </div>
                                <div className="flex space-x-4">
                                    <input
                                        type="text"
                                        name="vehiclePlate"
                                        placeholder="Vehicle Plate Number"
                                        required
                                        className="w-1/2 px-3 py-2 border rounded-lg"
                                        onChange={handleChange}
                                        value={formData.vehiclePlate}
                                    />
                                    <input
                                        type="number"
                                        name="vehicleCapacity"
                                        placeholder="Vehicle Capacity"
                                        required
                                        className="w-1/2 px-3 py-2 border rounded-lg"
                                        onChange={handleChange}
                                        value={formData.vehicleCapacity}
                                    />
                                </div>
                            </div>
                        </div>
                        <button
                            type="submit"
                            className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-black hover:bg-gray-800"
                        >
                            Register
                        </button>
                    </form>
                </div>
                <p className="mt-2 text-center text-sm text-gray-600">
                    Already registered?{" "}
                    <Link to="/captain/login" className="font-medium text-indigo-600 hover:text-indigo-500">
                        Login here
                    </Link>
                </p>
            </div>
            <Link to="/login" className="absolute w-[45%] bottom-7 flex items-center justify-center ">
                <button className="py-2 px-4 w-full bg-gray-300 text-black border border-gray-300 rounded-lg shadow-lg hover:bg-black hover:text-white transition-all duration-200">
                    Sign in as User
                </button>
            </Link>
        </div>
    );
};

export default CaptainSignup;