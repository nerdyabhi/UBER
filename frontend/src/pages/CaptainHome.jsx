import { useRecoilValue } from "recoil";
import { captainContextAtom } from "../store/atom/CaptainContext";
import axios from "axios";
import { API_URL } from "../utils/constants";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const CaptainHome = () => {
    const Navigate = useNavigate();

    const captain = useRecoilValue(captainContextAtom);
    const token = localStorage.getItem('token');
    const logoutHandler = async () => {
        const response = await axios.get(API_URL + '/captain/logout', {
            headers: {
                authorization: `Bearer ${token}`
            }
        })

        Navigate('/login')
    }

    if (!captain) return <h1> Please Login to continue</h1>

    return (
        <>
            <h1> Hello Captain {captain.fullName.firstName}</h1>
            <h1> Your Email : {captain.email}</h1>
            <button className="border-2 px-2 py-2" type="button" onClick={logoutHandler}>Logout</button>
        </>
    )
}

export default CaptainHome;