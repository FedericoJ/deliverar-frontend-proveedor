import { Link as RouterLink } from 'react-router-dom';

// @mui
import { styled } from '@mui/material/styles';
import { Card, Link, Container, Typography } from '@mui/material';
import { EditarProductoForm } from '../sections/@dashboard/productos';
// hooks
import useResponsive from '../hooks/useResponsive';
// components
import Page from '../components/Page';
import Logo from '../components/Logo';
// sections


// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex',
  },
}));

const HeaderStyle = styled('header')(({ theme }) => ({
  top: 0,
  zIndex: 9,
  lineHeight: 0,
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  position: 'absolute',
  padding: theme.spacing(3),
  justifyContent: 'space-between',
  [theme.breakpoints.up('md')]: {
    alignItems: 'flex-start',
    padding: theme.spacing(7, 5, 0, 7),
  },
}));

const SectionStyle = styled(Card)(({ theme }) => ({
  width: '100%',
  maxWidth: 464,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  margin: theme.spacing(2, 0, 2, 2),
}));

const ContentStyle = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
  padding: theme.spacing(4, 0),
}));

// ----------------------------------------------------------------------

export default function EditarProducto() {
  const smUp = useResponsive('up', 'sm');
  const mdUp = useResponsive('up', 'md');

  const searchLocation = window.location.search?.slice(1);

  const params = new URLSearchParams(searchLocation);
  const codProducto = params.get('codProducto');
  const nomProduct =params.get('Nombre');
  const stockActual =params.get('Stock');
  const precioActual=params.get('Precio');

  return (
    <Page title="Producto">
      <RootStyle>

        <Container maxWidth="sm">
          <ContentStyle>
            <Typography variant="h4" gutterBottom>
              Editar Producto
            </Typography>

            {/* <AuthSocial /> */}

            <EditarProductoForm nombre={nomProduct} cod={codProducto} stockParam={stockActual} precioParam ={precioActual}/>

          </ContentStyle>
        </Container>
      </RootStyle>
    </Page>
  );
}
