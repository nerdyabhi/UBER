export default function SearchingForDriver({ setIswaiting}) {
    return (
        <div className=" w-full max-w-[450px]">
            <div className="mb-8 text-center">
                <h2 className="text-2xl font-bold mb-2">Finding your driver</h2>
                <p className="text-gray-600">We're matching you with a nearby driver</p>
            </div>

            {/* Loading Animation Container */}
            <div className="flex justify-center items-center my-12">
                <div className="relative w-24 h-24">
                    {/* Pulsing Circle Animation */}
                    <div className="absolute inset-0 border-4 border-gray-200 rounded-full"></div>
                    <div className="absolute inset-0 border-4 border-t-black rounded-full animate-spin"></div>
                    
                    {/* Car Icon in Center */}
                    <div className="absolute inset-0 flex items-center justify-center">
                        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                                d="M8 12h.01M12 12h.01M16 12h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                </div>
            </div>

            {/* Estimated Time */}
            <div className="text-center mb-8">
                <p className="text-gray-600 text-sm">Estimated pickup time</p>
                <p className="text-2xl font-semibold">3-4 mins</p>
            </div>

            {/* Cancel Button */}
            <button 
                onClick={() => setIswaiting(false)}
                className="w-full border border-black py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
                Cancel
            </button>
        </div>
    )
}