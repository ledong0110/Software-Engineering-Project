import styles from '../MCP/MCP.module.scss'
import clsx from 'clsx'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSort } from '@fortawesome/free-solid-svg-icons';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { useState } from 'react';

function EditModal({modal, setModal, pid}) {
    const [name, setName] = useState()
    const [time, setTime] = useState()
    const [status, setStatus] = useState('Hoàn thành')
    const [descrip, setDescrip] = useState('')

    const handleSubmit = () => {}

    return (
        <Dialog open={modal} onClose={() => setModal(false)}>
            <DialogTitle className={clsx(styles.title)} style={{marginBottom: '1rem'}}>Phương tiện</DialogTitle>
            <DialogContent>
                <Box sx={{ width:500, margin: 0}}>
                    <Stack spacing={8} direction="row" className={clsx(styles.flexCenter)}>
                        <FormControl variant="standard">
                            <InputLabel htmlFor="name"><b>Tên nhiệm vụ</b></InputLabel>
                            <Input 
                                style={{border: '1px solid black', borderRadius: '3px'}} 
                                id="name" 
                                value={name} 
                                onChange={e => setName(e.target.value)} 
                            />
                        </FormControl>
                        <FormControl variant="standard">
                            <InputLabel htmlFor="time"><b>Thời gian</b></InputLabel>
                            <Input 
                                style={{border: '1px solid black', borderRadius: '3px'}} 
                                id="time" value={time} 
                                onChange={e => setTime(e.target.value)} 
                            />
                        </FormControl>
                    </Stack>
                    <Stack spacing={8} direction="row" className={clsx(styles.flexCenter)} style={{marginTop: '3rem'}}>
                    <FormControl sx={{ minWidth: 182, minHeight: 32, borderColor: 'common.black' }} size="small">
                            <InputLabel id="demo-select-small">Tình trạng</InputLabel>
                                <Select
                                    labelId="demo-select-small"
                                    id="demo-select-small"
                                    value={status}
                                    label="Status"
                                    defaultValue={status}
                                    onChange={e => setStatus(e.target.value)}
                                >

                                    <MenuItem value={'Hoàn thành'}>Hoàn thành</MenuItem>
                                    <MenuItem value={'Chưa hoàn thành'}>Chưa hoàn thành</MenuItem>
                                </Select>
                            </FormControl>
                             <div className={clsx(styles.element)}>
                                Loại
                                <input type='button' style={{width: '182px'}}/>
                                <FontAwesomeIcon icon={faSort} className={clsx(styles.icon)}/>
                            </div>
                    </Stack>
                    <Stack className={clsx(styles.flexCenter)} style={{marginTop: '2rem'}}>
                        <FormControl variant="standard" sx={{minWidth: 430}}>
                            <InputLabel htmlFor="descrip"><b>Mô tả</b></InputLabel>
                            <Input 
                                style={{border: '1px solid black', borderRadius: '4px', height: '8rem'}} 
                                id="descrip" 
                                value={descrip} 
                                onChange={e => setDescrip(e.target.value)} 
                            />
                        </FormControl>
                    </Stack>
                    <div className={clsx(styles.modalButton)}>
                        <button onClick={() => setModal(false)}>Đóng</button>
                        <button onClick={handleSubmit}>Chọn</button>
                    </div>
                </Box>
            </DialogContent>
        </Dialog> 
    );
}

export default EditModal;