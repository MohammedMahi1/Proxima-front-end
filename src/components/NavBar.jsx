import { Box, Paper,TextField, Typography } from '@mui/material'
import React from 'react'
import { FiHome, FiUsers } from 'react-icons/fi';
import { IoMdNotificationsOutline } from 'react-icons/io';
import { TbMessageCircle2 } from 'react-icons/tb';
import { useNavigate } from 'react-router-dom';


const NavBar = () => {
  const navigate = useNavigate()
  return (
    <div >
      <Paper
        sx={{
          padding: "12px 30px 12px 30px",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          color: "#fff",
          backgroundColor: "#590d82"
        }}
        square
        elevation={0}
      >
        <Box className='Proxima_Box'>
          <Typography variant='h5' sx={{ fontFamily: 'Calibri' }}>PROXIMA</Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            columnGap: 7,
            flexWrap: "wrap",
            fontSize: "22px"
          }}

        >
          <FiHome style={{cursor:"pointer"}} onClick={()=>navigate('/')}/>
          <FiUsers style={{cursor:"pointer"}} className='FiUsers' onClick={()=>navigate('/')}/>

          <IoMdNotificationsOutline style={{cursor:"pointer"}} onClick={()=>navigate('/')}/>

          <TbMessageCircle2 style={{cursor:"pointer"}} onClick={()=>navigate('/chat')}/>
        </Box>
        <Box>
          <TextField
            id="outlined-size-small"
            label="Search"
            size="small"
            sx={{
              m: 0,
            }}
            color='secondary'
          />
        </Box>
      </Paper>
    </div>
  )
}

export default NavBar
