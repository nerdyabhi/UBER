const RideComponent = ({img , setVehiclePanelOpen })=>{
    return (
      <div onClick={()=>setVehiclePanelOpen(false)} className="flex items-center justify-center border-2 gap-4  md:gap-6 px-5 py-2 rounded-lg active:border-black transition-all duration-200 cursor-pointer md:w-[40%] ">
        <div className="car-img">
            <img className="w-20" src={img} alt="CarLogo" />
        </div>
        <div className="center-details flex flex-col ">
            <h1 className="font-semibold text-xl">UberGo <span className="text-lg ">🧑‍🦲4</span></h1> 
            <p className="font-thin">Affordable compact rides</p>
        </div>
        <div className="price">
            <h1 className="font-bold">$193.20</h1>
        </div>
      </div>
    )
}

export default RideComponent;