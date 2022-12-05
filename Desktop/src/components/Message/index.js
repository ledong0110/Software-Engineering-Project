import styles from "./Message.module.scss";
import clsx from 'clsx'
import { useEffect, useState, useRef } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import useAuth from "../../hooks/useAuth";
import { useLocation, useNavigate } from "react-router-dom";
import { eventEmitter, sendWebSocketMessage } from "../../services/socket-service";

const scrollMessageContainer = (messageContainer) => {
  if (messageContainer.current !== null) {
    try {
      setTimeout(() => {
        messageContainer.current.scrollTop = messageContainer.current.scrollHeight;
      }, 100);
    } catch (error) {
      console.warn(error);
    }
  }
}
const getMessageUI = (messageContainer, user, selectedUser, conversations) => {
  return (
    <div ref={messageContainer} className={clsx(styles.message_control)}>
      {conversations.map((conversation, index) => {
        // <li
        //   className={`message ${
        //     alignMessages(userDetails, conversation.toUserID) ? 'align-right' : ''
        //   }`}
        //   key={index}
        // >
        //   {conversation.message}
        // </li>
        
        console.log(conversation)
        if (conversation.fromUserID === user.id){
          return (
            <div key={index} className={clsx(styles.inner, styles.align)}>
                <img className={clsx(styles.avatar)} src={user.picture} alt='avatar'/>
              <div className={clsx(styles.text, styles.away)}>{conversation.message}</div>
            </div>
          )}
        else {
          
            return (
              <div key={index} className={clsx(styles.inner)}>
                <img className={clsx(styles.avatar)} src={selectedUser.picture} alt='avatar'/>
              <div className={clsx(styles.text)}>{conversation.message}</div>
            </div>
            )
            }
        }
  
      )}
    </div>
    
  );
}
const getInitiateConversationUI = (selectedUser) =>{
  if (selectedUser !== null) {
    return (
      <div className={clsx(styles.inner)}>
          <h1>You haven 't chatted with {selectedUser.name} in a while,
          <span className="sub-heading"> Say Hi.</span></h1>
      </div>
    )
  }    
}
export default function Message({ selectedUser}) {
  
  const { auth } = useAuth()
  const [message, setMessage] = useState("")
  const messageContainer = useRef(null)
  const axiosPrivate = useAxiosPrivate()
  const navigate = useNavigate()
  const location = useLocation()
  const [conversation, updateConversation] = useState([])
  const [messageLoading, updateMessageLoading] = useState(true)

  useEffect(() => {
    console.log(`selected user: ${selectedUser}`)
    let isMounted = true
    const controller = new AbortController()
    
    const getChatConversation = async () => {
        try {
            const response = await axiosPrivate.post(`/chat-app/GetConversation/${selectedUser.id}`, {
                signal: controller.signal
            })
            updateMessageLoading(false)
            isMounted && updateConversation(response.data.conversation)
            scrollMessageContainer(messageContainer)
            // isMounted && setMessages(response.data)
        } catch (err) {
            console.log(err)
            navigate('/', { state: { from: location }, replace: true})
        }
    }
    selectedUser?.id && getChatConversation()

    return () => {
        
        isMounted = false
        controller.abort()
    }
  }, [selectedUser])
  useEffect(() => {
    const newMessageSubscription = (messagePayload) => {
      if (
        selectedUser !== null &&
        selectedUser.id === messagePayload.fromUserID
      ) {
        updateConversation([...conversation, messagePayload]);
        scrollMessageContainer(messageContainer);
      }
    };

    eventEmitter.on('message-response', newMessageSubscription);

    return () => {
      eventEmitter.removeListener('message-response', newMessageSubscription);
    };
  }, [conversation, selectedUser]);



  const sendMessage = (event) => {
    
      event.preventDefault()
      console.log(message)
      if (message === '' || message === undefined || message === null) {
        alert(`Message can't be empty.`);
      } else if (selectedUser === undefined) {
        alert(`Select a user to chat.`);
      } else {
        const messagePayload = {
          fromUserID: auth.id,
          message: message.trim(),
          toUserID: selectedUser.id,
        };
        console.log(messagePayload)
        sendWebSocketMessage(messagePayload);
        updateConversation([...conversation, messagePayload]);
        scrollMessageContainer(messageContainer);
      }
    
  }


  if (messageLoading)
    return (
      <div className={clsx(styles.inner)}>
      <h1>
        {selectedUser?.id
          ? "Đang tải tin nhắn..."
          : "Chọn một người dùng để bắt đầu"}
      </h1>
      </div>
    )

  return (
    <div  className={clsx(styles.container)}>
    {conversation?.length > 0
                  ? getMessageUI(messageContainer, auth, selectedUser, conversation)
                  : getInitiateConversationUI(selectedUser)
    }
      <div className={clsx(styles.chat)}>
          <form onSubmit={sendMessage}>
          <textarea 
              className={clsx(styles.messageInput)}
              placeholder='Message...'
              onChange={e => setMessage(e.target.value)}
              
          ></textarea>
          <button className={clsx(styles.submit)}>Send</button>
          </form>
      </div>
    </div>
  )
}
    