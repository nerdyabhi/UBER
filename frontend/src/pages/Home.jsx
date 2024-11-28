import { useRecoilValue } from "recoil";
import { userContextAtom } from "../store/atom/UserContext";


const Home = ()=>{
    
    const user = useRecoilValue(userContextAtom);
    if(!user) return <h1>Please Login to continue</h1>
    return(
        <>
           <h1> Hello World { user.fullName.firstName}</h1>
           <h1> Your Email : {user.email}</h1>
        </>
    )
}

export default Home;