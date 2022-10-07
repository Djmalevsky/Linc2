import React, { useState, useContext, useEffect } from "react";
import { GiftedChat, Bubble } from "react-native-gifted-chat";
import { Context } from "../../../../context/authContext";
import { db } from "../../../../config/firebaseConfig";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const ChatRoom = ({ route }) => {
  const insets = useSafeAreaInsets();
  const [messages, setMessages] = useState([]);
  const { thread } = route.params;
  const { state } = useContext(Context);
  const currentUser = state.user;

  async function handleSend(messages) {
    const text = messages[0].text;

    db.collection("threads").doc(thread).collection("messages").add({
      text,
      createdAt: new Date().getTime(),
      sentBy: currentUser.id,
    });

    await db
      .collection("threads")
      .doc(thread)
      .set(
        {
          latestMessage: {
            text,
            createdAt: new Date().getTime(),
            sentBy: currentUser.id,
          },
        },
        { merge: true }
      );
  }

  useEffect(() => {
    const messagesListener = db
      .collection("threads")
      .doc(thread)
      .collection("messages")
      .orderBy("createdAt", "desc")
      .onSnapshot((querySnapshot) => {
        const messages = querySnapshot.docs.map((doc) => {
          const firebaseData = doc.data();

          const data = {
            _id: doc.id,
            text: firebaseData.text,
            createdAt: new Date().getTime(),
            user: {
              _id: firebaseData.sentBy,
            },
          };

          return data;
        });

        setMessages(messages);
      });

    // Stop listening for updates whenever the component unmounts
    return () => messagesListener();
  }, []);

  function renderBubble(props) {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: "#4CB",
          },
        }}
        textStyle={{
          right: {
            color: "#fff",
          },
        }}
      />
    );
  }

  return (
    <GiftedChat
      messages={messages}
      onSend={handleSend}
      user={{ _id: currentUser.id }}
      placeholder="Type your message here..."
      alwaysShowSend
      showUserAvatar
      scrollToBottom
      renderBubble={renderBubble}
      bottomOffset={insets.bottom}
      //renderSend={renderSend}
      //scrollToBottomComponent={scrollToBottomComponent}
      //renderSystemMessage={renderSystemMessage}
    />
  );
};

export default ChatRoom;
