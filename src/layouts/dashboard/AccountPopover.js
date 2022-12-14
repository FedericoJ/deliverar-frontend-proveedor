import { useRef, useState, useContext } from 'react';
import { Link as RouterLink } from 'react-router-dom';
// @mui
import { alpha } from '@mui/material/styles';
import { Box, Divider, Typography, Stack, MenuItem, Avatar, IconButton } from '@mui/material';
// components
import MenuPopover from '../../components/MenuPopover';
// mocks_
import account from '../../_mock/account';
import AppContext from '../../context/index';

// ----------------------------------------------------------------------

const MENU_OPTIONS = [
  {
    label: 'Inicio',
    icon: 'eva:home-fill',
    linkTo: '/pepsico/dashboard/pedidos',
  },
  // {
  //   label: 'Profile',
  //   icon: 'eva:person-fill',
  //   linkTo: '#',
  // },
  // {
  //   label: 'Settings',
  //   icon: 'eva:settings-2-fill',
  //   linkTo: '#',
  // },
];

// ----------------------------------------------------------------------

export default function AccountPopover() {
  const anchorRef = useRef(null);

  const [open, setOpen] = useState(null);
  const { loggedIn, setLoggedIn } = useContext(AppContext);

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("name");
    localStorage.removeItem("email");
    console.log(localStorage.getItem("token"));
    setOpen(null);
    // setLoggedIn(false);
  };

  const handleCloseMenu = () => {
    setOpen(null);
    // setLoggedIn(false);
  };

  return (
    <>
    {
          (localStorage.getItem("token") === undefined || localStorage.getItem("token") === null)
          ?
          <></>
          :
          (
            <>
      <IconButton
        ref={anchorRef}
        onClick={handleOpen}
        sx={{
          p: 0,
          ...(open && {
            '&:before': {
              zIndex: 1,
              content: "''",
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              position: 'absolute',
              bgcolor: (theme) => alpha(theme.palette.grey[900], 0.8),
            },
          }),
        }}
      >
        <Avatar src={localStorage.getItem("profilePic")} alt="photoURL" />
      </IconButton>
        
          <MenuPopover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleCloseMenu}
        sx={{
          p: 0,
          mt: 1.5,
          ml: 0.75,
          '& .MuiMenuItem-root': {
            typography: 'body2',
            borderRadius: 0.75,
          },
        }}
      >
        <Box sx={{ my: 1.5, px: 2.5 }}>
          <Typography variant="subtitle2" noWrap>
            {localStorage.getItem("name")}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
            {localStorage.getItem("email")}
          </Typography>
        </Box>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <Stack sx={{ p: 1 }}>
          {MENU_OPTIONS.map((option) => (
            <MenuItem key={option.label} to={option.linkTo} component={RouterLink} onClick={handleCloseMenu}>
              {option.label}
            </MenuItem>
          ))}
        </Stack>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <MenuItem onClick={handleClose} to='/pepsico/login' component={RouterLink} sx={{ m: 1 }}>
          Cerrar Sesi??n
        </MenuItem>
      </MenuPopover>
</>
          )
}
      
    </>
  );
}
