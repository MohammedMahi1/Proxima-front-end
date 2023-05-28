import { Typography } from '@mui/material';
import moment from 'moment/moment';
import React from 'react';
const PostDateMoment = ({post})=> {
        const timeAgo = moment(post).fromNow();
        if (timeAgo === "a few seconds ago"){
            return <Typography sx={{ color: 'text.disabled', fontSize: "13px",margin:"5px 0 5px 0" }}>Just now</Typography>
        }
        return (
            <Typography sx={{ color: 'text.disabled', fontSize: "13px",margin:"5px 0 5px 0" }}>{timeAgo}</Typography>
        );
}

export default PostDateMoment;