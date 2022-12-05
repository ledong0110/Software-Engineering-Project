import styles from '../MCP/MCP.module.scss'
import clsx from 'clsx'
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Box from '@mui/material/Box';
import { useState } from 'react';

  // get list of workers
  const employees = [
    { id: 1, type: 'employee 1'},
    { id: 2, type: 'employee 2'},
    { id: 3, type: 'employee 3'},
    { id: 4, type: 'employee 4'},
    { id: 5, type: 'employee 5'},
    { id: 6, type: 'employee 6'},
    { id: 7, type: 'employee 7'},
    { id: 8, type: 'employee 8'},
    { id: 9, type: 'employee 9'},
  ];

function EmployeeModal({modal, setModal, pid}) {
    const [selected, setSelected] = useState([])

    const handleClose = () => {
      setModal(false)
    };

    const handleClick = (id) => {
      if (selected.includes(id)) {
        if (selected.length === 1) setSelected([])
        else {
          const index = selected.indexOf(id)
          let newSelected = [...selected]
          newSelected.splice(index, 1)
          setSelected(newSelected)
        }
      }
      else {
        if (selected.length !== 5) setSelected([...selected, id])
      }
    }

    const handleSubmit = () => {
      // send selected workers to database based on post id
      setModal(false)
    }

    return ( 
      <Dialog open={modal} onClose={handleClose}>
        <DialogTitle className={clsx(styles.title)} style={{marginBottom: '1rem'}}>Phương tiện</DialogTitle>
        <DialogContent>
            <Box sx={{ width:500, height: 600, margin: 0}}>
                {employees.map((employee) => {
                  return (
                    <div key={employee.id} className={clsx(styles.employee)} style={{background: 'rgba(217, 217, 217, 0.6)'}}>
                      <input 
                        type='checkBox' 
                        checked={selected.includes(employee.id)}
                        className={clsx(styles.employeeButton)} 
                        onChange={() => handleClick(employee.id)}/>
                      {employee.type}   
                    </div>
                  )
                })}
                <div className={clsx(styles.modalButton)}>
                    <button onClick={() => setModal(false)}>Đóng</button>
                    <button onClick={handleSubmit}>Chọn</button>
                </div>
            </Box>
        </DialogContent>
      </Dialog>
    );
}

export default EmployeeModal;