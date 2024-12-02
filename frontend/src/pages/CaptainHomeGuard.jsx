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
            return;
        }

        axios.get(API_URL + '/captain/profile', {
            headers: {
                authorization: `Bearer ${token}`
            }
        }).then(response => {
            if(response.status === 200) {
                console.log("succesfully , Saved the captain");
                setCaptain(response.data.captain);
            } else {
                Navigate('/login');
            }
        }).catch(() => {
            Navigate('/login');
        });
    }, [token]);

    if(!captain) {
        Navigate('/login')
    }
    return (
        <>
            {children}
        </>
    )
}

export default CaptainHomeGuard;