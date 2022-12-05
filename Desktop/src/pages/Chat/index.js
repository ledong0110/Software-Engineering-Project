import clsx from 'clsx'
import {useState} from 'react'
import Message from '../../components/Message';
import MessageSidebar from '../../components/MessageSidebar';

import useWebSocket from '../../hooks/useWebSocket';

import styles from './Chat.module.scss'

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
        </div>
      
  )
}

export default Chat;