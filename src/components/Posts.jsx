import { Avatar, Box, Paper, Skeleton, Stack, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import FavoriteIcon from '@mui/icons-material/Favorite';
import ModeCommentOutlinedIcon from '@mui/icons-material/ModeCommentOutlined';
import { useDispatch, useSelector } from 'react-redux';
import { getPosts, likeHundler } from '../store/postSlice';
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
import axios from 'axios';
import TextTypographie from './TextTypographie';
import PostDateMoment from './PostDateMoment';
import { useNavigate } from 'react-router-dom';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { IconButton, Tooltip } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';

const MenuPost = ({id})=> {
    const state = useSelector((state)=>state)
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

const hundleConfirm = ()=>{
    const confirmer = window.confirm('Are you sure you want to delete this post?');
    if (confirmer) {
        axios({
            method: 'delete',
            url: 'http://127.0.0.1:8000/api/post/deletePost/'+id,
            headers:{
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + state.user.token
            }
        }).then((res)=>{
            console.log(res.data.message);
        })
    }else{
        console.log("gg");
    }
}
    return (
        <Box sx={{
            gridColumn: "4/5",
            gridRow: "4/5",
        }}>

            <Tooltip title="menu"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
                variant="Button"
                sx={{
                    margin: 1,
                }}
            >
                <IconButton>
                    <MoreVertIcon/>
                </IconButton>
            </Tooltip>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}

            >
                <MenuItem onClick={hundleConfirm}>Delete Post</MenuItem>
            </Menu>
        </Box >
    );
}

const Posts = ({ nameUser, image }) => {
    const state = useSelector((state) => state)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [loading, setLoading] = useState(true)
    const doubleClickHandler = (event) => {
        if (event.detail === 2) {
            dispatch(likeHundler(true))
        }
    }
    useEffect(() => {
        const getPost = async () => {
            await axios({
                method: 'GET',
                url: "http://127.0.0.1:8000/api/post/getPosts",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + state.user.token
                }
            }).then((res) => {
                dispatch(getPosts({ posts: res.data.posts }))
                setLoading(false)
            })
        }
        getPost()
    }, [dispatch, state.user.token])
    return (
        <>
            {
                loading ?
                    <Paper elevation={3}>
                        <Box className='post'>
                            <Box
                                sx={{ padding: " 30px 30px 0 30px" }}>
                                <Stack
                                    sx={{
                                        display: 'flex',
                                        flexDirection: "row",
                                        alignItems: "center",
                                        columnGap: 1,
                                    }}
                                >
                                    <Skeleton animation="wave" variant='circular' width={50} height={50} />
                                    <Skeleton animation="wave" width={200} height={40} />

                                </Stack>
                                <Box>
                                    <Skeleton animation="wave" height={20} style={{ marginBottom: 6 }} />
                                    <Skeleton animation="wave" height={20} width="80%" />
                                </Box>
                            </Box>
                            <Box>
                                <Skeleton
                                    sx={{
                                        height: 400
                                    }}
                                    animation="wave" variant="rectangular" />
                            </Box>
                            <Box
                                sx={{
                                    height: 30
                                }}
                            >
                            </Box>
                        </Box>
                    </Paper>
                    :
                    state.post.posts.map((e, index) => {
                        return (
                            <Paper key={index} className='container_posts' elevation={3}>
                                <Box className='post'>
                                    <Box
                                        sx={{ padding: " 30px 30px 0 30px" }}
                                    >
                                        <Box
                                            sx={{
                                                display: "flex",
                                                flexDirection: "row",
                                                justifyContent:"space-between"
                                            }}
                                        >

                                            <Stack
                                                sx={{
                                                    display: 'flex',
                                                    flexDirection: "row",
                                                    alignItems: "center",
                                                    columnGap: 1,
                                                }}
                                            >
                                                <Avatar src={image} sx={{width:50,height:50}}onClick={()=>navigate('/profile')} />
                                                <Typography variant='h6' onClick={()=>navigate('/profile')}>{nameUser}</Typography>
                                            </Stack>
                                                <MenuPost id={e.id}/>
                                        </Box>
                                        <PostDateMoment post={e.updated_at} />
                                        <TextTypographie text={e.statut} />

                                    </Box>
                                    <Box
                                        className='post_img'
                                        onClick={doubleClickHandler}
                                    >
                                        <img
                                            className='img'
                                            src={e.post_url}
                                            alt={e.post_image}
                                        />
                                    </Box>
                                    <Box
                                        sx={{
                                            display: "flex",
                                            flexDirection: "row",
                                            justifyContent: "space-between",
                                            padding: "0 30px 20px 30px"
                                        }}
                                    >
                                        <Box
                                            sx={{ display: "flex", flexDirection: "row", columnGap: 2 }}
                                        >
                                            <Box>

                                                {
                                                    state.post.like ?
                                                        <FavoriteIcon className="like" onClick={() => dispatch(likeHundler(!state.post.like))} sx={{ transition: "0.2s", color: "#ee1e2f", fontSize: "32px", cursor: "pointer" }} />
                                                        :
                                                        <FavoriteIcon className="like" onClick={() => dispatch(likeHundler(!state.post.like))} sx={{ transition: "0.2s", fontSize: "32px", cursor: "pointer" }} />
                                                }
                                                <Typography>{e.likes}</Typography>
                                            </Box>
                                            <ModeCommentOutlinedIcon sx={{ fontSize: "32px", cursor: "pointer" }} />
                                        </Box>
                                        <BookmarkBorderOutlinedIcon sx={{ fontSize: "32px", cursor: "pointer" }} />
                                    </Box>
                                </Box>
                            </Paper>
                        )
                    })
            }
        </>
    )
}

export default Posts
