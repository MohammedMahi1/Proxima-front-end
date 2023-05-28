import { Avatar, Box, Paper, Stack, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import axios from 'axios'

const Friends = () => {
    const state = useSelector((state) => state)
    const [friend, setFriend] = useState([])
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
                setFriend(res.data.friend)
            })

        }
        getData()
    }, [state.user.token])
    return (
        <Paper sx={{ width: 400, padding: 3 }}>
            {
                friend.map((e, index) => {
                    return (
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'row',
                                alignItems: 'center',
                                gap: 1,
                                marginBottom: 2,
                            }}
                            key={index}
                        >
                            <Avatar src={e.image_url}/>
                            <Stack>
                                <Typography variant='h6' sx={{ cursor: "pointer" }}>{e.name}</Typography>
                                <Typography variant='p' sx={{ color: "text.disabled" }}>{e.email}</Typography>
                            </Stack>
                        </Box>
                    )
                })
            }
        </Paper>
    )
}

export default Friends
