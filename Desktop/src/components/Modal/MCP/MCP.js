import styles from './MCP.module.scss'
import clsx from 'clsx'
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Checkbox from '@mui/material/Checkbox';
import { useState } from 'react';
import {Item} from '../index'

const MCPs = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]

function MCPModal({modal, setModal, data, setData}) {
    const [selected, setSelected] = useState([])

    const handleClose = () => {
      setModal(false)
    };

    const handleSubmit = () => {
      setData(selected)
      setModal(false)
    }

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
            >
              <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
              {MCPs.map((MCP, index) => {
                return (
                  <Grid item xs={2} sm={4} md={4} key={index}>
                    <Item className={clsx(styles.flexCenter)}>
                      <Checkbox 
                        inputProps={{ariaLabel: 'Checkbox demo'}} 
                        defaultChecked={selected.includes(MCP)} color="success" 
                        className={clsx(styles.checkBox)} 
                        onChange={() => handleClick(MCP)}
                      />
                      {MCP}   
                    </Item>
                  </Grid>
                )
                })}
              </Grid>
              <div className={clsx(styles.modalButton)}>
                  <button onClick={() => setModal(false)}>Đóng</button>
                  <button onClick={handleSubmit}>Chọn</button>
              </div>
            </Box>
        </DialogContent>
      </Dialog>
    );
}

export default MCPModal;