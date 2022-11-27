    import clsx from 'clsx'
import styles from './PageTitle.module.scss'

function PageTitle({name,children}) {
    return (
        <div className={clsx(styles.wrapper)}>
            <div className={clsx(styles.name)}><h1>{name}</h1></div>
            <div className={clsx(styles.buttons)}>
                <button className={clsx(styles.defaultButton)}>Janitor</button>
                <button className={clsx(styles.defaultButton)}>Colector</button>
                {(name === 'Task')? (<div className={clsx(styles.taskButton)}>
                    <button className={clsx(styles.assign)}>Assigned Task</button>
                    <button className={clsx(styles.create)}>Created Task</button>
    </div>) : (<></>)}
            </div>
        </div>
    )
}

export default PageTitle;