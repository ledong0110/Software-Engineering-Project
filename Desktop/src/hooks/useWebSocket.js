import { useEffect, useState } from "react";
import { connectToWebSocket, listenToWebSocketEvents } from "../services/socket-service";
import useAuth from "./useAuth";

const useWebSocket = () => {
    const [internalError, setInternalError] = useState(null);
    const { auth } = useAuth()
    useEffect(() => {
        const webSocketConnection = connectToWebSocket(auth.id)
        if (webSocketConnection.webSocketConnection === null) {
            setInternalError(webSocketConnection.message)
        } else {
            listenToWebSocketEvents()
        }
    }, [])
    return internalError
}

export default useWebSocket;