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
  const [name,setName]=useState('');
  const [codigo,setCodigo]=useState('');
  const [Stock,setStock]=useState(0);
  const [Precio,setPrecio]=useState(0);
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

 const onSubmit=(e)=>{
    // navigate('/dashboard', { replace: true });
      e.preventDefault();
      axios.post(`http://localhost:5000/products/createProduct`,{ descripcion: name,
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
      const onlyNums = e.target.value.replace(/[^0-9]/g, '');
      setPrecio(onlyNums);
    }
  
  return (
    <FormProvider methods={methods}>
      <Stack spacing={3}>
        <RHFTextField name="producto" label="Nombre Producto" value={name} onChange={e=>setName(e.target.value)}/>
        <RHFTextField name="codigoProducto" label="Codigo Producto" value={codigo} onChange={e=>setCodigo(e.target.value)}/>
        <RHFTextField name="stock" label="Stock" value={Stock} onChange={handleStock}/>
        <RHFTextField name="precio" label="Precio Unitario [$]" value={Precio} onChange={handlePrecio} />
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
