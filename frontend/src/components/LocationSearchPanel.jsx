import React from "react"

const LocationSearchPanel = ({setVehiclePanelOpen , setPanelOpen}) => {

    const locations = ['24B , Lorem ipsum dolor sit amet consectetur, adipisicing elit. Qui, obcaecati.',
        '24B , Lorem ipsum dolor sit amet consectetur, adipisicing elit. Qui, obcaecati.',
        '24B , Lorem ipsum dolor sit amet consectetur, adipisicing elit. Qui, obcaecati.',
        '24B , Lorem ipsum dolor sit amet consectetur, adipisicing elit. Qui, obcaecati.',
        
    ]
    return (
        <div className=" ">
            {
                locations.map((element , index)=>{
                     return (
                     <div key={index} onClick={()=>{
                        setVehiclePanelOpen(true)
                        setPanelOpen(false);
                     }} className="flex border-2  py-2 active:border-black items-center gap-4 w-full m-2  hover:bg-gray-50 rounded-md transition-colors cursor-pointer">
                         <div className="text-2xl">📍</div>
                         <h4 className="text-md  ">{element}</h4>
                     </div>)

                })
            }
        </div>
    )
}

export default LocationSearchPanel;