import styles from './Add.module.scss'
import clsx from 'clsx'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSort } from '@fortawesome/free-solid-svg-icons';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import MCPModal from '../MCP/MCP';
import { useState } from 'react';

function AddModal({modal, setModal}) {
    const [modalMCP, setModalMCP] = useState(false)
    const [title, setTitle] = useState('')
    const [type, setType] = useState('Collector')
    const [number, setNumber] = useState(0)
    const [MCP, setMCP] = useState([])
    const [descrip, setDescrip] = useState('')

    console.log(MCP)

    const handleClose = () => {
        setModal(false)
    };

    return ( 
        <>
        <MCPModal modal={modalMCP} setModal={setModalMCP} setData={setMCP}/>
        <Dialog open={modal} onClose={handleClose}>
            <DialogTitle className={clsx(styles.title)} style={{marginBottom: '0px'}}>Tạo nhiệm vụ mới</DialogTitle>
            <DialogContent>
                <Box
                    noValidate
                    component="form"
                    sx={{  width: 500, margin: 0}}
                >
                    <Stack className={clsx(styles.flexCenter)} style={{marginTop: '2rem'}}>
                        <TextField 
                            style={{minWidth: '430px'}} 
                            id="outlined-basic" 
                            label="Tiêu đề" 
                            variant="outlined" 
                            onChange= {e => setTitle(e.target.value)}
                            defaultValue={title}
                        />
                    </Stack>
                    <Stack spacing={4} direction="row" className={clsx(styles.flexCenter)} style={{marginTop: '2rem'}}>
                        <FormControl sx={{ width: 120, minHeight: 32, borderColor: 'common.black' }} >
                            <InputLabel id="demo-select-small">Loại</InputLabel>
                            <Select
                                labelId="demo-select-small"
                                id="demo-select-small"
                                value={type}
                                label="Type"
                                defaultValue={type}
                                onChange={e => setType(e.target.value)}
                            >

                                <MenuItem value={'Collector'}>Collector</MenuItem>
                                <MenuItem value={'Janitor'}>Janitor</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl sx={{ width: 120, minHeight: 32, borderColor: 'grey.300' }} size="small">
                            <TextField
                                type="number"
                                label="Số người tối đa"
                                defaultValue={number}
                                onChange={e => setNumber(e.target.value)}
                            />
                        </FormControl>
                        <Button 
                            sx={{ width: 120, minHeight: 32, borderColor: 'common.black', color:'common.black' }} 
                            variant="outlined"
                            size="large"
                            onClick={() => setModalMCP(true)}
                        >
                            MCPs
                        </Button>
                    </Stack>
                    <Stack className={clsx(styles.flexCenter)} style={{marginTop: '2rem'}}>
                        <TextField 
                            style={{minWidth: '430px'}} 
                            id="outlined-basic" 
                            label="Mô tả" 
                            variant="outlined" 
                            onChange= {e => setDescrip(e.target.value)}
                            defaultValue={descrip}
                        />
                    </Stack>
                    <div className={clsx(styles.modalButton)}>
                        <button onClick={() => setModal(false)}>Đóng</button>
                        <button>Tạo</button>
                    </div>
                </Box>
            </DialogContent>
        </Dialog>
        </>
    );
}

export default AddModal;