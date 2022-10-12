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
import axios from 'axios';
// components
import Iconify from '../../../components/Iconify';
import { FormProvider, RHFTextField, RHFCheckbox } from '../../../components/hook-form';

// ----------------------------------------------------------------------

export default function AltaOfertaForm({nombre,codigo}) {

  const navigate = useNavigate();


  const GuardarOferta = Yup.object().shape({
    descuento: Yup.number('Debe ser un numero').required('El descuento es obligatorio').min(0,'Debe ser un numero positivo'),
    vigencia: Yup.date().required('La fecha de vigencia es obligatoria'),
  });

  const defaultValues = {
    producto: nombre,
    codigoProducto: codigo,
    descuento: '0',
    vigencia: '',
  };

  const methods = useForm({
    resolver: yupResolver(GuardarOferta),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;


  const onSubmit= async ({codigoProducto,descuento,vigencia})=>{
       axios.post(`http://localhost:5000/products/createOffer`,{
        codProducto: codigoProducto,
        cuit:0,
        porcentaje: descuento,
        fecHasta: vigencia})
       .then(res => {
        navigate('/dashboard/productos', { replace: true });
       }) 
       .catch(error=>{
        alert(error)
       })
  };


  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        <RHFTextField  name="producto" disabled  label="Nombre Producto" />
        <RHFTextField  name="codigoProducto" disabled label="Codigo Producto" />
        <RHFTextField name="descuento" label="Descuento [%]" />
        <TextField
            name="vigencia"
            id="date"
            type="date"
            label="Fin Vigencia Oferta"
            InputLabelProps={{
              shrink: true
            }}
          />
          
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
