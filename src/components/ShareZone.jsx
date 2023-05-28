import { Box, Button, Chip, Paper, Snackbar, TextField, createTheme } from '@mui/material'
import React, { useRef, useState } from 'react'
import { ThemeProvider } from '@emotion/react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import PostAddIcon from '@mui/icons-material/PostAdd';
import MuiAlert from '@mui/material/Alert';
import { getMessage } from '../store/postSlice';
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const theme = createTheme({
  components: {
    MuiButton: {
      variants: [
        {
          props: { variant: 'dashed' },
          style: {
            textTransform: 'none',
            border: `1px dashed #a600ff`,
            color: "#a600ff",
            fontSize: "14px",
            gap: "5px",
          },
        },
        {
          props: { variant: 'dashed-sec' },
          style: {
            textTransform: 'none',
            border: `1px dashed #e1316d`,
            color: "#e1316d",
            fontSize: "14px",
            gap: "5px",
          },
        },
      ],
    },
  },
});


const ShareZone = () => {
  const fileInputRef = useRef(null);
  const state = useSelector((state) => state);
  const dispatch = useDispatch()
  const [image, setImage] = useState(null)
  const [hundleChip, setHundleChip] = useState(false);
  const [statut, setStatut] = useState('')
  const [open, setOpen] = React.useState(false);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };
  const handleChange = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('post_image', image);
    formData.append('statut', statut);
    await axios({
      method: "post",
      url: "http://127.0.0.1:8000/api/user/addPost",
      data: formData,
      headers: {
        "Accept": "application/json",
        "Authorization": 'Bearer ' + state.user.token
      }
    }).then((res) => {
      dispatch(getMessage({message: res.data.message}));
      console.log(res.data.message);
      setOpen(true);
    }).catch((err) => {
      console.log(err.message);
    })

  }
  const handleImage = (e) => {
    setImage(e.target.files[0])
    setHundleChip(true)
  }
  const handleDelete=()=>{
    setImage(null)
    setHundleChip(false)
  }
  return (
    <Paper elevation={3} className='container_skills' onSubmit={handleChange} component={"form"}>
      <TextField
        name="post_statut"
        id="filled-multiline-static"
        label="Status"
        multiline
        rows={3}
        variant="outlined"
        sx={{
          width: "100%",
          marginBottom: 3
        }}
        onChange={(e) => setStatut(e.target.value)}
        required
        color='secondary'
      />

      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          columnGap: 4,
          justifyContent: "flex-end"
        }}
      >
        <ThemeProvider theme={theme}>
          <input
            // accept=".png,.jpeg,.jpg"
            type="file"
            name="post_image"
            ref={fileInputRef}
            style={{ display: 'none' }}
            onChange={handleImage}
          />
          {
            hundleChip &&
            <Chip label={image.name} sx={{color:"#fff",backgroundColor:"#590d82"}} className="chips"onDelete={handleDelete}/>
          }
          <Button variant='dashed-sec' onClick={handleButtonClick}><AddPhotoAlternateIcon />Image</Button>
          <Button variant='dashed' type='submit'><PostAddIcon />Post</Button>
        </ThemeProvider>
      </Box>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%',color:"#fff" }}>
          {state.post.message}
        </Alert>
      </Snackbar>
    </Paper>
  )
}

export default ShareZone
