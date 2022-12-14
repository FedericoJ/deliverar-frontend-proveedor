import { Link as RouterLink ,useLocation} from 'react-router-dom';

// @mui
import { styled } from '@mui/material/styles';
import { Card, Link, Container, Typography } from '@mui/material';
import { AltaOfertaForm } from '../sections/@dashboard/productos';
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

export default function AltaOferta() {
  const smUp = useResponsive('up', 'sm');
  const mdUp = useResponsive('up', 'md');
  const location = useLocation();
  const searchLocation = window.location.search?.slice(1);

  const params = new URLSearchParams(searchLocation);
  const codProducto = params.get('codProducto');
  const nomProduct =params.get('Nombre');
  const porcentaje=params.get('Porcentaje');
  const fechaVigencia=params.get('FechaVigencia');


  return (
    <Page title="Alta de Oferta">
        {/* <HeaderStyle>
          <Logo />

          {smUp && (
            <Typography variant="body2" sx={{ mt: { md: -2 } }}>
              Don???t have an account? {''}
              <Link variant="subtitle2" component={RouterLink} to="/register">
                Get started
              </Link>
            </Typography>
          )}
        </HeaderStyle>

        {mdUp && (
          <SectionStyle>
            <Typography variant="h3" sx={{ px: 5, mt: 10, mb: 5 }}>
              Hi, Welcome Back
            </Typography>
            <img src="/static/illustrations/illustration_login.png" alt="login" />
          </SectionStyle>
        )} */}

        <Container maxWidth="sm">
          <ContentStyle >
            <Typography variant="h4" gutterBottom>
              Alta de Oferta
            </Typography>

            {/* <AuthSocial /> */}

            <AltaOfertaForm nombre={nomProduct} codigo={codProducto} porcentaje={porcentaje} fechaVigencia={fechaVigencia}/>

          </ContentStyle>
        </Container>
    </Page>
  );
}
