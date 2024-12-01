import { AUTO_IMG, CAR_IMG, MOTO_IMG } from "../utils/constants";

const RideComponent = ({setVehiclePanelOpen, setConfirmedVehiclePanel, fares, setVehicleType})=>{

    if(!fares) return <></>
    const {Auto , Car,Motorcycle} = fares?.fares?.fares;
    const closePanels = ()=>{
        setVehiclePanelOpen(false)
        setConfirmedVehiclePanel(true);
    }
    return (
        <>
            <div onClick={()=>{
                    /*Set Vehicle Type */
                    setVehicleType("Car");
                    /* Fix panel stuffs */
                    closePanels();
                    
                }} className="flex items-center justify-center border-2 gap-4  md:gap-6 px-5 py-2 rounded-lg active:border-black transition-all duration-200 cursor-pointer md:w-[40%] ">
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
                    
                }}className="flex items-center justify-center border-2 gap-4  md:gap-6 px-5 py-2 rounded-lg active:border-black transition-all duration-200 cursor-pointer md:w-[40%] ">
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
                }} className="flex items-center justify-center border-2 gap-4  md:gap-6 px-5 py-2 rounded-lg active:border-black transition-all duration-200 cursor-pointer md:w-[40%] ">
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