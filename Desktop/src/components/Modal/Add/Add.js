import styles from './Add.module.scss'
import clsx from 'clsx'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSort } from '@fortawesome/free-solid-svg-icons';
// import Button from '@mui/material/Button';
// import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
// import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
// import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Box from '@mui/material/Box';
import MCPModal from '../MCP/MCP';
import VehicleModal from '../Vehicle/Vehicle';
import { useState } from 'react';

function AddModal({modal, setModal}) {
    const [modalMCP, setModalMCP] = useState(false)
    const [modalVehicle, setModalVehicle] = useState(false)

    const [MCP, setMCP] = useState([])
    const [vehicle, setVehicle] = useState([])

    console.log(MCP, vehicle)

    const handleClose = () => {
        setModal(false)
    };

    return ( 
        <>
        <MCPModal modal={modalMCP} setModal={setModalMCP} setData={setMCP}/>
        <VehicleModal modal={modalVehicle} setModal={setModalVehicle} setData={setVehicle}/>
        <Dialog open={modal} onClose={handleClose}>
            <DialogTitle className={clsx(styles.title)} style={{marginBottom: '0px'}}>Tạo nhiệm vụ mới</DialogTitle>
            <DialogContent>
                <Box
                    noValidate
                    component="form"
                    sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    m: 'auto',
                    width: '450px',
                    }}
                >
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
                                <input 
                                    // value={MCP}
                                    type='button' 
                                    onClick={() => setModalMCP(true)}/>
                                <FontAwesomeIcon icon={faSort} className={clsx(styles.icon)}/>
                            </div>
                            <div className={clsx(styles.modalEle)} style={{width: '150%', paddingLeft: '10%'}}>
                                Phương tiện
                                <input type='button' onClick={() => setModalVehicle(true)}/>
                                <FontAwesomeIcon icon={faSort} className={clsx(styles.icon)}/>
                            </div>
                        </div>
                        <div className={clsx(styles.modalEle)}>
                            Mô tả (không bắt buộc)
                            <input type='text' style={{height: '8rem'}}/>
                        </div>
                        <div className={clsx(styles.modalButton)}>
                            <button onClick={() => setModal(false)}>Đóng</button>
                            <button>Tạo</button>
                        </div>
                    </div>
                </Box>
            </DialogContent>
        </Dialog>
        </>
    );
}

export default AddModal;