import axios from "../api/axios";
import useAuth from "./useAuth";

const useRefreshToken = () => {
    const { setAuth } = useAuth()

    const refresh = async () => {
         const response = await axios.get('/refresh', {
            withCredentials: true
         })
         console.log(response)
         setAuth(prev => {
            return { ...prev, ...response.data.user, accessToken: response.data.accessToken }
         })
         return response.data.token
    }
    return refresh
}

export default useRefreshToken