import React from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';

const FriendRequestItem = ({ request, onAccept, onReject }) => {
    const state= useSelector((state) => state)
  const handleAccept = () => {
    axios({
        url:"http://127.0.0.1:8000/api/friend-requests/accept",
        method:"PUT",
        data:{
            friend_request_id: request.id 
        },
        headers: {
            "Accept": "application/json",
            "Authorization": 'Bearer ' + state.user.token
          }
    })
      .then(response => {
        console.log(response.data.message);
        // Additional logic or UI updates on success
        onAccept(request.id); // Pass the accepted request ID to update the UI
      })
      .catch(error => {
        console.error(error);
        // Handle error response or display error message
      });
  };

  const handleReject = () => {
    axios({
        url:"http://127.0.0.1:8000/api/friend-requests/reject",
        method:"PUT",
        data:{
            friend_request_id: request.id 
        },
        headers: {
            "Accept": "application/json",
            "Authorization": 'Bearer ' + state.user.token
          }
    })
      .then(response => {
        console.log(response.data.message);
        // Additional logic or UI updates on success
        onReject(request.id); // Pass the rejected request ID to update the UI
      })
      .catch(error => {
        console.error(error);
        // Handle error response or display error message
      });
  };

  return (
    <div>
      <p>From: {request.sender.name}</p>
      <button onClick={handleAccept}>Accept</button>
      <button onClick={handleReject}>Reject</button>
    </div>
  );
};

export default FriendRequestItem;