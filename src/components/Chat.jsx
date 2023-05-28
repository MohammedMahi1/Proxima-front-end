import React, { useEffect, useState } from 'react';
import { getMessages, createMessage } from '../api';
import Pusher from 'pusher-js';
import '../../src/App.css';
import { useSelector } from 'react-redux';
const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
    const state = useSelector((state)=>state)
  useEffect(() => {
    // Fetch messages
    getMessages(1,state.user.token)
      .then((data) => setMessages(data))
      .catch((error) => console.log(error));

    // Enable Pusher realtime updates
    const pusher = new Pusher('1607087', {
      cluster: 'eu',
    });
    const channel = pusher.subscribe(`conversation.${1}`);
    channel.bind('new-message', (data) => {
      setMessages((prevMessages) => [...prevMessages, data]);
    });

    return () => {
      pusher.unsubscribe(`conversation.${1}`);
      pusher.disconnect();
    };
  });

  const sendMessage = async () => {
    try {
      await createMessage(1, newMessage,state.user.token);
      setNewMessage('');
    } catch (error) {
      console.log(error);
    }
  };
  
  return (
    <div className="container">
      <h2>Chat</h2>
      <div className="chat-container">
        {messages.map((message) => (
          <div className="message" key={message.id}>
            <p className="from">From: {message.user.name}</p>
            <p className="content">{message.content}</p>
          </div>
        ))}
      </div>
      <div className="input-container">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type your message..."
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default Chat;