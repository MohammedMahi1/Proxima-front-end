import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import FriendRequestItem from './FriendRequestItem';

const FriendRequest = () => {
    const [friendRequests, setFriendRequests] = useState([]);
    const state= useSelector((state) => state)

    useEffect(() => {
      fetchFriendRequests();
    });
  
    const fetchFriendRequests = () => {
      axios({
        url:"http://127.0.0.1:8000/api/friend-requests",
        method:"GET",
        headers: {
            "Accept": "application/json",
            "Authorization": 'Bearer ' + state.user.token
          }
    })
        .then(response => {
          setFriendRequests(response.data.friendRequests);
        })
        .catch(error => {
          console.error(error);
          // Handle error response or display error message
        });
    };
  
    return (
      <div>
        <h2>Friend Requests</h2>
        {friendRequests.map(request => (
          <div key={request.id}>
            <FriendRequestItem request={request}/>
          </div>
        ))}
      </div>
    );
};

export default FriendRequest;