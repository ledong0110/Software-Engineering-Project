import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import useLogout from '../../../../hooks/useLogout';
import styles from './Sidebar.module.scss'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faTimes,
    faTruck,
    faListCheck,
    faDumpster,
    faMessage,
    faRightFromBracket,
    faAngleDoubleRight
  } from "@fortawesome/free-solid-svg-icons";

function Sidebar() {
    const [isOpen, setIsOpen] = useState(false)
    const logout = useLogout()
    const location = useLocation()
    const [clicked, setClicked] = useState('')
    const navigate = useNavigate()

    useEffect(() => {
        setClicked(location.pathname)
    }, [location])

    const handleTrigger = () => setIsOpen(!isOpen)

    const handleClick = (route) => {
        setClicked(route)
        navigate(route)
    }
    
    const signOut = async () => {
        await logout()
        navigate('/')
    }
    

    return (
        <aside className={clsx(styles.sidebar, isOpen ? styles.sidebar_open : "")} >
            <div className={clsx(styles.inner)}>
                <div className={clsx(styles.page)} onClick={handleTrigger}>
                    <FontAwesomeIcon icon={isOpen ? faTimes : faAngleDoubleRight} />
                </div>
                <div 
                    style={{
                        background: (clicked==='/task')? 'radial-gradient(95.63% 2754.87% at 1.9% 48.98%, rgba(0, 204, 144, 0.2) 2.03%, rgba(0, 204, 144, 0) 100%)' : '',
                    }}
                    className={clsx(styles.page)}
                    onClick={() => handleClick('/task')}
                >
                    <FontAwesomeIcon icon={faListCheck} />
                    <span>Nhiệm vụ</span>
                </div>
                <div 
                    style={{
                        background: (clicked==='/vehicle')? 'radial-gradient(95.63% 2754.87% at 1.9% 48.98%, rgba(0, 204, 144, 0.2) 2.03%, rgba(0, 204, 144, 0) 100%)' : '',
                    }}
                    className={clsx(styles.page)}
                    onClick={() => handleClick('/vehicle')}
                >
                    <FontAwesomeIcon icon={faTruck} />
                    <span>Phương tiện</span>
                </div>
                <div 
                    style={{
                        background: (clicked==='/mcp')? 'radial-gradient(95.63% 2754.87% at 1.9% 48.98%, rgba(0, 204, 144, 0.2) 2.03%, rgba(0, 204, 144, 0) 100%)' : '',
                    }}
                    className={clsx(styles.page)}
                    onClick={() => handleClick('/mcp')}
                >
                    <FontAwesomeIcon icon={faDumpster} />
                    <span>MCPS</span>
                </div>
                <div 
                    style={{
                        background: (clicked==='/chat')? 'radial-gradient(95.63% 2754.87% at 1.9% 48.98%, rgba(0, 204, 144, 0.2) 2.03%, rgba(0, 204, 144, 0) 100%)' : '',
                    }}
                    className={clsx(styles.page)}
                    onClick={() => handleClick('/chat')}
                >
                    <FontAwesomeIcon icon={faMessage} />
                    <span>Nhắn tin</span>
                </div>
                <div 
                    
                    className={clsx(styles.page)}
                    onClick={signOut}
                >
                    <FontAwesomeIcon icon={faRightFromBracket} />
                    <span>Đăng xuất</span>
                </div>
            </div>
            
        </aside>
    )
}

export default Sidebar;