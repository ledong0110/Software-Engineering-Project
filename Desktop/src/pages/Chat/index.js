import clsx from 'clsx'
import {useState} from 'react'
import Message from '../../components/Message';
import MessageSidebar from '../../components/MessageSidebar';
import styles from './Chat.module.scss'

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
    text: 'Hello how are you',
    img: 'https://images.pexels.com/photos/45201/kitty-cat-kitten-pet-45201.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  },
  {
    text: 'Hello how are you',
    img: 'https://images.pexels.com/photos/45201/kitty-cat-kitten-pet-45201.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  }
]
function Chat() {
  const [newMessage, setNewMessage] = useState('')
  const [selected, setSelected] = useState() // user id of selected user to get conversation

  return (
      <div className={clsx(styles.wrapper)}>
        <MessageSidebar setSelected={setSelected}/>
        <div className={clsx(styles.container)}>
          <div style={{paddingBottom: '10%'}}>
            {messages.map((message, index) => {
              return (
                <Message key={index} message={message} own={index%2===0}/>
              )
            })}
          </div>
          <div className={clsx(styles.chat)}>
            <textarea 
                className={clsx(styles.messageInput)}
                placeholder=''
                onChange={e => setNewMessage(e.target.value)}
                value={newMessage}
            ></textarea>
            <button className={clsx(styles.submit)}>Send</button>
          </div>
        </div>
      </div>
  )
}

export default Chat;