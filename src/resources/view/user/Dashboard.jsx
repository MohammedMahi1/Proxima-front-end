import React, { useEffect, useState } from 'react'
import Auth from '../../../middleware/Auth'
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { data } from '../../../store/userSlice';
import { Avatar, Box, MenuItem, Paper, Skeleton, Typography } from '@mui/material';
import ShareZone from '../../../components/ShareZone';
import FriendsSuggestion from '../../../components/FriendsSuggestion';
import Posts from '../../../components/Posts';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import { useNavigate } from 'react-router-dom';
const Dashboard = () => {
    const state = useSelector((state) => state)
    const [loading, setLoading] = useState(true)
    const dispatch = useDispatch()
    const navigate = useNavigate()
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
                setLoading(false);
            })
        }
        getData()
    })
    return (
        <div className='container_box' >
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    rowGap: 3
                }}
                className='menu_container'
            >
                <Paper
                    elevation={3}
                    sx={{
                        p: 3,
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        columnGap: 2,
                    }}
                >
                    {
                        loading ?
                            <>
                                <Skeleton variant="circular" width={40} height={40} />
                                <Box>
                                    <Skeleton width={160} height={40} />
                                    <Skeleton width={60} height={20} />
                                </Box>

                            </>
                            :
                            <>
                                <Avatar src={state.user.imageUrl} sx={{cursor:"pointer",width:50,height:50}} onClick={()=>navigate('/profile')}/>
                                <Box>
                                    <Typography variant='h6' sx={{cursor:"pointer"}} onClick={()=>navigate('/profile')}>{state.user.name}</Typography>
                                    <Typography variant='p' sx={{ color: "text.disabled" }}>Developer</Typography>
                                </Box>
                            </>
                    }
                </Paper>
                <Paper
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        columnGap: 2,
                        paddingTop: 1,
                    }}
                    elevation={3}
                >
                    <MenuItem sx={{ p: 2, width: "100%", mb: 1 }} >
                        <Typography variant="h6" sx={{
                            display: "flex",
                            flexDirection: 'row',
                            alignItems: "center",
                            columnGap: 1
                        }}>
                            <BookmarkIcon />Saves
                        </Typography>
                    </MenuItem>
                </Paper>
            </Box>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    rowGap: 4,
                }}
            >
                <ShareZone />
                <Posts image={state.user.imageUrl} nameUser={state.user.name} />
            </Box>
            <Box>
                <FriendsSuggestion />
            </Box>
        </div>
    )
}

export default Auth(Dashboard)
