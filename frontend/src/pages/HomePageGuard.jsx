import { userContextAtom } from "../store/atom/UserContext";
import { useRecoilValue } from "recoil";

const Home = ({children}) => {
    const token = localStorage.getItem('token');
    if(!token){
        return <h1> Please Login and then do stufs! </h1>
    }
    const user = useRecoilValue(userContextAtom);
    if(!user){
        <h1>No context is there !</h1>
    }
    return (
        <>
            {children}
        </>
    )
}

export default Home;