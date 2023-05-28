import { Typography } from '@mui/material';
import axios from 'axios';
import React from 'react';
import { useSelector } from 'react-redux';
const FileUploader = ({ type, label }) => {
    const state = useSelector((state) => state)
    const hiddenFileInput = React.useRef(null);

    const handleClick = () => {
        console.log(hiddenFileInput.current.click());
    };
    const handleChange = async (event) => {
        const fileUploaded = event.target.files[0];
        if (type === "cover") {
            const formData = new FormData();
            formData.append('cover_profile', fileUploaded);
            await axios({
                method: "post",
                url: "http://127.0.0.1:8000/api/user/addCoverProfile",
                data: formData,
                headers: {
                    "Accept": "application/json",
                    "Authorization": 'Bearer ' + state.user.token
                }
            }).then((res) => {
                console.log(res.data.message);
            }).catch((err) => {
                console.log(err.data.message);
            })
        } else if (type === "profile") {
            const formData = new FormData();
            formData.append('image_profile', fileUploaded);
            await axios({
                method: "post",
                url: "http://127.0.0.1:8000/api/user/addImageProfile",
                data: formData,
                headers: {
                    "Accept": "application/json",
                    "Authorization": 'Bearer ' + state.user.token
                }
            }).then((res) => {
                console.log(res.data.message);
            }).catch((err) => {
                console.log(err.data.message);
            })
        }
    }
    return (
        <>
            <Typography onClick={handleClick}>
                {label}
            </Typography>
            <input
                type="file"
                ref={hiddenFileInput}
                onChange={handleChange}
                style={{ display: 'none' }}
            />
        </>
    );
}
export default FileUploader;