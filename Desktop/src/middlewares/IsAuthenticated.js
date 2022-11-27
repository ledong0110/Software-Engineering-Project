
import { Navigate} from "react-router-dom";

export function IsAuthenticated ({required, children}) {
   
    if (required){
        if (localStorage.getItem("token") === null) {
            return <Navigate to="/" />
        }
    }
    return children
}

