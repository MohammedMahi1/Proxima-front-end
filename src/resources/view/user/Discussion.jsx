import React from 'react'
// import Chat from '../../../components/Chat'
import FriendRequest from '../../../components/FriendRequest'
import SendFriendRequest from '../../../components/SendFriendRequest'
import Auth from '../../../middleware/Auth'

const Discussion = () => {
  return (
    <div>
      {/* <Chat/> */}
      <SendFriendRequest/>
      <hr />
      <FriendRequest/>
      <hr />

    </div>
  )
}

export default Auth(Discussion)
