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

  const [showPassword, setShowPassword] = useState(false);
  const [name,setName]=useState(nombre);
  const [codProducto,setCodigo]=useState(codigo);
  const [cantDescuento,setPorcentaje]=useState();
  const [fecFinal,setFinal]=useState();

  const LoginSchema = Yup.object().shape({
    email: Yup.string().email('Email must be a valid email address').required('Email is required'),
    password: Yup.string().required('Password is required'),
  });

  const defaultValues = {
    producto: '',
    codigoProducto: '',
    descuento: '',
    vigencia: '',
  };

  const methods = useForm({
    resolver: yupResolver(LoginSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (e) => {
    e.preventDefault();

    axios.post(`http://localhost:5000/products/createOffer`,{
        codProducto: codigo,
        cuit:0,
        porcentaje:cantDescuento,
        fecHasta:fecFinal})
       .then(res => {
        navigate('/dashboard/productos', { replace: true });
       }) 
       .catch(error=>{
        alert(error)
       })
  };

  const handlePrecio=(e)=>{
    const onlyNums = e.target.value.replace(/[^0-9]/g, '');
    setPorcentaje(onlyNums);
  }

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        <RHFTextField  name="producto" disabled  label="Nombre Producto" value={name}/>
        <RHFTextField  name="codigoProducto" disabled label="Codigo Producto" value={codProducto}/>
        <RHFTextField name="descuento" label="Descuento [%]" value={cantDescuento} onChange ={handlePrecio}/>
        <TextField
            name="vigencia"
            id="date"
            type="date"
            label="Fin Vigencia Oferta"
            onChange={e=>setFinal(e.target.value)}
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

      <LoadingButton fullWidth size="large" type="submit" variant="contained" onClick={onSubmit} >
        Guardar
      </LoadingButton>
    </FormProvider>
  );
}
