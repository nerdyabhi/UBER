import { useRecoilValue } from "recoil";
import { userContextAtom } from "../store/atom/UserContext";
import axios from "axios";
import { API_URL } from "../utils/constants";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";



const Home = ()=>{
    const Navigate = useNavigate();

    const user = useRecoilValue(userContextAtom);
    const token = localStorage.getItem('token');
    const logoutHandler = async()=>{
        const response = await axios.get(API_URL+'/user/logout', {
            headers:{
                authorization:`Bearer ${token}`
            }
        })
        
        Navigate('/login')

        
    }
    if(!user) return <h1> Please Login to continue</h1>

    return(
        <>
           <h1> Hello World { user.fullName.firstName}</h1>
           <h1> Your Email : {user.email}</h1>
           <button className="border-2 px-2 py-2 " type="button" onClick={logoutHandler}>Logout</button>
        </>
    )
}

export default Home;