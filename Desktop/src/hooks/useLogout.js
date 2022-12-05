import axios from "../api/axios";
import useAuth from "./useAuth";


const useLogout = () => {
    const { setAuth } = useAuth()
    
    const logout = async () => {
        setAuth({})
        try {
            await axios('/logout', {
                withCredentials: true
            })
        } catch (err) {
            console.log(err)
        }
    }

    return logout
}

export default useLogout