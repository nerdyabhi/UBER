const Home = () => {
    return (
        <div className="w-full h-screen bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 flex flex-col justify-between">
            <div className="flex flex-col items-start p-5">
                <img className="h-12 my-5" src="src/assets/images/logo.png" alt="Logo" />
            </div>
            <div className="bg-white w-full flex flex-col py-10 px-5 items-center justify-center rounded-t-3xl shadow-lg">
                <h1 className="font-bold text-2xl mb-5 text-gray-800">Get Started</h1>
                <button className="w-2/4 max-w-[300px] bg-black rounded-lg text-white py-3 px-5 hover:bg-gray-800 transition duration-300">Continue</button>
            </div>
        </div>
    );
}

export default Home;