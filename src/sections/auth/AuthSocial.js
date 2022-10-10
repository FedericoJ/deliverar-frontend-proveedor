import React, { useContext, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import {useGoogleLogin } from '@react-oauth/google';
// material
import { Stack, Button, Divider, Typography } from '@mui/material';
// component
import Iconify from '../../components/Iconify';
import AppContext from '../../context/index';

// ----------------------------------------------------------------------

export default function AuthSocial(props) {
  
  const navigate = useNavigate();
  const { loggedIn, setLoggedIn } = useContext(AppContext);
  const login = useGoogleLogin({
    onSuccess: tokenResponse => {
      console.log(tokenResponse)
      // localStorage.setItem("ID", "");
       setLoggedIn(true);
      navigate('/dashboard/pedidos');
    }
  });


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
