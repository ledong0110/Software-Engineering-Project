import styles from '../MCP/MCP.module.scss'
import clsx from 'clsx'
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Box from '@mui/material/Box';
import { useEffect, useState } from 'react';
import useAxiosPrivate from '../../../hooks/useAxiosPrivate';
import { useLocation, useNavigate } from 'react-router-dom';

  // get list of workers
  // const employees = [
  //   { id: 1, type: 'employee 1'},
  //   { id: 2, type: 'employee 2'},
  //   { id: 3, type: 'employee 3'},
  //   { id: 4, type: 'employee 4'},
  //   { id: 5, type: 'employee 5'},
  //   { id: 6, type: 'employee 6'},
  //   { id: 7, type: 'employee 7'},
  //   { id: 8, type: 'employee 8'},
  //   { id: 9, type: 'employee 9'},
  // ];

function EmployeeModal({modal, setModal, pid, taskType, Number, worker}) {
    const [selected, setSelected] = useState([])
    const [employees, setEmployees] = useState([])
    const axiosPrivate = useAxiosPrivate()
    const navigate = useNavigate()
    const location = useLocation()
    const handleClose = () => {
      setModal(false)
    };
    useEffect(() => {if (worker !== null) setSelected(worker)}, [worker])
    useEffect(() => {
      
      let isMounted = true
      const controller = new AbortController()
      const getEmployee = async () => {
        try {
            console.log(!taskType.localeCompare("Collector"))
            const response = await axiosPrivate.post(`/task/get-employee`,
            JSON.stringify({"type": (!taskType.localeCompare("Collector") ? 1 : 2)}),
            {
                signal: controller.signal
            })
            console.log(response.data)
            isMounted && setEmployees(response.data)
            
              // isMounted && setUsers(response.data.user_list)
          } catch (err) {
              console.log(err)
              navigate('/', { state: { from: location }, replace: true})
          }
      }
      // if (!employees?.length) 
          getEmployee()

      return () => {
          
          isMounted = false
          controller.abort()
      }
  }, [pid, modal, taskType])
    const handleClick = (id) => {
      if (selected.includes(id)) {
        if (selected.length === 1) setSelected([])
        else {
          const index = selected.indexOf(id)
          let newSelected = [...selected]
          newSelected.splice(index, 1)
          setSelected(newSelected)
        }
        console.log(id)
        console.log(selected)
      }
      else {
        if (selected.length < Number) 
        {
          setSelected([...selected, id])
          console.log(id)
          console.log(selected)
        }
      }
    }

    const handleSubmit =  async () => {
      // send selected workers to database based on post id
      console.log(selected)
      let emp = {"id": pid, "worker": selected}
        try {
            const response = await axiosPrivate.post(`/task/add-employee`, 
                JSON.stringify(emp),
            )
            alert("Đã cập nhật thành công người làm")
            navigate('/task')
        } catch (err) {
            
            navigate('/', { state: { from: location }, replace: true})
        }

    }

    return ( 
      <Dialog open={modal} onClose={handleClose}>
        <DialogTitle className={clsx(styles.title)} style={{marginBottom: '1rem'}}>Danh sách người có thể tham gia</DialogTitle>
        <DialogContent>
            <Box sx={{ width:500, height: 600, margin: 0}}>
                {employees && employees.map((employee, idx) => {
                  return (
                    <div key={idx} className={clsx(styles.employee)} style={{background: 'rgba(217, 217, 217, 0.6)'}}>
                      <input 
                        type='checkBox' 
                        checked={selected.includes(employee.ID)}
                        className={clsx(styles.employeeButton)} 
                        onChange={() => handleClick(employee.ID)}/>
                      
                      {employee.Name}   
                    </div>
                  )
                })}
                <div className={clsx(styles.modalButton)}>
                    <button  onClick={() => setModal(false)}>Đóng</button>
                    <button  onClick={handleSubmit}>Chọn</button>
                </div>
            </Box>
        </DialogContent>
      </Dialog>
    );
}

export default EmployeeModal;