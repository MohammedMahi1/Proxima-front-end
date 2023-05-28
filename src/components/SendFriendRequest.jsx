import axios from 'axios';
import React, { useState } from 'react'
import { useSelector } from 'react-redux';

const SendFriendRequest = () => {
    const [receiverId, setReceiverId] = useState('');
    const state= useSelector((state) => state)

    const handleSendRequest = () => {
      axios({
        url:"http://127.0.0.1:8000/api/friend-requests",
        method:"POST",
        data:{
            receiver_id: receiverId 
        },
        headers: {
            "Accept": "application/json",
            "Authorization": 'Bearer ' + state.user.token
          }
    })
        .then(response => {
          console.log(response.data.message);
          // Additional logic or UI updates on success
        })
        .catch(error => {
          console.error(error);
          // Handle error response or display error message
        });
    };
    
    return (
      <div>
        <input
          type="text"
          value={receiverId}
          onChange={e => setReceiverId(e.target.value)}
          placeholder="Receiver ID"
        />
        <button onClick={handleSendRequest}>Send Request</button>
      </div>
    );
}

export default SendFriendRequest
