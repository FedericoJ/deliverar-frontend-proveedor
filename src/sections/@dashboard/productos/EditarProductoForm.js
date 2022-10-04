import * as Yup from 'yup';
import { useState } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { Link, Stack, IconButton, InputAdornment, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
// components
import Iconify from '../../../components/Iconify';
import { FormProvider, RHFTextField, RHFCheckbox } from '../../../components/hook-form';


// ----------------------------------------------------------------------

export default function EditarProductoForm() {

  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const LoginSchema = Yup.object().shape({
    email: Yup.string().email('Email must be a valid email address').required('Email is required'),
    password: Yup.string().required('Password is required'),
  });

  const defaultValues = {
    producto: '',
    codigoProducto: '',
    stock: '',
    precio: '',
  };

  const methods = useForm({
    resolver: yupResolver(LoginSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async () => {
    navigate('/dashboard', { replace: true });
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        <RHFTextField name="producto" disabled label="Nombre Producto" />
        <RHFTextField name="codigoProducto" disabled label="Codigo Producto" />
        <RHFTextField name="stock" label="Stock" />
        <RHFTextField name="precio" label="Precio Unitario [$]" />
        {/* <RHFTextField name="descuento" label="Descuento [%]" />
        <TextField
            name="vigencia"
            id="date"
            type="date"
            label="Fin Vigencia Oferta"
            InputLabelProps={{
              shrink: true
            }}
          />
           */}
      </Stack>

      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
        {/* <RHFCheckbox name="remember" label="Remember me" />
        <Link variant="subtitle2" underline="hover">
          Forgot password?
        </Link> */}
      </Stack>

      <LoadingButton fullWidth size="large" type="submit" variant="contained" component={RouterLink} to='/dashboard/Productos'>
        Guardar
      </LoadingButton>
    </FormProvider>
  );
}
