import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import useRefreshToken from "../../hooks/useRefreshToken";
import useAuth from "../../hooks/useAuth";

const PersistLogin = () => {
    const [isLoading, setIsLoading]  = useState(true)
    const refresh = useRefreshToken()
    const { auth } = useAuth()

    useEffect(() => {
        let isMounted = true

        const verifyRefreshToken = async () => {
            try {
                await refresh()
            }
            catch (err) {
                console.error(err)
            }
            finally {
                isMounted && setIsLoading(false)
            }
        }
        !auth?.accessToken ? verifyRefreshToken() : setIsLoading(false)

        return () => isMounted = false
    }, [])

    useEffect(() => {
        console.log(`isloading: ${isLoading}`)
        console.log(`at: ${JSON.stringify(auth?.accessToken)}`)
    }, [isLoading])

    return (
        <>
            {isLoading 
                ? <p>Loading...</p>
                : <Outlet />
            }

        </>
    )
}

export default PersistLogin