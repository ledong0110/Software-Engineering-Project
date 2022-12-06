import useLogout from "../../hooks/useLogout"
import { useNavigate } from "react-router-dom"
function Unauthorized() {
    const navigate = useNavigate()
    const logout = useLogout()
    const signOut = async () => {
        await logout()
        navigate('/')
    }

    return (
        <>
        <h1>You are not allow to access this site</h1>
        <button onClick={signOut}>Sign out</button>
        </>
    )
}

export default Unauthorized