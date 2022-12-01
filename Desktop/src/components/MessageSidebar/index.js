import styles from './MessageSidebar.module.scss'
import clsx from "clsx";

function MessageSidebar({previews}) {
    return (  
        <div className={clsx(styles.sidebar)}>
            <div className={clsx(styles.header)}>
                <div className={clsx(styles.name)}>Trò chuyện</div>
                <input style={{width: '90%'}} placeholder='Tìm kiếm' spellCheck={false}/>
            </div>
            {previews.map((preview, index) => {
                return (
                    <div key={index} className={clsx(styles.receiver)}>
                        <div className={clsx(styles.container)}>
                            <img className={clsx(styles.picture)} src={preview.img} alt="janitor"/>
                            <div>
                                <div className={clsx(styles.msgName)}>{preview.name}</div>
                                <div className={clsx(styles.time)}>{preview.time}</div>
                            </div>
                        </div>
                        <div className={clsx(styles.preview)}>{preview.preview}</div>
                    </div>
                )
            })}
        </div>
    );
}

export default MessageSidebar;