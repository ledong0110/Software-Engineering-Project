import styles from './Account.module.scss'
import clsx from 'clsx'

function Account() {
    return (
        <div className={clsx(styles.wrapper)}>
            <img
                className={clsx(styles.avatar)}
                src='https://icatcare.org/app/uploads/2018/07/Thinking-of-getting-a-cat.png'
                alt='Name'
            />
            <div className={clsx(styles.name)}>
                Nguyen Van A
            </div>
        </div>
    )
}

export default Account;