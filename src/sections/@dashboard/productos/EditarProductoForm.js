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
import baseUrl from '../../../baseUrl';


// ----------------------------------------------------------------------

export default function EditarProductoForm({nombre,cod,stockParam,precioParam}) {

  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [name,setName]=useState(nombre);
  const [codigo,setCodigo]=useState(cod);
  const [Stock,setStock]=useState(stockParam);
  const [Precio,setPrecio]=useState(precioParam);

  const LoginSchema = Yup.object().shape({
    precio: Yup.number('Debe ser un numero').required('El Stock del Producto es obligatorio').min(0,'Debe ser un numero positivo'),
  });

  const defaultValues = {
    producto: '',
    codigoProducto: '',
    stock: '0',
    precio: '0',
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

    axios.post(`${baseUrl}/products/updateProductByCode`,{ descripcion: name,
    codProducto: codigo,
    stock:Stock,
    precio:Precio,
    cuit:0})
   .then(res => {
      navigate('/dashboard/productos', { replace: true });
   }) 
   .catch(error=>{
    alert(error)
   })
  };

  const handleStock=(e)=>{
    const onlyNums = e.target.value.replace(/[^0-9]/g, '');
    setStock(onlyNums);
  }

  const handlePrecio=(e)=>{
    const onlyNums = e.target.value.replace(/[^\d.]+/g, '');
    setPrecio(onlyNums);
  }

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        <RHFTextField name="producto" disabled label="Nombre Producto" value={name} onChange={e=>setName(e.target.value)} />
        <RHFTextField name="codigoProducto" disabled label="Codigo Producto" value={codigo} onChange={e=>setCodigo(e.target.value)} />
        <RHFTextField name="stock" label="Stock" value={Stock} onChange={handleStock}/>
        <RHFTextField name="precio" label="Precio Unitario [$]" value={Precio} onChange={handlePrecio} />
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

      <LoadingButton fullWidth size="large" type="submit" variant="contained" onClick={onSubmit}>
        Guardar
      </LoadingButton>
    </FormProvider>
  );
}
