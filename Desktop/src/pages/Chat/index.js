import clsx from 'clsx'
import {useState} from 'react'
import Message from '../../components/Message';
import MessageSidebar from '../../components/MessageSidebar';
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

const previews = [
    {
        img: "https://images.pexels.com/photos/45201/kitty-cat-kitten-pet-45201.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        name: "Janitor",
        time: "11:15",
        preview: "Hi there, how are youo"
    },
    {
        img: "https://images.pexels.com/photos/45201/kitty-cat-kitten-pet-45201.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        name: "Janitor",
        time: "11:15",
        preview: "Hi there, how are youo"
    },
    {
        img: "https://images.pexels.com/photos/45201/kitty-cat-kitten-pet-45201.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        name: "Janitor",
        time: "11:15",
        preview: "Hi there, how are youo"
    },
    {
      img: "https://images.pexels.com/photos/45201/kitty-cat-kitten-pet-45201.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      name: "Janitor",
      time: "11:15",
      preview: "Hi there, how are youo"
    },
    {
        img: "https://images.pexels.com/photos/45201/kitty-cat-kitten-pet-45201.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        name: "Janitor",
        time: "11:15",
        preview: "Hi there, how are youo"
    },
    {
        img: "https://images.pexels.com/photos/45201/kitty-cat-kitten-pet-45201.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        name: "Janitor",
        time: "11:15",
        preview: "Hi there, how are youo"
    },
]

const messages = [
  {
    text: 'Hello how are you',
    img: 'https://images.pexels.com/photos/45201/kitty-cat-kitten-pet-45201.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  },
  {
    text: 'Hello how are you',
    img: 'https://images.pexels.com/photos/45201/kitty-cat-kitten-pet-45201.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  },
  {
    text: 'Hello how are you',
    img: 'https://images.pexels.com/photos/45201/kitty-cat-kitten-pet-45201.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  },
  {
    text: 'Hello how are youHello how are youHello how are youHello how are youHello how are youHello how are youHello how are youHello how are youHello how are youHello how are youHello how are youHello how are youHello how are youHello how are youHello how are youHello how are youHello how are youHello how are youHello how are youHello how are youHello how are youHello how are youHello how are youHello how are youHello how are youHello how are youHello how are you',
    img: 'https://images.pexels.com/photos/45201/kitty-cat-kitten-pet-45201.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  },
  {
    text: 'Hello how are you',
    img: 'https://images.pexels.com/photos/45201/kitty-cat-kitten-pet-45201.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  },
]
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
  const [newMessage, setNewMessage] = useState('')
  
// const handleChange = () => {}

    return (
        <div className={clsx(styles.wrapper)}>
          <MessageSidebar previews={previews}/>
          <div className={clsx(styles.container)}>
            {messages.map((message, index) => {
              return (
                <Message key={index} message={message} own={index%2===0}/>
              )
            })}
            <div className={clsx(styles.chat)}>
              <textarea 
                  className={clsx(styles.messageInput)}
                  placeholder=''
                  onChange={e => setNewMessage(e.target.value)}
                  value={newMessage}
              ></textarea>
              <button className={clsx(styles.submit)}>Send</button>
            </div>
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
        </div>
    )
}

export default Chat;