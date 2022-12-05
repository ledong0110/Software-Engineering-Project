import styles from './MessageSidebar.module.scss'
import useAxiosPrivate from "../../hooks/useAxiosPrivate"
import clsx from "clsx";
import { useEffect, useState } from 'react';
import { useLocation, useNavigate} from 'react-router-dom';
import useAuth from '../../hooks/useAuth';


function MessageSidebar({setSelectedUser}) {
    const [users, setUsers] = useState()
    const [focus, setFocus] = useState()
    const { auth } = useAuth()
    const axiosPrivate = useAxiosPrivate()
    const navigate = useNavigate()
    const location = useLocation()
    
    useEffect(() => {
        let isMounted = true
        const controller = new AbortController()

        const getUsers = async () => {
            try {
                const response = await axiosPrivate.get(`/backofficer/chat-app?id=${auth.id}`, {
                    signal: controller.signal
                })
                console.log(response.data)
                isMounted && setUsers(response.data.user_list)
            } catch (err) {
                console.log(err)
                navigate('/', { state: { from: location }, replace: true})
            }
        }
        if (!users) getUsers()

        return () => {
            
            isMounted = false
            controller.abort()
        }
    }, [])

    const filterUser = (name) => {
        return (
            users.filter(user => {
                if (name.length !== 0) {
                    return user.user.name.includes(name)
                }
                else return null
            })
        )
    }

    const handleChange = (e) => {
        // e.preventDefault()
        let dt = filterUser(e.target.value)
        if (dt.length > 0)
            setUsers(dt)
        
    }

    const handleClick = (user) => {
        setSelectedUser(user)
        setFocus(user.id)
    }
    

    return (  
        <div className={clsx(styles.sidebar)}>
            <div className={clsx(styles.header)}>
                <div className={clsx(styles.name)}>Trò chuyện</div>
                <input style={{width: '90%'}} placeholder='Tìm kiếm' spellCheck={false} onChange={handleChange}/>
            </div>
            { users?.length
                ? users.map((preview, index) => (
                        <div
                            style={{background: (preview.user.id===focus) && 'rgba(0, 204, 144, 0.25)'}} 
                            key={index} 
                            className={clsx(styles.receiver)} 
                            onClick={() => handleClick(preview.user)}>
                            <div className={clsx(styles.container)}>
                                <img className={clsx(styles.picture)} src={preview.user.picture} alt="janitor"/>
                                <div>
                                    <div className={clsx(styles.msgName)}>{preview.user.name}</div>
                                    
                                </div>
                            </div>
                            <div className={clsx(styles.preview)}>{preview.message}</div>
                        </div>
                    )
                )
                : <p>No users to display</p>
            }
        </div>
    );
}

export default MessageSidebar;