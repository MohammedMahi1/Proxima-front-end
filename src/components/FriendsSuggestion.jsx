import { Avatar, Box, Paper, Stack, Typography } from '@mui/material'
import React from 'react'
const friends = [
    {
        name: 'John Smith',
        email: 'john.smith@gmail.com'
    },
    {
        name: 'Alexander Rall',
        email: 'alexanderrall@gmail.com'
    },
    {
        name: 'John Smith',
        email: 'john.smith@gmail.com'
    }

]
const FriendsSuggestion = () => {
    return (
        <Paper elevation={3} className="friends_suggestion">

            <Typography  sx={{color:"text.disabled"}} mb={2} >Friends Suggestion</Typography>
            {
                friends.map((i,index) => {
                    return (
                            <Box
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    gap:1,
                                    marginBottom:2,
                                }}
                                key={index}
                            >
                                <Avatar sx={{cursor:"pointer"}} alt={i.name} title={i.name}/>
                                <Stack>
                                    <Typography variant='h6' sx={{cursor:"pointer"}}>{i.name}</Typography>
                                    <Typography variant='p' sx={{color:"text.disabled"}}>{i.email}</Typography>
                                </Stack>
                            </Box>
                    )
                })
            }
        </Paper>
    )
}

export default FriendsSuggestion
