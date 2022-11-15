import * as Yup from 'yup';
import { useState } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import axios from 'axios';
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
import baseUrl from '../../../baseUrl';


// ----------------------------------------------------------------------




export default function AltaProductoForm() {

  const navigate = useNavigate();

  const GuardarProductos = Yup.object().shape({
    producto: Yup.string().required('El Nombre del Producto es obligatorio'),
    codigoProducto: Yup.string().required('El Código del Producto es obligatorio'),
    stock: Yup.number('Debe ser un numero').min(0,'Debe ser un numero positivo').required('El Stock del Producto es obligatorio').integer('Debe ser un numero entero'),
    precio: Yup.number('Debe ser un numero').required('El Stock del Producto es obligatorio').min(0,'Debe ser un numero positivo'),
  });

  const defaultValues = {
    producto: '',
    codigoProducto: '',
    stock: '0',
    precio: '0',
  };

  const methods = useForm({
    resolver: yupResolver(GuardarProductos),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

 const onSubmit=({producto,codigoProducto,stock,precio})=>{
      axios.post(`${baseUrl}/products/createProduct`,{ descripcion: producto,
      codProducto: codigoProducto,
      stock,
      precio,
      cuit:0})
      .then(res => {
      navigate('/pepsico/dashboard/productos', { replace: true });
       }) 
      .catch(error=>{
      alert(error)
      })
    
     

    };
  
  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        <RHFTextField name="producto" label="Nombre Producto" />
        <RHFTextField name="codigoProducto" label="Codigo Producto" />
        <RHFTextField name="stock" label="Stock" />
        <RHFTextField name="precio" label="Precio Unitario [$]"  />
      </Stack>

      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
        {/* <RHFCheckbox name="remember" label="Remember me" />
        <Link variant="subtitle2" underline="hover">
          Forgot password?
        </Link> */}
      </Stack>

      <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting}>
        Guardar
      </LoadingButton>
    </FormProvider>
  );
}
