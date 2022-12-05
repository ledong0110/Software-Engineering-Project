import styles from './MCP.module.scss'
import clsx from 'clsx'
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Checkbox from '@mui/material/Checkbox';
import { useEffect, useState } from 'react';
import {Item} from '../index'
import useAxiosPrivate from '../../../hooks/useAxiosPrivate';
import { useLocation, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBatteryEmpty, faBatteryFull, faBatteryHalf } from '@fortawesome/free-solid-svg-icons';


// const MCPs = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]

function MCPModal({mcp, modal, setModal, data, setData}) {
    const [selected, setSelected] = useState([])
    const [MCPs, setMCPs] = useState([])
    
    const axiosPrivate = useAxiosPrivate()
    const navigate = useNavigate()
    const location = useLocation()
    useEffect(() => setSelected(mcp), [mcp])
    const handleClose = () => {
      setModal(false)
    };

    const handleSubmit = (e) => {
      e.preventDefault()
      console.log(selected)
      setData(selected)

      setModal(false)
    }
    useEffect(() => {
      let isMounted = true
      const controller = new AbortController()

      const getAllMCP = async () => {
          try {
              const response = await axiosPrivate.post(`/task/get-all-mcp`, 
              {
                  signal: controller.signal
              })
              console.log(response.data)
              isMounted && setMCPs(response.data)
            
              // isMounted && setUsers(response.data.user_list)
          } catch (err) {
              console.log(err)
              navigate('/', { state: { from: location }, replace: true})
          }
      }
      if (!MCPs?.length) 
          getAllMCP()

      return () => {
          
          isMounted = false
          controller.abort()
      }
  }, [modal])
    const handleClick = (MCP) => {
      if (selected.includes(MCP)) {
        if (selected.length === 1) setSelected([])
        else {
          const index = selected.indexOf(MCP)
          let newSelected = [...selected]
          newSelected.splice(index, 1)
          setSelected(newSelected)
        }
      }
      else {
        setSelected([...selected, MCP])
      }
    }

    return ( 
      <Dialog open={modal} onClose={handleClose}>
        <DialogTitle className={clsx(styles.title)}>MCP</DialogTitle>
        <DialogContent>
            <Box
                sx={{ flexGrow: 1, 
                      width: '450px', 
                      m: 'auto'
                    }}
                component="form"
            >
              <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
              {MCPs?.length && MCPs.map((MCP, index) => {
                return (
                  <Grid item xs={2} sm={4} md={4} key={index}>
                    <Item className={clsx(styles.flexCenter)}>
                      <Checkbox 
                        inputProps={{ariaLabel: 'Checkbox demo'}} 
                        defaultChecked={selected.includes(MCP.id)} color="success" 
                        className={clsx(styles.checkBox)} 
                        onChange={() => handleClick(MCP.id)}
                      />
                      {MCP.status === 0
                                        ? <FontAwesomeIcon icon={faBatteryEmpty} />
                                        : MCP.status === 1
                                                ? <FontAwesomeIcon icon={faBatteryHalf} />
                                                : <FontAwesomeIcon icon={faBatteryFull} />}
                      {MCP.id}  
                    </Item>
                  </Grid>
                )
                })}
              </Grid>
              <div className={clsx(styles.modalButton)}>
                  <button type='reset' onClick={() => setModal(false)}>Đóng</button>
                  <button type='submit' onClick={handleSubmit}>Chọn</button>
              </div>
            </Box>
        </DialogContent>
      </Dialog>
    );
}

export default MCPModal;