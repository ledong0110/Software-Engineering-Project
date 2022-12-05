import styles from '../MCP/MCP.module.scss'
import clsx from 'clsx'
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useState } from 'react';

function EditModal({modal, setModal, pid}) {
    const [name, setName] = useState('')
    const [time, setTime] = useState(dayjs('2022-12-06'))
    const [status, setStatus] = useState('Hoàn thành')
    const [type, setType] = useState('Collector')
    const [descrip, setDescrip] = useState('')

    const handleSubmit = () => {}

    return (
        <Dialog open={modal} onClose={() => setModal(false)}>
            <DialogTitle className={clsx(styles.title)} style={{marginBottom: '1.5rem'}}>Chỉnh sửa</DialogTitle>
            <DialogContent>
                <Box sx={{ width:500, margin: 0}} component='form'>
                    <Stack spacing={8} direction="row" className={clsx(styles.flexCenter)} style={{marginTop: '0.5rem'}}>
                        <TextField 
                            className={clsx(styles.time)} 
                            id="outlined-basic" 
                            label="Tên nhiệm vụ" 
                            variant="outlined" 
                            onChange= {e => setName(e)}
                            defaultValue={name}
                        />
                        <LocalizationProvider dateAdapter={AdapterDayjs} >
                            <DesktopDatePicker
                                className={clsx(styles.time)}
                                label="Thời gian"
                                value={time}
                                minDate={dayjs('2017-01-01')}
                                onChange={(newValue) => {
                                    setTime(newValue);
                                }}
                                renderInput={(params) => <TextField {...params} />}
                            />
                        </LocalizationProvider>
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
                        <FormControl sx={{ minWidth: 182, minHeight: 32, borderColor: 'common.black' }} size="small">
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
                        <button onClick={handleSubmit}>Gửi</button>
                    </div>
                </Box>
            </DialogContent>
        </Dialog> 
    );
}

export default EditModal;