import React, { useContext, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import {useGoogleLogin } from '@react-oauth/google';
// material
import { Stack, Button, Divider, Typography } from '@mui/material';
import axios from 'axios';
// component
import Iconify from '../../components/Iconify';
import AppContext from '../../context/index';

// ----------------------------------------------------------------------

export default function AuthSocial() {
  
  const navigate = useNavigate();
  const { loggedIn, setLoggedIn } = useContext(AppContext);
  const login = useGoogleLogin({
    onSuccess: tokenResponse => {
      console.log(tokenResponse.access_token)
      localStorage.setItem("token", tokenResponse.access_token);
      // setLoggedIn(true);
      navigate('/dashboard/pedidos');
    }
  });

    
  useEffect(() => {
    console.log('context here: ', loggedIn);
    axios.get(`https://www.googleapis.com/oauth2/v3/userinfo`,
    {
      headers: {
          "Content-type": "application/json",
           "Authorization": `Bearer ${localStorage.getItem("token")}`,
      },
  })
    .then(res => {
      console.log(res.data)
      if (res.data !== undefined){
        localStorage.setItem("name", res.data.name);
      localStorage.setItem("email", res.data.email);
      }
    })
}, [loggedIn]);


  return (
    <>
      <Stack direction="row" spacing={2}>
        <Button fullWidth size="large" color="inherit" variant="outlined" onClick={() => login()}>
          <Iconify icon="eva:google-fill" color="#DF3E30" width={22} height={22} />
        </Button>

        {/* <Button fullWidth size="large" color="inherit" variant="outlined">
          <Iconify icon="eva:facebook-fill" color="#1877F2" width={22} height={22} />
        </Button> */}

        {/* <Button fullWidth size="large" color="inherit" variant="outlined">
          <Iconify icon="eva:twitter-fill" color="#1C9CEA" width={22} height={22} />
        </Button> */}
      </Stack>

      <Divider sx={{ my: 3 }}>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          OR
        </Typography>
      </Divider>
    </>
  );
}
