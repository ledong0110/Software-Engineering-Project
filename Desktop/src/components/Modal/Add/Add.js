import styles from './Add.module.scss'
import clsx from 'clsx'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSort } from '@fortawesome/free-solid-svg-icons';

function AddModal({modal, setModal}) {
    return ( 
        <div className={clsx(styles.modal)} style={{display: modal}}>
            <div className={clsx(styles.modalName)}>Tạo nhiệm vụ mới</div>
            <div className={clsx(styles.modalContent)}>
                <div className={clsx(styles.modalEle)}>Tiêu đề<input type='text'/></div>
                <div className={clsx(styles.flexCenter)} style={{justifyContent: 'space-between'}}>
                    <div className={clsx(styles.modalEle)} style={{width: '150%', paddingRight: '10%', backgroundColor: 'white'}}>
                        Loại
                        <input type='button'/>
                        <FontAwesomeIcon icon={faSort} className={clsx(styles.icon)}/>
                    </div>
                    <div className={clsx(styles.modalEle)} style={{width: '150%', paddingLeft: '10%'}}>
                        Số người tối đa  
                        <input type='button'/>
                    </div>
                </div>
                <div className={clsx(styles.flexCenter)} style={{justifyContent: 'space-between'}}>
                    <div className={clsx(styles.modalEle)} style={{width: '150%', paddingRight: '10%'}}>
                        MCPs
                        <input type='button'/>
                        <FontAwesomeIcon icon={faSort} className={clsx(styles.icon)}/>
                    </div>
                    <div className={clsx(styles.modalEle)} style={{width: '150%', paddingLeft: '10%'}}>
                        Phương tiện
                        <input type='button'/>
                        <FontAwesomeIcon icon={faSort} className={clsx(styles.icon)}/>
                    </div>
                </div>
                <div className={clsx(styles.modalEle)}>
                    Mô tả (không bắt buộc)
                    <input type='text' style={{height: '8rem'}}/>
                </div>
                <div className={clsx(styles.modalButton)}>
                    <button onClick={() => setModal('none')}>Đóng</button>
                    <button>Tạo</button>
                </div>
            </div>
        </div>
    );
}

export default AddModal;