import clsx from 'clsx'
import { useState } from 'react';
import styles from './PageTitle.module.scss'

function PageTitle({name,children}) {
    const [collector, setCollector] = useState(true)

    return (
        <div className={clsx(styles.wrapper)}>
            <div className={clsx(styles.name)}><h1>{name}</h1></div>
            <div className={clsx(styles.buttons)}>
                <button 
                    className={clsx(styles.defaultButton)} 
                    style={{color: !collector && 'rgba(0, 0, 0, 0.2)'}}
                    onClick={() => setCollector(true)}
                >
                    Janitor
                </button>
                <button className={clsx(styles.defaultButton)} style={{color: collector && 'rgba(0, 0, 0, 0.2)'}} onClick={() =>setCollector(false)}>Colector</button>
                {(name === 'Task')? (<div className={clsx(styles.taskButton)}>
                    <button className={clsx(styles.assign)}>Assigned Task</button>
                    <button className={clsx(styles.create)}>Created Task</button>
    </div>) : (<></>)}
            </div>
        </div>
    )
}

export default PageTitle;