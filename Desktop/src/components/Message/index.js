import styles from "./Message.module.scss";
import clsx from 'clsx'

export default function Message({ message, own }) {
  return (
    <div className={clsx(styles.inner, !own && styles.align)}>
        <img className={clsx(styles.avatar)} src={message.img} alt='avatar'/>
        <div className={clsx(styles.text, !own && styles.away)}>{message.text}</div>
    </div>
  );
}