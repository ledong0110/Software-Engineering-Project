import clsx from 'clsx'
import {useState} from 'react'
import Message from '../../components/Message';
import MessageSidebar from '../../components/MessageSidebar';

import useWebSocket from '../../hooks/useWebSocket';

import styles from './Chat.module.scss'

// import { useTheme } from '@mui/material/styles';
// import Box from '@mui/material/Box';
// import OutlinedInput from '@mui/material/OutlinedInput';
// import InputLabel from '@mui/material/InputLabel';
// import MenuItem from '@mui/material/MenuItem';
// import FormControl from '@mui/material/FormControl';
// import Select from '@mui/material/Select';
// import Chip from '@mui/material/Chip';

// const selected = ['abc','abc','abc','abc','abc','abc']
// const personName = ['abc','abc','abc','abc','abc','abc']


// const ITEM_HEIGHT = 48;
// const ITEM_PADDING_TOP = 8;
// const MenuProps = {
//   PaperProps: {
//     style: {
//       maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
//       width: 250,
//     },
//   },
// };

// function getStyles(name, personName, theme) {
//   return {
//     fontWeight:
//       personName.indexOf(name) === -1
//         ? theme.typography.fontWeightRegular
//         : theme.typography.fontWeightMedium,
//   };
// }
function Chat() {
  const internalError = useWebSocket()
  const [selectedUser, setSelectedUser] = useState({})
// const handleChange = () => {}


  return (
      <div className={clsx(styles.wrapper)}>
        <MessageSidebar setSelectedUser={setSelectedUser}/>
        
          {internalError === null 
              ? <Message selectedUser={selectedUser} />
              : <h1>Mất kết nối với server</h1>
          } 
          
          {/* <FormControl sx={{ m: 1, width: 300 }}>

          <Select
        labelId="demo-multiple-chip-label"
        id="demo-multiple-chip"
        multiple
        value={personName}
        onChange={handleChange}
        input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
        renderValue={(selected) => (
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
            {selected.map((value, index) => (
              <Chip key={index} label={value} />
            ))}
          </Box>
        )}
        MenuProps={MenuProps}
      >
        </Select>
        </FormControl> */}
        </div>
      
  )
}

export default Chat;