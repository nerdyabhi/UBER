import { useNavigate } from "react-router-dom";
import { userContextAtom } from "../store/atom/UserContext";
import { useRecoilState } from "recoil";
import { useEffect } from "react";
import axios from "axios";
import { API_URL } from "../utils/constants";

const HomePageGuard = ({children}) => {
    const Navigate = useNavigate();
    const token = localStorage.getItem('token');
    const [user, setUser] = useRecoilState(userContextAtom);

    useEffect(() => {
        if (!token) {
            Navigate('/login');
        }
    }, [token, Navigate]);

    useEffect(() => {
        if(!token && !user){
            Navigate('/login');
        }
    }, [token, user, Navigate]);

    useEffect(() => {
        const getProfile = async () => {
            try {
                const response = await axios.get(API_URL + '/user/profile', {
                    headers: {
                        authorization: `Bearer ${token}`
                    }
                });

                if (response.status === 200) {
                    setUser(response.data.user);
                } else {
                    Navigate('/login');
                }
            } catch (error) {
                console.log("Error Signing In", error);
                Navigate('/login');
            }
        };

        getProfile();
    }, [token, Navigate]);

    useEffect(() => {
        if(!user) {
            Navigate('/login');
        }
    }, [user, Navigate]);

    return (
        <>
            {children}
        </>
    )
}

export default HomePageGuard;