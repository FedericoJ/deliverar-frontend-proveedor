import { useState } from 'react';
import PropTypes from 'prop-types';

// material
import { styled, alpha } from '@mui/material/styles';
import { Input, Slide, Button, IconButton, InputAdornment, ClickAwayListener,Typography, Grid } from '@mui/material';
import { EncabezadoProveedor } from '../../sections/@dashboard/app'
// component

import Iconify from '../../components/Iconify';



// ----------------------------------------------------------------------

const APPBAR_MOBILE = 64;
const APPBAR_DESKTOP = 92;

const SearchbarStyle = styled('div')(({ theme }) => ({
  top: 0,
  left: 0,
  zIndex: 99,
  width: '100%',
  display: 'flex',
  position: 'absolute',
  alignItems: 'center',
  height: APPBAR_MOBILE,
  backdropFilter: 'blur(6px)',
  WebkitBackdropFilter: 'blur(6px)', // Fix on Mobile
  padding: theme.spacing(0, 3),
  boxShadow: theme.customShadows.z8,
  backgroundColor: `${alpha(theme.palette.background.default, 0.72)}`,
  [theme.breakpoints.up('md')]: {
    height: APPBAR_DESKTOP,
    padding: theme.spacing(0, 5),
  },
}));


// ----------------------------------------------------------------------

export default function Searchbar() {
  const [isOpen, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen((prev) => !prev);
  };

  const handleClose = () => {
    setOpen(false);
  };  

   return (
  <Grid container spacing={3}>
    <Grid item xs={12} sm={6} md={3}>
      <EncabezadoProveedor proveedor="Fanaoca" />
    </Grid>
    <Grid item xs={12} sm={6} md={3}>
      <EncabezadoProveedor cuit="20352677958"/>
    </Grid>
  </Grid>
    //  <ClickAwayListener onClickAway={handleClose}>
    //    <div>
    //      {!isOpen && (
    //        <IconButton onClick={handleOpen}>
    //          <Iconify icon="eva:search-fill" width={20} height={20} />
    //        </IconButton>
    //      )}

    //      <Slide direction="down" in={isOpen} mountOnEnter unmountOnExit>
    //        <SearchbarStyle>
    //          <Input
    //            autoFocus
    //            fullWidth
    //            disableUnderline
    //            placeholder="Search…"
    //            startAdornment={
    //              <InputAdornment position="start">
    //                <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled', width: 20, height: 20 }} />
    //              </InputAdornment>
    //            }
    //            sx={{ mr: 1, fontWeight: 'fontWeightBold' }}
    //          />
    //          <Button variant="contained" onClick={handleClose}>
    //            Search
    //          </Button>
    //        </SearchbarStyle>
    //      </Slide>
    //    </div>
    //  </ClickAwayListener>
   );
}
