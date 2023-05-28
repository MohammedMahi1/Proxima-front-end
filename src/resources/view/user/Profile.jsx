import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { data } from '../../../store/userSlice'
import { Avatar, Button } from '@mui/material'
import Friends from '../../../components/Friends'
import Auth from '../../../middleware/Auth'

const Profile = () => {
  const state = useSelector((state) => state)
  const dispatch = useDispatch()
  useEffect(() => {
    const getData = async () => {
      await axios({
        method: 'GET',
        url: 'http://127.0.0.1:8000/api/user',
        headers: {
          'Accept': 'application/json',
          'Authorization': 'Bearer ' + state.user.token
        },
      }).then((res) => {
        dispatch(data({
          name: res.data.user.name,
          email: res.data.user.email,
          imageUrl: res.data.user.image_url,
          cover: res.data.user.cover,
          coverHundle: true,
          coverUrl: res.data.user.cover_url
        }));
      })

    }
    getData()
  }, [dispatch, state.user.token])

  const logoutFun = () => {
    axios({
      method: 'DELETE',
      url: "http://127.0.0.1:8000/api/user/logout/",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + state.user.token
      }
    }).then(()=>{
      localStorage.removeItem('access_token')
      window.location.reload(true)
    })
  }
  return (
    <div>
      <Avatar src={state.user.imageUrl} sx={{ width: 250, height: 250 }} />
      <Button color='error' onClick={logoutFun}>Logout</Button>
      <h1>{state.user.name}</h1>
      <Friends />
    </div>
  )
}

export default Auth(Profile)
