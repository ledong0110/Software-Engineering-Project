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
import { useEffect, useState } from 'react';
import useAxiosPrivate from '../../../hooks/useAxiosPrivate';
import { useLocation, useNavigate } from 'react-router-dom';
import MCPModal from '../MCP/MCP';
import { Button } from '@mui/material';


function EditModal({modal, setModal, pid}) {
    const [title, setTitle] = useState('')
    const [time, setTime] = useState(dayjs())
    const [number, setNumber] = useState(0)
    const [MCP, setMCP] = useState([])
    const [modalMCP, setModalMCP] = useState(false)
    const [status, setStatus] = useState('Hoàn thành')
    const [type, setType] = useState('Collector')
    const [description, setDescrip] = useState('')
    const axiosPrivate = useAxiosPrivate()
    const navigate = useNavigate()
    const location = useLocation()
    const [id, setId] = useState(0)
    useEffect(() => {
        let isMounted = true
        const controller = new AbortController()

        const getOneTask = async () => {
            try {
                const response = await axiosPrivate.post(`/task/get-one-task`, 
                JSON.stringify({"id": parseInt(pid)}),
                {
                    signal: controller.signal
                })
                console.log(response.data)
                setTitle(response.data.title)
                setType(response.data.type)
                setDescrip(response.data.description)
                setTime(response.data.time)
                setNumber(response.data.number)
                setMCP(response.data.MCP)
                setId(response.data.id)
                console.log(MCP)
                // isMounted && setUsers(response.data.user_list)
            } catch (err) {
                console.log(err)
                navigate('/', { state: { from: location }, replace: true})
            }
        }
        if (pid !== -1) 
            getOneTask()

        return () => {
            
            isMounted = false
            controller.abort()
        }
    }, [modal])
    const handleSubmit = async (e) => {
        e.preventDefault()
        let task = {id, title, type, number, MCP, description, time}
        task.number = parseInt(task.number)
        console.log(task)
        try {
            const response = await axiosPrivate.post(`/task/edit-task`, 
                JSON.stringify(task),
            )
            alert("Đã thêm task mới thành công")
            setTitle("")
            setNumber(0)
            setMCP([])
            setDescrip("")
            setModal(false)
        } catch (err) {
            
            navigate('/', { state: { from: location }, replace: true})
        }
        
    }
    return (
        <>
        <MCPModal mcp={MCP} modal={modalMCP} setModal={setModalMCP} setData={setMCP}/>
        <Dialog open={modal} onClose={() => setModal(false)}>
            <DialogTitle className={clsx(styles.title)} style={{marginBottom: '1.5rem'}}>Chỉnh sửa</DialogTitle>
            <DialogContent>
                <Box sx={{ width:500, margin: 0}} component='form' onSubmit={handleSubmit}>
                    <Stack spacing={8} direction="row" className={clsx(styles.flexCenter)} style={{marginTop: '0.5rem'}}>
                        <TextField 
                            className={clsx(styles.time)} 
                            id="outlined-basic" 
                            label="Tên nhiệm vụ" 
                            variant="outlined" 
                            onChange= {e => setTitle(e)}
                            defaultValue={title}
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
                    <Stack>
                    <FormControl sx={{ width: 120, minHeight: 32, borderColor: 'grey.300' }} size="small">
                            <TextField
                                type="number"
                                label="Số người tối đa"
                                defaultValue={number}
                                onChange={e => setNumber(parseInt(e.target.value))}
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
                            defaultValue={description}
                        />
                    </Stack>
                    <div className={clsx(styles.modalButton)}>
                        <button type="reset" onClick={() => setModal(false)}>Đóng</button>
                        <button type="submit" onClick={handleSubmit}>Gửi</button>
                    </div>
                </Box>
            </DialogContent>
        </Dialog> 
        </>
    );
}

export default EditModal;