import styles from '../MCP/MCP.module.scss'
import clsx from 'clsx'
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Box from '@mui/material/Box';
import { useState } from 'react';

  // list of vehicles
  const employees = [
    { id: 1, type: 'Xe tải'},
    { id: 2, type: 'Xe tải'},
    { id: 3, type: 'Xe tải'},
    { id: 4, type: 'Xe tải'},
    { id: 5, type: 'Xe tải'},
    { id: 6, type: 'Xe tải'},
    { id: 7, type: 'Xe tải'},
    { id: 8, type: 'Xe tải'},
    { id: 9, type: 'Xe tải'},
  ];

function EmployeeModal({modal, setModal, setData}) {
    // selected inclueds id of all selected vehicles
    const [selected, setSelected] = useState([])

    const handleClose = () => {
      setModal(false)
    };

    const handleClick = () => {

    }

    const handleSubmit = () => {
      setData(selected)
      setModal(false)
    }

    return ( 
      <Dialog open={modal} onClose={handleClose}>
        <DialogTitle className={clsx(styles.title)}>Phương tiện</DialogTitle>
        <DialogContent>
            <Box sx={{ width:500, height: 600, margin: 0}}>
                {employees.map((employee, index) => {
                  return (
                    <div key={index} className={clsx(styles.employee)} style={{background: 'rgba(217, 217, 217, 0.6)'}}>
                      <input type='checkBox' className={clsx(styles.employeeButton)}/>
                      {employee.type}   
                    </div>
                  )
                })}
            </Box>
                <div className={clsx(styles.modalButton)}>
                    <button onClick={() => setModal(false)}>Đóng</button>
                    <button onClick={handleSubmit}>Chọn</button>
                </div>
        </DialogContent>
      </Dialog>
    );
}

export default EmployeeModal;