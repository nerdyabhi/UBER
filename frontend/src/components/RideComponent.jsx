import { AUTO_IMG, CAR_IMG, MOTO_IMG } from "../utils/constants";

const RideComponent = ({setVehiclePanelOpen, setConfirmedVehiclePanel, fares, setVehicleType})=>{


    const {Auto , Car,Motorcycle} = fares?.fares;
    const closePanels = ()=>{
        setVehiclePanelOpen(false)
        setConfirmedVehiclePanel(true);
    }

    return (
        <>
        <h1 className="font-bold  text-2xl">Choose Your Ride</h1>
        <div className="absolute top-7 right-5">
            <button onClick={() => setVehiclePanelOpen(false)} className="text-gray-500 hover:text-black">
                <i className="fas fa-times text-2xl"></i>
            </button>
        </div>
            <div onClick={()=>{
                    /*Set Vehicle Type */
                    setVehicleType("Car");
                    /* Fix panel stuffs */
                    closePanels();
                    
                }} className="flex hover:border-2 hover:border-black items-center justify-center border-2 gap-4  md:gap-6 px-5 py-2 rounded-lg active:border-black transition-all duration-200 cursor-pointer md:w-full">
                <div className="car-img">
                    <img className="w-20" src={CAR_IMG} alt="CarLogo" />
                </div>
              
                <div className="center-details flex flex-col ">
                    <h1 className="font-semibold text-xl">Uber Go <span className="text-sm "><i className="fas fa-user ml-2"></i> 4</span></h1> 
                    <p className="font-thin">Affordable compact rides</p>
                </div>
                <div className="price">
                    <h1 className="font-bold">₹{Car}</h1>
                </div>
            </div>

            <div onClick={()=>{
                    /*Set Vehicle Type */
                    setVehicleType("Motorcycle");
                    /* Fix panel stuffs */
                    closePanels();
                    
                }}className="flex items-center justify-center border-2 gap-4 hover:border-2 hover:border-black  md:gap-6 px-5 py-2 rounded-lg active:border-black transition-all duration-200 cursor-pointer md:w-full ">
                <div className="car-img">
                    <img className="w-20" src={MOTO_IMG} alt="CarLogo" />
                </div>
                <div className="center-details flex flex-col ">
                    <h1 className="font-semibold text-xl">Moto G<span className="text-sm "><i className="fas fa-user ml-2"></i> 1</span></h1> 
                    <p className="font-thin">Affordable compact rides</p>
                </div>
                <div className="price">
                    <h1 className="font-bold">₹{Motorcycle}</h1>
                </div>
            </div>

            <div onClick={()=>{
                     /*Set Vehicle Type */
                     setVehicleType("Auto");
                     /* Fix panel stuffs */
                     closePanels();
                }} className="flex items-center hover:border-2 hover:border-black justify-center border-2 gap-4  md:gap-6 px-5 py-2 rounded-lg active:border-black transition-all duration-200 cursor-pointer md:w-full ">
                <div className="car-img">
                    <img className="w-20" src={AUTO_IMG} alt="CarLogo" />
                </div>
                <div className="center-details flex flex-col ">
                    <h1 className="font-semibold text-xl">Auto G <span className="text-sm "><i className="fas fa-user ml-2"></i> 3</span></h1> 
                    <p className="font-thin">Auto wala aayaa hui hui hui....</p>
                </div>
                <div className="price">
                    <h1 className="font-bold">₹{Auto}</h1>
                </div>
            </div>
      </>
    )
}

export default RideComponent;