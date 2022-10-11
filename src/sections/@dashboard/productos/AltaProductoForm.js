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


// ----------------------------------------------------------------------




export default function AltaProductoForm() {

  const navigate = useNavigate();


  const [showPassword, setShowPassword] = useState(false);
  
  const [producto,setProducto]=useState('');
  const [codigoProducto,setCodigo]=useState('');
  const [stock,setStock]=useState(0);
  const [precio,setPrecio]=useState(0);

  const GuardarProducto = Yup.object().shape({
    producto: Yup.string().required('El Nombre del Producto es requerido'),
    codigoProducto: Yup.string().required('El Código del Producto es requerido'),
    // stock: Yup.number().positive('Debe ser un numero positivo').required('El Stock es requerido'),
    // precio: Yup.number().positive('Debe ser un numero positivo').required('El Precio es requerido'),
  });

  const methods = useForm({
    resolver: yupResolver(GuardarProducto)
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

 const onSubmit=(e)=>{
    // navigate('/dashboard', { replace: true });
      e.preventDefault();
      axios.post(`http://localhost:5000/products/createProduct`,{ descripcion: producto,
          codProducto: codigoProducto,
          stock,
          precio,
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
      const onlyNums = e.target.value.replace(/[^0-9]/g, '');
      setPrecio(onlyNums);
    }
  
  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        <RHFTextField name="producto" label="Nombre Producto" value={producto} onChange={e=>setProducto(e.target.value)}/>
        <RHFTextField name="codigoProducto" label="Codigo Producto" value={codigoProducto} onChange={e=>setCodigo(e.target.value)}/>
        <RHFTextField name="stock" label="Stock" value={stock} onChange={handleStock}/>
        <RHFTextField name="precio" label="Precio Unitario [$]" value={precio} onChange={handlePrecio} />
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
