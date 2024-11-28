
import { useState } from "react";
import { Link } from "react-router-dom";

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

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
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
        console.log(captainData);
    };

    return (
        <div className="relative h-[100vh] flex items-center flex-col justify-center">
            <img className="absolute top-0 left-0 h-10 p-1 ml-2 my-5" src="src/assets/images/logo.png" alt="Logo" />
            <div className="flex flex-col items-center justify-center bg-gray-50">
                <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow-md">
                    <h2 className="text-center text-3xl font-bold text-gray-900">Register as Captain</h2>
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
                                />
                                <input
                                    type="text"
                                    name="lastName"
                                    placeholder="Last Name"
                                    required
                                    className="w-1/2 px-3 py-2 border rounded-lg"
                                    onChange={handleChange}
                                />
                            </div>
                            <input
                                type="email"
                                name="email"
                                placeholder="Email"
                                required
                                className="w-full px-3 py-2 border rounded-lg"
                                onChange={handleChange}
                            />
                            <input
                                type="password"
                                name="password"
                                placeholder="Password"
                                required
                                className="w-full px-3 py-2 border rounded-lg"
                                onChange={handleChange}
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
                                    />
                                    <select
                                        name="vehicleType"
                                        className="w-1/2 px-3 py-2 border rounded-lg"
                                        onChange={handleChange}
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
                                    />
                                    <input
                                        type="number"
                                        name="vehicleCapacity"
                                        placeholder="Vehicle Capacity"
                                        required
                                        className="w-1/2 px-3 py-2 border rounded-lg"
                                        onChange={handleChange}
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
            <button className="py-2 px-4 w-full bg-gray-300 text-black border border-gray-300 rounded-lg shadow-lg  hover:bg-black hover:text-white transition-all duration-200">
                Sign in as User
            </button>
        </Link>
        </div>
    );
};

export default CaptainSignup;