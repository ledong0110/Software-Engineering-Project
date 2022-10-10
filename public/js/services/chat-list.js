var chatList = []

const chatListSubscription = (socketPayload) => {
    let newChatList = chatList;

    if (socketPayload.type === 'new-user-joined') {
      const incomingChatList = socketPayload.chatlist;
      if (incomingChatList) {
        newChatList = newChatList.filter(
          (obj) => obj.userID !== incomingChatList.userID
        );
      }

      /* Adding new online user into chat list array */
      newChatList = [...newChatList, ...[incomingChatList]];
    } else if (socketPayload.type === 'user-disconnected') {
      const outGoingUser = socketPayload.chatlist;
      const loggedOutUserIndex = newChatList.findIndex(
        (obj) => obj.userID === outGoingUser.userID
      );
      if (loggedOutUserIndex >= 0) {
        newChatList[loggedOutUserIndex].online = 'N';
      }
    } else {
      newChatList = socketPayload.chatlist;
    }

    // slice is used to create aa new instance of an array
    chatList = newChatList.slice();
};