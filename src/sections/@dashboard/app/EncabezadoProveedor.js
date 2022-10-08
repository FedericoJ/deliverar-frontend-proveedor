// @mui
import PropTypes from 'prop-types';
import { alpha, styled } from '@mui/material/styles';
import { Card, Typography } from '@mui/material';
// utils
import { fShortenNumber } from '../../../utils/formatNumber';
// components
import Iconify from '../../../components/Iconify';

// ----------------------------------------------------------------------

const IconWrapperStyle = styled('div')(({ theme }) => ({
  margin: 'auto',
  display: 'flex',
  borderRadius: '50%',
  alignItems: 'center',
  width: theme.spacing(8),
  height: theme.spacing(8),
  justifyContent: 'center',
  marginBottom: theme.spacing(3),
}));

// ----------------------------------------------------------------------

EncabezadoProveedor.propTypes = {
  proveedor: PropTypes.string.isRequired,
  cuit: PropTypes.number.isRequired,

};

export default function EncabezadoProveedor({proveedor, cuit}) {
  return (
    <Card
      sx={{
          py: 0.5,
          boxShadow: 0,
          textAlign: 'center',
          //  color: "#366BD6",
          //  bgcolor: "#366BD6",
        }}
    >
      <Typography color={"#366BD6"} variant="h3">
        {cuit}</Typography>

      <Typography color={"#366BD6"}  variant="h3">
        {proveedor}
      </Typography>
    </Card>
  );
}
