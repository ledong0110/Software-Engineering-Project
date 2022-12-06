import styles from '../MCP/MCP.module.scss'
import clsx from 'clsx'
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { useEffect, useLayoutEffect, useState } from 'react';
import useAxiosPrivate from '../../../hooks/useAxiosPrivate';
import { useLocation, useNavigate } from 'react-router-dom';

const columns = [
    { field: 'id', headerName: 'ID', width: 60 },
    {
      field: 'type',
      headerName: 'Loại',
      width: 120,
      editable: true,
    },
    {
      field: 'capacity',
      headerName: 'Tải trọng',
      width: 120,
    },
    {
      field: 'fuel',
      headerName: 'Lượng nhiên liệu',
      width: 130,
    },
  ];
  
  // list of vehicles
  const rows = [
    { id: 1, type: 'Xe tải', capacity: '5m^3', fuel: '50l' },
    { id: 2, type: 'Xe tải', capacity: '5m^3', fuel: '50l' },
    { id: 3, type: 'Xe tải', capacity: '5m^3', fuel: '50l' },
    { id: 4, type: 'Xe tải', capacity: '5m^3', fuel: '50l' },
    { id: 5, type: 'Xe tải', capacity: '5m^3', fuel: '50l' },
    { id: 6, type: 'Xe tải', capacity: '5m^3', fuel: '50l' },
    { id: 7, type: 'Xe tải', capacity: '5m^3', fuel: '50l' },
    { id: 8, type: 'Xe tải', capacity: '5m^3', fuel: '50l' },
    { id: 9, type: 'Xe tải', capacity: '5m^3', fuel: '50l' },
  ];

function VehicleModal({modal, setModal, setData}) {
    // selected inclueds id of all selected vehicles
    const [selected, setSelected] = useState([])
    const [vehicle, setVehicle] = useState([])
    const axiosPrivate = useAxiosPrivate()
    const navigate = useNavigate()
    const location = useLocation()
    
  //   useEffect(() => {
  //     let isMounted = true
  //     const controller = new AbortController()

  //     const getAllVehicle = async () => {
  //         try {
  //             const response = await axiosPrivate.post(`/task/get-all-vehicle`, 
  //             {
  //                 signal: controller.signal
  //             })
  //             console.log(response.data)
  //             isMounted && setVehicle(response.data)
            
  //             // isMounted && setUsers(response.data.user_list)
  //         } catch (err) {
  //             console.log(err)
  //             navigate('/', { state: { from: location }, replace: true})
  //         }
  //     }
  //     if (!vehicle?.length) 
  //         getAllVehicle()

  //     return () => {
          
  //         isMounted = false
  //         controller.abort()
  //     }
  // }, [modal])

    const handleClose = () => {
      setModal(false)
    };

    const handleSubmit = () => {
      setData(selected)
      setModal(false)
    }

    return ( 
      <Dialog open={modal} onClose={handleClose}>
        <DialogTitle className={clsx(styles.title)}>Phương tiện</DialogTitle>
        <DialogContent>
            <Box sx={{ width:500, height: 600}}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    checkboxSelection
                    disableSelectionOnClick
                    selectionModel={selected}
                    experimentalFeatures={{ newEditingApi: true }}
                    onSelectionModelChange={(ids) => setSelected(ids)}
                />
            </Box>
                <div className={clsx(styles.modalButton)}>
                    <button onClick={() => setModal(false)}>Đóng</button>
                    <button onClick={handleSubmit}>Chọn</button>
                </div>
        </DialogContent>
      </Dialog>
    );
}

export default VehicleModal;