import clsx from 'clsx';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Sidebar.module.scss'

function Sidebar() {
    const [clicked, setClicked] = useState('')
    const navigate = useNavigate()

    const handleClick = (route) => {
        setClicked(route)
        navigate('/' + route)
    }
     
    return (
        <aside className={clsx(styles.wrapper)}>
            <div className={clsx(styles.inner)}>
                <div 
                    style={{
                        background: (clicked==='')? 'radial-gradient(95.63% 2754.87% at 1.9% 48.98%, rgba(0, 204, 144, 0.2) 2.03%, rgba(0, 204, 144, 0) 100%)' : 'black',
                    }}
                    className={clsx(styles.page)}
                    onClick={() => handleClick('')}
                >
                    Task
                </div>
                <div 
                    style={{
                        background: (clicked==='vehicle')? 'radial-gradient(95.63% 2754.87% at 1.9% 48.98%, rgba(0, 204, 144, 0.2) 2.03%, rgba(0, 204, 144, 0) 100%)' : 'black',
                    }}
                    className={clsx(styles.page)}
                    onClick={() => handleClick('vehicle')}
                >
                    Vehicle
                </div>
                <div 
                    style={{
                        background: (clicked==='mcp')? 'radial-gradient(95.63% 2754.87% at 1.9% 48.98%, rgba(0, 204, 144, 0.2) 2.03%, rgba(0, 204, 144, 0) 100%)' : 'black',
                    }}
                    className={clsx(styles.page)}
                    onClick={() => handleClick('mcp')}
                >
                    MCPs
                </div>
                <div 
                    style={{
                        background: (clicked==='chat')? 'radial-gradient(95.63% 2754.87% at 1.9% 48.98%, rgba(0, 204, 144, 0.2) 2.03%, rgba(0, 204, 144, 0) 100%)' : 'black',
                    }}
                    className={clsx(styles.page)}
                    onClick={() => handleClick('chat')}
                >
                    Chat
                </div>
            </div>
        </aside>
    )
}

export default Sidebar;