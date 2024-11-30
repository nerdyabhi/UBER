
import React from "react"

const LocationSearchPanel = ({locations}) => {
    if(!locations) return <></>
    return (
        <div className="px-4">
            {
                locations.map((location) => {
                    return (
                        <div 
                            key={location.place_id} 
                          
                            className="flex border-2 py-3 px-4 active:border-black items-center gap-4 w-full mb-2 hover:bg-gray-50 rounded-md transition-colors cursor-pointer"
                        >
                            <div className="text-2xl">
                                <i className="fas fa-map-marker-alt text-gray-600"></i>
                            </div>
                            <div>
                                <h4 className="text-md font-medium text-gray-900">
                                    {location.description}
                                </h4>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default LocationSearchPanel;