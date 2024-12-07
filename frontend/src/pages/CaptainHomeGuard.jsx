import { useNavigate } from "react-router-dom";
import { captainContextAtom } from '../store/atom/CaptainContext'
import { useRecoilState } from "recoil";
import { useEffect } from "react";
import axios from "axios";
import { API_URL } from "../utils/constants";

const CaptainHomeGuard = ({children}) => {
    const Navigate = useNavigate();
    const token = localStorage.getItem('token');
    const [captain, setCaptain] = useRecoilState(captainContextAtom);

    useEffect(() => {
        if(!token) {
            Navigate('/login');
        }

        axios.get(API_URL + '/captain/profile', {
            headers: {
                authorization: `Bearer ${token}`
            }
        }).then(response => {
            console.log("Response is " , response);
            
            if(response.data.captain) {
                console.log("succesfully , Saved the captain");
                setCaptain(response.data.captain);
            } else {
                Navigate('/captain/login');
            }
        }).catch(() => {
            console.log("Error sigining in.");
            
            Navigate('/captain/login');
        });
    }, [token]);

    if(!captain) {
        Navigate('/captain/login')
    }
    return (
        <>
            {children}
        </>
    )
}

export default CaptainHomeGuard;